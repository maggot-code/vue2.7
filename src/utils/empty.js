/*
 * @FilePath: \ytxd-ui\src\utils\empty.js
 * @Author: maggot-code
 * @Date: 2022-11-01 11:20:32
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 18:01:47
 * @Description: 
 */
export function isStringEmpty(value) {
    return isString(value) && value.trim().length <= 0;
}
