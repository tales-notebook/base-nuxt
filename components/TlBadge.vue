<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: 'accent',
    },
    size: {
        type: String as PropType<'sm' | 'md' | 'lg'>,
        default: 'md',
    },
    variant: {
        type: String as PropType<'default' | 'outlined'>,
        default: 'default',
    },
})

const classMap = ref(
    new Map([['base', 'inline transition-all rounded-full text-center']])
)

const classes = computed(() => Array.from(classMap.value.values()).join(' '))

// variations
function setDefaultVariant() {
    const colorList: any = {
        accent: 'border border-transparent bg-accent text-white',
        warning: 'border border-transparent bg-warning text-white',
        danger: 'border border-transparent bg-danger text-white',
        success: 'border border-transparent bg-success text-white',
        zinc: 'border border-transparent bg-zinc-500 text-white',
    }

    classMap.value.set('variant', colorList[props.color])
}

function setOutlinedVariant() {
    const colorList: any = {
        accent: 'bg-transparent text-accent border border-accent',
        warning: 'bg-transparent text-warning border border-warning',
        danger: 'bg-transparent text-danger border border-danger',
        success: 'bg-transparent text-success border border-success',
        zinc: 'bg-transparent text-zinc-500 border border-zinc-500',
    }

    classMap.value.set('variant', colorList[props.color])
}

function setVariant() {
    if (props.variant === 'default') {
        setDefaultVariant()
    }

    if (props.variant === 'outlined') {
        setOutlinedVariant()
    }
}

watch([() => props.variant, () => props.color], setVariant, {
    immediate: true,
})

// sizes
function setSizes() {
    const sizeList: any = {
        sm: 'text-xs px-4 py-1',
        md: 'text-sm px-4 py-1',
        lg: 'text-base px-4 py-1',
    }

    classMap.value.set('size', sizeList[props.size])
}

watch(() => props.size, setSizes, {
    immediate: true,
})

</script>
<template>
    <div :class="classes">
        <slot />
    </div>
</template>
