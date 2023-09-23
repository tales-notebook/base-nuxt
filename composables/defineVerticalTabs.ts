export interface TabVertical {
    label: string
    icon?: string
    component: any
    props?: () => any
}

export function defineVerticalTabs(tabs: TabVertical[]) {
    return tabs
}
