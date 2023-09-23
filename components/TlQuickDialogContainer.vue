<script setup lang="ts">
const dialog = useQuickDialog()
</script>

<template>
    <tl-dialog
        v-for="d in dialog.dialogItems"
        :key="d.id"
        :model-value="true"
        @update:model-value="d.onCancel()"
    >
        <tl-card width="400">
            <tl-card-content class="flex flex-col gap-y-4">
                <div class="text-center">
                    <div v-if="d.icon" class="flex justify-center">
                        <tl-icon :name="d.icon" size="100" />
                    </div>

                    <tl-card-title>
                        {{ d.title }}
                    </tl-card-title>

                    <div v-if="d.message" class="text-zinc-500 text-sm mt-1" v-text="d.message" />
                </div>

                <div v-if="d.items" class="flex flex-col gap-y-4">
                    <div
                        v-for="(item, itemIndex) in d.items"
                        :key="itemIndex"
                        class="flex gap-x-4 border border-main-borders p-4 rounded-md items-center"
                    >
                        <div>
                            <tl-icon name="mdi:check-circle" size="20" />
                        </div>

                        <div>
                            <div class="font-bold">
                                {{ item.title }}
                            </div>

                            <div class="text-xs">
                                {{ item.message }}
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="!d.hideCancel || !d.hideOk" class="flex gap-x-3 justify-center">
                    <tl-btn
                        v-if="!d.hideCancel"
                        variant="outlined"
                        color="danger"
                        class="w-full"
                        @click="d.onCancel()"
                    >
                        {{ $t('messages.cancel') }}
                    </tl-btn>

                    <tl-btn v-if="!d.hideOk" class="w-full" color="accent" @click="d.onOk()">
                        {{ $t('messages.ok') }}
                    </tl-btn>
                </div>
            </tl-card-content>
        </tl-card>
    </tl-dialog>
</template>
