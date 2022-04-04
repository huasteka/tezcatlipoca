<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useSalesClientStore } from '@/stores/sales/client';
import router from '@/router';

const store = useSalesClientStore();

const vm = reactive({ isLoading: true });
store.fetchClientList().then(() => {
  vm.isLoading = false;
});

const handleNewClient = () => {
  router.push({ path: '/dashboard/sales-management/clients/new' });
}

const handleUpdateClient = (event) => {
  router.push({ path: `/dashboard/sales-management/clients/${event.id}/edit` })
}

const handleDeleteClient = (event) => {
  ElMessageBox.confirm('Are you sure to delete this client?')
    .then(() => {
      store.deleteClient(event.id)
        .then(() => NotificationService.notifySuccess('Client deleted'))
        .catch(() => NotificationService.notifyError('Could not delete client'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List clients</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.clients"
    v-loading="vm.isLoading"
  >
    <el-table-column width="80" prop="id" label="#" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="legal_document_code" label="Legal Document" />

    <el-table-column width="180">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewClient()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdateClient(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeleteClient(scope.row)">
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
