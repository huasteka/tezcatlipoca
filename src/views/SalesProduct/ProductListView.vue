<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useSalesProductStore } from '@/stores/sales/product';
import router from '@/router';

const store = useSalesProductStore();

const vm = reactive({ isLoading: true });
store.fetchProductList().then(() => {
  vm.isLoading = false;
});

const handleNewProduct = () => {
  router.push({ path: '/dashboard/sales-management/products/new' });
}

const handleUpdateProduct = (event) => {
  router.push({ path: `/dashboard/sales-management/products/${event.id}/edit` });
}

const handleDeleteProduct = (event) => {
  ElMessageBox.confirm('Are you sure to delete this product?')
    .then(() => {
      store.deleteProduct(event.id)
        .then(() => NotificationService.notifySuccess('Product deleted'))
        .catch(() => NotificationService.notifyError('Could not delete product'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List products</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.products"
    v-loading="vm.isLoading"
  >
    <el-table-column width="100" prop="id" label="#" />
    <el-table-column prop="code" label="Code" />
    <el-table-column prop="name" label="Name" />

    <el-table-column width="200">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewProduct()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdateProduct(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeleteProduct(scope.row)">
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
