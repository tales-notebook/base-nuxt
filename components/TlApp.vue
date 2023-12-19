<script setup lang="ts">
const theme = useTheme()

await theme.load()

</script>

<template>
    <div class="tl-app" :class="[theme.current.dark ? 'dark' : '']"
        :style="{
            '--color-accent': theme.current.colors.accent,
            '--color-danger': theme.current.colors.danger,
            '--color-warning': theme.current.colors.warning,
            '--color-success': theme.current.colors.success,
        }"
    >

        <div id="tl-app-dialog-container" />

        <tl-quick-dialog-container />
        <tl-quick-snackbar-container />

        <slot />
    </div>
</template>

