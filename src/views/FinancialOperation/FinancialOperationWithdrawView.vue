<script setup>
import FinancialOperationForm from '@/components/FinancialOperationForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';

const store = useFinancialStore();

const handleSubmit = ({ model, clearForm }) => {
  store.createWithdrawOperation(model)
    .then(() => {
      NotificationService.notifySuccess('A withdrawal has been made into the selected account');
      clearForm();
    })
    .catch(() => NotificationService.notifyError('Could not withdraw from selected account'));
}
</script>

<template>
  <h2>Withdraw from account</h2>

  <FinancialOperationForm @submit="handleSubmit($event)" />
</template>
