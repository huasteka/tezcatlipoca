<script setup>
import { ref, reactive } from 'vue';
import { EditPen } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useAuthStore } from '@/stores/authentication';
import securitySettingsValidator from '@/validators/securitySettingsValidator';

const authStore = useAuthStore();
authStore.fetchUserProfile();

const userSecurityFormRef = ref();
const userSecurityForm = reactive({
  userId: '',
  password: '',
  passwordConfirmation: '',
});
const rules = reactive(securitySettingsValidator);

const status = reactive({ isLoading: true });
authStore.fetchUserProfile().then(() => {
  status.isLoading = false;
  userSecurityForm.userId = authStore.userProfile.id;
});

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    authStore
      .changePassword(form.model)
      .then(() => {
        form.resetFields();
        NotificationService.notifySuccess('Successfully changed user password', 'Password updated');
      })
      .catch(() => NotificationService.notifyError('Could not change user password'));
  });
};
</script>

<template>
  <div v-loading="status.isLoading">
    <h2>Security Settings</h2>

    <el-form label-width="175px" ref="userSecurityFormRef" :model="userSecurityForm" :rules="rules">
      <el-form-item label="Password" prop="password">
        <el-input v-model="userSecurityForm.password" type="password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="Password Confirmation" prop="passwordConfirmation">
        <el-input
          v-model="userSecurityForm.passwordConfirmation"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="EditPen" @click="submitForm(userSecurityFormRef)">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
