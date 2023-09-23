<!-- eslint-disable -->
<script setup lang="ts" generic="T extends UsePageRequest" >
import { UsePageRequest } from '@/composables/usePagedRequest'

const request = defineModel('request', {
    type: Object as PropType<T>,
    required: true,
})

const pagination = defineTablePaginationFromRequest(request.value)

</script>
<template>
    <tl-data-table v-model:pagination="pagination" :rows="request.items" :loading="request.loading">
        <template v-for="(_, name) in $slots" :key="name" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps" />
        </template>
    </tl-data-table>
</template>
