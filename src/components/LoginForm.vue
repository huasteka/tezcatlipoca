<script setup>
import { ref, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { Select } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useAuthStore } from '@/stores/authentication';
import loginValidator from '@/validators/loginValidator';
import router from '@/router';

const authStore = useAuthStore();

const loginFormRef = ref();
const loginForm = reactive({
  email: 'teste@admin.com',
  password: 'teste@admin',
});
const rules = reactive(loginValidator);

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    authStore
      .login(form.model)
      .then(() => {
        form.resetFields();
        router.push({ path: '/dashboard' });
      })
      .catch(() => NotificationService.notifyError('Credentials are incorrect'));
  });
};
</script>

<template>
  <h2 class="center-form-title">Login into your account</h2>

  <el-form label-width="100px" ref="loginFormRef" :model="loginForm" :rules="rules">
    <el-form-item label="E-mail" prop="email">
      <el-input v-model="loginForm.email"></el-input>
    </el-form-item>

    <el-form-item label="Password" prop="password">
      <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :icon="Select" @click="submitForm(loginFormRef)">Login</el-button>
    </el-form-item>
  </el-form>

  <div class="align-router-link-right">
    <RouterLink to="/welcome/register" v-slot="{ href }" custom>
      <el-link type="primary" :href="href" :underline="false">Don't have an account?</el-link>
    </RouterLink>
  </div>
</template>

<style scoped>
.center-form-title {
  text-align: center;
}
.align-router-link-right {
  text-align: center;
}
</style>

