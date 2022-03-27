<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createBudgetCategoryValidator from '@/validators/createBudgetCategoryValidator';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const props = defineProps({
  budgetCategory: Object,
});

const emit = defineEmits(['submit']);

const { id = null, name = '', group = null } = props.budgetCategory || {};
const createBudgetCategoryFormRef = ref();
const createBudgetCategoryForm = reactive({ id, name, budgetGroupId: group?.id });
const rules = reactive(createBudgetCategoryValidator);

const vm = reactive({ isLoading: true });
store.fetchBudgetGroupList().then(() => vm.isLoading = false);

const navigateBack = () => router.push({ path: '/dashboard/finance-management/budget-categories' });

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    const { id, name, budgetGroupId } = form.model;
    emit('submit', { id, name, group: { id: budgetGroupId } });
  });
}
</script>

<template>
  <el-form
    label-width="150px"
    ref="createBudgetCategoryFormRef"
    :model="createBudgetCategoryForm"
    :rules="rules"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="createBudgetCategoryForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Budget Group" prop="budgetGroupId">
      <el-select
        placeholder="Select a budget group"
        v-model="createBudgetCategoryForm.budgetGroupId"
        :loading="vm.isLoading"
      >
        <el-option
          v-for="budgetGroup in store.budgetGroups"
          :key="budgetGroup.id"
          :label="`${budgetGroup.name}`"
          :value="budgetGroup.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button
        type="primary"
        :icon="Select"
        @click="submitForm(createBudgetCategoryFormRef)"
      >Submit</el-button>
    </el-form-item>
  </el-form>
</template>
