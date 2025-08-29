<template>
    <div class="loading-overlay" :class="{ 'loading-hidden': !isLoading }">
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Загрузка карты...</p>
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isLoading: Boolean,
    message: String,
})
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(168, 168, 168, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.3s ease;
}


.loading-hidden {
    opacity: 0;
    pointer-events: none;
}

.loading-spinner {
    text-align: center;
    color: white;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    margin: 0 auto 20px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.loading-spinner p {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
}
</style>