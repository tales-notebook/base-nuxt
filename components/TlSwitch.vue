<script setup lang="ts">
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
})

const model = defineModel({
    type: Boolean,
    default: false,
})

function onClick() {
    if (props.readonly) return

    model.value = !model.value
}
</script>
<template>
    <button
        class="flex h-10 gap-x-4 items-center"
        :class="[loading ? 'opacity-75' : '']"
        @click="onClick"
    >
        <span v-if="label" class="font-bold mr-auto">{{ label }}</span>

        <div
            class="w-10 h-6 rounded-full flex p-1 cursor-pointer"
            :class="model ? 'bg-accent' : 'bg-main-background'"
        >
            <div
                :class="model ? 'translate-x-full ' : ''"
                class="h-4 w-4 rounded-full transition bg-white relative"
            >
                <tl-spinner v-if="loading" class="absolute top-0 left-0" size="15" />
            </div>
        </div>
    </button>
</template>
