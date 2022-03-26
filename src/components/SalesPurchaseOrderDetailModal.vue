<script setup>
import { reactive } from 'vue';
import CurrencyService from '@/services/currencyFormatter';
import { useSalesPurchaseStore } from '@/stores/sales/purchase';

const store = useSalesPurchaseStore();

const props = defineProps({
  purchaseId: Number,
  isVisible: Boolean,
});

const emit = defineEmits(['toggle']);

const vm = reactive({ isLoading: true, isVisible: props.isVisible, dataGrid: {} })
store.fetchOnePurchase(props.purchaseId).then(() => {
  vm.isLoading = false;
  vm.dataGrid = store.purchaseWithRelationships;

});

const getMoney = (numericValue = 0) => CurrencyService.format(numericValue);

const formatPurchasePrice = (merchandiseRow) => getMoney(merchandiseRow.purchase_price);

const handleToggleVisibility = () => {
  vm.isVisible = !vm.isVisible;
  emit('toggle', vm.isVisible);
}

const buildSummary = ({ data }) => {
  const result = data.reduce((sum, c) => sum += (c['purchase_price'] * c['quantity']), 0);
  return ['Total', '', getMoney(result), ''];
}
</script>

<template>
  <el-dialog
    destroy-on-close
    v-model="vm.isVisible"
    title="Purchase Order Detail"
    width="75%"
    @close="handleToggleVisibility()"
  >
    <el-table
      show-summary
      v-loading="vm.isLoading"
      :data="vm.dataGrid?.merchandises_purchased"
      :summary-method="buildSummary"
    >
      <el-table-column property="supplier.name" label="Supplier" width="250" />
      <el-table-column property="product.name" label="Product" width="250" />
      <el-table-column
        property="purchase_price"
        label="Purchase Price"
        width="150"
        class-name="table-column-text-align-right"
        :formatter="formatPurchasePrice"
      />
      <el-table-column
        property="quantity"
        label="Quantity"
        width="100"
        class-name="table-column-text-align-right"
      />
    </el-table>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleToggleVisibility()">Close</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.table-column-text-align-right {
  text-align: right;
}
</style>
