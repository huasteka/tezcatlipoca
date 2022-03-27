<script setup>
import { reactive } from 'vue';
import FinancialPaymentTypeForm from '@/components/FinancialPaymentTypeForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const props = defineProps({
  paymentTypeId: Number,
});

const vm = reactive({
  paymentType: null,
  isLoading: true
});

store.fetchOnePaymentType(props.paymentTypeId).then(() => {
  vm.isLoading = false;
  vm.paymentType = store.selectedPaymentType;
});

const submitForm = (paymentTypeModel) => {
  vm.isLoading = true;
  store.updatePaymentType(paymentTypeModel)
    .then(() => {
      NotificationService.notifySuccess('Payment type updated');
      router.push({ path: '/dashboard/finance-management/payment-types' });
    })
    .catch(() => NotificationService.notifyError('Could not update payment type'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update payment type</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.paymentType !== null">
      <FinancialPaymentTypeForm :paymentType="vm.paymentType" @submit="submitForm($event)" />
    </div>
  </div>
</template>
