interface Options {
    accept?: string[]
    multiple?: boolean
}

export async function useFilePicker(options?: Options) {
    return new Promise<File[]>((resolve) => {
        const input = document.createElement('input')

        input.type = 'file'

        if (options?.multiple) {
            input.multiple = true
        }

        if (options?.accept) {
            input.accept = options.accept.join(',')
        }

        input.onchange = (e: any) => {
            const files = e.target?.files

            resolve(Array.from(files || []))
        }

        input.click()
    })
}
