<script setup>
import CreateItemForm from '@/components/CreateItemForm.vue';
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

  <CreateItemForm @submit="submitForm($event)" />
</template>
