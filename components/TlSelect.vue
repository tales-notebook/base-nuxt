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
    multiple: {
        type: Boolean,
        default: false,
    },
})

const model = defineModel()
const modelMultiple = defineModel('multiple', {
    type: Array as PropType<any[]>,
    default: null,
})

const displayValue = computed(() => {

    if (!modelMultiple.value) {
        const option = props.options.find((o) => findValue(o) === model.value)
    
        return option ? findLabel(option) : ''
    }

    return modelMultiple.value.map((o) => findLabel(o)).join(', ')
})

function select(option: T) {
    if (!modelMultiple.value) {
        model.value = findValue(option)
        return
    }

    const index = modelMultiple.value.findIndex((o) => findValue(o) === findValue(option))

    if (index === -1) {
        modelMultiple.value.push(option)
    }

    if (index !== -1) {
        modelMultiple.value.splice(index, 1)
    }
}

function isSelected(option: T) {
    if (!modelMultiple.value) {
        return findValue(option) === model.value
    }

    return !!modelMultiple.value.find((o) => findValue(o) === findValue(option))
}

function findLabel(option: T) {
    return option[props.labelKey as keyof T] as string
}

function findValue(option: T) {
    return option[props.valueKey as keyof T]
}


// menu

const inputRef = ref<HTMLInputElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const { focused: inputFocus } = useFocusWithin(inputRef)
const { focused: contentFocus } = useFocusWithin(contentRef)

const menu = computed(() => {
    if (props.readonly) {
        return false
    }

    return inputFocus.value || contentFocus.value
})
</script>

<template>
    <tl-menu
        :model-value="menu"
        :open-on-click="false"
        :close-on-content-click="!modelMultiple"
        offset-y
    >
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
                        :class="modelMultiple ? 'truncate' : ''"
                    />
                </template>

                <template #append>
                    <tl-icon name="mdi:chevron-down" class="mx-4 text-gray-500" size="30" />
                </template>
            </tl-base-input>
        </template>

        <template #default="{ activatorRects }">
            <tl-card :width="activatorRects.width" ref="contentRef" rounded="none" border="sm">
                <tl-list-item
                    v-for="(o, index) in options"
                    :key="index"
                    @click="select(o)"
                    tabindex="-1"
                >
                    
                    <tl-checkbox
                        v-if="modelMultiple"
                        :model-value="isSelected(o)"
                        :label="findLabel(o)"
                    />

                    <div v-else>
                        {{ findLabel(o) }}
                    </div>

                </tl-list-item>
            </tl-card>
        </template>
    </tl-menu>
</template>
