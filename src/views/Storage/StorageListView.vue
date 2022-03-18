<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const vm = reactive({ isLoading: true });
store.fetchStorageList().then(() => {
  vm.isLoading = false;
});

const handleNewStorage = () => {
  router.push({ path: '/dashboard/storage-management/storages/new' });
}

const handleNewChildStorage = (event) => {
  router.push({ path: `/dashboard/storage-management/storages/${event.id}/add` });
}

const handleUpdateStorage = (event) => {
  router.push({ path: `/dashboard/storage-management/storages/${event.id}/edit` })
}

const handleDeleteStorage = (event) => {
  ElMessageBox.confirm('Are you sure to delete this storage?')
    .then(() => {
      store.deleteStorage(event.id)
        .then(() => NotificationService.notifySuccess('Storage deleted'))
        .catch(() => NotificationService.notifyError('Could not delete storage'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List storages</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.storages"
    v-loading="vm.isLoading"
  >
    <el-table-column width="100" prop="id" label="#" />
    <el-table-column prop="code" label="Code" />
    <el-table-column prop="name" label="Name" />

    <el-table-column width="250">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewStorage()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button
            type="primary"
            size="small"
            v-if="scope.row.parent_id === undefined"
            @click.prevent="handleNewChildStorage(scope.row)"
          >
            <el-icon>
              <Plus />
            </el-icon>
            <span>Add</span>
          </el-button>

          <el-button size="small" @click.prevent="handleUpdateStorage(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeleteStorage(scope.row)">
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
