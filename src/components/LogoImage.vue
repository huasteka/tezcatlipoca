<script setup>
import svgLogo from '@/assets/page-logo.svg';
</script>

<template>
  <div class="center-svg-logo">
    <el-image style="width: 200px; height: 200px" :src="svgLogo" />
  </div>
</template>

<style scoped>
.center-svg-logo {
  margin: 0 auto;
  text-align: center;
}
</style>