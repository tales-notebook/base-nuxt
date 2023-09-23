<script setup lang="ts">
import { NuxtLink } from '#components'
import { NuxtLinkProps } from 'nuxt/app'

const props = defineProps({
    color: {
        type: String,
        default: 'secondary',
    },
    width: {
        type: [String, Number],
        default: 'full',
    },
    maxWidth: {
        type: [String, Number],
        default: undefined,
    },
    maxHeight: {
        type: [String, Number],
        default: undefined,
    },
    height: {
        type: [String, Number],
        default: undefined,
    },
    clickable: {
        type: Boolean,
        default: null,
    },
    shadow: {
        type: String as PropType<'sm' | 'md' | 'none'>,
        default: 'md',
    },
    rounded: {
        type: String as PropType<'sm' | 'md' | 'lg' | 'xl' | 'none'>,
        default: 'sm',
    },
    border: {
        type: String as PropType<'sm' | 'md' | 'transparent' | 'none'>,
        default: 'none',
    },
    to: {
        type: [String, Object] as PropType<NuxtLinkProps['to']>,
        default: null,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    loadingType: {
        type: String as PropType<'spinner' | 'bar'>,
        default: 'spinner',
    },
})

// general
const css = useCss()

const classMap = ref(new Map<string, string>())
const classes = computed(() => Array.from(classMap.value.values()))
const styles = ref<any>({})

classMap.value.set('base', ['transition-all', 'overflow-hidden', 'relative'].join(' '))

// color
function setColor() {
    const colorSet: any = {
        transparent: 'bg-transparent',
        accent: 'bg-accent text-white',
        primary: 'bg-main-background',
        secondary: 'bg-secondary-background',
    }

    const color = colorSet[props.color]

    if (color) {
        classMap.value.set('color', color)
        return
    }

    classMap.value.set('color', 'bg-[var(--color)]')
    styles.value['--color'] = props.color
}

watch(() => props.color, setColor, { immediate: true })

// width/height
function setWidth() {
    classMap.value.delete('width')

    const widthSet: any = {
        full: 'w-full',
    }

    const width = widthSet[props.width]

    if (width) {
        classMap.value.set('width', width)
        return
    }

    classMap.value.set('width', 'w-[var(--width)]')

    styles.value['--width'] = css.toMeasurement(props.width)
}

function setMaxWidth() {
    classMap.value.delete('maxWidth')

    if (!props.maxWidth) {
        return
    }

    const maxWidthSet: any = {
        sm: 'max-w-[300px]',
        md: 'max-w-[500px]',
    }

    const maxWidth = maxWidthSet[props.maxWidth]

    if (maxWidth) {
        classMap.value.set('maxWidth', maxWidth)
        return
    }

    classMap.value.set('maxWidth', 'max-w-[var(--maxWidth)]')
    styles.value['--maxWidth'] = css.toMeasurement(props.maxWidth)
}

function setHeight() {
    if (!props.height) {
        return
    }

    const heightSet: any = {
        full: 'h-full',
    }

    const height = heightSet[props.height]

    if (height) {
        classMap.value.set('height', height)
        return
    }

    classMap.value.set('height', 'h-[var(--height)]')
    styles.value['--height'] = css.toMeasurement(props.height)
}

function setMaxHeight() {
    if (!props.maxHeight) {
        return
    }

    const maxHeightSet: any = {
        sm: 'max-h-[300px]',
        md: 'max-h-[500px]',
    }

    const maxHeight = maxHeightSet[props.maxHeight]

    if (maxHeight) {
        classMap.value.set('maxHeight', maxHeight)
        return
    }

    classMap.value.set('maxHeight', 'max-h-[var(--maxHeight)]')
    styles.value['--maxHeight'] = css.toMeasurement(props.maxHeight)
}

watch(() => props.width, setWidth, { immediate: true })
watch(() => props.height, setHeight, { immediate: true })
watch(() => props.maxWidth, setMaxWidth, { immediate: true })
watch(() => props.maxHeight, setMaxHeight, { immediate: true })

// shadow
function setShadow() {
    const shadowSet: any = {
        sm: 'shadow',
        md: 'shadow-md',
        none: '',
    }

    const shadow = shadowSet[props.shadow]

    if (shadow) {
        classMap.value.set('shadow', shadow)
        return
    }
}

watch(() => props.shadow, setShadow, { immediate: true })

// border
function setBorder() {
    const borderSet: any = {
        sm: 'border border-main-borders',
        md: 'border-2 border-main-borders',
        transparent: 'border-2 border-transparent',
        none: '',
    }

    const border = borderSet[props.border]

    if (border) {
        classMap.value.set('border', border)
        return
    }
}

watch(() => props.border, setBorder, { immediate: true })

// rounded
function setRounded() {
    const roundedSet: any = {
        sm: 'rounded',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        none: '',
    }

    const rounded = roundedSet[props.rounded]

    if (rounded) {
        classMap.value.set('rounded', rounded)
        return
    }
}

watch(() => props.rounded, setRounded, { immediate: true })

// cursor
const attrs = useAttrs()

watch(
    () => props.clickable,
    (value) => {
        classMap.value.delete('cursor')

        if (value !== null) {
            classMap.value.set('cursor', value ? 'cursor-pointer' : '')
            return
        }

        if (attrs.onClick) {
            classMap.value.set('cursor', 'cursor-pointer')
            return
        }
    },
    { immediate: true }
)

// loading
watch(
    () => props.loading,
    (value) => {
        classMap.value.delete('loading')

        if (value) {
            classMap.value.set('loading', 'pointer-events-none ')
            return
        }
    },
    { immediate: true }
)
</script>
<template>
    <component :is="to ? NuxtLink : 'div'" :to="to" :class="classes" :style="styles">
        <div
            v-if="loadingType === 'spinner'"
            class="absolute flex inset-0 items-center justify-center z-10 bg-main-background/25 bg-opacity-50"
            :class="[!loading ? 'hidden' : '']"
        >
            <tl-spinner />
        </div>

        <div
            v-else
            class="absolute top-0 left-0 bg-accent w-full h-1 animate-pulse"
            :class="[!loading ? 'hidden' : '']"
        />

        <slot />
    </component>
</template>
