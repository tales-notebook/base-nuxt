// import uniqId from 'lodash/uniqueId'

import { useI18n } from 'vue-i18n'

interface QuickDialogOptionsItem {
    title: string
    message?: string
}

interface QuickDialogOptions {
    title: string
    message?: string
    type?: 'success' | 'error' | 'warning' | 'info'
    icon?: string
    hideCancel?: boolean
    hideOk?: boolean
    items?: QuickDialogOptionsItem[]
}

interface QuickDialog extends QuickDialogOptions {
    id: number
    onOk: () => void
    onCancel: () => void
}

const dialogItems = ref<QuickDialog[]>([])
const lastId = ref(0)

export function useQuickDialog() {
    const tm = useI18n()

    function close(id: number) {
        const index = dialogItems.value.findIndex((dialog) => dialog.id === id)

        if (index === -1) {
            return
        }

        dialogItems.value.splice(index, 1)
    }

    function open(options: QuickDialogOptions) {
        return new Promise((resolve) => {
            const id = lastId.value++

            function end(value: boolean) {
                close(id)
                resolve(value)
            }

            const dialog = {
                ...options,
                id,
                onOk: () => end(true),
                onCancel: () => end(false),
            }

            dialogItems.value.push(dialog)
        })
    }

    function confirm(payload?: Partial<QuickDialogOptions>) {
        return open({
            title: tm.t('messages.areYouSure'),
            message: tm.t('messages.youWillNotBeAbleToRevertThis'),
            ...payload,
        })
    }

    return reactive({
        dialogItems,
        open,
        close,
        confirm,
    })
}
