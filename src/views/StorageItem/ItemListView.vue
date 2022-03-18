<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const vm = reactive({ isLoading: true });
store.fetchItemList().then(() => {
  vm.isLoading = false;
});

const handleNewItem = () => {
  router.push({ path: '/dashboard/storage-management/items/new' });
}

const handleUpdateItem = (event) => {
  router.push({ path: `/dashboard/storage-management/items/${event.id}/edit` })
}

const handleDeleteItem = (event) => {
  ElMessageBox.confirm('Are you sure to delete this item?')
    .then(() => {
      store.deleteItem(event.id)
        .then(() => NotificationService.notifySuccess('Item deleted'))
        .catch(() => NotificationService.notifyError('Could not delete item'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List items</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.items"
    v-loading="vm.isLoading"
  >
    <el-table-column width="100" prop="id" label="#" />
    <el-table-column prop="code" label="Code" />
    <el-table-column prop="name" label="Name" />

    <el-table-column width="180">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewItem()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdateItem(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeleteItem(scope.row)">
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
