<script setup>
import SalesMerchandiseForm from '@/components/SalesMerchandiseForm.vue';
import NotificationService from '@/services/notify';
import { useSalesMerchandiseStore } from '@/stores/sales/merchandise';
import router from '@/router';

const store = useSalesMerchandiseStore();

const submitForm = ({ product_id, product, ...merchandise }) => {
  const payload = product_id ? (
    { product_id, ...merchandise }
  ) : (
    { product, ...merchandise }
  );

  store.createMerchandise(payload)
    .then(() => {
      NotificationService.notifySuccess('Merchandise created');
      router.push({ path: '/dashboard/sales-management/merchandises' });
    })
    .catch(() => NotificationService.notifyError('Could not create merchandise'));
}
</script>

<template>
  <h2>Create merchandise</h2>

  <SalesMerchandiseForm @submit="submitForm($event)" />
</template>
