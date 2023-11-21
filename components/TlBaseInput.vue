<script setup lang="ts">
import uniqueId from 'lodash-es/uniqueId'
const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    placeholder: {
        type: String,
        default: ' ',
    },
    readonly: {
        type: Boolean,
        default: false,
    },
    autocomplete: {
        type: String,
        default: 'off',
    },
})

const id = uniqueId('input-')

const inputAttrs = ref<any>({
    id,
    'placeholder': props.placeholder,
    'readonly': props.readonly,
    'autocomplete': props.autocomplete,
    'aria-autocomplete': props.autocomplete === 'off' ? 'none' : undefined,
})
</script>
<template>
    <div
        class="tl-base-input"
        :class="[$props.readonly ? 'border-dashed' : '', !label ? 'no-label border-t' : '']"
    >
        <div v-if="label" class="tl-input-sidelines-container">
            <div
                class="w-3 tl-input--side-borders"
                :class="[$props.readonly ? 'border-dashed' : '']"
            ></div>

            <label :for="id">
                {{ label }}
            </label>

            <div
                class="h-px flex-1 tl-input--side-borders"
                :class="[$props.readonly ? 'border-dashed' : '']"
            ></div>
        </div>

        <slot name="input" :attrs="inputAttrs">
            <input
                v-bind="inputAttrs"
                class="w-full h-full focus:outline-none bg-transparent px-4 py-2 z-10"
            />
        </slot>

        <slot name="append"></slot>
    </div>
</template>

<style lang="scss">
.tl-base-input {
    @apply border-x border-b border-main-borders;
    @apply w-full;
    @apply flex items-center;
    @apply relative rounded;

    .tl-input-sidelines-container {
        @apply absolute top-0 left-0 flex w-full items-start z-0;
    }

    
    input::placeholder,
    textarea::placeholder {
        @apply opacity-0;
    }

    &.no-label {
        input::placeholder,
        textarea::placeholder {
            @apply opacity-50;
        }
    }

    input:-webkit-autofill,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:focus {
        transition:
            background-color 0s 600000s,
            color 0s 600000s;
    }

    label {
        @apply pt-2 px-1;
        @apply border-t border-main-borders;
        @apply text-sm font-medium text-gray-500;
        @apply overflow-hidden;
        @apply transition-[font-size,padding];
    }

    .tl-input--side-borders {
        @apply h-px;
        @apply rounded;
        @apply border-t border-main-borders;
    }

    &:focus-within {
        @apply border-accent;

        .tl-input--side-borders {
            @apply border-accent;
        }

        label {
            @apply text-accent;
        }
    }

    &:focus-within,
    &:has(input:not(:placeholder-shown)),
    &:has(textarea:not(:placeholder-shown)) {
        // @apply border-t-0;

        input::placeholder,
        textarea::placeholder {
            @apply opacity-50;
        }


        label {
            @apply border-transparent;
            @apply pt-0;
            @apply text-xs -translate-y-2;
        }
    }
}
</style>
