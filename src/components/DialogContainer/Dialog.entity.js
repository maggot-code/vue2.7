/*
 * @FilePath: \vue2.7\src\components\DialogContainer\Dialog.entity.js
 * @Author: maggot-code
 * @Date: 2022-11-04 00:21:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 16:50:18
 * @Description: 
 */
import { UnknowView } from "@/template/unknow";

import { createEventHook } from "@vueuse/core";
import { defineStateRef } from "@/utils/factory";
import { uuid } from "@/utils/uuid";

export function DialogEntity(options) {
    const context = options?.context ?? {};
    const component = options?.template ?? UnknowView;
    const event = createEventHook();
    const name = uuid();
    const visible = defineStateRef(true);
    const unwatch = watch(visible.state, (state) => {
        if (state) return;
        event.trigger();
        event.off();
        unwatch();
    });
    function toBind() {
        return {
            visible: unref(visible.state),
            top: options?.top ?? "24px",
            width: options?.width ?? "70%",
            appendToBody: true,
            closeOnPressEscape: true,
            destroyOnClose: true,
            showClose: false,
        }
    }
    return {
        context,
        component,
        name,
        visible,
        toBind,
        toCall: event.trigger,
        toNotice: event.on,
    }
}

export default DialogEntity;
