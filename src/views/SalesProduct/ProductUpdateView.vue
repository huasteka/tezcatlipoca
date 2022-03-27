<script setup>
import { reactive } from 'vue';
import SalesProductForm from '@/components/SalesProductForm.vue';
import NotificationService from '@/services/notify';
import { useSalesProductStore } from '@/stores/sales/product';
import router from '@/router';

const store = useSalesProductStore();

const props = defineProps({
  productId: Number,
});

const vm = reactive({
  product: null,
  isLoading: true
});

store.fetchOneProduct(props.productId).then(() => {
  vm.isLoading = false;
  vm.product = store.selectedProduct;
});

const submitForm = (productModel) => {
  vm.isLoading = true;
  store.updateProduct(productModel)
    .then(() => {
      NotificationService.notifySuccess('Product updated');
      router.push({ path: '/dashboard/sales-management/products' });
    })
    .catch(() => NotificationService.notifyError('Could not update product'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update product</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.product !== null">
      <SalesProductForm :product="vm.product" @submit="submitForm($event)" />
    </div>
  </div>
</template>
