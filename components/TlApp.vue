<script setup lang="ts">
const theme = useTheme()
</script>
<template>
    <div class="app" :class="[theme.current.dark ? 'dark' : '']">
        <tl-quick-dialog-container />
        <tl-quick-snackbar-container />

        <slot />
    </div>
</template>

<style lang="scss">
:root {
    --scrollbar-bg-color: 228 228 231;
    --scrollbar-thumb-color: 75 85 99;
}

/* Firefox */

* {
    scrollbar-width: auto;
    scrollbar-color: rgb(var(--scrollbar-bg-color)) rgb(var(--scrollbar-bg-color));
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

*::-webkit-scrollbar-track {
    background: rgb(var(--scrollbar-bg-color));
}

::-webkit-scrollbar-corner {
    background: rgb(var(--scrollbar-bg-color));
}

::-webkit-scrollbar-thumb {
    background-color: rgb(var(--scrollbar-thumb-color));
}

html {
    @apply overflow-hidden;
}

body {
    @apply overflow-hidden;
    @apply text-main-text;
    @apply bg-main-background;
}

.app {
    @apply text-main-text;
    @apply bg-main-background;
    // --color-accent: v-bind(theme.current.colors.accent);
}

.dark {
    --scrollbar-bg-color: 39 39 42;
    --scrollbar-thumb-color: 75 85 99;
}
</style>
