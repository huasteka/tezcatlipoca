<script setup>
import { reactive } from 'vue';
import CreateMeasureUnitForm from '@/components/CreateMeasureUnitForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const props = defineProps({
  measureUnitId: Number,
});

const vm = reactive({
  measureUnit: null,
  isLoading: true
});

store.fetchOneMeasureUnit(props.measureUnitId).then(() => {
  vm.isLoading = false;
  vm.measureUnit = store.selectedMeasureUnit;
});

const submitForm = (measureUnitModel) => {
  vm.isLoading = true;
  store.updateMeasureUnit(measureUnitModel)
    .then(() => {
      NotificationService.notifySuccess('Measurement unit updated');
      router.push({ path: '/dashboard/storage-management/measure-units' });
    })
    .catch(() => NotificationService.notifyError('Could not update measurement unit'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update measurement unit</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.measureUnit !== null">
      <CreateMeasureUnitForm :measure-unit="vm.measureUnit" @submit="submitForm($event)" />
    </div>
  </div>
</template>
