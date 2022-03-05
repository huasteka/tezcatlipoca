<script setup>
import svgWelcomeImage from '@/assets/welcome.svg';
</script>

<template>
  <div class="center-svg-logo">
    <el-image style="width: 450px; height: 350px" :src="svgWelcomeImage" />
  </div>
</template>

<style scoped>
.center-svg-logo {
  margin: 0 auto;
  text-align: center;
}
</style>