<script setup lang="ts">
import { TransitionProps } from 'vue'

const onEnter: TransitionProps['onEnter'] = (el) => {
    const index = el.getAttribute('data-index')
    const style = (el as HTMLElement).style

    if (!index) return

    style.setProperty('transition-delay', `${Number(index) * 50}ms`)
}

const onLeave: TransitionProps['onLeave'] = (el) => {
    const index = el.getAttribute('data-index')
    const style = (el as HTMLElement).style
    const height = el.getBoundingClientRect().height

    if (!index) return

    style.setProperty('transition-delay', `${Number(index) * 50}ms`)
    style.setProperty('top', `${height * Number(index)}px`)
}
</script>
<template>
    <transition-group
        tag="tbody"
        enter-active-class="transition-[opacity,transform] duration-500"
        leave-active-class="transition-[opacity,transform] duration-500 absolute"
        enter-from-class="opacity-0 -translate-x-2/4 "
        leave-to-class="opacity-0 -translate-x-2/4"
        class="relative"
        @enter="onEnter"
        @leave="onLeave"
    >
        <slot />
    </transition-group>
</template>
