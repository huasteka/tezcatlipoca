<script setup>
import { reactive } from 'vue';
import CreateStorageForm from '@/components/CreateStorageForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const props = defineProps({
  storageId: Number,
});

const vm = reactive({
  storage: null,
  isLoading: true
});

store.fetchOneStorage(props.storageId).then(() => {
  vm.isLoading = false;
  vm.storage = store.selectedStorage;
});

const submitForm = (storageModel) => {
  vm.isLoading = true;
  store.updateStorage(storageModel)
    .then(() => {
      NotificationService.notifySuccess('Storage updated');
      router.push({ path: '/dashboard/storage-management/storages' });
    })
    .catch(() => NotificationService.notifyError('Could not update storage'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update storage</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.storage !== null">
      <CreateStorageForm :storage="vm.storage" @submit="submitForm($event)" />
    </div>
  </div>
</template>
