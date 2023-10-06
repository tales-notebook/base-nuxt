import { debounce } from "lodash-es";

interface PreferenceManager {
    get: (key: string) => Promise<any>;
    set: (key: string, value: any) => Promise<void>;
}


const key = Symbol('tl-base-nuxt:preference-manager') as InjectionKey<PreferenceManager>;

export function providePreferenceManager(manager: PreferenceManager) {
    provide(key, manager);
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
