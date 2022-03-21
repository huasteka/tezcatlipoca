<script setup>
import { reactive } from 'vue';
import CreateBudgetGroupForm from '@/components/CreateBudgetGroupForm.vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const props = defineProps({
  budgetGroupId: Number,
});

const vm = reactive({
  budgetGroup: null,
  isLoading: true
});

store.fetchOneBudgetGroup(props.budgetGroupId).then(() => {
  vm.isLoading = false;
  vm.budgetGroup = store.selectedBudgetGroup;
});

const submitForm = (budgetGroupModel) => {
  vm.isLoading = true;
  store.updateBudgetGroup(budgetGroupModel)
    .then(() => {
      NotificationService.notifySuccess('Budget group updated')
      router.push({ path: '/dashboard/finance-management/budget-groups' })
    })
    .catch(() => NotificationService.notifyError('Could not update budget group'))
    .finally(() => vm.isLoading = false);
}
</script>

<template>
  <h2>Update budget group</h2>

  <div v-loading="vm.isLoading">
    <div v-if="vm.budgetGroup !== null">
      <CreateBudgetGroupForm :budgetGroup="vm.budgetGroup" @submit="submitForm($event)" />
    </div>
  </div>
</template>
