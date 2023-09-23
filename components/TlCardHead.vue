<script setup lang="ts">
import uppFirst from 'lodash-es/upperFirst'

const props = defineProps({
    spacing: {
        type: String as PropType<'sm' | 'md'>,
        default: 'md',
    },
    title: {
        type: String,
        default: '',
    },
    noPaddingX: {
        type: Boolean,
        default: false,
    },
    noPaddingY: {
        type: Boolean,
        default: false,
    },
    noPaddingTop: {
        type: Boolean,
        default: false,
    },
    noTitleSpacing: {
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
    const result = ['w-full', 'flex']

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
    <div :class="classes">
        <template v-if="title">
            <tl-card-title>
                {{ uppFirst(title.toLowerCase()) }}
            </tl-card-title>

            <div v-if="!noTitleSpacing" class="flex-1"></div>
        </template>
        <slot />
    </div>
</template>
