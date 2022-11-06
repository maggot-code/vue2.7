/*
 * @FilePath: /vue2.7/src/main.js
 * @Author: maggot-code
 * @Date: 2022-10-31 11:39:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-06 20:25:30
 * @Description: 
 */
import Vue from 'vue';
import router from "@/router/useRouter";
import ElementUI from 'element-ui';
// import { Loading } from 'element-ui';
import { createPinia, PiniaVuePlugin } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

import MaggotForm from "maggot-form/lib/maggot-form.umd";
import MaggotTable from "maggot-table/lib/maggot-table.umd";
// import MaggotForm from "maggot-form";
// import MaggotTable from "maggot-table";
import App from '@/App.vue';

// server install
import "@/server/common";

import 'normalize.css';
import "maggot-form/lib/maggot-form.css";
import "maggot-table/lib/maggot-table.css";
import '@/style/index.scss';

Vue.use(ElementUI);
Vue.use(MaggotForm);
Vue.use(MaggotTable);
Vue.use(PiniaVuePlugin);
// Vue.use(Loading.directive);

const pinia = createPinia();

router.use(Vue);
pinia.use(createPersistedState({
    debug: import.meta.env.DEV,
    storage: sessionStorage
}));

const vm = new Vue({
    render: (h) => h(App),
    router: router.core,
    pinia
});

router.core.onReady(() => {
    vm.$mount('#app');
});
export default vm;
