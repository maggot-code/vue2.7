<!--
 * @FilePath: \vue2.7\src\components\Empty\empty.vue
 * @Author: maggot-code
 * @Date: 2022-11-03 09:24:57
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 09:28:06
 * @Description: 
-->
<script setup></script>

<template>
    <div class="empty-container">
        <el-empty description="暂无资源"></el-empty>
    </div>
</template>

<style scoped lang='scss'>
.empty-container {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    min-width: 320px;
    min-height: 320px;
    overflow: hidden;
}
</style>
