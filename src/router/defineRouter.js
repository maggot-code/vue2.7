/*
 * @FilePath: \vue2.7\src\router\defineRouter.js
 * @Author: maggot-code
 * @Date: 2022-11-03 09:41:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 12:23:05
 * @Description: 
 */
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => {
        // TODO LOG ...
        console.log(err);
    });
};

export function setupRouter(routes) {
    return new VueRouter({
        scrollBehavior: () => ({ x: 0, y: 0, }),
        mode: "hash",
        routes: Array.isArray(routes) ? routes : []
    })
}

export function defineRouter(routes) {
    const core = setupRouter(routes);

    function reset() {
        const router = setupRouter(routes);
        core.matcher = router.matcher;
    }
    function use(Vue) {
        Vue.use(VueRouter);
    }

    return {
        core,
        reset,
        use
    }
}

export default defineRouter;
