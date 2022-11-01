/*
 * @FilePath: /vue2.7/src/template/table/usecase/defineAction.js
 * @Author: maggot-code
 * @Date: 2022-11-01 23:55:29
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 01:56:20
 * @Description: 
 */
import { createEventHook } from "@vueuse/core";

export function defineTableAction(table) {
    const source = createEventHook();
    const choice = createEventHook();
    const control = createEventHook();
    const event = createEventHook();

    function onChoice(props) {
        table.source.setupChoice(props);
        choice.trigger(unref(table.choiceKeys));
    }
    function handleRow(props) {
        // table.hasChoice 用于在点击全局操作时候，判断是否有选中的数据
        control.trigger(props);
    }
    function cellEvent(props) {
        event.trigger(props);
    }
    function tableHandle(props) {
        table.table.data.setup(props);
        source.trigger(unref(table.table.factor));
    }
    function tableParams(props) {
        table.table.data.setup(props);
        source.trigger(unref(table.table.factor));
    }

    onBeforeUnmount(() => {
        source.off();
        choice.off();
        control.off();
        event.off();
    });

    return {
        onChoice,
        handleRow,
        cellEvent,
        tableHandle,
        tableParams,
        bindSource: source.on,
        bindChoice: choice.on,
        bindControl: control.on,
        bindEvent: event.on,
    }
}

export default defineTableAction;
