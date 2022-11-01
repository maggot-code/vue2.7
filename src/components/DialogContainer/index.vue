<!--
 * @FilePath: \ytxd-ui\src\components\DialogContainer\index.vue
 * @Author: maggot-code
 * @Date: 2022-10-31 15:18:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-10-31 15:27:22
 * @Description: 
-->
<script>
const name = "dialog-container";
export default { name }
</script>
<script setup>
const className = computed(() => {
    return [name];
});
</script>

<template>
    <div :class="className">
        <slot></slot>
        <el-dialog title="提示">
            <span>这是一段信息</span>
        </el-dialog>
    </div>
</template>

<style scoped lang='scss'>
.dialog-container{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
