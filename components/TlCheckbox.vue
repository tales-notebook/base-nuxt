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
        class="flex h-10 gap-x-4 items-center cursor-pointer"
        :class="[loading ? 'opacity-75' : '']"
        @click="onClick"
    >
        <tl-spinner v-if="loading" />

        <tl-icon v-else-if="isSelected" name="mdi:checkbox-marked" class="text-accent" />

        <tl-icon v-else name="mdi:checkbox-blank-outline" class="text-main-text" />

        <span v-if="label" class="font-bold mr-auto">{{ label }}</span>
    </div>
</template>
