<script setup>
import { reactive } from 'vue';
import SalesSupplierForm from '@/components/SalesSupplierForm.vue';
import NotificationService from '@/services/notify';
import { useSalesSupplierStore } from '@/stores/sales/supplier';
import router from '@/router';

const store = useSalesSupplierStore();

const props = defineProps({
  supplierId: Number,
});

const vm = reactive({
  supplier: null,
  isLoading: true
});

store.fetchOneSupplier(props.supplierId).then(() => {
  vm.isLoading = false;
  vm.supplier = store.supplierWithRelationships;
});

const submitForm = ({ contacts, ...supplier }) => {
  vm.isLoading = true;
  store.updateSupplier({ ...supplier })
    .then((supplier_id) => {
      NotificationService.notifySuccess('Supplier updated');

      if (contacts.length === 0) {
        router.push({ path: '/dashboard/sales-management/suppliers' });
        return;
      }

      const promises = contacts.map((contact) => {
        if (contact.deletionMarked === true) {
          return store.deleteSupplierContact(supplier_id, contact.id);
        }

        return contact.id ? (
          store.updateSupplierContact(supplier_id, contact)
        ) : (
          store.createSupplierContact(supplier_id, contact)
        );
      });

      Promise.all(promises)
        .then(() => {
          NotificationService.notifySuccess('Supplier contact updated');
          router.push({ path: '/dashboard/sales-management/suppliers' })
        })
        .catch(() => NotificationService.notifyError('Could not update supplier contacts'))
        .finally(() => vm.isLoading = false)

    })
    .catch(() => NotificationService.notifyError('Could not update supplier'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update supplier</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.supplier !== null">
      <SalesSupplierForm :supplier="vm.supplier" @submit="submitForm($event)" />
    </div>
  </div>
</template>
