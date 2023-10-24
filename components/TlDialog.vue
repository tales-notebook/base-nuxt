<script setup>
defineProps({
    eager: {
        type: Boolean,
        default: false,
    },
})

const model = defineModel({
    type: Boolean,
    default: false,
})
</script>
<template>
    <Teleport to="body">
        <transition
            enter-active-class="transition duration-200"
            leave-active-class="transition duration-200"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
        >

            <div v-if="eager" v-show="model" class="fixed inset-0 flex h-full w-full items-center justify-center z-30">
                <div class="fixed inset-0 bg-black/25" @click="model = false" />

                <div class="relative">
                    <slot />
                </div>
            </div>

            <div
                v-else-if="model"
                class="fixed inset-0 flex h-full w-full items-center justify-center z-30"
            >
                <div class="fixed inset-0 bg-black/25" @click="model = false" />

                <div class="relative">
                    <slot />
                </div>
            </div>
        </transition>
    </Teleport>
</template>
