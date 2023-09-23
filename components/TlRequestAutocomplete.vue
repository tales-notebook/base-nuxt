<script setup lang="ts">
import debounce from 'lodash-es/debounce'
import uniqueBy from 'lodash-es/uniqBy'

const props = defineProps({
    url: {
        type: String,
        required: true,
    },
    query: {
        type: Object,
        default: () => ({}),
    },
    initialOption: {
        type: Object,
        default: null,
    },
})

const model = defineModel()
const objectModel = defineModel('object')

const request = usePagedRequest(props.url, {
    query: {
        ...props.query,
        limit: 5,
    },
})

const search = ref('')

const options = computed(() => {
    if (props.initialOption) {
        return uniqueBy([props.initialOption, ...request.items], 'id')
    }

    return request.items
})

const doSearch = debounce(async () => {
    request.query.search = search.value

    await request.loadPage(1)
}, 500)

watch(search, doSearch, {
    immediate: true,
})
</script>
<template>
    <tl-autocomplete
        v-model="model"
        v-model:object="objectModel"
        v-model:search="search"
        :options="options"
    >
        {{ $slots }}

        <template #option="optionProps">
            <slot name="option" v-bind="optionProps" />
        </template>
    </tl-autocomplete>
</template>
