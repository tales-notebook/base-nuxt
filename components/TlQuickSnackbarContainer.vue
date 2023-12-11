<script setup lang="ts">
import { SnackbarItem } from '../composables/useQuickSnackbar'
import uppFirst from 'lodash-es/upperFirst'

const snackbar = useQuickSnackbar()

const colorList: any = {
    zinc: 'bg-secondary-background text-main-text',
    accent: 'bg-accent text-white',
    danger: 'bg-red-500 text-white',
}

function findColor(item: SnackbarItem) {
    if (item.color) {
        return colorList[item.color]
    }

    return colorList.accent
}
</script>

<template>
    <div class="fixed bottom-0 right-0 z-50 flex flex-col gap-y-2 p-4">
        <div
            v-for="(item, index) in snackbar.items"
            v-show="index < 5"
            :key="item.id"
            class="px-4 py-3 rounded shadow w-64"
            :class="findColor(item)"
        >
            <div class="font-bold text-sm">
                {{ uppFirst(item.title?.toLowerCase()) }}
            </div>

            <div v-if="item.message" class="text-xs">
                {{ item.message }}
            </div>
        </div>
    </div>
</template>
