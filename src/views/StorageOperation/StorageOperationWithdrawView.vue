<script setup>
import StorageOperationForm from '@/components/StorageOperationForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';

const store = useStorageStore();

const handleSubmit = ({ model, clearForm }) => {
  store.createWithdrawOperation(model)
    .then(() => {
      NotificationService.notifySuccess('A withdrawal has been made into the storage');
      clearForm();
    })
    .catch(() => NotificationService.notifyError('Could not withdraw from storage'));
}
</script>

<template>
  <h2>Storage Withdraw</h2>

  <StorageOperationForm @submit="handleSubmit($event)" />
</template>
