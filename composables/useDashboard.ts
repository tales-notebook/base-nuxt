export function useDashboardDrawerToggle() {
    const state = useCookie('tl:dashboard:drawer', {
        default: () => true,
    })

    return state
}
