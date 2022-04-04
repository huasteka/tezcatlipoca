<script setup>
import { RouterView } from 'vue-router';
import 'element-plus/theme-chalk/display.css';
import NavigationHeader from '@/components/NavigationHeader.vue';
</script>

<template>
  <el-container>
    <el-header>
      <NavigationHeader />
    </el-header>

    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>
