<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: [String, Number],
        default: 'md',
    },
})

const css = useCss()

const sizeSet: any = {
    sm: '16',
    md: '20',
    lg: '26',
}

function findSize() {
    let current = sizeSet[props.size]

    if (current) {
        return css.toMeasurement(current)
    }

    return css.toMeasurement(props.size)
}

const style = computed(() => ({
    width: findSize(),
    height: findSize(),
}))
</script>

<template>
    <Icon :icon="name" :style="style" />
</template>
