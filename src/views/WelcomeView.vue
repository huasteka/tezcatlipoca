<script setup>
import { RouterView } from 'vue-router';
import LogoImage from '@/components/LogoImage.vue';
</script>

<template>
  <el-container>
    <el-aside width="35%">
      <LogoImage />

      <RouterView />
    </el-aside>

    <el-main>
      <h1>Huasteka</h1>
      <p>A management system for you to take control of your company.</p>
    </el-main>
  </el-container>
</template>
