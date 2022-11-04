/*
 * @FilePath: \vue2.7\src\middleware\userToken.service.js
 * @Author: maggot-code
 * @Date: 2022-11-01 10:42:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 12:49:50
 * @Description: 
 */
import { requestMiddleware } from "@/service";
import { uuid } from "@/utils/uuid";
import { useUserStore } from "@/store/useUser";

function normal(config) {
    const user = useUserStore();

    if (user.tokenUnusable) return config;

    config.headers["Authorization"] = `Bearer ${uuid()}`;
    config.headers["token"] = user.token;

    return config;
}

export default requestMiddleware({ normal });
