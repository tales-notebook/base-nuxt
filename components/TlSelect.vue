<script setup lang="ts" generic="T = Record<string, string>">
import { useFocusWithin } from '@vueuse/core'
import merge from 'lodash-es/merge'

defineOptions({
    inheritAttrs: false,
})

const props = defineProps({
    options: {
        type: Array as PropType<T[]>,
        default: () => [],
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    label: {
        type: String,
        default: '',
    },
    labelKey: {
        type: String as unknown as PropType<keyof T>,
        default: 'label',
    },
    valueKey: {
        type: String as unknown as PropType<keyof T>,
        default: 'value',
    },
})

const model = defineModel()

function findLabel(option: T) {
    return option[props.labelKey as keyof T]
}

function findValue(option: T) {
    return option[props.valueKey as keyof T]
}

const displayValue = computed(() => {
    const option = props.options.find((o) => findValue(o) === model.value)

    return option ? findLabel(option) : ''
})

// menu

const inputRef = ref<HTMLInputElement | null>(null)

const { focused } = useFocusWithin(inputRef)

const menu = computed(() => {
    if (props.readonly) {
        return false
    }

    return focused.value
})
</script>

<template>
    <tl-menu :model-value="menu" offset-y :open-on-click="false">
        <template #activator="menuProps">
            <tl-base-input
                :label="label"
                class="tl-select h-10 cursor-pointer"
                v-bind="merge(menuProps.attrs, $attrs)"
            >
                <template #input="baseInput">
                    <input
                        ref="inputRef"
                        :value="displayValue"
                        v-bind="baseInput.attrs"
                        readonly
                        class="w-full focus:outline-none bg-transparent px-4 py-2 z-10 cursor-pointer"
                    />
                </template>

                <template #append>
                    <tl-icon name="mdi:chevron-down" class="mx-4 text-gray-500" size="30" />
                </template>
            </tl-base-input>
        </template>

        <template #default="{ activatorRects }">
            <tl-card :width="activatorRects.width">
                <tl-list-item
                    v-for="(o, index) in options"
                    :key="index"
                    color="primary"
                    @click="model = findValue(o)"
                >
                    {{ findLabel(o) }}
                </tl-list-item>
            </tl-card>
        </template>
    </tl-menu>
</template>
