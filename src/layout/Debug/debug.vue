<!--
 * @FilePath: \vue2.7\src\layout\Debug\debug.vue
 * @Author: maggot-code
 * @Date: 2022-11-07 09:37:39
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-07 10:09:46
 * @Description: 
 // 异步构建
 {
    uri:"/vue/debug",
    method:"GET",
    dataType:"json",
    props:{
        TABLE_NAME:"BIZ_DEBUG",
    }
 }

 // 同步构建
 {
    uri:"/vue/log",
    method:"POST",
    dataType:"formData",
    props:{
        TABLE_NAME:"BIZ_LOG",
    }
 }
-->
<script setup>
import axios from "axios";
// 服务基座
const defaultConfig = {
    uri: "",
    method: "GET",
    dataType: "json",
    props: {},
};
function defineService(define) {
    function bind(config) {
        console.log(config, defaultConfig);
    }

    return { bind }
}
// 服务定义
const publicServer = defineService(axios.create({
    baseURL: import.meta.env.BASE_URL,
}));
// 服务构建
const debugApp = publicServer.bind();
const logApp = publicServer.bind({
    uri: "/vue/log",
    method: "POST",
    dataType: "formData",
    props: {
        TABLE_NAME: "BIZ_LOG",
    }
});
// 服务编排
// 服务调用
// 服务消费
</script>

<template>
    <h1>debug</h1>
</template>

<style scoped lang='scss'>

</style>
