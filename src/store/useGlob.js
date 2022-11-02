/*
 * @FilePath: /vue2.7/src/store/useGlob.js
 * @Author: maggot-code
 * @Date: 2022-11-03 01:14:47
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 01:18:33
 * @Description: 
 */
import { defineStore } from 'pinia';

export const Namespace = 'useGlob';

export const useGlob = defineStore(Namespace, {
    state: () => ({
        recordPassword: false,
    }),

    getters: {},

    actions: {
        toggleRecordPassword() {
            this.recordPassword = !this.recordPassword;
        }
    },

    persist: {
        key: Namespace,
        storage: localStorage
    },
});

export function useGlobStore() {
    return useGlob();
}

export default {
    namespace: Namespace,
    store: useGlob
};
