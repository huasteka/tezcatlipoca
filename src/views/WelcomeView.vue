<script setup>
import { RouterView } from 'vue-router';
import LogoImage from '@/components/LogoImage.vue';
import WelcomeImage from '@/components/WelcomeImage.vue';

const mainHeroTitle = 'Huasteka';
const mainHeroContent = 'A management system for you to take control of your company.';
</script>

<template>
  <el-container>
    <el-aside width="35%">
      <div class="logo-container">
        <LogoImage />
      </div>

      <RouterView />
    </el-aside>

    <el-main>
      <div class="main-hero-container">
        <div class="main-hero-section">
          <h1 class="main-hero-section-title">{{ mainHeroTitle }}</h1>
          <p class="main-hero-section-content">{{ mainHeroContent }}</p>
        </div>
      </div>

      <WelcomeImage />
    </el-main>
  </el-container>
</template>

<style scoped>
.logo-container {
  margin-bottom: 85px;
}
.main-hero-container {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
}

.main-hero-section {
  display: block;
  margin: 0 auto;
  width: 80%;
}

.main-hero-section-title {
  font-size: 3em;
  text-align: center;
}

.main-hero-section-content {
  font-size: 1.5em;
  text-align: center;
}
</style>
