/*
 * @FilePath: \vue2.7\src\template\form\usecase\defineAction.js
 * @Author: maggot-code
 * @Date: 2022-11-02 01:36:50
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 16:40:48
 * @Description: 
 */
import { createEventHook } from "@vueuse/core";

export function defineFormAction(form) {
    const source = createEventHook();

    async function save() {
        await form.setupFormData();

        source.trigger(unref(form.form.factor));
    }
    async function submit() {
        const state = await form.checkFormData();

        if (state) source.trigger(unref(form.form.factor));
    }
    async function reset() {
        await form.resetFormData();
        source.trigger(unref(form.form.factor));
    }
    function monitorValue(formItem) {
        // console.log(formItem);
    }

    onBeforeUnmount(() => {
        source.off();
    });

    return {
        save,
        submit,
        reset,
        monitorValue,
        bindSource: source.on,
    }
}

export default defineFormAction;
