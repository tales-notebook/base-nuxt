<script setup lang="ts">
import xor from 'lodash-es/xor'

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    itemValue: {
        type: [String, Number],
        default: null,
    },
})

const model = defineModel({
    type: Boolean,
    default: false,
})

const modelMultiple = defineModel('multiple', {
    type: Array as unknown as PropType<any[]>,
    default: () => [],
})

const isSelected = computed(() => {
    if (modelMultiple.value.includes(props.itemValue)) {
        return true
    }

    return model.value
})

function onClick() {
    if (props.readonly) return

    model.value = !model.value

    modelMultiple.value = xor(modelMultiple.value, [props.itemValue])
}
</script>
<template>
    <div
        class="flex h-8 gap-x-2 items-center cursor-pointer"
        :class="[loading ? 'opacity-75' : '']"
        @click="onClick"
    >
        <tl-spinner v-if="loading" />

        <tl-icon
            v-else
            :name="isSelected ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'"
            :class="isSelected ? 'text-accent' : 'text-main-text'"
            size="18"
        />

        <slot v-if="label || $slots.label" name="label">
            <span  class="font-medium mr-auto text-sm">{{ label }}</span>
        </slot>

    </div>
</template>
