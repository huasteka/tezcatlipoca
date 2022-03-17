<script setup>
import { reactive } from 'vue';
import CreateItemForm from '@/components/CreateItemForm.vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const props = defineProps({
  itemId: Number,
});

const vm = reactive({
  item: null,
  isLoading: true
});

store.fetchOneItem(props.itemId).then(() => {
  vm.isLoading = false;
  vm.item = store.selectedItem;
});

const submitForm = (itemModel) => {
  vm.isLoading = true;
  store.updateItem(itemModel)
    .then(() => {
      NotificationService.notifySuccess('Item updated')
      router.push({ path: '/dashboard/storage-management/items' })
    })
    .catch(() => NotificationService.notifyError('Could not update item'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update item</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.item !== null">
      <CreateItemForm :item="vm.item" @submit="submitForm($event)" />
    </div>
  </div>
</template>
