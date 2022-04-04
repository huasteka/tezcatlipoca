<script setup>
import { RouterView } from 'vue-router';
import 'element-plus/theme-chalk/display.css';
import LogoImage from '@/components/LogoImage.vue';
import WelcomeImage from '@/components/WelcomeImage.vue';

const mainHeroTitle = 'Huasteka';
const mainHeroContent = 'A management system for you to take control of your company.';
</script>

<template>
  <el-row :gutter="15">
    <el-col :xs="24" :md="9">
      <div class="logo-container">
        <LogoImage />
      </div>

      <RouterView />
    </el-col>

    <el-col :xs="24" :md="15">
      <div class="main-hero-container">
        <div class="main-hero-section">
          <h1 class="main-hero-section-title">{{ mainHeroTitle }}</h1>
          <p class="main-hero-section-content">{{ mainHeroContent }}</p>
        </div>
      </div>

      <WelcomeImage />
    </el-col>
  </el-row>
</template>

<style scoped>
.login-form-container {
  margin: 0 auto;
  text-align: center;
}

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
