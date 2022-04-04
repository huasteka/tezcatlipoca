<script setup>
import { reactive } from 'vue';
import FinancialAccountForm from '@/components/FinancialAccountForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const props = defineProps({
  accountId: Number,
});

const vm = reactive({
  account: null,
  isLoading: true
});

store.fetchOneAccount(props.accountId).then(() => {
  vm.isLoading = false;
  vm.account = store.selectedAccount;
});

const submitForm = (accountModel) => {
  vm.isLoading = true;
  store.updateAccount(accountModel)
    .then(() => {
      NotificationService.notifySuccess('Measurement unit updated')
      router.push({ path: '/dashboard/finance-management/accounts' })
    })
    .catch(() => NotificationService.notifyError('Could not update measurement unit'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update account</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.account !== null">
      <FinancialAccountForm :account="vm.account" @submit="submitForm($event)" />
    </div>
  </div>
</template>
