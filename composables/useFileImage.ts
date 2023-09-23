interface UseFileImageSizeResponse {
    width: number
    height: number
}

export async function useFileImageSize(file: File) {
    return new Promise<UseFileImageSizeResponse>((resolve) => {
        const img = new Image()

        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height,
            })
        }

        img.src = URL.createObjectURL(file)
    })
}

export async function useFileImageBase64(file: File) {
    return new Promise<string>((resolve) => {
        const reader = new FileReader()

        reader.onload = () => {
            resolve(reader.result as string)
        }

        reader.readAsDataURL(file)
    })
}
