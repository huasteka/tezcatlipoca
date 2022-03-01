<script setup>
import { ref, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import { Lock } from '@element-plus/icons-vue';
import router from '../router';
import { useAuthStore } from '../stores/authentication';
import loginValidator from '../validators/loginValidator';

const loginFormRef = ref();

const loginForm = reactive({
  email: '',
  password: '',
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

    useAuthStore()
      .login(form.model)
      .then(() => {
        form.resetFields();
        router.push({ path: '/dashboard' });
      });
  });
};
</script>

<template>
  <h2>Login into your account</h2>

  <el-form label-width="100px" ref="loginFormRef" :model="loginForm" :rules="rules">
    <el-form-item label="E-mail" prop="email">
      <el-input v-model="loginForm.email"></el-input>
    </el-form-item>

    <el-form-item label="Password" prop="password">
      <el-input v-model="loginForm.password" type="password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :icon="Lock" @click="submitForm(loginFormRef)">Login</el-button>
    </el-form-item>
  </el-form>

  <div class="align-router-link-right">
    <RouterLink to="/welcome/register" v-slot="{ href }" custom>
      <el-link type="primary" :href="href" :underline="false">Don't have an account?</el-link>
    </RouterLink>
  </div>
</template>

<style scoped>
.align-router-link-right {
  text-align: right;
}
</style>

