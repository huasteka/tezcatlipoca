<script setup>
import { reactive } from 'vue';
import FinancialBudgetCategoryForm from '@/components/FinancialBudgetCategoryForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const props = defineProps({
  budgetCategoryId: Number,
});

const vm = reactive({
  budgetCategory: null,
  isLoading: true
});

store.fetchOneBudgetCategory(props.budgetCategoryId).then(() => {
  vm.isLoading = false;
  vm.budgetCategory = store.selectedBudgetCategory;
});

const submitForm = (budgetCategoryModel) => {
  vm.isLoading = true;
  store.updateBudgetCategory(budgetCategoryModel)
    .then(() => {
      NotificationService.notifySuccess('Budget category updated')
      router.push({ path: '/dashboard/finance-management/budget-categories' })
    })
    .catch(() => NotificationService.notifyError('Could not update budget category'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update budget category</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.budgetCategory !== null">
      <FinancialBudgetCategoryForm :budgetCategory="vm.budgetCategory" @submit="submitForm($event)" />
    </div>
  </div>
</template>
