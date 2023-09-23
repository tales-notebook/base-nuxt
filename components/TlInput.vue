<script setup lang="ts">
const props = defineProps({
    type: {
        type: String as PropType<'text' | 'email' | 'password' | 'number'>,
        default: 'text',
    },
    step: {
        type: String,
        default: undefined,
    },
    modelModifiers: {
        type: Object,
        default: () => ({}),
    },
})

const model = defineModel({
    type: [String, Number] as PropType<string | number>,
    default: ' ',
})

function onInput(e: Event) {
    if (props.modelModifiers.lazy) return

    const value = (e.target as HTMLInputElement).value

    model.value = value
}

function onChange(e: Event) {
    if (!props.modelModifiers.lazy) return

    const value = (e.target as HTMLInputElement).value

    model.value = value
}
</script>
<template>
    <tl-base-input class="h-10">
        <template #input="{ attrs }">
            <input
                v-bind="attrs"
                :value="model"
                :type="type"
                :step="step"
                class="w-full focus:outline-none bg-transparent px-4 py-2 z-10"
                @input="onInput"
                @change="onChange"
            />
        </template>
    </tl-base-input>
</template>
