<script setup>
import { RouterView } from 'vue-router';
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
