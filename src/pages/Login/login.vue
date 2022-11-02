<!--
 * @FilePath: /vue2.7/src/pages/Login/login.vue
 * @Author: maggot-code
 * @Date: 2022-11-02 09:25:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 01:25:55
 * @Description: 
-->
<script setup>
import FromStruct from "./shared/form";

import { useUserStore } from "@/store/useUser";
import { useGlobStore } from "@/store/useGlob";
import { defineForm, defineFormAction } from "@/template/form";

const glob = useGlobStore();
const user = useUserStore();

const form = defineForm();
const formAction = defineFormAction(form);
const { formRefs, formJob, formSchema, cellSchema } = form;

formAction.bindSource((factor) => {
    console.log(factor);
});
onMounted(() => {
    form.schema.setup(FromStruct);
});
</script>

<template>
    <div class="ytxd-login">
        <div class="ytxd-login-head"></div>
        <div class="ytxd-login-body">
            <mg-form class="ytxd-login-body-form" ref="formRefs" :job="formJob" :schema="{ formSchema, cellSchema }"
                @monitor-value="formAction.monitorValue">
            </mg-form>
            <div class="ytxd-login-body-control">
                <p>验证码</p>
                <p>描述</p>
                <p>重制密码</p>
                <el-checkbox :value="glob.recordPassword" @change="glob.toggleRecordPassword">记住密码</el-checkbox>
                <el-button icon="el-icon-search" @click="formAction.submit">登录</el-button>
            </div>
        </div>
        <div class="ytxd-login-foot"></div>
    </div>
</template>

<style scoped lang='scss'>
.ytxd-login {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    overflow: hidden;

    &-body {
        display: flex;
        flex-direction: column;
        align-self: flex-end;
        width: 320px;
        height: 320px;

        &-control {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            height: 100%;
        }
    }
}
</style>
