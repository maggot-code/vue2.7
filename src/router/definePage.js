/*
 * @FilePath: \ytxd-ui\src\router\definePage.js
 * @Author: maggot-code
 * @Date: 2022-10-31 14:57:43
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 09:50:19
 * @Description: 
 */
import uuid from "@/utils/uuid";

export function definePage(props, toPage) {
    const bind = { name: uuid() };

    if (isFunction(toPage)) bind.component = toPage;

    return Object.assign({}, props, bind);
}

export default definePage;
