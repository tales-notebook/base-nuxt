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
    dark: true,
    colors: {
        accent: '168 85 247',
        danger: '255 59 48',
        warning: '245 158 11',
        success: '20 184 166',
    },
}
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

interface ProvideThemeOptions {
    dark: boolean
}

const key = 'theme'

function createThemeManager(options: ProvideThemeOptions) {
    const dark = ref(options.dark)
    const themeName = ref('Default')
}

export function provideTheme(options: ProvideThemeOptions) {

}

export function useTheme() {

    const isDark = usePreference('isDark', "true")
    const themeName = usePreference('themeName', 'Default')

    

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

    return reactive({
        isDark: computed(() => isDark.value === 'true'),
        themeName,
        current,
        themes,
        load,

        setDark,
        setTheme,
    })
}
