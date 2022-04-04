<script setup>
import { ref, reactive } from 'vue';
import { EditPen } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useAuthStore } from '@/stores/authentication';
import profileSettingsValidator from '@/validators/profileSettingsValidator';

const authStore = useAuthStore();

const userProfileFormRef = ref();
const userProfileForm = reactive({
  userId: '',
  name: '',
});
const rules = reactive(profileSettingsValidator);

const status = reactive({ isLoading: true });
authStore.fetchUserProfile().then(() => {
  status.isLoading = false;
  userProfileForm.userId = authStore.userProfile.id;
  userProfileForm.name = authStore.userProfile.name;
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
      .changeUserName(form.model)
      .then(() => {
        NotificationService.notifySuccess('Successfully updated user profile', 'Profile updated')
      })
      .catch(() => NotificationService.notifyError('Could not update user profile'));
  });
};
</script>

<template>
  <div v-loading="status.isLoading">
    <h2>Profile Settings</h2>

    <el-form label-width="175px" ref="userProfileFormRef" :model="userProfileForm" :rules="rules">
      <el-form-item label="Name" prop="name">
        <el-input v-model="userProfileForm.name"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :icon="EditPen" @click="submitForm(userProfileFormRef)">Update</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
