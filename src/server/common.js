/*
 * @FilePath: \vue2.7\src\server\common.js
 * @Author: maggot-code
 * @Date: 2022-11-01 13:35:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 12:10:23
 * @Description: 
 */
import { defineService } from "@/service";
import axios from "axios";
import ErrorCanceled from "@/middleware/errorCanceled.service";
import ServerCrash from "@/middleware/serverCrash.service";
import NotFound from "@/middleware/notFound.service";
import UserToken from "@/middleware/userToken.service";

// /vue/Achievements / AM_Papers / MyList
const define = axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout: 0,
    withCredentials: false,
    headers: {}
});

const service = defineService(define);

service.middleware.use([
    ErrorCanceled,
    ServerCrash,
    NotFound,
    UserToken,
]);

export function useCommonServer() {
    return service;
}

export default useCommonServer;
