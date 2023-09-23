<script setup lang="ts">
const props = defineProps({
    spacing: {
        type: String as PropType<'sm' | 'md'>,
        default: 'md',
    },
    noPaddingTop: {
        type: Boolean,
        default: false,
    },
    noPaddingY: {
        type: Boolean,
        default: false,
    },
    noPaddingX: {
        type: Boolean,
        default: false,
    },
})

const paddingSet = {
    sm: {
        top: 'pt-3',
        bottom: 'pb-3',
        x: 'px-3',
    },
    md: {
        top: 'pt-5',
        bottom: 'pb-5',
        x: 'px-5',
    },
}

const classes = computed(() => {
    const result = ['w-full']

    const p = paddingSet[props.spacing]

    if (!props.noPaddingY && !props.noPaddingTop) {
        result.push(p.top)
    }

    if (!props.noPaddingY) {
        result.push(p.bottom)
    }

    if (!props.noPaddingX) {
        result.push(p.x)
    }

    return result
})
</script>
<template>
    <div :class="classes" class="w-full">
        <slot />
    </div>
</template>
