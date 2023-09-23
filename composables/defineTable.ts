export interface TableRow {
    [key: string]: any
}

export interface TableColumn<T = TableRow> {
    name?: string
    label?: string
    field?: string | ((row: T) => any)
    // td,th attrs
    attrs?: Record<string, any>
    // td attrs
    rowAttrs?: Record<string, any>
}

export interface TablePagination {
    currentPage: number
    lastPage: number
}

export function defineTableColumns<T = TableRow>(payload: TableColumn<T>[]) {
    return payload
}

export function defineTableRows(payload: TableRow[]) {
    return payload
}

export function defineTablePagination(payload: TablePagination) {
    return ref(payload)
}