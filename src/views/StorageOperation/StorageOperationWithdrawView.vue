<script setup>
import CreateStorageOperationFormVue from '@/components/CreateStorageOperationForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';

const store = useStorageStore();

const handleSubmit = ({ model, clearForm }) => {
  store.createWithdrawOperation(model)
    .then(() => {
      NotificationService.notifySuccess('A withdraw was issued into the storage');
      clearForm();
    })
    .catch(() => NotificationService.notifyError('Could not withdraw from storage'));
}
</script>

<template>
  <h2>Storage Withdraw</h2>

  <CreateStorageOperationFormVue @submit="handleSubmit($event)" />
</template>
