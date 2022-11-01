/*
 * @FilePath: /vue2.7/src/template/table/entity/Control.entity.js
 * @Author: maggot-code
 * @Date: 2022-11-01 17:54:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 02:08:02
 * @Description: 
 */
import {
    defineWatchRef,
    defineObjectRef,
    defineArrayRef
} from "@/utils/factory";
import { toObject, toBoolean } from "@/utils/trans";

function filterAll(control) {
    return toBoolean(control?.useAll);
}
function filterRow(control) {
    return toBoolean(control?.useRow);
}
function toKey(item) {
    return item.mode;
}

export function ControlEntity() {
    const all = defineArrayRef();
    const row = defineObjectRef();
    const reset = defineWatchRef();
    const resize = defineWatchRef();
    const allControl = computed(() => unref(all.data));
    const rowControl = computed(() => unref(row.data));

    function setup(response) {
        const data = response?.controller ?? [];
        all.setup(data.filter(filterAll));
        row.setup(toObject(data.filter(filterRow), toKey));
    }

    return {
        all,
        row,
        reset,
        resize,
        allControl,
        rowControl,
        setup
    }
}
