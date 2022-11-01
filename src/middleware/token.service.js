/*
 * @FilePath: \ytxd-ui\src\middleware\token.service.js
 * @Author: maggot-code
 * @Date: 2022-11-01 10:42:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 10:53:18
 * @Description: 
 */
import { requestMiddleware } from "@/service";
import { uuid } from "@/utils/uuid";

function normal(config) {
    config.headers["Authorization"] = `Bearer ${uuid()}`;

    return config;
}

export default requestMiddleware({ normal });
