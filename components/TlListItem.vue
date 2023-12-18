<script setup lang="ts">
import { NuxtLink } from '#components'

const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    },
    color: {
        type: String as PropType<'primary' | 'none' | 'secondary'>,
        default: 'default',
    },
    to: {
        type: [String, Object],
        default: null,
    },
    icon: {
        type: String,
        default: null,
    },
    activeClass: {
        type: String,
        default: 'text-accent bg-accent/20 dark:text-accent dark:bg-accent/10 focus:text-accent',
    },
    clickable: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String as PropType<'sm' | 'md' | 'lg'>,
        default: 'md',
    },
})

const attrs = useAttrs()

const classMap = ref(new Map<string, string>())

classMap.value.set(
    'base',
    [
        'tl-list-item',
        'flex',
        'items-center',
        'transition-all',
        'duration-200',
        'outline-none',
        'focus:outline-none',
    ].join(' ')
)

const classes = computed(() => {
    return Array.from(classMap.value.values()).join(' ')
})

// color
function setColor() {
    const colorList = {
        default: '',
        primary: 'bg-main-background',
        secondary: 'bg-secondary-background',
        none: '',
    }

    const isClickable = [props.clickable, attrs.onClick, props.to].some((value) => value)

    if (isClickable) {
        colorList.default = 'hover:bg-accent/10'
        colorList.primary = 'bg-main-background hover:bg-secondary-background/90'
        colorList.secondary = 'bg-secondary-background hover:bg-main-background/90'
        colorList.none = 'hover:bg-main-background/90'
    }

    classMap.value.set('color', colorList[props.color])
}

watch(() => props.color, setColor, { immediate: true })

// clickable

function setClickableClasses() {
    const isClickable = [props.clickable, attrs.onClick, props.to].some((value) => value)

    if (!isClickable) {
        classMap.value.set('clickable', '')
    }

    if (isClickable) {
        classMap.value.set('clickable', 'cursor-pointer')
    }
}

watch([() => props.clickable, () => attrs.onClick, () => props.to], setClickableClasses, {
    immediate: true,
})

// sizes

function setSize() {
    const sizeList = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-4 py-3 text-base',
        lg: 'px-6 py-4',
    }

    classMap.value.set('size', sizeList[props.size])
}

watch(() => props.size, setSize, { immediate: true })

// active

function setActiveClasses() {
    if (props.active) {
        classMap.value.set('active', props.activeClass)
    }

    if (!props.active) {
        classMap.value.set('active', '')
    }
}

watch(() => props.active, setActiveClasses, { immediate: true })
</script>
<template>
    <component
        :is="to ? NuxtLink : 'div'"
        :to="to"
        :class="classes"
        :active-class="activeClass"
        tabindex="0"
    >
        <slot name="icon" :attrs="{ class: 'mr-3' }">
            <div v-if="icon" class="mr-3">
                <tl-icon :name="icon" />
            </div>
        </slot>
        <slot />
    </component>
</template>
