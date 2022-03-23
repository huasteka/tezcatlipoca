<script setup>
import { reactive } from 'vue';
import CreateClientForm from '@/components/CreateClientForm.vue';
import NotificationService from '@/services/notify';
import { useSalesClientStore } from '@/stores/sales/client';
import router from '@/router';

const store = useSalesClientStore();

const vm = reactive({ isLoading: false });

const submitForm = ({ contacts, ...client }) => {
  vm.isLoading = true;

  store.createClient({ ...client })
    .then((cliente_id) => {
      NotificationService.notifySuccess('Client created');

      if (contacts.length === 0) {
        router.push({ path: '/dashboard/sales-management/clients' });
        return;
      }

      const promises = contacts.map(
        (contact) => store.createClientContact(cliente_id, contact)
      );

      Promise.all(promises)
        .then(() => {
          NotificationService.notifySuccess('Client contacts created');
          router.push({ path: '/dashboard/sales-management/clients' });
        })
        .catch(() => NotificationService.notifyError('Could not create client contacts'))
        .finally(() => vm.isLoading = false)
    })
    .catch(() => {
      vm.isLoading = false;
      NotificationService.notifyError('Could not create client');
    });
}
</script>

<template>
  <h2>Create client</h2>

  <div v-loading="vm.isLoading">
    <CreateClientForm @submit="submitForm($event)" />
  </div>
</template>
