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

export function useTheme(isDark = ref(true), themeName = ref('default')) {

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

        if (theme) {
            return {
                dark: isDark.value,
                colors: theme.colors,
            } as Theme
        }

        return {
            dark: isDark.value,
            colors: defaultTheme.colors,
        }
    })

    function setDark(value: boolean) {
        isDark.value = value
    }

    function setTheme(name: string) {
        themeName.value = name
    }

    watch(
        current,
        ({ colors, dark }) => {
            if (process.client) {
                const html = document.querySelector('html')

                if (html) {
                    html.style.setProperty('--color-accent', colors.accent)
                    html.style.setProperty('--color-danger', colors.danger)
                    html.style.setProperty('--color-warning', colors.warning)
                    html.style.setProperty('--color-success', colors.success)

                    html.classList.toggle('dark', dark)
                }
            }
        },
        { immediate: true }
    )

    return reactive({
        current,
        themes,

        setDark,
        setTheme,
    })
}
