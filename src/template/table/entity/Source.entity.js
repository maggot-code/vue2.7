/*
 * @FilePath: /vue2.7/src/template/table/entity/Source.entity.js
 * @Author: maggot-code
 * @Date: 2022-11-01 23:34:17
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 01:18:15
 * @Description: 
 */
import { defineArrayRef } from "@/utils/factory";

export function SourceEntity() {
    const data = defineArrayRef();
    const choice = defineArrayRef();
    const dataSource = computed(() => unref(data.data));
    const choiceSource = computed(() => unref(choice.data));
    const total = ref(0);

    function setup(response) {
        data.setup(response?.data ?? []);
        choice.setup([]);
        total.value = response?.total ?? 0;
    }

    return {
        data,
        choice,
        dataSource,
        choiceSource,
        total,
        setup,
        setupData: data.setup,
        setupChoice: choice.setup,
    }
}
