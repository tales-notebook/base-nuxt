<script setup lang="ts" generic="T = Record<string, string>">
import merge from 'lodash-es/merge'
import TlList from './TlList.vue'
import TlMenu from './TlMenu.vue'
import { useFocusWithin } from '@vueuse/core'

defineOptions({
    inheritAttrs: false,
})

const props = defineProps({
    options: {
        type: Array as PropType<T[]>,
        default: () => [],
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
    width: {
        type: Number,
        default: undefined,
    },
    autoSelectFirst: {
        type: Boolean,
        default: false,
    },
})

const model = defineModel()
const objectModel = defineModel('object')

const search = defineModel('search', {
    local: true,
})

function findLabel(option: T) {
    return option[props.labelKey as keyof T]
}

function findValue(option: T) {
    return option[props.valueKey as keyof T]
}

function onSelect(option: T | null = null) {
    if (!option) {
        model.value = null
        search.value = ''
        return
    }

    search.value = findLabel(option) as string

    model.value = findValue(option)
    objectModel.value = option
}

function onBackspace() {
    if (model.value) {
        onSelect()
    }
}

watch(
    model,
    () => {
        if (!model.value) {
            search.value = ''
            return
        }

        const option = props.options.find((o) => findValue(o) === model.value)

        if (!option) {
            return
        }

        search.value = findLabel(option)
    },
    { immediate: true }
)

// menu

const inputRef = ref<HTMLInputElement | null>(null)

const { focused } = useFocusWithin(inputRef)

// auto-select first
const firstRun = ref(true)

watch(() => props.options.length, (length) => {
    if (!firstRun.value || !length) {
        return
    }

    if (props.autoSelectFirst) {
        onSelect(props.options[0])
    }
})

</script>

<template>
    <tl-menu :model-value="focused" offset-y :width="width" :open-on-click="false">
        <template #activator="menuProps">
            <tl-base-input
                class="tl-autocomplete h-10"
                :label="label"
                v-bind="merge(menuProps.attrs, $attrs)"
            >
                <template #input="baseInput">
                    <input
                        v-bind="baseInput.attrs"
                        ref="inputRef"
                        v-model="search"
                        class="w-full focus:outline-none bg-transparent px-4 py-2 z-10"
                        :placeholder="$t('messages.search')"
                        @keydown.backspace="onBackspace"
                    />
                </template>

                <template #append>
                    <tl-icon name="mdi:chevron-down" class="mx-4 text-gray-500" size="30" />
                </template>
            </tl-base-input>
        </template>

        <template #default="{ activatorRects }">
            <tl-card :width="activatorRects.width" border="sm" rounded="none">
                <tl-list ref="list">
                    <tl-list-item v-if="!options.length">
                        <div class="text-gray-500 text-center w-full">
                            <!-- {{ $t('messages.noEntity', [$t('messages.items')]) }} -->
                            No items
                        </div>
                    </tl-list-item>
                    <template v-for="(o, index) in options" :key="index">
                        <slot
                            name="option"
                            :option="o"
                            :attrs="{
                                onClick: () => onSelect(o),
                                onKeypress: (e: any) => {
                                    if (e.key === 'Enter') {
                                        onSelect(o)
                                    }
                                },
                            }"
                        >
                            <tl-list-item @click="onSelect(o)">
                                {{ findLabel(o) }}
                            </tl-list-item>
                        </slot>
                    </template>
                </tl-list>
            </tl-card>
        </template>
    </tl-menu>
</template>
