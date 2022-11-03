/*
 * @FilePath: /vue2.7/src/components/DialogContainer/defineDialog.js
 * @Author: maggot-code
 * @Date: 2022-11-04 00:12:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 01:56:47
 * @Description: 
 */
import { defineArrayRef } from "@/utils/factory";
import { DialogEntity } from "./Dialog.entity";

const store = new Map();

function setup(key, value) {
    store.set(key, value);
}
function find(key) {
    if (!store.has(key)) return;

    return store.get(key);
}
function remove(key) {
    if (isNil(find(key))) return;

    store.delete(key);
}
function destroy() {
    store.forEach((_, key) => remove(key));
    store.clear();
}

export function defineDialog() {
    const cache = defineArrayRef();
    const source = computed(() => {
        return unref(cache.data).map((key) => {
            return find(key);
        });
    });

    function define(props) {
        const entity = DialogEntity(props ?? {});
        const { name } = entity;
        function release() {
            entity.visible.toDisable();
            remove(name);
            cache.setup(unref(cache.data).filter((key) => key !== name));
        }
        const bind = Object.assign({}, entity, { release });

        setup(name, bind);
        cache.add(name);
        return bind;
    }

    provide("dialog", {
        source,
        define
    });
    onBeforeUnmount(() => {
        destroy();
        cache.setup([]);
    });
    return {
        cache,
        source,
        define
    }
}

export default defineDialog;
