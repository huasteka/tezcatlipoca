<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createProductValidator from '@/validators/createProductValidator';
import router from '@/router';

const props = defineProps({
  product: Object,
});

const emit = defineEmits(['submit']);

const { id = null, name = '', code = '' } = props.product || {};
const createProductFormRef = ref();
const createProductForm = reactive({ id, name, code });
const rules = reactive(createProductValidator);

const navigateBack = () => router.push({ path: '/dashboard/sales-management/products' });

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
  <el-form label-width="150px" ref="createProductFormRef" :model="createProductForm" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="createProductForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Code" prop="code">
      <el-input v-model="createProductForm.code" style="width: 100px"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createProductFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
