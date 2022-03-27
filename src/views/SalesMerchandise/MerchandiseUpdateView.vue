<script setup>
import { reactive } from 'vue';
import CreateMerchandiseForm from '@/components/CreateMerchandiseForm.vue';
import NotificationService from '@/services/notify';
import { useSalesMerchandiseStore } from '@/stores/sales/merchandise';
import router from '@/router';

const store = useSalesMerchandiseStore();

const props = defineProps({
  merchandiseId: Number,
});

const vm = reactive({
  merchandise: null,
  isLoading: true
});

store.fetchOneMerchandise(props.merchandiseId).then(() => {
  vm.isLoading = false;
  vm.merchandise = store.merchandiseWithRelationships;
});

const submitForm = ({ product_id, product, ...merchandise }) => {
  const payload = product_id ? (
    { product_id, ...merchandise }
  ) : (
    { product, ...merchandise }
  );

  vm.isLoading = true;
  store.updateMerchandise(payload)
    .then(() => {
      NotificationService.notifySuccess('Merchandise updated');
      router.push({ path: '/dashboard/sales-management/merchandises' });
    })
    .catch(() => NotificationService.notifyError('Could not update merchandise'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update merchandise</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.merchandise !== null">
      <CreateMerchandiseForm :merchandise="vm.merchandise" @submit="submitForm($event)" />
    </div>
  </div>
</template>
