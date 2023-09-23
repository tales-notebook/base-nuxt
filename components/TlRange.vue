<script setup lang="ts">
import uniqid from 'lodash-es/uniqueId'

const props = defineProps({
    max: {
        type: [Number, String],
        default: 100,
    },
    min: {
        type: [Number, String],
        default: 0,
    },
    step: {
        type: [Number, String],
        default: null,
    },
    label: {
        type: String,
        default: null,
    },
})

const model = defineModel({
    type: Number,
    default: 0,
})

const id = uniqid('tl-range-')

function onChange(event: Event) {
    const target = event.target as HTMLInputElement

    let value = Number(target.value) || 0

    if (props.max) {
        value = Math.min(value, Number(props.max))
    }

    model.value = value
}

onMounted(() => {
    setTimeout(() => {
        const input = document.getElementById(id) as HTMLInputElement

        if (!input) return

        input.value = String(model.value)
    }, 0)
})
</script>

<template>
    <div class="flex pb-1 flex-col w-full tl-range">
        <label
            v-if="label"
            :for="id"
            class="block mb-2 text-sm font-medium text-main-text font-bold"
        >
            {{ label }}
        </label>

        <input
            :id="id"
            :value="model"
            :max="max"
            :min="min"
            type="range"
            class="w-full h-2 accent-current text-accent rounded-lg appearance-none cursor-pointer bg-accent/25"
            @change="onChange"
        />
    </div>
</template>
