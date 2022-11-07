/*
 * @FilePath: \vue2.7\src\router\useRouter.js
 * @Author: maggot-code
 * @Date: 2022-11-03 09:58:03
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-07 09:38:24
 * @Description: 
 */
import Layout from "@/layout";
import Pages from "@/pages";

import { defineRouter } from "./defineRouter";
import { mergePage, usePage } from "./usePage";

// const routes = mergePage(usePage(Pages), usePage(Layout));
const routes = [
    {
        name: "debug",
        path: "/debug",
        component: () => import("@/layout/Debug/debug.vue"),
    },
    {
        name: "login",
        path: "/login",
        component: () => import("@/pages/login/login.vue"),
    },
    {
        name: "curd",
        path: "/curd",
        component: () => import("@/template/curd/view/curd.vue"),
    }
];

const router = defineRouter(routes);

export function useRouter() {
    return router.core;
}

export function useRoute() {
    return router.core.currentRoute;
}

export const resetRoute = router.reset;

export default router;
