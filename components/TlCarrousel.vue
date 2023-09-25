<script setup lang="ts">
import { useElementHover } from '@vueuse/core';


const props = defineProps({
    items: {
        type: Array as PropType<any[]>,
        required: true
    }
})

const root = ref<HTMLElement>()
const currentIndex = ref(0)
const isHovered = useElementHover(root)

function autoPlayNext(){

    if (isHovered.value) return

    const shouldNext = currentIndex.value < props.items.length - 1

    if (shouldNext) {
        next()
    } else {
        currentIndex.value = 0
    }
}


function next () {
    currentIndex.value = Math.min(currentIndex.value + 1, props.items.length - 1)
}

function prev () {
    currentIndex.value = Math.max(currentIndex.value - 1, 0)
}

onMounted(() => {
    setInterval(autoPlayNext, 5000)
})



</script>
<template>
    <tl-card ref="root" class="flex flex-col" >  
        <div class="flex-1 flex overflow-hidden relative">
            <div
                v-for="(item, index) in items"
                :key="item.id"
                class="absolute top-0 h-full w-full transition-all duration-500"
                :style="{
                    transform: `translateX(${(index - currentIndex) * 100}%)`,
                }"
            >
                <slot name="item" :item="item" >
                    {{ item  }}
                </slot>        
    
            </div>
        </div>

        <div class="flex justify-center absolute bottom-0 bg-black w-full">
            <div class="flex justify-center my-2 py-1 gap-x-2 absolute bottom-0 bg-main-background rounded-full">
                <tl-btn
                    size="xs"
                    icon
                    variant="text"
                    icon-name="mdi:chevron-left"
                    :disabled="currentIndex === 0"
                    @click="prev"
                />
    
                <tl-btn
                    v-for="i in items.length"
                    size="xs"
                    icon
                    variant="text"
                    :color="i - 1 === currentIndex ? 'accent' : 'zinc'"
                    icon-name="mdi:circle"
                    @click="currentIndex = i - 1"
                />
    
                <tl-btn
                    size="xs"
                    icon
                    variant="text"
                    icon-name="mdi:chevron-right"
                    :disabled="currentIndex === items.length - 1"
                    @click="next"
                />
            </div>
        </div>

    </tl-card>
</template>