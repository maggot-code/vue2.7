/*
 * @FilePath: \vue2.7\src\router\definePage.js
 * @Author: maggot-code
 * @Date: 2022-11-03 12:32:00
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 13:37:04
 * @Description: 
 */
import { uuid } from "@/utils/uuid";
import { toBoolean } from "@/utils/trans";
import { isStringEmpty } from "@/utils/empty";

export function definePage() {
    const name = uuid();

    return {
        name
    }
}

export default definePage;
