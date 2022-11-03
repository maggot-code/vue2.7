<!--
 * @FilePath: /vue2.7/src/template/unknow/view/unknow.vue
 * @Author: maggot-code
 * @Date: 2022-11-03 09:21:06
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 01:59:31
 * @Description: 
-->
<script setup>
import { useDialog } from "@/hooks/useDialog";

const dialog = useDialog();

function open() {
    dialog.define();
}
</script>

<template>
    <div>
        <h1>unknow</h1>
        <el-button type="primary" @click="open">打开</el-button>
    </div>
</template>

<style scoped lang='scss'>

</style>
