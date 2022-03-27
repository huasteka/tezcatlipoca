<script setup>
import SalesProductForm from '@/components/SalesProductForm.vue';
import NotificationService from '@/services/notify';
import { useSalesProductStore } from '@/stores/sales/product';
import router from '@/router';

const store = useSalesProductStore();

const submitForm = (productModel) => {
  store.createProduct(productModel)
    .then(() => {
      NotificationService.notifySuccess('Product created');
      router.push({ path: '/dashboard/sales-management/products' });
    })
    .catch(() => NotificationService.notifyError('Could not create product'));
}
</script>

<template>
  <h2>Create product</h2>

  <SalesProductForm @submit="submitForm($event)" />
</template>
