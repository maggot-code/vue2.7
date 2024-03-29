/*
 * @FilePath: \vue2.7\src\service\defineService.js
 * @Author: maggot-code
 * @Date: 2022-10-31 16:30:18
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 13:03:14
 * @Description: 
 */
import { useMiddleware } from "./useMiddleware";
import { defineFetchRef } from "@/utils/factory";
import { isStringEmpty } from "@/utils/empty";

export function defineSendFormData(data) {
    const form = new FormData();

    for (const field in data) {
        form.append(field, data[field]);
    }

    return form;
}

export function defineService(define) {
    const middleware = useMiddleware(define);
    function mergeLoad(fetches) {
        return computed(() => {
            return fetches.some((fetch) => unref(fetch.loading));
        });
    }
    function sendAll(fetches) {
        return Promise.allSettled(fetches.map((fetch) => fetch.toExecute()));
    }

    function send(url, method, options) {
        const config = {
            controller: new AbortController()
        };

        const props = computed(() => {
            return {
                url: isNil(url) || isStringEmpty(url) ? "/" : url,
                method: isNil(method) || isStringEmpty(method) ? "GET" : method.toUpperCase(),
                params: isObject(unref(options.params)) ? unref(options.params) : {},
                data: isObject(unref(options.data)) ? unref(options.data) : {}
            };
        });

        return defineFetchRef(define, config, props);
    }
    function get(url, options = {}) {
        const params = options?.params ?? {};
        return send(url, 'GET', { params });
    }
    function post(url, options = {}) {
        const params = options?.params ?? {};
        const data = options?.data ?? {};
        return send(url, 'POST', { params, data });
    }
    function form(url, options = {}) {
        const params = options?.params ?? {};
        const data = options?.data ?? {};
        return send(url, 'POST', { params, data: defineSendFormData(data) });
    }

    return {
        middleware,
        mergeLoad,
        sendAll,
        send,
        get,
        post,
        form,
    }
}

export default defineService;
