<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createAccountValidator from '@/validators/createAccountValidator';
import router from '@/router';

const props = defineProps({
  account: Object,
});

const emit = defineEmits(['submit']);

const { id = null, name = '', code = '' } = props.account || {};
const createAccountFormRef = ref();
const createAccountForm = reactive({ id, name, code });
const rules = reactive(createAccountValidator);

const navigateBack = () => router.push({ path: '/dashboard/finance-management/accounts' });

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    emit('submit', form.model);
  });
}
</script>

<template>
  <el-form label-width="120px" ref="createAccountFormRef" :model="createAccountForm" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="createAccountForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Code" prop="code">
      <el-input v-model="createAccountForm.code" style="width: 100px"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createAccountFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
