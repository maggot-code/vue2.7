<!--
 * @FilePath: /vue2.7/src/pages/Paper/paper.vue
 * @Author: maggot-code
 * @Date: 2022-10-31 15:12:14
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 00:39:00
 * @Description: 
-->
<script setup>
import { CurdView } from "@/template/curd";
import { useDialog } from "@/hooks/useDialog";

const dialog = useDialog();

function open() {
    dialog.define();
}
</script>

<template>
    <div class="box">
        <div class="box-button">
            <el-button type="primary" @click="open">打开</el-button>
        </div>
        <div class="box-main">
            <curd-view></curd-view>
        </div>
    </div>
</template>

<style scoped lang='scss'>
.box {
    width: 100%;
    height: 100%;
    overflow: hidden;

    &-button {
        width: 100%;
        height: 48px;
    }

    &-main {
        width: 100%;
        height: calc(100% - 50px);
    }
}
</style>
