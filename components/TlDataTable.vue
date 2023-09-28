<script setup lang="ts" generic="T extends TableRow = TableRow">
import { TableColumn, TableRow, TablePagination } from '../composables/defineTable'
import merge from 'lodash-es/merge'
import get from 'lodash-es/get'
import upperCase from 'lodash-es/upperCase'

type RowAttr = Record<string, any> | ((row: T) => Record<string, any>)

const props = defineProps({
    columns: {
        type: Array as PropType<TableColumn<T>[]>,
        default: () => [],
    },
    rows: {
        type: Array as PropType<T[]>,
        default: () => [],
    },
    rowKey: {
        type: String as unknown as PropType<keyof T>,
        default: null,
    },
    rowAttrs: {
        type: [Object, Function] as PropType<RowAttr>,
        default: () => ({}),
    },
    gridCardAttrs: {
        type: Object as PropType<any>,
        default: () => ({}),
    },
})

defineEmits({
    'click:row': (_row: T) => true,
})

const pagination = defineModel('pagination', {
    type: Object as PropType<TablePagination>,
    default: null,
})

const loading = defineModel('loading', {
    type: Boolean,
    default: false,
})

// general
const breakpoint = useBreakpoint()

const isTabletOrMobile = breakpoint.smallerOrEqual('md')

const shouldBeGrid = computed(() => isTabletOrMobile.value)

// row

function makeRowAttrs(row: T): Record<string, any> {
    if (typeof props.rowAttrs === 'function') {
        return props.rowAttrs(row)
    }

    return props.rowAttrs
}

function findRowKey(row: T): any {
    if (props.rowKey) {
        return row[props.rowKey as keyof T]
    }

    return props.rows.indexOf(row)
}

function findRowValue(row: T, column: TableColumn<T>): any {
    if (!column.field) return null

    if (typeof column.field === 'function') {
        return column.field(row)
    }

    return get(row, column.field)
}

// columns

const columnsComputed = computed<TableColumn<T>[]>(() => {
    if (props.columns.length) {
        return props.columns
    }

    if (props.rows.length) {
        return Object.keys(props.rows[0]).map((key) => ({
            name: upperCase(key),
            label: upperCase(key),
            field: key,
        }))
    }

    return []
})

function findColumnKey(column: TableColumn<T>): string {
    if (column.name) {
        return column.name
    }

    if (column.field && typeof column.field === 'string') {
        return column.field
    }

    return columnsComputed.value.indexOf(column).toString()
}
</script>
<template>
    <div v-if="shouldBeGrid" class="flex flex-wrap">
        <tl-transition-list tag="div" class="flex flex-wrap w-full">
            <tl-card
                v-for="row in rows"
                :key="findRowKey(row)"
                class="flex flex-wrap w-full m-4 first:mt-0"
                @click="$emit('click:row', row)"
            >
                <tl-card-content>
                    <div
                        v-for="c in columnsComputed"
                        :key="findColumnKey(c)"
                        class="flex items-center h-10"
                        v-bind="c.attrs"
                    >
                        <div class="font-bold w-6/12">
                            {{ c.label || findColumnKey(c) }}
                        </div>

                        <div class="w-6/12">
                            <div v-bind="c.attrs">
                                <slot :name="`row-${findColumnKey(c)}`" :row="row" :column="c">
                                    <div v-if="c.field" v-bind="merge(c.attrs, c.rowAttrs)">
                                        {{ findRowValue(row, c) }}
                                    </div>
                                </slot>
                            </div>
                        </div>
                    </div>
                </tl-card-content>
            </tl-card>
        </tl-transition-list>

        <tl-card v-if="rows.length === 0" class="flex flex-wrap w-full">
            <tl-card-content class="text-center">
                <slot name="empty">
                    <!-- {{ $t('messages.noEntity', [$t('messages.data')]) }} -->
                    No items
                </slot>
            </tl-card-content>
        </tl-card>

        <div v-if="pagination && pagination.lastPage > 1" class="py-4 flex items-center w-full">
            <tl-pagination v-model="pagination.currentPage" :total="pagination.lastPage" />
        </div>
    </div>

    <tl-card v-else border="none" class="relative" shadow="none" rounded="none">
        <div
            class="absolute top-0 left-0 bg-accent w-full h-1 animate-pulse"
            :class="[!loading ? 'hidden' : '']"
        />

        <table class="w-full" :class="[loading ? 'opacity-50' : '']">
            <thead>
                <tr>
                    <th
                        v-for="c in columnsComputed"
                        :key="findColumnKey(c)"
                        class="px-4 py-3 text-left text-gray-500 border-y border-main-borders"
                        v-bind="merge(c.attrs)"
                    >
                        {{ c.label || findColumnKey(c) }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <slot name="prepend-table-body" />

                <tr v-if="!rows.length">
                    <td
                        :colspan="columnsComputed.length"
                        class="px-4 h-12 text-center text-gray-500"
                    >
                        <slot name="empty">
                            <!-- {{ $t('messages.noEntity', [$t('messages.data')]) }} -->
                            No items
                        </slot>
                    </td>
                </tr>

                <tr
                    v-for="(row, index) in rows"
                    :key="findRowKey(row)"
                    v-bind="makeRowAttrs(row)"
                    class="border-b border-main-borders last:border-b-0 transition-colors"
                    :data-index="index"
                    @click="$emit('click:row', row)"
                >
                    <td
                        v-for="c in columnsComputed"
                        :key="findColumnKey(c)"
                        class="px-4 h-12 whitespace-nowrap"
                        v-bind="merge(c.attrs, c.rowAttrs)"
                    >
                        <slot :name="`row-${findColumnKey(c)}`" :row="row" :column="c">
                            {{ findRowValue(row, c) }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="pagination && pagination.lastPage > 1" class="py-4 flex items-center">
            <tl-pagination v-model="pagination.currentPage" :total="pagination.lastPage" />
        </div>
    </tl-card>
</template>
