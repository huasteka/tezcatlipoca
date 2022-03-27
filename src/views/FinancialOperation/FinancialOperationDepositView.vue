<script setup>
import FinancialOperationForm from '@/components/FinancialOperationForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';

const store = useFinancialStore();

const handleSubmit = ({ model, clearForm }) => {
  store.createDepositOperation(model)
    .then(() => {
      NotificationService.notifySuccess('A deposit was issued into the selected account');
      clearForm();
    })
    .catch(() => NotificationService.notifyError('Could not deposit into selected account'));
}
</script>

<template>
  <h2>Deposit into account</h2>

  <FinancialOperationForm @submit="handleSubmit($event)" />
</template>
