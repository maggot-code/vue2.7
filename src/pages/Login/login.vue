<!--
 * @FilePath: \vue2.7\src\pages\Login\login.vue
 * @Author: maggot-code
 * @Date: 2022-11-02 09:25:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-02 17:47:38
 * @Description: 
-->
<script setup>
import { useUserStore } from "@/store/useUser";
import { defineForm, defineFormAction } from "@/template/form";

const user = useUserStore();

const form = defineForm();
const formAction = defineFormAction(form);
const { formRefs, formJob, formSchema, cellSchema } = form;

formAction.bindSource((factor) => {
    console.log(factor);
});
onMounted(() => {
    form.schema.setup({
        formSchema: {
            labelWidth: "auto"
        },
        cellSchema: [
            {
                field: "username",
                uiSchema: {
                    clearable: true,
                    placeholder: "请输入用户名",
                },
                ruleSchema: [
                    {
                        message: "请填写用户名",
                        required: true
                    }
                ],
                mold: "text",
                componentName: "mg-input",
                value: ""
            },
            {
                field: "password",
                uiSchema: {
                    clearable: true,
                    placeholder: "请输入密码",
                },
                ruleSchema: [
                    {
                        message: "请填写密码",
                        required: true
                    }
                ],
                mold: "password",
                componentName: "mg-input",
                value: ""
            }
        ]
    });

    user.setupName("aa");
});
</script>

<template>
    <div class="ytxd-login">
        <div class="ytxd-login-head">{{ user.fullname }}</div>
        <div class="ytxd-login-body">
            <mg-form class="ytxd-login-body-form" ref="formRefs" :job="formJob" :schema="{ formSchema, cellSchema }"
                @monitor-value="formAction.monitorValue">
            </mg-form>
            <div class="ytxd-login-body-control">
                <p>验证码</p>
                <p>描述</p>
                <p>记住密码 | 重置密码</p>
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
