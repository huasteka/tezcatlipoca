<script setup>
import StorageOperationForm from '@/components/StorageOperationForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';

const store = useStorageStore();

const handleSubmit = ({ model, clearForm }) => {
  store.createDepositOperation(model)
    .then(() => {
      NotificationService.notifySuccess('A deposit was issued into the storage');
      clearForm();
    })
    .catch(() => NotificationService.notifyError('Could not deposit into storage'));
}
</script>

<template>
  <h2>Storage Deposit</h2>

  <StorageOperationForm @submit="handleSubmit($event)" />
</template>
