<script setup>
import { reactive } from 'vue';
import { Minus, Plus, QuestionFilled, View } from '@element-plus/icons-vue';
import SalesPurchaseOrderDetailModal from '@/components/SalesPurchaseOrderDetailModal.vue';
import SalesSaleOrderDetailModal from '@/components/SalesSaleOrderDetailModal.vue';
import CurrencyService from '@/services/currencyFormatter';
import { useSalesSaleStore } from '@/stores/sales/sale';
import { useSalesPurchaseStore } from '@/stores/sales/purchase';

const saleStore = useSalesSaleStore();
const purchaseStore = useSalesPurchaseStore();

const operationTypes = {
  SALES: 'sales',
  PURCHASES: 'purchases',
}

const vm = reactive({
  isLoading: true,
  type: operationTypes.SALES,
  history: [],
  selectionId: null,
  isModalOpen: false,
});
const loadHistory = (operationType) => {
  vm.isLoading = true;

  switch (operationType) {
    case operationTypes.SALES:
      saleStore.fetchSaleList().then(() => {
        vm.isLoading = false;
        vm.history = saleStore.sales;
      });
      break;

    case operationTypes.PURCHASES:
      purchaseStore.fetchPurchaseList().then(() => {
        vm.isLoading = false;
        vm.history = purchaseStore.purchases;
      });
      break;

    default:
      vm.isLoading = false;
      vm.history = [];
      break;
  }
}
loadHistory(vm.type);

const getTitle = () => {
  switch (vm.type) {
    case operationTypes.SALES:
      return 'Sale';
    case operationTypes.PURCHASES:
      return 'Purchase';
    default:
      return 'Unknown';
  }
}

const getIcon = () => {
  switch (vm.type) {
    case operationTypes.SALES:
      return Plus;
    case operationTypes.PURCHASES:
      return Minus;
    default:
      return QuestionFilled;
  }
};

const getType = () => {
  switch (vm.type) {
    case operationTypes.SALES:
      return 'success';
    case operationTypes.PURCHASES:
      return 'danger';
    default:
      return 'warning';
  }
};

const isSale = () => vm.type === operationTypes.SALES;
const isPurchase = () => vm.type === operationTypes.PURCHASES;

const getMoney = (numericValue = 0) => CurrencyService.format(numericValue);

const handleSelection = (operation) => {
  vm.selectionId = parseInt(operation.id, 10);
  vm.isModalOpen = true;
}

const handleModalToggle = (isModalOpen) => {
  vm.selectionId = null;
  vm.isModalOpen = isModalOpen;
}

const handleOperationTypeSelection = (operationType) => {
  loadHistory(operationType);
};
</script>

<template>
  <h2>Sales Operations History</h2>

  <el-form :inline="true">
    <el-form-item>
      <el-select
        placeholder="Select operation type"
        v-model="vm.type"
        @change="handleOperationTypeSelection($event)"
      >
        <el-option label="Sales" value="sales"></el-option>
        <el-option label="Purchases" value="purchases"></el-option>
      </el-select>
    </el-form-item>
  </el-form>

  <el-divider />

  <el-timeline v-loading="vm.isLoading">
    <el-timeline-item
      size="large"
      v-for="operation in vm.history"
      :key="operation.id"
      :icon="getIcon()"
      :type="getType()"
      :timestamp="(new Date(operation.created_at)).toUTCString()"
    >
      <el-descriptions
        border
        class="timeline-description-max-width"
        :column="3"
        :title="getTitle()"
      >
        <template #extra>
          <el-button
            plain
            round
            type="primary"
            :icon="View"
            @click="handleSelection(operation)"
          >Details</el-button>
        </template>
        <el-descriptions-item label="Code">{{ operation.code || '-' }}</el-descriptions-item>
        <el-descriptions-item label="Description" :span="2">{{ operation.description || '-' }}</el-descriptions-item>
        <el-descriptions-item label="Gross value">{{ getMoney(operation.grossValue) }}</el-descriptions-item>
        <el-descriptions-item label="Discount">{{ getMoney(operation.discount) }}</el-descriptions-item>
        <el-descriptions-item label="Net value">{{ getMoney(operation.net_value) }}</el-descriptions-item>
      </el-descriptions>
    </el-timeline-item>
  </el-timeline>

  <div v-if="vm.selectionId !== null && isPurchase()">
    <SalesPurchaseOrderDetailModal
      :purchaseId="vm.selectionId"
      :isVisible="vm.isModalOpen"
      @toggle="handleModalToggle($event)"
    />
  </div>

  <div v-if="vm.selectionId !== null && isSale()">
    <SalesSaleOrderDetailModal
      :saleId="vm.selectionId"
      :isVisible="vm.isModalOpen"
      @toggle="handleModalToggle($event)"
    />
  </div>
</template>

<style scoped>
.timeline-description-max-width {
  width: 650px;
}

.el-form {
  padding-left: 40px;
}

.el-select.el-select--default {
  width: 650px;
}

.select-option-icon-position {
  float: right;
}
</style>

