<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const vm = reactive({ isLoading: true });
store.fetchAccountList().then(() => {
  vm.isLoading = false;
});

const handleNewAccount = () => {
  router.push({ path: '/dashboard/finance-management/accounts/new' });
}

const handleUpdateAccount = (event) => {
  router.push({ path: `/dashboard/finance-management/accounts/${event.id}/edit` })
}

const handleDeleteAccount = (event) => {
  ElMessageBox.confirm('Are you sure to delete this account?')
    .then(() => {
      store.deleteAccount(event.id)
        .then(() => NotificationService.notifySuccess('Measurement unit deleted'))
        .catch(() => NotificationService.notifyError('Could not delete account'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List accounts</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.accounts"
    v-loading="vm.isLoading"
  >
    <el-table-column width="100" prop="id" label="#" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="code" label="Code" />

    <el-table-column width="180">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewAccount()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdateAccount(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeleteAccount(scope.row)">
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
