<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus, StarFilled } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useSalesDeliveryAddressStore } from '@/stores/sales/deliveryAddress';
import router from '@/router';

const store = useSalesDeliveryAddressStore();

const vm = reactive({ isLoading: true });
store.fetchDeliveryAddressList().then(() => {
  vm.isLoading = false;
});

const formatLocation = (deliveryAddressRow) => {
  const { city = '-', region = '-', country = '-' } = deliveryAddressRow.contacts;
  return [city, region, country].join(' / ');
}

const handleNewDeliveryAddress = () => {
  router.push({ path: '/dashboard/sales-management/delivery-addresses/new' });
}

const handleUpdateDeliveryAddress = (event) => {
  router.push({ path: `/dashboard/sales-management/delivery-addresses/${event.id}/edit` });
}

const handleDeleteDeliveryAddress = (event) => {
  ElMessageBox.confirm('Are you sure to delete this deliveryAddress?')
    .then(() => {
      store.deleteDeliveryAddress(event.id)
        .then(() => NotificationService.notifySuccess('Delivery address deleted'))
        .catch(() => NotificationService.notifyError('Could not delete delivery address'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List delivery addresss</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.deliveryAddresses"
    v-loading="vm.isLoading"
  >
    <el-table-column width="100" prop="id" label="#" />
    <el-table-column prop="contacts.address" label="Address" />
    <el-table-column prop="contacts.postal_code" label="Postal Code" />
    <el-table-column prop="contacts.city" label="Location" :formatter="formatLocation" />
    <el-table-column prop="contacts.phone" label="Phone" />
    <el-table-column width="30" prop="is_default">
      <template #default="scope">
        <el-icon v-if="scope.row.is_default" size="large" color="gold">
          <StarFilled />
        </el-icon>
      </template>
    </el-table-column>

    <el-table-column width="190">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewDeliveryAddress()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdateDeliveryAddress(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button
            type="danger"
            size="small"
            @click.prevent="handleDeleteDeliveryAddress(scope.row)"
          >
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
  width: 90%;
}
.align-content-right {
  float: right;
}
</style>
