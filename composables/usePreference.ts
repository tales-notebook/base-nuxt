import { debounce } from "lodash-es";
import { makeKey } from "./makeKey";

interface PreferenceManager {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
}


const key = Symbol('tl-base-nuxt:preference-manager') as InjectionKey<PreferenceManager>;

export function providePreferenceManager(manager: PreferenceManager) {
    provide(key, manager);
}

export function provideCookiePreferenceManager(prefix = 'tl-app') {
    const nuxtApp = useNuxtApp()    

    providePreferenceManager({
        get: async (key) => {
            return nuxtApp.runWithContext(() => {
                const cookieKey = makeKey(prefix, 'preferences', key)

                const cookie = useCookie(cookieKey)

                return String(cookie.value)
            })
        },
        set: async (key, value) => {
            return nuxtApp.runWithContext(() => {
                const cookieKey = makeKey(prefix, 'preferences', key)

                const cookie = useCookie(cookieKey)

                cookie.value = String(value)
            })
        },
    })
}

export function provideLocalStoragePreferenceManager(prefix = 'tl-app') {
    providePreferenceManager({
        get: async (key) => {
           const preferenceKey = makeKey(prefix, 'preferences', key)

           if (process.client) {
                return localStorage.getItem(preferenceKey)
           }

        },
        set: async (key, value) => {
            const preferenceKey = makeKey(prefix, 'preferences', key)

            if (process.client) {
                localStorage.setItem(preferenceKey, String(value))
            }

        },
    })
}

export function usePreferenceManager() {
    const manager = inject(key);
    
    if (!manager) {
        throw new Error('No preference manager provided');
    }

    return manager;
}

export function usePreference<T>(key: string, defaultValue: T) {

    function makeKey(...args: string[]) {
        return `tl-app:preferences:${key}:${args.join(':')}`
    }

    const manager = usePreferenceManager();
    const loading = useState(makeKey('loading'), () => false);
    const valueRef = useState(makeKey('value'), () => defaultValue);
    
    async function load () {        
        loading.value = true;

        await manager
            .get(key)
            .then((v) => valueRef.value = v ?? defaultValue)
            .finally(() => {
                loading.value = false;
            })
    }

    const update = debounce((value) => manager.set(key, value), 1000);

    watch(valueRef, (v) => {
        if (loading.value) return

        update(v);
    });

    return reactive({
        value: valueRef,
        loading,
        load,
        update
    })
}
