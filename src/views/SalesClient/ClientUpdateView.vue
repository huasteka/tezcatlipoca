<script setup>
import { reactive } from 'vue';
import CreateClientForm from '@/components/CreateClientForm.vue';
import NotificationService from '@/services/notify';
import { useSalesClientStore } from '@/stores/sales/client';
import router from '@/router';

const store = useSalesClientStore();

const props = defineProps({
  clientId: Number,
});

const vm = reactive({
  client: null,
  isLoading: true
});

store.fetchOneClient(props.clientId).then(() => {
  vm.isLoading = false;
  vm.client = store.clientWithRelationships;
});

const submitForm = ({ contacts, ...client }) => {
  vm.isLoading = true;
  store.updateClient({ ...client })
    .then((client_id) => {
      NotificationService.notifySuccess('Client updated');

      const promises = contacts.map((contact) => {
        if (contact.deletionMarked === true) {
          return store.deleteClientContact(client_id, contact.id);
        }

        return contact.id ? (
          store.updateClientContact(client_id, contact)
        ) : (
          store.createClientContact(client_id, contact)
        );
      });

      Promise.all(promises)
        .then(() => {
          NotificationService.notifySuccess('Client contact updated');
          router.push({ path: '/dashboard/sales-management/clients' })
        })
        .catch(() => NotificationService.notifyError('Could not update client contacts'))
        .finally(() => vm.isLoading = false)

    })
    .catch(() => NotificationService.notifyError('Could not update client'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update client</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.client !== null">
      <CreateClientForm :client="vm.client" @submit="submitForm($event)" />
    </div>
  </div>
</template>
