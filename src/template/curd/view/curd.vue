<!--
 * @FilePath: \vue2.7\src\template\curd\view\curd.vue
 * @Author: maggot-code
 * @Date: 2022-11-01 16:33:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 15:52:01
 * @Description: 
-->
<script setup>
// import MockData from "@/assets/json/data.v1";
// import TableData from "@/assets/json/table.v1";
// import SearchData from "@/assets/json/search.v1";
import { InspectView } from "@/template/inspect";

import { defineSendFormData } from "@/service";
import { defineTable, defineTableAction } from "@/template/table";
import { defineForm, defineFormAction } from "@/template/form";

import { useDialog } from "@/hooks/useDialog";
import { useCommonServer } from "@/server/common";
import { useFormFile } from "../usecase/useFormFile";
import { useFormRemote } from "../usecase/useFormRemote";

const table = defineTable();
const form = defineForm();
const tableAction = defineTableAction(table);
const formAction = defineFormAction(form);

const dialog = useDialog();
const server = useCommonServer();
const file = useFormFile(server);
const remote = useFormRemote(server);
const tableClassName = computed(() => {
    return unref(table.control.all.unusable) ? ["temp-curd-table-main-only"] : [];
});
const factor = computed(() => {
    const params = unref(table.table.factor);
    const data = unref(form.form.factor);
    return { params, data };
});

const { notChoice, tableChoice, tableData, total, tableRefs, defaultPageSize, resetCurrentPage, resizeTable, allusable, allController, rowController, uiSchema, columnSchema } = table;
const { formRefs, formJob, formSchema, cellSchema } = form;

const configServer = server.get("/vue/Achievements/AM_Papers/MyList");

// 替换成服务调用
async function toSend() {
    const { tableData } = unref(configServer.data).data;
    const params = Object.assign({}, unref(factor).params, tableData.props);
    const dataConfig = server.send(tableData.uri, tableData.method, {
        params,
        data: defineSendFormData(unref(factor).data)
    });
    const response = await dataConfig.toExecute();
    table.setupData(response.data.data);
}

tableAction.bindChoice((choice) => {
    console.log(choice);
});
const tempToInspect = ["add", "edit"];
const tempToMessage = ["delete"];
const tempToExport = ["excel"];
tableAction.bindControl((control) => {
    const { mode } = control;

    if (tempToInspect.includes(mode)) {
        const { toNotice } = dialog.define({
            template: InspectView,
            context: {
                control,
                table,
                form
            },
        });
        toNotice(toSend);
        return;
    }

    if (tempToMessage.includes(mode)) {
        console.log("消息模板");
        return;
    }

    if (tempToExport.includes(mode)) {
        console.log("导出模板");
        return;
    }
});
tableAction.bindEvent((event) => {
    console.log(event);
});
tableAction.bindSource(toSend);
formAction.bindSource(toSend);

onMounted(async () => {
    const { data } = await configServer.toExecute();
    const { search, tableColumn } = data.data;
    const searchConfig = server.send(search.uri, search.method, { params: search.props });
    const tableColumnConfig = server.send(tableColumn.uri, tableColumn.method, { params: tableColumn.props });

    const searchRes = await searchConfig.toExecute();
    const tableColumnRes = await tableColumnConfig.toExecute();

    form.schema.setup(searchRes.data.data);
    table.setup(tableColumnRes.data.data);
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
                <!-- :disabled="notChoice" -->
                <template v-for="(control) in allController">
                    <el-button size="mini" :key="control.mode" :type="control.type" :icon="control.icon"
                        @click="tableAction.handleRow(control)">
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
