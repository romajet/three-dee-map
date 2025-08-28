<script setup>
import Map3D from './components/Map3D.vue';
</script>

<template>
    <Map3D />
    <div class="version-info"><span class="alpha-label">&alpha;</span>{{ version }}</div>
</template>

<script>
export default {
    data() {
        return {
            version: __APP_VERSION__
        }
    }
}
</script>

<style scoped>
.version-info {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 8px 12px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    z-index: 10000;
    user-select: none;
    pointer-events: none;
    display: flex;
    align-items: center;
    gap: 6px;
}

.alpha-label {
    color: #ffa500;
    background: rgba(255, 165, 0, 0.1);
    padding: 2px 6px;
    border-radius: 6px;
    font-weight: 700;
    animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0.4);
  }
  70% {
    box-shadow: 0 0 0 4px rgba(255, 165, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 165, 0, 0);
  }
}
</style>