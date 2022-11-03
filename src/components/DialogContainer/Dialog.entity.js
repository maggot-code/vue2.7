/*
 * @FilePath: /vue2.7/src/components/DialogContainer/Dialog.entity.js
 * @Author: maggot-code
 * @Date: 2022-11-04 00:21:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 01:58:07
 * @Description: 
 */
import { UnknowView } from "@/template/unknow";

import { defineStateRef } from "@/utils/factory";
import { uuid } from "@/utils/uuid";

export function DialogEntity(options) {
    const name = uuid();
    const visible = defineStateRef(true);
    function toBind() {
        return {
            visible: unref(visible.state),
            appendToBody: true,
            closeOnPressEscape: true,
            destroyOnClose: true
        }
    }

    return {
        name,
        visible,
        toBind,
        component: UnknowView
    }
}

export default DialogEntity;
