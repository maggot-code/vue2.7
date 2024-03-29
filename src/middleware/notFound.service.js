/*
 * @FilePath: \vue2.7\src\middleware\notFound.service.js
 * @Author: maggot-code
 * @Date: 2022-11-01 10:30:51
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 13:42:16
 * @Description: 
 */
import { responseMiddleware } from "@/service";

function abnormal(error) {
    if (error?.response?.status !== 404) return Promise.reject(error);

    // console.log("接手处理掉没有找到服务器资源", error);
    return Promise.resolve({ data: {} });
}

export default responseMiddleware({ abnormal });
