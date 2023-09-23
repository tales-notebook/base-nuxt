<script setup lang="ts">
function afterEnter(element: any) {
    element.style.height = `auto`
}
function enter(element: any) {
    const { width } = getComputedStyle(element)

    element.style.width = width
    element.style.position = `absolute`
    element.style.visibility = `hidden`
    element.style.height = `auto`

    const { height } = getComputedStyle(element)

    element.style.width = null
    element.style.position = null
    element.style.visibility = null
    element.style.height = 0

    getComputedStyle(element).height

    requestAnimationFrame(() => {
        element.style.height = height
    })
}

function leave(element: any) {
    const { height } = getComputedStyle(element)

    element.style.height = height

    getComputedStyle(element).height

    requestAnimationFrame(() => {
        element.style.height = 0
    })
}
</script>
<template>
    <transition name="expand" @after-enter="afterEnter" @enter="enter" @leave="leave">
        <slot></slot>
    </transition>
</template>

<style scoped>
* {
    will-change: height;
    transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000px;
}
</style>

<style>
.expand-enter-active,
.expand-leave-active {
    transition: height 200ms ease-in-out;
    overflow: hidden;
}

.expand-enter,
.expand-leave-to {
    height: 0;
}
</style>
