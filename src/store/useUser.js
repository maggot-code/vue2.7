import { defineStore } from 'pinia';

export const Namespace = 'useUser';

export const useUser = defineStore(Namespace, {
    state: () => ({
        name: "code",
        full: "maggot"
    }),

    getters: {
        fullname(state) {
            return `${state.full}-${state.name}`;
        }
    },

    actions: {
        setupName(name) {
            this.name = name;
        }
    },

    persist: {
        key: Namespace
    },
});

export function useUserStore() {
    return useUser();
}

export default {
    namespace: Namespace,
    store: useUser
};
