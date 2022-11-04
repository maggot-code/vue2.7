/*
 * @FilePath: \vue2.7\src\store\useUser.js
 * @Author: maggot-code
 * @Date: 2022-11-03 00:16:46
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 12:48:45
 * @Description: 
 */
import { defineStore } from 'pinia';
import { isStringEmpty } from "@/utils/empty";
import { useGlobStore } from "./useGlob";

export const Namespace = 'useUser';

export const useUser = defineStore(Namespace, {
    state: () => {
        return {
            token: ""
        }
    },

    getters: {
        tokenUnusable() {
            return isStringEmpty(this.token);
        },
        tokenUsable() {
            return !this.tokenUnusable;
        }
    },

    actions: {
        async login(server, options) {
            const { data } = await server.toExecute(options);
            this.token = data.token;
        }
    },

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
