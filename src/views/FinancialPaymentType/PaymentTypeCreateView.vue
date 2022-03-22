<script setup>
import CreatePaymentTypeForm from '@/components/CreatePaymentTypeForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const submitForm = (paymentTypeModel) => {
  store.createPaymentType(paymentTypeModel)
    .then(() => {
      NotificationService.notifySuccess('Payment type created');
      router.push({ path: '/dashboard/finance-management/payment-types' });
    })
    .catch(() => NotificationService.notifyError('Could not create payment types'));
}
</script>

<template>
  <h2>Create payment types</h2>

  <CreatePaymentTypeForm @submit="submitForm($event)" />
</template>
