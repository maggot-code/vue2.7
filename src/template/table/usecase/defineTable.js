/*
 * @FilePath: /vue2.7/src/template/table/usecase/defineTable.js
 * @Author: maggot-code
 * @Date: 2022-11-01 18:09:07
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 01:26:08
 * @Description: 
 */
import { toOrder } from "../shared/trans";
import { TableEntity } from "../entity/Table.entity";
import { ControlEntity } from "../entity/Control.entity";
import { SchemaEntity } from "../entity/Schema.entity";
import { SourceEntity } from "../entity/Source.entity";

export function defineTable() {
    const defaultPageSize = 20;
    const table = TableEntity();
    const control = ControlEntity();
    const schema = SchemaEntity();
    const source = SourceEntity();
    const isFirstPage = computed(() => unref(table.data.data)?.current == 1);
    const choiceKeys = computed(() => unref(source.choiceSource).map(item => item[unref(table.keyname)]));
    const unwatch = watch(schema.uiSchema, (response) => {
        const order = toOrder(response?.sortOrder);

        table.data.setup({
            current: 1,
            size: defaultPageSize,
            prop: unref(table.keyname),
            order,
        });
        unwatch();
    });

    // 需要在元素挂在之后调用，即在mounted生命周期中调用
    function setup(response) {
        table.setupKeyname(response.keyname);
        control.setup(response);
        schema.setup(response);
    }

    onBeforeUnmount(() => {
        unwatch();
    })
    return {
        tableRefs: table.element.refs,
        resetCurrentPage: control.reset.value,
        resizeTable: control.resize.value,
        allController: control.allControl,
        allusable: control.all.usable,
        rowController: control.rowControl,
        uiSchema: schema.uiSchema,
        columnSchema: schema.columnSchema,
        hasChoice: source.choice.usable,
        tableChoice: source.choiceSource,
        tableData: source.dataSource,
        total: source.total,
        defaultPageSize,
        table,
        control,
        schema,
        source,
        isFirstPage,
        choiceKeys,
        setup,
        setupData: source.setup
    }
}

export default defineTable;
