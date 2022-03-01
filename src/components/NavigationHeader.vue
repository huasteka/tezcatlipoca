<script setup>
import { ref } from 'vue';

const activeIndex = ref('dashboard');

const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
}
</script>

<template>
  <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <el-menu-item index="dashboard">Dashboard</el-menu-item>

    <el-sub-menu index="1">
      <template #title>Item 1</template>
      <el-menu-item index="1-1">Item 1-A</el-menu-item>
      <el-menu-item index="1-2">Item 1-B</el-menu-item>
      <el-menu-item index="1-3">Item 1-C</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>Item 2</template>
      <el-menu-item index="2-1">Item 2-A</el-menu-item>
      <el-menu-item index="2-2">Item 2-B</el-menu-item>
      <el-menu-item index="2-3">Item 2-C</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>
