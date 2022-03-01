<script setup>
import { ref, reactive } from 'vue';
import { Select } from '@element-plus/icons-vue';
import router from '../router';
import { useAuthStore } from '../stores/authentication';
import registrationValidator from '../validators/registrationValidator';

const registerFormRef = ref();

const registerForm = reactive({
  name: '',
  email: '',
  password: '',
});

const rules = reactive(registrationValidator);

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    useAuthStore()
      .register(form.model)
      .then(() => {
        form.resetFields();
        router.push({ path: '/dashboard' });
      });
  });
};
</script>

<template>
  <h2>Register a new account</h2>

  <el-form label-width="100px" ref="registerFormRef" :model="registerForm" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>

    <el-form-item label="E-mail" prop="email">
      <el-input v-model="registerForm.email"></el-input>
    </el-form-item>

    <el-form-item label="Password" prop="password">
      <el-input v-model="registerForm.password" type="password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :icon="Select" @click="submitForm(registerFormRef)">Register</el-button>
    </el-form-item>
  </el-form>

  <div class="align-router-link-right">
    <RouterLink to="/welcome" v-slot="{ href }" custom>
      <el-link type="primary" :href="href" :underline="false">I already have an account</el-link>
    </RouterLink>
  </div>
</template>

<style scoped>
.align-router-link-right {
  text-align: right;
}
</style>
