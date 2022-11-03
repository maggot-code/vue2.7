/*
 * @FilePath: \vue2.7\src\utils\trans.js
 * @Author: maggot-code
 * @Date: 2022-11-01 18:01:25
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 14:30:26
 * @Description: 
 */
export function toBoolean(value, def = false) {
    return isBoolean(value) ? value : def;
}

export function toObject(list, toKey) {
    const data = {};
    if (!Array.isArray(list)) return data;

    list.forEach((item) => {
        const key = toKey(item);
        data[key] = item;
    });

    return data;
}
