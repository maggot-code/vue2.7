/*
 * @FilePath: \ytxd-ui\src\server\common.js
 * @Author: maggot-code
 * @Date: 2022-11-01 13:35:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 14:09:42
 * @Description: 
 */
import { defineService } from "@/service";
import axios from "axios";
import ErrorCanceled from "@/middleware/errorCanceled.service";
import ServerCrash from "@/middleware/serverCrash.service";
import NotFound from "@/middleware/notFound.service";

const define = axios.create({
    baseURL: "",
    timeout: 0,
    withCredentials: false,
    headers: {}
});

const service = defineService(define);

service.middleware.use([
    ErrorCanceled,
    ServerCrash,
    NotFound,
]);

export function useCommonServer() {
    return service;
}

export default useCommonServer;
