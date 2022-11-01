/*
 * @FilePath: /vue2.7/src/template/table/shared/trans.js
 * @Author: maggot-code
 * @Date: 2022-11-02 00:44:26
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 00:58:36
 * @Description: 
 */
import { ASCENDING, DESCENDING } from "./context";

export function toOrder(order) {
    const hasAsc = ASCENDING.includes(order);
    const hasDesc = DESCENDING.includes(order);

    if (hasAsc) return "ascending";
    if (hasDesc) return "descending";

    return order;
}
