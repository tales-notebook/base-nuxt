import { AxiosError, AxiosResponse } from 'axios'
import { useI18n } from 'vue-i18n'

export interface SnackbarOptions {
    title: string
    message?: string
    timeout?: number
    color?: 'zinc' | 'accent' | 'danger'
}

export interface SnackbarItem extends SnackbarOptions {
    id: number
}

const items = ref<SnackbarItem[]>([])
const lastId = ref(0)

export function useQuickSnackbar() {
    const tm = useI18n()

    function remove(index: number) {
        const itemIndex = items.value.findIndex((item) => item.id === index)

        if (itemIndex === -1) {
            return
        }

        items.value.splice(itemIndex, 1)
    }

    function show(options: SnackbarOptions) {
        const timeout = options.timeout || 5000

        const item: SnackbarItem = {
            ...options,
            id: lastId.value++,
        }

        items.value.push(item)

        setTimeout(() => remove(item.id), timeout)
    }

    function error(message: string) {
        show({ title: message, color: 'danger' })
    }

    function requestError(error: AxiosError<any>) {
        const color = 'danger'

        const response = error.response

        if (!response) return

        const data = response?.data

        if (!data) {
            return show({ title: response.statusText, color })
        }

        if (Array.isArray(data.errors)) {
            return data.errors.forEach((error: any) => {
                show({ title: error.message, color })
            })
        }

        if (data.message) {
            return show({ title: data.message, color })
        }

        if (response.status === 500) {
            return show({ title: tm.t('messages.errors.internalServerError'), color })
        }
    }

    function response(responseObject: AxiosResponse, options?: Partial<SnackbarOptions>) {
        const color = options?.color ?? 'accent'

        if (responseObject.data.message) {
            return show({ title: responseObject.data.message, color })
        }
    }

    /**
     * @deprecated Use `response` instead
     */
    const request = response

    return reactive({
        items,
        show,
        error,
        remove,
        response,
        request,
        requestError,
    })
}

export function showQuickSnackbar(options: SnackbarOptions) {
    useQuickSnackbar().show(options)
}
