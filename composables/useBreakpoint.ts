import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'

export function useBreakpoint() {
    return useBreakpoints(breakpointsTailwind)
}
