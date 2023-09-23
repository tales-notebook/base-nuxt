<script setup lang="ts">
const props = defineProps({
    src: {
        type: String,
        default: null,
    },
    alt: {
        type: String,
        default: null,
    },
    height: {
        type: [Number, String],
        default: null,
    },
    width: {
        type: [Number, String],
        default: null,
    },
    fit: {
        type: String,
        default: 'cover',
    },
    format: {
        type: String,
        default: 'webp',
    },
})

const css = useCss()

const loading = defineModel('loading', {
    type: Boolean,
    default: false,
    local: true,
})

loading.value = !!props.src

function onLoad() {
    setTimeout(() => {
        loading.value = false
    }, 1000)
}

const imageStyle = computed(() => {
    const style: Record<string, string> = {}

    if (props.height) {
        style.height = css.toMeasurement(props.height)
    }

    if (props.width) {
        style.width = css.toMeasurement(props.width)
    }

    if (props.fit) {
        style.objectFit = props.fit
    }

    return style
})

</script>
<template>
    <tl-card
        :width="width"
        :height="height"
        class="relative"
        shadow="none"
        rounded="none"
        border="none"
    >
        <div
            v-if="loading"
            class="absolute animate-pulse inset-0 flex items-center justify-center bg-main-background"
        >
            
        </div>

        <nuxt-img
            :src="src"
            :alt="alt"
            :height="height"
            :width="width"
            :class="loading ? 'opacity-0' : ''"
            :format="format"
            :style="imageStyle"
            @load="onLoad"
        />

        <slot />
    </tl-card>
</template>
