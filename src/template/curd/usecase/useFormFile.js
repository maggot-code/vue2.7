/*
 * @FilePath: \vue2.7\src\template\curd\usecase\useFormFile.js
 * @Author: maggot-code
 * @Date: 2022-11-01 16:41:55
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 13:40:42
 * @Description: 
 */
import { defineFormFile } from "@/template/form";

export function useFormFile(server) {
    return defineFormFile(server)
}

export default useFormFile;
