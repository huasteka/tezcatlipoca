<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const vm = reactive({ isLoading: true });
store.fetchPaymentTypeList().then(() => {
  vm.isLoading = false;
});

const handleNewPaymentType = () => {
  router.push({ path: '/dashboard/finance-management/payment-types/new' });
}

const handleUpdatePaymentType = (event) => {
  router.push({ path: `/dashboard/finance-management/payment-types/${event.id}/edit` })
}

const handleDeletePaymentType = (event) => {
  ElMessageBox.confirm('Are you sure to delete this payment type?')
    .then(() => {
      store.deletePaymentType(event.id)
        .then(() => NotificationService.notifySuccess('Payment type deleted'))
        .catch(() => NotificationService.notifyError('Could not delete payment type'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List payment types</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.paymentTypes"
    v-loading="vm.isLoading"
  >
    <el-table-column width="100" prop="id" label="#" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="paymentAccount.name" label="Payment Account" />

    <el-table-column width="250">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewPaymentType()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdatePaymentType(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeletePaymentType(scope.row)">
            <el-icon>
              <Delete />
            </el-icon>
            <span>Delete</span>
          </el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.resize-and-center-data-table {
  margin: 0 auto;
  width: 80%;
}
.align-content-right {
  float: right;
}
</style>
