<script setup>
import SalesSaleOrderForm from '@/components/SalesSaleOrderForm.vue';
import NotificationService from '@/services/notify';
import { useSalesSaleStore } from '@/stores/sales/sale';

const store = useSalesSaleStore();

const submitForm = ({ model, clearForm }) => {
  store.createSale(model)
    .then(() => {
      NotificationService.notifySuccess('A sales order was created');
      clearForm();
    })
    .catch(() => NotificationService.notifyError('Could not create the sales order'));
}
</script>

<template>
  <h2>Create Sales Order</h2>

  <SalesSaleOrderForm @submit="submitForm($event)" />
</template>
