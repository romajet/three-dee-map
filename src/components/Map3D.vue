<script setup>
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as consts from '../plugins/constants.js'
import axios from '../plugins/axios.js'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/Addons.js'
import LoadingSpinner from './LoadingSpinner.vue'

const canvasRef = ref(null)
const currentFloor = ref(null)
const isLoading = ref(true)

let scene, camera, renderer, labelRenderer, controls
let objects = []

let currentFloorGroup = null

let isDragging = false
let mouseStartX = 0
let mouseStartY = 0
const dragThreshold = 5

function returnToOverview() {
    if (currentFloorGroup) {
        scene.remove(currentFloorGroup)
        currentFloorGroup = null
    }

    objects.forEach(obj => {
        obj.visible = true
    })

    // camera.position.set(100, 100, 100)
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
    // geometry.translate(0, 0, zShift)
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
    // geometry.translate(0, zShift, 0)
    // geometry.rotateX(Math.PI / 2)

    geometry.rotateX(Math.PI / 2)
    // geometry.translate(dx, zShift + thickness / 2, dy)
    geometry.translate(0, zShift + thickness / 2, 0)

    const material = new THREE.MeshPhongMaterial({ color })
    const floor = new THREE.Mesh(geometry, material)

    floor.rotation.y = THREE.MathUtils.degToRad(rotation)
    return floor
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

    const rooms = await fetchRooms(buildingId)
    const floorRooms = rooms.filter(room => room.floor === floor)

    for (const room of floorRooms) {
        if (room.points && room.points.length > 0) {
            const roomMesh = createRoomFromWalls(
                room,
                8,
                consts.room_walls,
                // 0.5,
                8,
                0xcccccc,
                0xf6e3b8,
                offset,
                (floor - 1) * 8 + 1.5
            )
            floorGroup.add(roomMesh)
        }
    }

    // const infObjects = await fetchInfrastructureObjects

    floorGroup.userData = { buildingId, floor, type: 'detailedFloor' }
    return floorGroup
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

onMounted(async () => {
    try {
        isLoading.value = true

        // создание сцены
        scene = new THREE.Scene()
        scene.background = new THREE.Color(0xf0f0f0)

        // настройка камеры
        camera = new THREE.PerspectiveCamera(60, canvasRef.value.clientWidth / canvasRef.value.clientHeight, 0.1, 1000)
        camera.position.set(500, 250, 500)

        // настройка средств рендера
        // основное средство
        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.value })
        renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight)
        // средство для текста
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
        controls = new OrbitControls(camera, renderer.domElement)
        controls.target.set(250, 0, 250)

        // настройка освещения
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

                if (currentFloorGroup) scene.remove(currentFloorGroup)

                obj.visible = false

                console.log(obj.userData.offset)
                currentFloorGroup = await createDetailedFloor(buildingId, floor, obj.userData.offset)
                scene.add(currentFloorGroup)

                centerCameraOnObject(currentFloorGroup)

                currentFloor.value = { building: obj.userData.building, floor }
            }
        }

        // renderer.domElement.addEventListener('click', async (event) => {
        //     const rect = renderer.domElement.getBoundingClientRect()
        //     mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        //     mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

        //     raycaster.setFromCamera(mouse, camera)
        //     const intersects = raycaster.intersectObjects(objects)
        //     if (intersects.length > 0) {
        //         // console.log(currentFloor.value)
        //         if (currentFloor.value !== null) return

        //         const obj = intersects[0].object
        //         const buildingId = obj.userData.buildingId
        //         // console.log(obj.userData)
        //         const floor = obj.userData.floor

        //         objects.forEach(o => {
        //             if (o.userData.buildingId === buildingId && o.userData.floor > floor) {
        //                 o.visible = false
        //             }
        //         })

        //         if (currentFloorGroup) scene.remove(currentFloorGroup)

        //         obj.visible = false

        //         console.log(obj.userData.offset)
        //         currentFloorGroup = await createDetailedFloor(buildingId, floor, obj.userData.offset)
        //         scene.add(currentFloorGroup)

        //         centerCameraOnObject(currentFloorGroup)

        //         currentFloor.value = { building: obj.userData.building, floor }
        //         // console.log(currentFloor.value)
        //     }
        // })

        // вспомогательные элементы (сетка, оси, подписи осей)
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

            // console.log('camera position:', camera.position)
            // console.log('camera rotation:', camera.rotation)
        }
        animate()
    } catch (error) {
        console.error('ошибка загрузки карты:', error)
    } finally {
        isLoading.value = false
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
    // const funRooms = fetchRooms(buildingId)
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
        <LoadingSpinner :is-loading="isLoading" />
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
