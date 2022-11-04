/*
 * @FilePath: \vue2.7\src\template\curd\usecase\useFormRemote.js
 * @Author: maggot-code
 * @Date: 2022-11-01 16:42:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 13:40:13
 * @Description: 
 */
import { defineFormRemote } from "@/template/form";

export function useFormRemote(server) {
    return defineFormRemote(server);
}

export default useFormRemote;
