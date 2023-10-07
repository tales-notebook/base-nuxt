export function makeKey(prefix: string, ...args: string[]) {
    return `${prefix}:${args.join(':')}`
}