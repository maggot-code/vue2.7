<!--
 * @FilePath: \vue2.7\src\App.vue
 * @Author: maggot-code
 * @Date: 2022-10-31 11:39:28
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-03 14:34:08
 * @Description: 
-->
<script setup>
import MockRoute from "@/assets/json/routes.v1";

import { usePage, defineAsyncPage } from "@/router";
import { defineTree } from "@/utils/tree";

defineTree(MockRoute);
</script>

<template>
    <dialog-container>
        <router-view />
    </dialog-container>
</template>

<style scoped>

</style>
