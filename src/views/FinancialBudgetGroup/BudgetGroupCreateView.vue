<script setup>
import CreateBudgetGroupForm from '@/components/CreateBudgetGroupForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const submitForm = (budgetGroupModel) => {
  store.createBudgetGroup(budgetGroupModel)
    .then(() => {
      NotificationService.notifySuccess('Budget group created');
      router.push({ path: '/dashboard/finance-management/budget-groups' });
    })
    .catch(() => NotificationService.notifyError('Could not create budget group'));
}
</script>

<template>
  <h2>Create budget group</h2>

  <CreateBudgetGroupForm @submit="submitForm($event)" />
</template>
