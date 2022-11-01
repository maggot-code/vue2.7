/*
 * @FilePath: \ytxd-ui\src\service\useMiddleware.js
 * @Author: maggot-code
 * @Date: 2022-11-01 10:07:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 10:23:20
 * @Description: 
 */
import { INTERCEPTOR_TAG } from "./context";

function filterMiddleware(item) {
    const benchmark = item.tag === INTERCEPTOR_TAG;
    return benchmark && item.usable && !item.unusable;
}

export function useMiddleware(service) {
    function use(middleware) {
        const mid = Array.isArray(middleware) ? middleware : [middleware];
        mid.filter(filterMiddleware).reverse().forEach(item => item.bind(service));
    }

    return { use }
}

export default useMiddleware;
