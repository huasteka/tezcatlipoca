<script setup>
import FinancialAccountForm from '@/components/FinancialAccountForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const submitForm = (measureUnitModel) => {
  store.createAccount(measureUnitModel)
    .then(() => {
      NotificationService.notifySuccess('Account created');
      router.push({ path: '/dashboard/finance-management/accounts' });
    })
    .catch(() => NotificationService.notifyError('Could not create account'));
}
</script>

<template>
  <h2>Create account</h2>

  <FinancialAccountForm @submit="submitForm($event)" />
</template>
