<script setup>
import CreateMeasureUnitForm from '@/components/CreateMeasureUnitForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const submitForm = (measureUnitModel) => {
  store.createMeasureUnit(measureUnitModel)
    .then(() => {
      NotificationService.notifySuccess('Measurement unit created');
      router.push({ path: '/dashboard/storage-management/measure-units' });
    })
    .catch(() => NotificationService.notifyError('Could not create measurement unit'));
}
</script>

<template>
  <h2>Create measurement unit</h2>

  <CreateMeasureUnitForm @submit="submitForm($event)" />
</template>
