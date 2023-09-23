export function useCss() {
    function toMeasurement(value?: number | string | null) {
        if (value === undefined || value === null) {
            return undefined
        }

        const measurements = ['em', 'rem', 'vh', 'vw', '%', 'px', 'calc']

        if (measurements.some((measurement) => value.toString().includes(measurement))) {
            return value
        }

        return `${value}px`
    }

    return {
        toMeasurement,
    }
}
