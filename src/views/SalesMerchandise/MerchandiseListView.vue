<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import CurrencyService from '@/services/currencyFormatter';
import NotificationService from '@/services/notify';
import { useSalesMerchandiseStore } from '@/stores/sales/merchandise';
import router from '@/router';

const store = useSalesMerchandiseStore();

const vm = reactive({ isLoading: true });
store.fetchMerchandiseList().then(() => {
  vm.isLoading = false;
});

const formatRetailPrice = (merchandiseRow) => {
  return CurrencyService.format(merchandiseRow.retail_price);
}

const formatPurchasePrice = (merchandiseRow) => {
  return CurrencyService.format(merchandiseRow.purchase_price);
}

const handleNewMerchandise = () => {
  router.push({ path: '/dashboard/sales-management/merchandises/new' });
}

const handleUpdateMerchandise = (event) => {
  router.push({ path: `/dashboard/sales-management/merchandises/${event.id}/edit` });
}

const handleDeleteMerchandise = (event) => {
  ElMessageBox.confirm('Are you sure to delete this merchandise?')
    .then(() => {
      store.deleteMerchandise(event.id)
        .then(() => NotificationService.notifySuccess('Merchandise deleted'))
        .catch(() => NotificationService.notifyError('Could not delete merchandise'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List merchandises</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.merchandises"
    v-loading="vm.isLoading"
  >
    <el-table-column width="100" prop="id" label="#" />
    <el-table-column prop="product.name" label="Product" />
    <el-table-column prop="retail_price" label="Retail Price" :formatter="formatRetailPrice" />
    <el-table-column prop="purchase_price" label="Purchase Price" :formatter="formatPurchasePrice" />

    <el-table-column width="250">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewMerchandise()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdateMerchandise(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeleteMerchandise(scope.row)">
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
