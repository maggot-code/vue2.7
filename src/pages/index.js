/*
 * @FilePath: \ytxd-ui\src\pages\index.js
 * @Author: maggot-code
 * @Date: 2022-10-31 14:55:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-01 09:49:53
 * @Description: 
 */
import { definePage } from "@/router";

export default [
    definePage({ path: "/paper" }, () => import("@/pages/Paper/index.vue")),
    definePage({ path: "/404" }, () => import("@/pages/NotFound/index.vue")),
    definePage({ path: "*", redirect: "/404" })
];
