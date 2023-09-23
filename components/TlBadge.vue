<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: 'accent',
    },
    variant: {
        type: String as PropType<'default' | 'outlined'>,
        default: 'default',
    },
})

const classMap = ref(
    new Map([['base', 'inline transition-all rounded-full text-sm px-4 text-center py-1']])
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
</script>
<template>
    <div :class="classes">
        <slot />
    </div>
</template>
