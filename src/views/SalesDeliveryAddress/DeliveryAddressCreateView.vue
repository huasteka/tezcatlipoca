<script setup>
import CreateDeliveryAddressForm from '@/components/CreateDeliveryAddressForm.vue';
import NotificationService from '@/services/notify';
import { useSalesDeliveryAddressStore } from '@/stores/sales/deliveryAddress';
import router from '@/router';

const store = useSalesDeliveryAddressStore();

const submitForm = (deliveryAddressModel) => {
  store.createDeliveryAddress(deliveryAddressModel)
    .then(() => {
      NotificationService.notifySuccess('Delivery address created');
      router.push({ path: '/dashboard/sales-management/delivery-addresses' });
    })
    .catch(() => NotificationService.notifyError('Could not create delivery address'));
}
</script>

<template>
  <h2>Create delivery address</h2>

  <CreateDeliveryAddressForm @submit="submitForm($event)" />
</template>
