<script setup lang="ts">
const show = ref(false)
</script>
<template>
    <tl-card shadow="none">
        <div class="w-full h-12 cursor-pointer px-5 flex items-center" @click="show = !show">
            <slot name="header"></slot>
        </div>

        <tl-transition-expand>
            <tl-card-content v-show="show" class="border-t">
                <slot></slot>
            </tl-card-content>
        </tl-transition-expand>
    </tl-card>
</template>
