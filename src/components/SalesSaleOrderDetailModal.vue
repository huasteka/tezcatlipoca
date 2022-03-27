<script setup>
import { reactive } from 'vue';
import CurrencyService from '@/services/currencyFormatter';
import { useSalesSaleStore } from '@/stores/sales/sale';

const store = useSalesSaleStore();

const props = defineProps({
  saleId: Number,
  isVisible: Boolean,
});

const emit = defineEmits(['toggle']);

const vm = reactive({ isLoading: true, isVisible: props.isVisible, dataGrid: {} })
store.fetchOneSale(props.saleId).then(() => {
  vm.isLoading = false;
  vm.dataGrid = store.saleWithRelationships;

});

const getMoney = (numericValue = 0) => CurrencyService.format(numericValue);

const formatRetailPrice = (merchandiseRow) => getMoney(merchandiseRow.retail_price);

const handleToggleVisibility = () => {
  vm.isVisible = !vm.isVisible;
  emit('toggle', vm.isVisible);
}

const buildSummary = ({ data }) => {
  const result = data.reduce((sum, c) => sum += (c['retail_price'] * c['quantity']), 0);
  return ['Total', '', getMoney(result), ''];
}
</script>

<template>
  <el-dialog
    destroy-on-close
    v-model="vm.isVisible"
    title="Sale Order Detail"
    width="75%"
    @close="handleToggleVisibility()"
  >
    <el-table
      show-summary
      v-loading="vm.isLoading"
      :data="vm.dataGrid?.merchandises_sold"
      :summary-method="buildSummary"
    >
      <el-table-column property="client.name" label="Client" width="250" />
      <el-table-column property="product.name" label="Product" width="250" />
      <el-table-column
        property="retail_price"
        label="Retail Price"
        width="150"
        header-align="center"
        align="right"
        :formatter="formatRetailPrice"
      />
      <el-table-column
        property="quantity"
        label="Quantity"
        width="100"
        header-align="center"
        align="right"
      />
    </el-table>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleToggleVisibility()">Close</el-button>
      </div>
    </template>
  </el-dialog>
</template>
