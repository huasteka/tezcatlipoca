<script setup>
import StorageItemForm from '@/components/StorageItemForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const submitForm = (itemModel) => {
  store.createItem(itemModel)
    .then(() => {
      NotificationService.notifySuccess('Item created');
      router.push({ path: '/dashboard/storage-management/items' });
    })
    .catch(() => NotificationService.notifyError('Could not create item'));
}
</script>

<template>
  <h2>Create item</h2>

  <StorageItemForm @submit="submitForm($event)" />
</template>
