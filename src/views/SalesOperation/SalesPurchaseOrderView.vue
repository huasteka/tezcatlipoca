<script setup>
import SalesPurchaseOrderForm from '@/components/SalesPurchaseOrderForm.vue';
import NotificationService from '@/services/notify';
import { useSalesPurchaseStore } from '@/stores/sales/purchase';

const store = useSalesPurchaseStore();

const submitForm = ({ model, clearForm }) => {
  store.createPurchase(model)
    .then(() => {
      NotificationService.notifySuccess('A purchase order was created');
      clearForm();
    })
    .catch(() => NotificationService.notifyError('Could not create the purchase order'));
}
</script>

<template>
  <h2>Create Purchase Order</h2>

  <SalesPurchaseOrderForm @submit="submitForm($event)" />
</template>
