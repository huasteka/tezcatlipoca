<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useSalesSupplierStore } from '@/stores/sales/supplier';
import router from '@/router';

const store = useSalesSupplierStore();

const vm = reactive({ isLoading: true });
store.fetchSupplierList().then(() => {
  vm.isLoading = false;
});

const handleNewSupplier = () => {
  router.push({ path: '/dashboard/sales-management/suppliers/new' });
}

const handleUpdateSupplier = (event) => {
  router.push({ path: `/dashboard/sales-management/suppliers/${event.id}/edit` })
}

const handleDeleteSupplier = (event) => {
  ElMessageBox.confirm('Are you sure to delete this supplier?')
    .then(() => {
      store.deleteSupplier(event.id)
        .then(() => NotificationService.notifySuccess('Supplier deleted'))
        .catch(() => NotificationService.notifyError('Could not delete supplier'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List suppliers</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.suppliers"
    v-loading="vm.isLoading"
  >
    <el-table-column width="80" prop="id" label="#" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="trade_name" label="Trade Name" />
    <el-table-column prop="legal_document_code" label="Legal Document" />

    <el-table-column width="180">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewSupplier()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdateSupplier(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeleteSupplier(scope.row)">
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
  width: 85%;
}
.align-content-right {
  float: right;
}
</style>
