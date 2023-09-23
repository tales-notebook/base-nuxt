<script setup lang="ts">
import { NuxtLink } from '#components'
import { NuxtLinkProps } from 'nuxt/app'

const props = defineProps({
    type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    variant: {
        type: String as PropType<'default' | 'text' | 'outlined'>,
        default: 'default',
    },
    color: {
        type: String as PropType<'accent' | 'danger' | 'warning' | 'zinc'>,
        default: 'zinc',
    },
    icon: {
        type: Boolean,
        default: false,
    },
    iconName: {
        type: String,
        default: '',
    },
    size: {
        type: String as PropType<'xs' | 'sm' | 'md' | 'lg'>,
        default: 'md',
    },
    rounded: {
        type: String as PropType<'sm' | 'md' | 'lg'>,
        default: 'md',
    },
    to: {
        type: [String, Object] as PropType<NuxtLinkProps['to']>,
        default: null,
    },
})

const classMap = ref(new Map<string, string>())

const style: any = {}

classMap.value.set(
    'base',
    [
        'inline-flex',
        'justify-center',
        'transition-all',
        'duration-200',
        'uppercase',
        'font-medium',
        'relative',
        'text-sm',
        'overflow-hidden',
        'disabled:opacity-50 disabled:cursor-not-allowed',
    ].join(' ')
)

classMap.value.set('rounded', 'rounded')

// variants
function setDefaultVariant() {
    const colorList: any = {
        accent: 'bg-accent text-white hover:bg-accent/80 ',
        danger: 'bg-danger text-white hover:bg-danger/80',
        warning: 'bg-warning text-white hover:bg-warning/80',
        zinc: 'bg-main-text text-white hover:bg-main-text/80',
    }

    classMap.value.set('variant', colorList[props.color])
}

function setTextVariant() {
    const colorList = {
        accent: 'text-accent hover:bg-accent/20',
        danger: 'text-danger hover:bg-danger/20',
        warning: 'text-warning hover:bg-warning/20',
        zinc: 'text-main-text  hover:bg-main-text/10',
    }

    classMap.value.set('variant', colorList[props.color])
}

function setOutlinedVariant() {
    const colorList = {
        accent: 'border border-accent text-accent hover:bg-accent/20',
        danger: 'border border-danger text-danger hover:bg-danger/20',
        warning: 'border border-warning text-warning hover:bg-warning/20',
        zinc: 'border border-zinc-500 text-zinc-500 hover:main-text/25',
    }

    classMap.value.set('variant', colorList[props.color])
}

function loadVariant() {
    if (props.variant === 'default') {
        setDefaultVariant()
    }

    if (props.variant === 'text') {
        setTextVariant()
    }

    if (props.variant === 'outlined') {
        setOutlinedVariant()
    }
}

watch([() => props.variant, () => props.color], loadVariant, {
    immediate: true,
})

// size
function setSize() {
    const sizeList = {
        xs: 'px-2 p-2 text-xs',
        sm: 'px-4 py-2 text-xs',
        md: 'px-4 py-2 text-sm',
        lg: 'px-5 py-3 text-xl',
    }

    if (props.icon) {
        sizeList.xs = 'p-1'
        sizeList.sm = 'p-2'
        sizeList.md = 'p-2'
        sizeList.lg = 'p-3'
    }

    classMap.value.set('size', sizeList[props.size])
}

watch(() => props.size, setSize, { immediate: true })

// rounded
function setRounded() {
    const roundedList = {
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
    }

    classMap.value.set('rounded', roundedList[props.rounded])

    if (props.icon) {
        classMap.value.set('rounded', 'rounded-full')
    }
}

watch([() => props.rounded, () => props.rounded], setRounded, { immediate: true })

// classes

const classes = computed(() => {
    return Array.from(classMap.value.values()).join(' ')
})
</script>
<template>
    <component
        :is="to ? NuxtLink : 'button'"
        :type="type"
        :disabled="disabled || loading"
        :class="classes"
        :style="style"
        :to="to"
    >
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
            <tl-spinner size="22" />
        </div>

        <div :class="[loading ? 'opacity-0' : 'opacity-100']" class="flex gap-x-2">
            <tl-icon v-if="iconName" :name="iconName" :size="size" />
            <slot />
        </div>
    </component>
</template>
