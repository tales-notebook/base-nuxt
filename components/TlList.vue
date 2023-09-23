<template>
    <div class="tl-list">
        <slot />
    </div>
</template>

<style lang="scss">
.tl-list {
    .tl-list-item {
        @apply border-b border-b-main-borders last:border-b-0;
    }
}
</style>
