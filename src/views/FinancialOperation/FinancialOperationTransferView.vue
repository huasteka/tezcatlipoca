<script setup>
import Alert from '@/components/Alert.vue';
import CreateFinancialTransferForm from '@/components/CreateFinancialTransferForm.vue';
import NotificationService from '@/services/notify';
import { useAlertStore } from '@/stores/alerts';
import { useFinancialStore } from '@/stores/finance';

const alertStore = useAlertStore();
const financialStore = useFinancialStore();

const handleSubmit = ({ model, clearForm }) => {
  financialStore.createTransferOperation(model)
    .then(() => {
      NotificationService.notifySuccess('A transfer was issued between the origin and destination accounts');
      clearForm();
    })
    .catch(({ response }) =>
      response.data?.errors?.forEach(
        (error) => alertStore.error(error.message)
      )
    );
}
</script>

<template>
  <h2>Transfer between accounts</h2>

  <Alert />

  <CreateFinancialTransferForm @submit="handleSubmit($event)" />
</template>
