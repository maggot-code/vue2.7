/*
 * @FilePath: /vue2.7/src/template/form/usecase/defineAction.js
 * @Author: maggot-code
 * @Date: 2022-11-02 01:36:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 01:49:08
 * @Description: 
 */
import { createEventHook } from "@vueuse/core";

export function defineFormAction(form) {
    const source = createEventHook();

    async function submit() {
        await form.setupFormData();
        source.trigger(unref(form.form.source));
    }
    async function reset() {
        await form.resetFormData();
        source.trigger(unref(form.form.source));
    }
    function monitorValue(formItem) {
        // console.log(formItem);
    }

    onBeforeUnmount(() => {
        source.off();
    });

    return {
        submit,
        reset,
        monitorValue,
        bindSource: source.on,
    }
}

export default defineFormAction;
