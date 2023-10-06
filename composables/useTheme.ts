interface ThemeColors {
    accent: string
    danger: string
    warning: string
    success: string
}

interface Theme {
    dark: boolean
    colors: ThemeColors
}

const defaultTheme = {
    dark: false,
    colors: {
        accent: '168 85 247',
        danger: '255 59 48',
        warning: '245 158 11',
        success: '20 184 166',
    },
}

export function useTheme() {

    const isDark = usePreference('isDark', "false")
    const themeName = usePreference<string>('themeName', 'Default')

    const themes = ref([
        {
            name: 'Default',
            colors: defaultTheme.colors,
        },
        {
            name: 'Red',
            colors: {
                accent: '239 68 68',
                danger: defaultTheme.colors.danger,
                warning: defaultTheme.colors.warning,
                success: defaultTheme.colors.success,
            },
        },
        {
            name: 'Teal',
            colors: {
                accent: '20 184 166',
                danger: defaultTheme.colors.danger,
                warning: defaultTheme.colors.warning,
                success: defaultTheme.colors.success,
            },
        },
        {
            name: 'Blue',
            colors: {
                accent: '59 130 246',
                danger: defaultTheme.colors.danger,
                warning: defaultTheme.colors.warning,
                success: defaultTheme.colors.success,
            },
        },
        {
            name: 'Pink',
            colors: {
                accent: '236 72 153',
                danger: defaultTheme.colors.danger,
                warning: defaultTheme.colors.warning,
                success: defaultTheme.colors.success,
            },
        },
    ])

    const current = computed<Theme>(() => {
        const theme = themes.value.find((t) => t.name === themeName.value)

        return {
            dark: isDark.value === 'true',
            colors: theme?.colors ?? defaultTheme.colors,
        }
    })

    async function load(){
        await isDark.load()
        await themeName.load()
    }

    function setDark(value: boolean) {
        isDark.value = value ? 'true' : 'false'
    }

    function setTheme(name: string) {
        themeName.value = name
    }

    function findRoot(){
        const html = process.client ? document.querySelector('html') : undefined

        return html
    }

    // watch(() => isDark.value, (value) => {
    //     const root = findRoot()

    //     if (!root) return

    //     if (value) {
    //         root.classList.add('dark')
    //     }

    //     if (!value) {
    //         root.classList.remove('dark')
    //     }

    // })
    
    // watch(() => themeName.value, (value) => {
    //     const root = findRoot()

    //     if (!root) return

    //     const theme = themes.value.find((t) => t.name === value)

    //     if (!theme) return

    //     root.style.setProperty('--color-accent', theme.colors.accent)
    //     root.style.setProperty('--color-danger', theme.colors.danger)
    //     root.style.setProperty('--color-warning', theme.colors.warning)
    //     root.style.setProperty('--color-success', theme.colors.success)

    // }, { immediate: true })

    return reactive({
        themeName,
        current,
        themes,
        load,

        setDark,
        setTheme,
    })
}
