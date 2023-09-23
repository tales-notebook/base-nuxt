export function useImageLoadedElement(src: string) {
    return new Promise<HTMLImageElement>((resolve) => {
        const imageEl = new Image()

        imageEl.onload = () => resolve(imageEl)

        imageEl.src = src
    })
}
