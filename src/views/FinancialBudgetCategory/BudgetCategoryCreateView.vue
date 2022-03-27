<script setup>
import FinancialBudgetCategoryForm from '@/components/FinancialBudgetCategoryForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const submitForm = (budgetCategoryModel) => {
  store.createBudgetCategory(budgetCategoryModel)
    .then(() => {
      NotificationService.notifySuccess('Budget category created');
      router.push({ path: '/dashboard/finance-management/budget-categories' });
    })
    .catch(() => NotificationService.notifyError('Could not create budget category'));
}
</script>

<template>
  <h2>Create budget category</h2>

  <FinancialBudgetCategoryForm @submit="submitForm($event)" />
</template>
