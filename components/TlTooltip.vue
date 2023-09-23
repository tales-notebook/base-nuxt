<script setup lang="ts">
import { computed, ref } from 'vue'

import debounce from 'lodash-es/debounce'

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
        type: Boolean,
        default: false,
    },
    x: {
        type: Number,
        default: null,
    },
    y: {
        type: Number,
        default: null,
    },
    delay: {
        type: Number,
        default: 0,
    },
})

const emit = defineEmits(['update:modelValue'])

// Show

const model = defineModel({
    type: Boolean,
    local: true,
})

function toggle() {
    model.value = !model.value
}

// track mouse position
const activatorRef = ref<HTMLElement | null>(null)

const mouse = ref({
    x: 0,
    y: 0,
})

function onRef(elOrComponent: null | HTMLElement | ComponentPublicInstance) {
    if (activatorRef.value) {
        return
    }

    if (!elOrComponent) {
        activatorRef.value = null
        return
    }

    if (elOrComponent instanceof HTMLElement) {
        activatorRef.value = elOrComponent
        return
    }

    activatorRef.value = elOrComponent.$el
}

const onMouseover = debounce((event: MouseEvent) => {
    const el = event.target as HTMLElement

    if (!el || !el.matches(':hover')) {
        model.value = false
        return
    }

    let x = event.clientX
    let y = event.clientY

    const [rects] = activatorRef.value?.getClientRects() ?? []

    if (rects) {
        x = rects.x
        y = rects.y + rects.height
    }

    mouse.value.y = y
    mouse.value.x = x

    model.value = true
}, props.delay)

function onMouseleave() {
    model.value = false
}

// style
const style = computed(() => {
    let y = props.y ?? mouse.value.y
    let x = props.x ?? mouse.value.x

    const result = {
        top: `${y}px`,
        left: `${x}px`,
    }

    return result
})

const activatorAttrs: any = {
    ref: onRef,
    onMouseover,
    onMouseleave,
}
</script>

<template>
    <slot name="activator" :attrs="activatorAttrs" :toggle="toggle" />

    <transition
        enter-active-class="transition duration-200"
        leave-active-class="transition duration-200"
        enter-from-class="opacity-0 translate-y-2"
        leave-to-class="opacity-0 translate-y-2"
    >
        <div
            v-show="model"
            :style="style"
            class="tl-tooltip z-20 fixed transition-all overflow-auto max-h-screen"
            v-bind="$attrs"
        >
            <tl-card class="text-xs px-3 py-2 rounded">
                <slot />
            </tl-card>
        </div>
    </transition>
</template>
