<script setup lang="ts">
const props = defineProps({
    total: {
        type: Number,
        default: 1,
    },
})

const page = defineModel({
    type: Number,
    default: 1,
})

function shouldBeVisible(i: number): boolean {
    if (page.value === i) {
        return true
    }

    if (i === page.value - 1) {
        return true
    }

    if (i === page.value + 1) {
        return true
    }

    return false
}
</script>
<template>
    <div class="w-full justify-center flex gap-x-2">
        <template v-if="!shouldBeVisible(1)">
            <tl-btn color="zinc" @click="page = 1">{{ 1 }}</tl-btn>
            <tl-btn color="zinc" class="hidden md:flex" @click="page = page - 1">...</tl-btn>
        </template>

        <tl-btn
            v-for="i in total"
            :key="i"
            :color="i === page ? 'accent' : 'zinc'"
            :class="shouldBeVisible(i) ? '' : 'hidden'"
            @click="page = i"
        >
            {{ i }}
        </tl-btn>

        <template v-if="!shouldBeVisible(total)">
            <tl-btn color="zinc" class="hidden md:flex" @click="page = page + 1">...</tl-btn>
            <tl-btn color="zinc" @click="page = total">{{ total }}</tl-btn>
        </template>
    </div>
</template>
