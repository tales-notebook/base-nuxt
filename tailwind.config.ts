import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    darkMode: 'class',
    theme: {
        extend: {

            colors: {
                'accent': 'rgb(var(--color-accent))',
                'danger': 'rgb(var(--color-danger))',
                'warning': 'rgb(var(--color-warning))',
                'success': 'rgb(var(--color-success))',
    
                'main-background': 'rgb(var(--color-background-primary))',
                'secondary-background': 'rgb(var(--color-background-secondary))',
    
                'main-text': 'rgb(var(--color-text-primary))',
    
                'main-borders': 'rgb(var(--color-border-primary))',
    
            },
        }
    },
    content: [
        `${__dirname}/components/**/*.{vue,js,ts}`,
        `${__dirname}/layouts/**/*.vue`,
        `${__dirname}/pages/**/*.vue`,
        `${__dirname}/composables/**/*.{js,ts}`,
        `${__dirname}/content/**/*.{md}`,
        `${__dirname}/modules/**/**/*.{vue,js,ts}`,
        `${__dirname}/app.vue`,
    ],
}
