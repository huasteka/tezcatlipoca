<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createBudgetGroupValidator from '@/validators/createBudgetGroupValidator';
import router from '@/router';

const props = defineProps({
  budgetGroup: Object,
});

const emit = defineEmits(['submit']);

const { id = null, name = '' } = props.budgetGroup || {};
const createBudgetGroupFormRef = ref();
const createBudgetGroupForm = reactive({ id, name });
const rules = reactive(createBudgetGroupValidator);

const navigateBack = () => router.push({ path: '/dashboard/finance-management/budget-groups' });

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
  <el-form label-width="120px" ref="createBudgetGroupFormRef" :model="createBudgetGroupForm" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="createBudgetGroupForm.name"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createBudgetGroupFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
