/*
 * @FilePath: \vue2.7\src\utils\factory.js
 * @Author: maggot-code
 * @Date: 2022-10-31 15:32:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 12:40:29
 * @Description: 
 */
import { uuid } from "@/utils/uuid";
import { createEventHook } from "@vueuse/core";
import { toBoolean } from "@/utils/trans";

export function defineWatchRef() {
    const value = ref(uuid());
    function refresh() {
        value.value = uuid();
    }

    return {
        value,
        refresh
    }
}

export function defineObjectRef() {
    const source = shallowRef({});
    const data = computed(() => unref(source));
    const len = computed(() => Object.keys(unref(data)).length);
    const usable = computed(() => unref(len) > 0);
    const unusable = computed(() => !unref(usable));
    function setup(value) {
        if (!isObject(value)) return;

        source.value = value;
    }

    return { data, len, usable, unusable, setup };
}

export function defineArrayRef() {
    const source = shallowRef([]);
    const data = computed(() => unref(source));
    const len = computed(() => unref(data).length);
    const usable = computed(() => unref(len) > 0);
    const unusable = computed(() => !unref(usable));
    function setup(value) {
        if (!Array.isArray(value)) return;

        source.value = value;
    }
    function add(value) {
        setup([...unref(data), value]);
    }

    return { data, len, usable, unusable, setup, add };
}

export function defineStateRef(value) {
    const source = ref(toBoolean(value));
    const state = computed(() => unref(source));
    function setup(val) {
        source.value = toBoolean(val);
    }
    function toSwitch() {
        setup(!unref(state));
    }
    function toEnable() {
        setup(true);
    }
    function toDisable() {
        setup(false);
    }

    return { state, setup, toSwitch, toEnable, toDisable };
}

export function defineElementRef() {
    const event = createEventHook();
    const refs = ref(null);
    const unusable = computed(() => isNil(unref(refs)));
    const usable = computed(() => !unref(unusable));
    const size = computed(() => {
        if (unref(unusable)) return {
            width: 0,
            height: 0
        }

        return { width: unref(refs).clientWidth, height: unref(refs).clientHeight };
    });
    const bind = {
        refs,
        unusable,
        usable,
        size
    };

    onMounted(async () => {
        await nextTick();
        event.trigger(bind);
    });
    onUnmounted(() => {
        event.off()
    });

    return Object.assign({}, bind, {
        toMounted: event.on
    });
}

export function defineFetchRef(service, config, props) {
    const { controller } = config;
    const source = defineObjectRef();
    const load = defineStateRef();
    const fetch = defineStateRef();
    const finish = defineStateRef();
    const loading = computed(() => unref(load.state));
    const fetching = computed(() => unref(fetch.state));
    const finished = computed(() => unref(finish.state));

    function toExecute(spareProps) {
        load.toEnable();
        fetch.toEnable();
        finish.toDisable();

        const factor = Object.assign({}, unref(props), spareProps);
        const options = Object.assign({}, {
            signal: controller.signal,
        }, factor);

        return new Promise((resolve, reject) => {
            service(options).then((response) => {
                source.setup(response.data);
                resolve(response);
            }).catch((error) => {
                console.log(error);
                source.setup({});
                resolve({});
            }).finally(() => {
                finish.toEnable();
                fetch.toDisable();
                load.toDisable();
            });
        });
    }
    function toAbort() {
        controller.abort();
    }

    return {
        data: source.data,
        loading,
        fetching,
        finished,
        toExecute,
        toAbort
    }
}
