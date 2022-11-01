/*
 * @FilePath: /vue2.7/src/template/form/entity/Form.entity.js
 * @Author: maggot-code
 * @Date: 2022-10-31 15:29:34
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 01:55:48
 * @Description: 
 */
import {
    defineElementRef,
    defineStateRef,
    defineObjectRef,
} from "@/utils/factory";

export function FormEntity() {
    const element = defineElementRef();
    const ready = defineStateRef();
    const data = defineObjectRef();
    const factor = computed(() => unref(data.data));

    return {
        element,
        ready,
        data,
        factor
    }
}
