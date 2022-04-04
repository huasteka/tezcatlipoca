<script setup>
import FinancialPaymentTypeForm from '@/components/FinancialPaymentTypeForm.vue';
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
  <h2>Create payment type</h2>

  <FinancialPaymentTypeForm @submit="submitForm($event)" />
</template>
