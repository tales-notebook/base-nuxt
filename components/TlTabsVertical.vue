<script setup lang="ts">
import upperFirst from 'lodash-es/upperFirst'

import { TabVertical } from '@/composables/defineVerticalTabs'

const props = defineProps({
    tabs: {
        type: Array as PropType<TabVertical[]>,
        required: true,
    },
    useRouteQueryModel: {
        type: Boolean,
        default: false,
    },
})

const route = useRoute()
const router = useRouter()

const model = defineModel({
    type: Number,
    default: 0,
    local: true,
})

const loading = ref(true)
const current = computed(() => props.tabs[model.value])

function createAttrs(item: TabVertical) {
    if (item.props) {
        return item.props()
    }
}

onMounted(() => {
    if (props.useRouteQueryModel) {
        model.value = Number(route.query.tab) || 0
    }

    loading.value = false
})

watch(model, (value) => {
    if (!props.useRouteQueryModel) {
        return
    }

    router.push({
        query: {
            ...route.query,
            tab: value,
        },
    })
})
</script>
<template>
    <div v-if="!loading" class="flex flex-wrap items-start gap-5 w-full">
        <tl-card width="300" shadow="none">
            <tl-list>
                <tl-list-item
                    v-for="(t, i) in tabs"
                    :key="i"
                    :active="model === i"
                    active-class="!border-l-accent"
                    class="border-l-4 border-l-transparent hover:border-l-accent"
                    @click="model = i"
                >
                    <tl-icon v-if="t.icon" :name="t.icon" class="mr-2" />

                    {{ upperFirst(t.label.toLowerCase()) }}
                </tl-list-item>
            </tl-list>
        </tl-card>

        <div class="flex-1 overflow-y-auto">
            <transition
                enter-active-class="transition-[opacity] duration-500 "
                leave-active-class="transition-[opacity] duration-500 absolute"
                enter-from-class="opacity-0"
                leave-to-class="opacity-0"
            >
                <component :is="current.component" v-if="current" v-bind="createAttrs(current)" />
            </transition>
        </div>
    </div>
</template>
