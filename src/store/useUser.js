/*
 * @FilePath: \vue2.7\src\store\useUser.js
 * @Author: maggot-code
 * @Date: 2022-11-03 00:16:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 11:13:40
 * @Description: 
 */
import { defineStore } from 'pinia';
import { useGlobStore } from "./useGlob";

export const Namespace = 'useUser';

export const useUser = defineStore(Namespace, {
    state: () => {
        return {
            token: ""
        }
    },

    getters: {},

    actions: {},

    persist: {
        key: Namespace,
    },
});

export function useUserStore() {
    return useUser();
}

export default {
    namespace: Namespace,
    store: useUser
};
