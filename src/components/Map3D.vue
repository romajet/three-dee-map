<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as consts from '../plugins/constants.js'
import axios from '../plugins/axios.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/Addons.js'
import LoadingSpinner from './LoadingSpinner.vue'
import polylabel from 'polylabel'

const canvasRef = ref(null)
const currentFloor = ref(null)
const isLoading = ref(true)
const message = ref(null)

let scene, camera, renderer, labelRenderer, controls
let objects = []
let buildingLabels = []

let currentFloorGroup = null
let roomLabelsGroup

let isDragging = false
let mouseStartX = 0
let mouseStartY = 0
const dragThreshold = 5

/**
 * Возврат к общему виду после просмотра детального этажа
 */
function returnToOverview() {
    if (currentFloorGroup) {
        scene.remove(currentFloorGroup)
        currentFloorGroup = null
    }

    clearRoomLabels()

    objects.forEach(obj => {
        obj.visible = true
    })

    buildingLabels.forEach(label => {
        label.visible = true
    })

    camera.position.set(500, 250, 500)
    controls.target.set(250, 0, 250)
    controls.update()

    currentFloor.value = null
}

/**
 * Временное отображение подписей осей координат
 */
function createAxisLabels() {
    const labels = []

    const xLabel = createLabel('X', 105, 0, 0)
    labels.push(xLabel)
    const yLabel = createLabel('Y', 0, 105, 0)
    labels.push(yLabel)
    const zLabel = createLabel('Z', 0, 0, 105)
    labels.push(zLabel)

    return labels
}

/**
 * Добавление текста в пространстве
 * @param text Текст для отображения
 * @param x Координата оси абсцисс
 * @param y Координата оси ординат
 * @param z Координата оси аппликат
 */
function createLabel(text, x, y, z) {
    const div = document.createElement('div')
    div.className = 'axis-label'
    div.textContent = text
    div.style.color = getColorAxis(text)

    const label = new CSS2DObject(div)
    label.position.set(x, y, z)
    return label
}

/**
 * Получение цвета текста для обозначения оси
 * @param axis Обозначение оси
 */
function getColorAxis(axis) {
    switch (axis) {
        case 'X': return '#ff0000'
        case 'Y': return '#00ff00'
        case 'Z': return '#0000ff'
        default: return '#ffffff'
    }
}

/**
 * Функция построения полигона
 * @param coords Координаты
 * @param depth Высота
 * @param color Цвет
 * @param offset Смещение отн-о начала координат
 * @param zShift Смещение по оси аппликат (Z)
 */
function createExtrudedPolygon(coords, depth, color, offset = [0, 0, 0, 1], zShift = 0) {
    const [dx, dy, rotation, selfScale] = offset

    const shape = new THREE.Shape()
    coords.forEach(([x, y], i) => {
        const X = x * consts.scale * selfScale + dx
        const Z = y * consts.scale * selfScale + dy
        if (i === 0) shape.moveTo(X, Z)
        else shape.lineTo(X, Z)
    })

    const extrudeSettings = { depth, bevelEnabled: false }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geometry.rotateX(Math.PI / 2)
    geometry.translate(0, zShift, 0)

    const material = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geometry, material)

    mesh.rotation.y = THREE.MathUtils.degToRad(rotation)

    return mesh
}

/**
 * Функция отрисовки стен
 * @param coords Координаты
 * @param height Высота
 * @param thickness Толщина стен
 * @param color Цвет
 * @param offset Смещение
 * @param zShift Смещение по высоте
 */
function createWallsFromPolygon(coords, height, thickness, color, offset = [0, 0, 0, 1], zShift = 0) {
    const [dx, dy, rotation, selfScale] = offset
    const walls = new THREE.Group()

    for (let i = 0; i < coords.length; i++) {
        const start = coords[i]
        const end = coords[(i + 1) % coords.length]

        const startX = start[0] * consts.scale * selfScale + dx
        const startZ = start[1] * consts.scale * selfScale + dy
        const endX = end[0] * consts.scale * selfScale + dx
        const endZ = end[1] * consts.scale * selfScale + dy

        const dxWall = endX - startX
        const dzWall = endZ - startZ
        const length = Math.sqrt(dxWall * dxWall + dzWall * dzWall)

        const angle = Math.atan2(dzWall, dxWall)

        const posX = startX + dxWall / 2
        const posZ = startZ + dzWall / 2

        const geometry = new THREE.BoxGeometry(length, height, thickness)
        const material = new THREE.MeshPhongMaterial({ color })
        const wall = new THREE.Mesh(geometry, material)

        wall.position.set(posX, height / 2 + zShift, posZ)
        wall.rotation.y = -angle

        walls.add(wall)
    }

    walls.rotation.y = THREE.MathUtils.degToRad(rotation)
    return walls
}

/**
 * Функция отрисовки пола этажа
 * @param coords Координаты
 * @param thickness Толщина (?)
 * @param color Цвет
 * @param offset Смещение
 * @param zShift Смещение по высоте
 */
function createFloorFromPolygon(coords, thickness, color, offset = [0, 0, 0, 1], zShift = 0) {
    const [dx, dy, rotation, selfScale] = offset

    const shape = new THREE.Shape()
    coords.forEach(([x, y], i) => {
        const X = x * consts.scale * selfScale + dx
        const Z = y * consts.scale * selfScale + dy
        if (i === 0) shape.moveTo(X, Z)
        else shape.lineTo(X, Z)
    })

    const extrudeSettings = { depth: thickness, bevelEnabled: false }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    geometry.rotateX(Math.PI / 2)
    geometry.translate(0, zShift + thickness / 2, 0)

    const material = new THREE.MeshPhongMaterial({ color })
    const floor = new THREE.Mesh(geometry, material)

    floor.rotation.y = THREE.MathUtils.degToRad(rotation)
    return floor
}

/**
 * Получение полюса полигона (визуальный центр)
 * @param points Координаты
 */
function calculatePolygonCenter(points) {
    const centerPoint = polylabel([points], 1.0)
    return { x: centerPoint[0], y: centerPoint[1] }
}

/**
 * Получение центра тяжести полигона (реальный центр)
 * @param points Координаты
 */
function calculateBuildingCenter(points) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
    for (const point of points) {
        minX = Math.min(minX, point[0])
        maxX = Math.max(maxX, point[0])
        minY = Math.min(minY, point[1])
        maxY = Math.max(maxY, point[1])
    }
    return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 }
}

/**
 * Получение элемента подписи номера для аудитории
 * @param roomNumber Номер аудитории
 * @param points Координаты
 * @param offset Смещение
 * @param zShift Смещение по высоте
 */
function createRoomLabel(roomNumber, points, offset, zShift) {
    const [dx, dy, rotation, selfScale] = offset

    const center = calculatePolygonCenter(points)
    const centerX = center.x * consts.scale * selfScale + dx
    const centerZ = center.y * consts.scale * selfScale + dy

    const div = document.createElement('div')
    div.className = 'room-label'
    div.textContent = roomNumber
    div.style.color = '#000000'
    div.style.fontSize = '12px'
    div.style.fontWeight = 'bold'
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'
    div.style.padding = '2px 5px'
    div.style.borderRadius = '3px'

    const label = new CSS2DObject(div)
    label.position.set(centerX, zShift, centerZ)

    return label
}

/**
 * Функция отрисовки аудитории
 * @param roomData Информация с координатами
 * @param wallHeight Высота стен
 * @param wallThickness Толщина стен
 * @param floorThickness Толщина пола
 * @param wallColor Цвет стен
 * @param floorColor Цвет пола
 * @param offset Смещение
 * @param zShift Смещение по высоте
 */
function createRoomFromWalls(roomData, wallHeight, wallThickness, floorThickness, wallColor, floorColor, offset = [0, 0, 0, 1], zShift = 0) {
    const roomGroup = new THREE.Group()

    const floor = createFloorFromPolygon(roomData.points, floorThickness - 0.5, floorColor, offset, zShift + floorThickness - 4.3)
    roomGroup.add(floor)

    const walls = createWallsFromPolygon(roomData.points, wallHeight, wallThickness, wallColor, offset, zShift)
    roomGroup.add(walls)

    roomGroup.userData = roomData
    return roomGroup
}

/**
 * Функция отрисовки детильного этажа
 * @param buildingId ID корпуса
 * @param floor Номер этажа
 * @param offset Смещение
 */
async function createDetailedFloor(buildingId, floor, offset) {
    const floorGroup = new THREE.Group()

    const data = (await axios.get(`/buildingcoordinates/buildingId/${buildingId}/floor/${floor}`)).data
    const floorData = data ? JSON.parse(data).points.map(point => [point.x, point.y]) : null

    if (floorData) {
        const floorMesh = createFloorFromPolygon(
            floorData,
            1,
            0x888888,
            offset,
            (floor - 1) * 8 + 1
        )
        floorGroup.add(floorMesh)

        const walls = createWallsFromPolygon(
            floorData,
            10,
            consts.floor_walls,
            0xcccccc,
            offset,
            (floor - 1) * 8
        )
        floorGroup.add(walls)
    }

    clearRoomLabels()

    const rooms = await fetchRooms(buildingId)
    const floorRooms = rooms.filter(room => room.floor === floor)

    for (const room of floorRooms) {
        if (room.points && room.points.length > 0) {
            const roomMesh = createRoomFromWalls(
                room,
                8,
                consts.room_walls,
                8,
                0xcccccc,
                consts.roomColor[room.type],
                offset,
                (floor - 1) * 8 + 1.5
            )
            floorGroup.add(roomMesh)

            if (room.number) {
                const roomLabel = createRoomLabel(room.number, room.points, offset, floor * 8 + 2)
                roomLabelsGroup.add(roomLabel)
            }
        }
    }

    // const infObjects = await fetchInfrastructureObjects

    floorGroup.userData = { buildingId, floor, type: 'detailedFloor' }
    return floorGroup
}

/**
 * Очистка подписей номеров аудиторий
 */
function clearRoomLabels() {
    while(roomLabelsGroup.children.length > 0) {
        const label = roomLabelsGroup.children[0]

        if (label.element && label.element.parentNode) {
            label.element.parentNode.removeChild(label.element)
        }

        roomLabelsGroup.remove(label)
    }
}

/**
 * Функция центрирования камеры на объекте
 * @param object Объект центрирования
 */
function centerCameraOnObject(object) {
    const box = new THREE.Box3().setFromObject(object)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())

    const maxDim = Math.max(size.x, size.y, size.z)
    const fov = camera.fov * (Math.PI / 180)
    let cameraZ = Math.abs(maxDim / Math.sin(fov / 2))

    cameraZ * - 1.5

    camera.position.set(center.x, center.y + cameraZ / 2, center.z + cameraZ / 2)
    camera.lookAt(center)
    controls.target.copy(center)
    controls.update()
}

/**
 * Получение элемента подписи названия корпуса
 * @param buildingName Название корпуса
 * @param points Координаты
 * @param offset Смещение
 * @param zShift Смещение по высоте
 */
function createBuildingLabel(buildingName, points, offset, zShift) {
    const [dx, dy, rotation, selfScale] = offset

    let labelX = dx
    let labelZ = dy

    if (points && points.length > 0) {
        const center = calculateBuildingCenter(points)
        labelX = center.x * consts.scale * selfScale + dx
        labelZ = center.y * consts.scale * selfScale + dy
    }

    const div = document.createElement('div')
    div.className = 'building-label'
    div.textContent = buildingName
    div.style.color = '#000000'
    div.style.fontSize = '16px'
    div.style.fontWeight = 'bold'
    div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
    div.style.padding = '5px 10px'
    div.style.borderRadius = '5px'
    div.style.textShadow = '1px 1px 2px white'

    const label = new CSS2DObject(div)
    label.position.set(labelX, zShift, labelZ)

    return label
}

onMounted(async () => {
    try {
        isLoading.value = true

        // создание сцены
        message.value = "Создание сцены..."
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf0f0f0)

        roomLabelsGroup = new THREE.Group()
        scene.add(roomLabelsGroup)

        // настройка камеры
        message.value = "Настройка камеры..."
        camera = new THREE.PerspectiveCamera(60, canvasRef.value.clientWidth / canvasRef.value.clientHeight, 0.1, 1000)
        camera.position.set(500, 250, 500)

        // настройка средств рендера
        // основное средство
        message.value = "Настройка средств рендера (основное)..."
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.value })
        renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
        // средство для текста
        message.value = "Настройка средств рендера (для текста)..."
        const labelContainer = document.createElement('div')
        labelContainer.className = 'label-container'
        labelContainer.style.position = 'absolute'
        labelContainer.style.top = '0'
        labelContainer.style.left = '0'
        labelContainer.style.width = '100%'
        labelContainer.style.height = '100%'
        labelContainer.style.pointerEvents = 'none'
        document.body.appendChild(labelContainer)
        labelRenderer = new CSS2DRenderer({ element: labelContainer })
        labelRenderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)

        // настройка управления и начальной точки осмотра
        message.value = "Настройка управления и начальной точки осмотра..."
        controls = new OrbitControls(camera, renderer.domElement)
        controls.target.set(250, 0, 250)

        // настройка освещения
        message.value = "Настройка освещения..."
        const light = new THREE.DirectionalLight(0xffffff, 1)
        light.position.set(50, 100, 50)
        scene.add(light)
        scene.add(new THREE.AmbientLight(0x888888))

        // отрисовка этажей с аудиториями
        const buildings = await fetchBuildings()
        for (const b of buildings) {
            const offset = consts.buildingOffsets[b.buildingId] || null
            if (offset !== null) {
                const floors = await extractFloors(b.buildingId)
                message.value = `Отрисовка корпуса: ${b.name}...`

                const firstData = (await axios.get(`/buildingcoordinates/buildingId/${b.buildingId}/floor/2`)).data
                const firstFloorPoints = firstData
                    ? JSON.parse(firstData).points.map(point => [point.x, point.y])
                    : null
                const buildingLabel = createBuildingLabel(b.name, firstFloorPoints, offset, floors.length * 8 + 1)
                if (buildingLabel) {
                    scene.add(buildingLabel)
                    buildingLabels.push(buildingLabel)
                }

                for (const floor of floors) {
                    const data = (await axios.get(`/buildingcoordinates/buildingId/${b.buildingId}/floor/${floor}`)).data
                    const floorData = data
                        ? JSON.parse(data).points.map(point => [point.x, point.y])
                        : null
                    if (floorData !== null) {
                        const mesh = createExtrudedPolygon(floorData, 6, 0x3399ff, offset, floor * 8)
                        mesh.userData = { building: b.name, floor, buildingId: b.buildingId, offset }
                        scene.add(mesh)
                        objects.push(mesh)
                    }
                }
            }
        }

        // обработка нажатий
        const raycaster = new THREE.Raycaster()
        const mouse = new THREE.Vector2()

        renderer.domElement.addEventListener('mousedown', (event) => {
            mouseStartX = event.clientX
            mouseStartY = event.clientY
            isDragging = false
        })

        renderer.domElement.addEventListener('mousemove', (event) => {
            if (!isDragging &&
                (Math.abs(event.clientX - mouseStartX) > dragThreshold ||
                    Math.abs(event.clientY - mouseStartY) > dragThreshold)) {
                isDragging = true
            }
        })

        renderer.domElement.addEventListener('mouseup', (event) => {
            if (!isDragging) {
                handleClick(event)
            }
        })

        async function handleClick(event) {
            const rect = renderer.domElement.getBoundingClientRect()
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

            raycaster.setFromCamera(mouse, camera)
            const intersects = raycaster.intersectObjects(objects)
            if (intersects.length > 0) {
                if (currentFloor.value !== null) return

                const obj = intersects[0].object
                const buildingId = obj.userData.buildingId
                const floor = obj.userData.floor

                objects.forEach(o => {
                    if (o.userData.buildingId === buildingId && o.userData.floor > floor) {
                        o.visible = false
                    }
                })

                buildingLabels.forEach(label => {
                    label.visible = false
                })

                if (currentFloorGroup) scene.remove(currentFloorGroup)

                obj.visible = false

                currentFloorGroup = await createDetailedFloor(buildingId, floor, obj.userData.offset)
                scene.add(currentFloorGroup)

                centerCameraOnObject(currentFloorGroup)

                currentFloor.value = { building: obj.userData.building, floor }
            }
        }

        // вспомогательные элементы (сетка, оси, подписи осей)
        message.value = "Отрисовка вспомогательных элементов..."
        scene.add(new THREE.GridHelper(1000, 40))
        scene.add(new THREE.AxesHelper(100))
        const axisLabels = createAxisLabels()
        axisLabels.forEach(label => scene.add(label))

        // анимация для рендера при перемещении
        function animate() {
            requestAnimationFrame(animate)
            controls.update()
            renderer.render(scene, camera)
            labelRenderer.render(scene, camera)
        }
        animate()
    } catch (error) {
        console.error('ошибка загрузки карты:', error)
    } finally {
        message.value = "Готово!"
        isLoading.value = false
    }
})

onUnmounted(() => {
    clearRoomLabels()

    if (renderer) {
        renderer.dispose()
    }

    if (controls) {
        controls.dispose()
    }

    if (scene) {
        while(scene.children.length > 0) {
            scene.remove(scene.children[0])
        }
    }
})

/**
 * Получение корпусов из базы данных
 */
const fetchBuildings = async () => {
    const res = await axios.get("/buildings")
    return res.data.map((b) => ({
        buildingId: b.Id,
        name: b.Name,
        shortname: b.ShortName,
    }))
}

/**
 * Получение аудиторий корпуса по его ID
 * @param buildingId ID корпуса
 */
const fetchRooms = async (buildingId) => {
    const res = await axios.get(`rooms/buildingId/${buildingId}`)
    return res.data.map((r) => {
        const coords = r.Coordinates
            ? JSON.parse(r.Coordinates).points.map(point => [point.x, point.y])
            : null
        return {
            id: r.Id,
            name: r.Name,
            floor: r.Floor,
            number: r.Number,
            type: r.RoomType,
            points: coords,
            buildingId
        }
    }).filter(
        (room) => Array.isArray(room.points) && room.points.length > 0
    )
}

/**
 * Получение всех доступных этажей корпуса
 * @param buildingId ID корпуса
 */
const extractFloors = async (buildingId) => {
    const { data } = await axios.get(`rooms/buildingId/${buildingId}`)
    return [...new Set(data.map(room => room.Floor))]
        .filter(floor => floor != null)
        .sort((a, b) => a - b)
}
</script>

<template>
    <div class="scene-container">
        <canvas ref="canvasRef" class="w-full h-screen"></canvas>
        <button v-if="currentFloor" @click="returnToOverview" class="return-button">Назад к общему виду</button>
        <LoadingSpinner :is-loading="isLoading" :message="message" />
    </div>
</template>

<style scoped>
body {
    margin: 0;
    overflow: hidden;
}

.scene-container {
    position: relative;
    width: 100%;
    height: 100vh;
}

.return-button {
    position: absolute;
    top: 20px;
    left: 20px;
    padding: 10px 15px;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    z-index: 100;
}

.return-button:hover {
    background: white;
}
</style>
