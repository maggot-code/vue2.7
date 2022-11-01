/*
 * @FilePath: \ytxd-ui\src\service\defineMiddleware.js
 * @Author: maggot-code
 * @Date: 2022-11-01 09:53:23
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 10:29:44
 * @Description: 
 */
import {
    INTERCEPTOR_TAG,
    INTERCEPTOR,
    REQUEST_INTERCEPTOR,
    RESPONSE_INTERCEPTOR
} from './context';
import { uuid } from "@/utils/uuid";

export function hasKind(kind) {
    return INTERCEPTOR.includes(kind);
}

export function notKind(kind) {
    return !hasKind(kind);
}

export function toNextResult(result) {
    return Promise.resolve(result);
}

export function toNextError(error) {
    return Promise.reject(error);
}

export function toMiddlewareHandler(props) {
    const normal = isFunction(props.normal) ? props.normal : toNextResult;
    const abnormal = isFunction(props.abnormal) ? props.abnormal : toNextError;
    return [normal, abnormal];
}

export function defineMiddleware(kind, normal, abnormal) {
    function bind(service) {
        service.interceptors[kind].use(normal, abnormal);
    }

    return {
        tag: INTERCEPTOR_TAG,
        id: uuid(),
        usable: hasKind(kind),
        unusable: notKind(kind),
        bind
    }
}

export function requestMiddleware(props) {
    const [normal, abnormal] = toMiddlewareHandler(props);
    return defineMiddleware(REQUEST_INTERCEPTOR, normal, abnormal);
}

export function responseMiddleware(props) {
    const [normal, abnormal] = toMiddlewareHandler(props);
    return defineMiddleware(RESPONSE_INTERCEPTOR, normal, abnormal);
}

export default defineMiddleware;
