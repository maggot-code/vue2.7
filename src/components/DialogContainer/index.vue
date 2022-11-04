<!--
 * @FilePath: \vue2.7\src\components\DialogContainer\index.vue
 * @Author: maggot-code
 * @Date: 2022-10-31 15:18:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-04 14:59:33
 * @Description: 
-->
<script>
const name = "dialog-container";
export default { name }
</script>
<script setup>
import { defineDialog } from "./defineDialog";

const dialog = defineDialog();
const { source } = dialog;

const className = computed(() => {
    return [name];
});
</script>

<template>
    <div :class="className">
        <slot></slot>
        <template v-for="(entity) in source">
            <el-dialog :key="entity.name" v-bind="entity.toBind()" @close="entity.release">
                <div slot="title"></div>
                <components :is="entity.component" :entityDialog="entity" :ctx="entity.context"></components>
            </el-dialog>
        </template>
    </div>
</template>

<style scoped lang='scss'>
.dialog-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
