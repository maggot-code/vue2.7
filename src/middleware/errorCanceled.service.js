/*
 * @FilePath: \ytxd-ui\src\middleware\errorCanceled.service.js
 * @Author: maggot-code
 * @Date: 2022-11-01 13:17:49
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 13:19:42
 * @Description: 
 */
import { responseMiddleware } from "@/service";

function abnormal(error) {
    if (!error?.config.signal.aborted) return Promise.reject(error);

    return Promise.resolve({
        data: {
            code: 0,
            message: "请求已取消",
            data: {}
        }
    });
}

export default responseMiddleware({ abnormal });
