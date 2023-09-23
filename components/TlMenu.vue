<script setup lang="ts">
import { TransitionProps } from 'vue'
import { onClickOutside } from '@vueuse/core'

defineOptions({
    inheritAttrs: false,
})

// Props & Emits
const props = defineProps({
    offsetY: {
        type: Boolean,
        default: false,
    },
    offsetX: {
        type: [Boolean, Number],
        default: false,
    },
    width: {
        type: Number,
        default: undefined,
    },
    height: {
        type: Number,
        default: null,
    },
    closeOnContentClick: {
        type: Boolean,
        default: true,
    },
    openOnClick: {
        type: Boolean,
        default: true,
    },
    x: {
        type: Number,
        default: null,
    },
    y: {
        type: Number,
        default: null,
    },
    transition: {
        type: Object as PropType<TransitionProps>,
        default: () => ({
            enterActiveClass: 'transition-[transform,opacity] duration-200',
            leaveActiveClass: 'transition-[transform,opacity] duration-200',
            enterFromClass: 'opacity-0 translate-y-2',
            leaveToClass: 'opacity-0 translate-y-2',
        }),
    },
})

// general
const css = useCss()

// Position

const activatorRef = ref(null as null | HTMLElement)
const contentRef = ref(null as null | HTMLElement)
const activatorRects = ref({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
})

const model = defineModel({
    type: Boolean,
    local: true,
})

const position = ref({
    x: 0,
    y: 0,
})

const style = computed(() => {
    let x = props.x ?? position.value.x
    let y = props.y ?? position.value.y

    let maxY = process.client ? window.innerHeight : 0
    let maxX = process.client ? window.innerWidth : 0

    if (props.width) {
        maxX -= props.width
    }

    if (props.height) {
        maxY -= props.height
    }

    x = Math.min(x, maxX)
    y = Math.min(y, maxY)

    const result = {
        top: `${y}px`,
        left: `${x}px`,
        width: css.toMeasurement(props.width),
    }

    return result
})

function onActivatorRef(el: HTMLElement | ComponentPublicInstance | null) {
    if (activatorRef.value) return

    if (!el) return

    if (el instanceof HTMLElement) {
        activatorRef.value = el
        return
    }

    if (el.$el instanceof HTMLElement) {
        activatorRef.value = el.$el
        return
    }
}

function onClick() {
    if (props.openOnClick) {
        model.value = !model.value
    }
}

function onContentClick() {
    if (!props.closeOnContentClick) return

    model.value = false
}

onClickOutside(
    contentRef,
    () => {
        model.value = false
    },
    {
        ignore: [activatorRef],
    }
)

watch(
    model,
    (value) => {
        if (!value) return

        const rects = activatorRef.value?.getBoundingClientRect()

        if (!rects) return

        activatorRects.value = {
            x: rects.x,
            y: rects.y,
            width: rects.width,
            height: rects.height,
        }

        position.value.x = rects.x
        position.value.y = rects.y

        if (props.offsetY) {
            position.value.y += rects.height
        }

        if (typeof props.offsetX === 'number') {
            position.value.x -= props.offsetX
            return
        }

        if (props.offsetX) {
            position.value.x -= rects.height
        }
    },
    { immediate: true }
)

// attrs

const activatorAttrs: any = {
    onClick,
    ref: onActivatorRef,
}
</script>

<template>
    <slot name="activator" :attrs="activatorAttrs" />

    <transition v-bind="transition">
        <div
            v-show="model"
            ref="contentRef"
            :style="style"
            class="tl-menu z-50 fixed transition-all overflow-auto max-h-screen"
            v-bind="$attrs"
            @click="onContentClick"
        >
            <slot :activator-rects="activatorRects" />
        </div>
    </transition>
</template>
