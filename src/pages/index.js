/*
 * @FilePath: \vue2.7\src\pages\index.js
 * @Author: maggot-code
 * @Date: 2022-10-31 14:55:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 09:55:08
 * @Description: 
 */
import { definePage } from "@/router";

// const cache = new WeakMap();
// const pages = [];
// const pathMatch = /.(.*?).vue/;
// const modules = import.meta.glob('./**/*.vue');

// for (const filePath in modules) {
//     const component = modules[filePath];
//     const path = filePath.match(pathMatch).at(1);
//     const page = definePage({ path }, component);

//     console.log(page, filePath);

//     pages.push(page);
// }

export default [
    definePage({ path: "/paper" }, () => import("@/pages/Paper/paper.vue")),

    definePage({ path: "/login" }, () => import("@/pages/Login/login.vue")),
    definePage({ path: "/404" }, () => import("@/pages/NotFound/notfound.vue")),
    definePage({ path: "*", redirect: "/404" })
];
