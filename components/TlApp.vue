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

