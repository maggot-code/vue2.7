/*
 * @FilePath: \vue2.7\src\main.js
 * @Author: maggot-code
 * @Date: 2022-10-31 11:39:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 17:45:13
 * @Description: 
 */
import Vue from 'vue';
import VueRouter from "vue-router";
import { createPinia, PiniaVuePlugin } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import Pages from "@/pages";
import MaggotForm from "maggot-form/lib/maggot-form.umd";
import MaggotTable from "maggot-table/lib/maggot-table.umd";
import { Loading } from 'element-ui';

import App from '@/App.vue';

// server install
import "@/server/common";

import 'normalize.css';
import "maggot-form/lib/maggot-form.css";
import "maggot-table/lib/maggot-table.css";
import '@/style/index.scss';

Vue.use(VueRouter);
Vue.use(PiniaVuePlugin);
Vue.use(MaggotForm);
Vue.use(MaggotTable);
Vue.use(Loading.directive);

const pinia = createPinia();
pinia.use(createPersistedState({
    debug: import.meta.env.DEV,
    storage: sessionStorage
}));
const vr = new VueRouter({
    mode: "hash",
    routes: Pages
});
const vm = new Vue({
    render: (h) => h(App),
    router: vr,
    pinia
}).$mount('#app');

export default vm;
