/*
 * @FilePath: \ytxd-ui\src\middleware\serverCrash.service.js
 * @Author: maggot-code
 * @Date: 2022-11-01 09:54:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 10:52:10
 * @Description: 
 */
import { responseMiddleware } from "@/service";

function abnormal(error) {
    if (error?.response?.status !== 500) return Promise.reject(error);

    console.log("接手处理掉服务器崩溃的异常", error);
    return Promise.resolve();
}

export default responseMiddleware({ abnormal });
