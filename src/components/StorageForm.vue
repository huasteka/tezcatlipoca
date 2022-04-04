<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createStorageValidator from '@/validators/createStorageValidator';
import router from '@/router';

const props = defineProps({
  storage: Object,
});

const emit = defineEmits(['submit']);

const { id = null, name = '', code = '', parent_id = null } = props.storage || {};
const createStorageFormRef = ref();
const createStorageForm = reactive({ id, name, code, parent_id });
const rules = reactive(createStorageValidator);

const navigateBack = () => router.push({ path: '/dashboard/storage-management/storages' });

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
  <el-form label-width="90px" ref="createStorageFormRef" :model="createStorageForm" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="createStorageForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Code" prop="code">
      <el-input v-model="createStorageForm.code" style="width: 100px"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createStorageFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
