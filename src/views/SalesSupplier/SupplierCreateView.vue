<script setup>
import { reactive } from 'vue';
import CreateSupplierForm from '@/components/CreateSupplierForm.vue';
import NotificationService from '@/services/notify';
import { useSalesSupplierStore } from '@/stores/sales/supplier';
import router from '@/router';

const store = useSalesSupplierStore();

const vm = reactive({ isLoading: false });

const submitForm = ({ contacts, ...supplier }) => {
  vm.isLoading = true;

  store.createSupplier({ ...supplier })
    .then((suppliere_id) => {
      NotificationService.notifySuccess('Supplier created');

      if (contacts.length === 0) {
        router.push({ path: '/dashboard/sales-management/suppliers' });
        return;
      }

      const promises = contacts.map(
        (contact) => store.createSupplierContact(suppliere_id, contact)
      );

      Promise.all(promises)
        .then(() => {
          NotificationService.notifySuccess('Supplier contacts created');
          router.push({ path: '/dashboard/sales-management/suppliers' });
        })
        .catch(() => NotificationService.notifyError('Could not create supplier contacts'))
        .finally(() => vm.isLoading = false)
    })
    .catch(() => {
      vm.isLoading = false;
      NotificationService.notifyError('Could not create supplier');
    });
}
</script>

<template>
  <h2>Create supplier</h2>

  <div v-loading="vm.isLoading">
    <CreateSupplierForm @submit="submitForm($event)" />
  </div>
</template>
