/*
 * @FilePath: /vue2.7/src/template/table/entity/Table.entity.js
 * @Author: maggot-code
 * @Date: 2022-11-01 17:43:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 01:55:09
 * @Description: 
 */
import {
    defineObjectRef,
    defineElementRef,
    defineStateRef,
} from "@/utils/factory";

export function TableEntity() {
    const element = defineElementRef();
    const ready = defineStateRef();
    const data = defineObjectRef();
    const factor = computed(() => unref(data.data));
    const keyname = ref("key");

    function setupKeyname(value) {
        keyname.value = value ?? "key";
    }

    return {
        element,
        ready,
        data,
        factor,
        keyname,
        setupKeyname
    }
}
