<!--
 * @FilePath: \vue2.7\src\template\curd\view\curd.vue
 * @Author: maggot-code
 * @Date: 2022-11-01 16:33:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 11:30:58
 * @Description: 
-->
<script setup>
import MockData from "@/assets/json/data.v1";
import TableData from "@/assets/json/table.v1";
import SearchData from "@/assets/json/search.v1";

import { useCommonServer } from "@/server/common";
import { defineTable, defineTableAction } from "@/template/table";
import { defineForm, defineFormAction } from "@/template/form";
import { useFormFile } from "../usecase/useFormFile";
import { useFormRemote } from "../usecase/useFormRemote";

const server = useCommonServer();
const table = defineTable();
const form = defineForm();
const tableAction = defineTableAction(table);
const formAction = defineFormAction(form);
const file = useFormFile();
const remote = useFormRemote();
const tableClassName = computed(() => {
    return unref(table.control.all.unusable) ? ["temp-curd-table-main-only"] : [];
});
const factor = computed(() => {
    const params = unref(table.table.factor);
    const data = unref(form.form.factor);
    return { params, data };
});

const { tableChoice, tableData, total, tableRefs, defaultPageSize, resetCurrentPage, resizeTable, allusable, allController, rowController, uiSchema, columnSchema } = table;
const { formRefs, formJob, formSchema, cellSchema } = form;

const aa = server.get("/vue/Achievements/AM_Papers/MyList");

// 替换成服务调用
function toSend() {
    console.log(unref(factor));
}

tableAction.bindChoice((choice) => {
    console.log(choice);
});
tableAction.bindControl((control) => {
    console.log(control);
});
tableAction.bindEvent((event) => {
    console.log(event);
});
tableAction.bindSource(toSend);
formAction.bindSource(toSend);
onMounted(async () => {
    form.schema.setup(SearchData);
    table.setup(TableData);
    table.setupData(MockData);

    const response = await aa.toExecute();
    console.log(response);
});
</script>

<template>
    <div class="temp-curd">
        <div class="temp-curd-search">
            <Toggle>
                <template #toggle-form>
                    <mg-form ref="formRefs" :job="formJob" :schema="{ formSchema, cellSchema }" :upload="file"
                        :remote="remote" @monitor-value="formAction.monitorValue">
                    </mg-form>
                </template>
                <template #toggle-btn>
                    <el-button size="mini" icon="el-icon-search" type="primary" @click="formAction.submit">
                        查询
                    </el-button>
                    <el-button size="mini" icon="el-icon-refresh-right" :plain="true" @click="formAction.reset">
                        重置
                    </el-button>
                </template>
            </Toggle>
        </div>
        <div class="temp-curd-table">
            <div class="temp-curd-table-control" v-if="allusable">
                <template v-for="(control) in allController">
                    <el-button size="mini" :key="control.mode" :type="control.type" :icon="control.icon"
                        @click="action.handleRow(control)">
                        {{ control.label }}
                    </el-button>
                </template>
            </div>
            <div class="temp-curd-table-main" :class="tableClassName">
                <mg-table ref="tableRefs" :tableChoice="tableChoice" :tableData="tableData" :total="total"
                    :defaultPageSize="defaultPageSize" :resetCurrentPage="resetCurrentPage" :resizeTable="resizeTable"
                    :controller="rowController" :tableSchema="{ uiSchema, columnSchema }"
                    @onChoice="tableAction.onChoice" @handleRow="tableAction.handleRow"
                    @cellEvent="tableAction.cellEvent" @tableParams="tableAction.tableParams"
                    @tableHandle="tableAction.tableHandle">
                </mg-table>
            </div>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.temp-curd {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;

    &-search,
    &-table,
    &-table-control,
    &-table-main {
        align-self: center;
        width: 100%;
    }

    &-search {
        height: 48px;
    }

    &-table {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: calc(100% - 58px);

        &-control {
            height: 32px;
        }

        &-main {
            height: calc(100% - 42px);
        }

        &-main-only {
            height: 100%;
        }
    }
}

::v-deep(.el-pagination) {
    align-self: center;
}
</style>
