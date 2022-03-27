<script setup>
import { reactive } from 'vue';
import CreateDeliveryAddressForm from '@/components/CreateDeliveryAddressForm.vue';
import NotificationService from '@/services/notify';
import { useSalesDeliveryAddressStore } from '@/stores/sales/deliveryAddress';
import router from '@/router';

const store = useSalesDeliveryAddressStore();

const props = defineProps({
  deliveryAddressId: Number,
});

const vm = reactive({
  deliveryAddress: null,
  isLoading: true
});

store.fetchOneDeliveryAddress(props.deliveryAddressId).then(() => {
  vm.isLoading = false;
  vm.deliveryAddress = store.selectedDeliveryAddress;
});

const submitForm = (deliveryAddressModel) => {
  vm.isLoading = true;
  store.updateDeliveryAddress(deliveryAddressModel)
    .then(() => {
      NotificationService.notifySuccess('Delivery address updated');
      router.push({ path: '/dashboard/sales-management/delivery-addresses' });
    })
    .catch(() => NotificationService.notifyError('Could not update delivery address'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update delivery address</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.deliveryAddress !== null">
      <CreateDeliveryAddressForm
        :deliveryAddress="vm.deliveryAddress"
        @submit="submitForm($event)"
      />
    </div>
  </div>
</template>
