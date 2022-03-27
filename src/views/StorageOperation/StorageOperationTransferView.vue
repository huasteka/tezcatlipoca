<script setup>
import Alert from '@/components/Alert.vue';
import StorageOperationTransferForm from '@/components/StorageOperationTransferForm.vue';
import NotificationService from '@/services/notify';
import { useAlertStore } from '@/stores/alerts';
import { useStorageStore } from '@/stores/storage';

const alertStore = useAlertStore();
const storageStore = useStorageStore();

const handleSubmit = ({ model, clearForm }) => {
  storageStore.createTransferOperation(model)
    .then(() => {
      NotificationService.notifySuccess('A transfer was issued between the source and target storages');
      clearForm();
    })
    .catch(({ response }) =>
      response.data?.errors?.forEach(
        (error) => alertStore.error(error.title)
      )
    );
}
</script>

<template>
  <h2>Storage Transfer</h2>

  <Alert />

  <StorageOperationTransferForm @submit="handleSubmit($event)" />
</template>
