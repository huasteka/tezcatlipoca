<script setup>
import CreateStorageForm from '@/components/CreateStorageForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const submitForm = (storageModel) => {
  store.createStorage(storageModel)
    .then(() => {
      NotificationService.notifySuccess('Storage created');
      router.push({ path: '/dashboard/storage-management/storages' });
    })
    .catch(() => NotificationService.notifyError('Could not create storage'));
}
</script>

<template>
  <h2>Create storage</h2>

  <CreateStorageForm @submit="submitForm($event)" />
</template>
