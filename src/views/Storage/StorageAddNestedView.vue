<script setup>
import { reactive } from 'vue';
import StorageForm from '@/components/StorageForm.vue';
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
  store.createNestedStorage({ parentId: vm.storage.id, ...storageModel })
    .then(() => router.push({ path: '/dashboard/storage-management/storages' }))
    .catch(() => NotificationService.notifyError('Could not append storage'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Append storage</h2>

  <div v-loading="vm.isLoading">
    <StorageForm @submit="submitForm($event)" />
  </div>
</template>
