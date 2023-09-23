<script setup lang="ts">
const props = defineProps({
    size: {
        type: [String, Number],
        default: '20',
    },
    color: {
        type: String,
        default: 'accent',
    },
    icon: {
        type: String,
        default: 'mdi:feather',
    },
    variant: {
        type: String,
        default: 'default',
    },
})

// general
const css = useCss()

// base

const classMap = ref(new Map<string, string>())
const classes = computed(() => {
    return Array.from(classMap.value.values()).join(' ')
})

const style: any = ref({})

classMap.value.set('base', ['rounded-full', 'flex', 'items-center', 'justify-center'].join(' '))

classMap.value.set('rounded', 'rounded')

// variants

function setDefaultVariant() {
    const colorList: any = {
        accent: 'bg-accent text-white ',
        danger: 'bg-danger text-white ',
        warning: 'bg-warning text-white ',
        zinc: 'bg-main-text text-white ',
    }

    classMap.value.set('variant', colorList[props.color])
}

function setTextVariant() {
    const colorList: any = {
        accent: 'text-accent ',
        zinc: 'text-main-text ',
    }

    classMap.value.set('variant', colorList[props.color])
}

function setVariant() {
    if (props.variant === 'text') {
        return setTextVariant()
    }

    return setDefaultVariant()
}

watch([() => props.color, () => props.variant], setVariant, {
    immediate: true,
})

// size

function setSize() {
    style.value.width = css.toMeasurement(props.size)
    style.value.height = css.toMeasurement(props.size)
}

watch(() => props.size, setSize, {
    immediate: true,
})

// const style = computed(() => ({
//     width: css.toMeasurement(props.size),
//     height: css.toMeasurement(props.size),
// }))

const iconAttrs = computed(() => ({
    size: 'calc(55%)',
}))
</script>
<template>
    <div :class="classes" :style="style">
        <slot :icon-attrs="iconAttrs">
            <tl-icon :name="icon" :size="iconAttrs.size" />
        </slot>
    </div>
</template>
