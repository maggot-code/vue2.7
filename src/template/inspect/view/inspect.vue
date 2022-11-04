<!--
 * @FilePath: \vue2.7\src\template\inspect\view\inspect.vue
 * @Author: maggot-code
 * @Date: 2022-11-04 15:50:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 16:01:12
 * @Description: 
-->
<script setup>
import {
    defineForm,
    defineFormAction,
    defineFormFile,
    defineFormRemote
} from "@/template/form";

import { isStringEmpty } from "@/utils/empty";
import { useCommonServer } from "@/server/common";

const props = defineProps({
    entityDialog: {
        type: Object,
        default: () => ({})
    },
    ctx: {
        type: Object,
        default: () => ({})
    },
});

const attrs = computed(() => unref(props.ctx.control.attrs));
const keyword = computed(() => {
    const field = unref(props.ctx.table.table.keyname);
    const value = unref(props.ctx.control?.row ?? {})[field];
    const unusable = isNil(value) || isStringEmpty(value);
    return { field, value, unusable, usable: !unusable };
});
const params = computed(() => {
    const { field, value } = unref(keyword);
    return { [field]: value };
});

const form = defineForm();
const formAction = defineFormAction(form);
const server = useCommonServer();
const file = defineFormFile(server);
const remote = defineFormRemote(server);

const { formRefs, formJob, formSchema, cellSchema } = form;

const configServer = server.get(unref(attrs).service.uri);

formAction.bindSource((factor) => {
    console.log(factor);
});

onMounted(async () => {
    if (unref(keyword).usable) {
        const response = await configServer.toExecute({ params: unref(params) });
        form.setupData(response.data.data);
    } else {
        const response = await configServer.toExecute();
        form.schema.setup(response.data.data);
    }
});
</script>

<template>
    <div class="inspect-view">
        <div class="inspect-view-body">
            <mg-form ref="formRefs" :job="formJob" :schema="{ formSchema, cellSchema }" :upload="file" :remote="remote"
                @monitor-value="formAction.monitorValue">
            </mg-form>
        </div>
        <div class="inspect-view-foot">
            <el-button size="mini" icon="el-icon-message" @click="formAction.submit">送审</el-button>
            <el-button size="mini" icon="el-icon-receiving" @click="formAction.save">保存</el-button>
            <el-button size="mini" icon="el-icon-close" @click="props.entityDialog.release">关闭</el-button>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.inspect-view {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 70vh;
    overflow: hidden;

    &-body {
        width: 100%;
        height: calc(100% - 48px);
        overflow-x: hidden;
        overflow-y: auto;
    }

    &-foot {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 32px;
        overflow: hidden;
    }
}
</style>
