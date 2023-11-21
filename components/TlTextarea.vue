<script setup lang="ts">
import merge from 'lodash-es/merge'
defineProps({
    height: {
        type: String as PropType<'sm' | 'md' | 'lg'>,
        default: 'md',
    },
    placeholder: {
        type: String,
        default: '',
    },
    textareaAttrs: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({}),
    },
})

const model = defineModel({
    type: [String, Number] as PropType<string | number>,
    default: '',
})

const heightClasses = {
    sm: 'h-10',
    md: 'h-20',
    lg: 'h-32',
}
</script>
<template>
    <tl-base-input class="tl-textarea">
        <template #input="{ attrs }">
            <textarea
                v-model="model"
                v-bind="merge(attrs, textareaAttrs)"
                :placeholder="placeholder"
                class="w-full focus:outline-none bg-transparent px-4 py-2 z-10 resize-none"
                :class="heightClasses[height]"
            />
        </template>
    </tl-base-input>
</template>
