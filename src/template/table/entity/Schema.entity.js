/*
 * @FilePath: /vue2.7/src/template/table/entity/Schema.entity.js
 * @Author: maggot-code
 * @Date: 2022-11-01 18:05:30
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 00:56:55
 * @Description: 
 */
import {
    defineObjectRef,
    defineArrayRef
} from "@/utils/factory";
import { toOrder } from "../shared/trans";

export function SchemaEntity() {
    const ui = defineObjectRef();
    const column = defineArrayRef();
    const uiSchema = computed(() => unref(ui.data));
    const columnSchema = computed(() => unref(column.data));
    function setup(response) {
        const sortOrder = toOrder(response?.uiSchema?.sortOrder);

        ui.setup(Object.assign({}, response?.uiSchema ?? {}, { sortOrder }));
        column.setup(response?.columnSchema ?? []);
    }

    ui.setup({
        sortProp: "key",
        sortOrder: "ascending",
        handleFixed: "right"
    });
    return {
        ui,
        column,
        uiSchema,
        columnSchema,
        setup,
        setupUISchema: ui.setup,
        setupColumnSchema: column.setup
    }
}
