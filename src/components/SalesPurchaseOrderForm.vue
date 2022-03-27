<script setup>
import { ref, reactive } from 'vue';
import { Delete, EditPen, Plus, Select } from '@element-plus/icons-vue';
import { purchaseValidationSchema } from '@/validators/createPurchaseValidator';
import { useSalesMerchandiseStore } from '@/stores/sales/merchandise';
import { useSalesSupplierStore } from '@/stores/sales/supplier';

const merchandiseStore = useSalesMerchandiseStore();
const supplierStore = useSalesSupplierStore();

const emit = defineEmits(['submit']);

const purchaseInitialValues = {
  code: '',
  description: '',
  gross_value: 0,
  discount: 0,
  net_value: 0,
  merchandises: [],
}

const createPurchaseFormRef = ref();
const createPurchaseForm = reactive(purchaseInitialValues);
const purchaseRules = reactive(purchaseValidationSchema);

const purchasedMerchandiseInitialValues = {
  id: null,
  supplier_id: null,
  purchase_price: 0,
  quantity: 1,
};

const vm = reactive({
  isLoading: true,
  purchasedMerchandise: { ...purchasedMerchandiseInitialValues },
  merchandiseList: [],
  supplierList: []
});

Promise.all([
  merchandiseStore.fetchMerchandiseList(),
  supplierStore.fetchSupplierList(),
]).then(() => {
  vm.isLoading = false;
  vm.merchandiseList = merchandiseStore.merchandises;
  vm.supplierList = supplierStore.suppliersFixed;
});

const calculateNetValue = () => {
  const { gross_value, discount } = createPurchaseForm;
  if (gross_value < discount) {
    createPurchaseForm.discount = gross_value;
  } else {
    createPurchaseForm.net_value = gross_value - discount;
  }
}

const handleMerchandiseSelect = (merchandiseId) => {
  const selectedMerchandise = vm.merchandiseList.find((m) => m.id === merchandiseId);
  vm.purchasedMerchandise.purchase_price = parseFloat(selectedMerchandise?.purchase_price);
}

const addPurchasedMerchandise = () => {
  if (!vm.purchasedMerchandise.id || !vm.purchasedMerchandise.supplier_id) {
    return;
  }

  const { purchase_price, quantity, ...merchandise } = vm.purchasedMerchandise;
  createPurchaseForm.gross_value += purchase_price * quantity;
  createPurchaseForm.merchandises.push({ purchase_price, quantity, ...merchandise });
  vm.purchasedMerchandise = { ...purchasedMerchandiseInitialValues };
  calculateNetValue();
}

const getMerchandise = (merchandiseId) => vm.merchandiseList.find(m => m.id === merchandiseId);

const getSupplier = (supplier_id) => vm.supplierList.find(s => s.id === supplier_id);

const handleUpdateMerchandise = (merchandiseRow) => {
  if (vm.purchasedMerchandise.id && vm.purchasedMerchandise.supplier_id) {
    addPurchasedMerchandise();
  }

  handleDeleteMerchandise(merchandiseRow);
  vm.purchasedMerchandise = merchandiseRow;
}

const handleDeleteMerchandise = (merchandiseRow) => {
  createPurchaseForm.merchandises = createPurchaseForm.merchandises.filter(
    ({ supplier_id, id }) => merchandiseRow.id !== id && merchandiseRow.supplier_id !== supplier_id
  );

  createPurchaseForm.gross_value -= merchandiseRow.purchase_price * merchandiseRow.quantity;
  calculateNetValue();
}

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    const clearForm = () => {
      form.resetFields();
      createPurchaseForm.merchandises = [];
    }

    emit('submit', { model: form.model, clearForm });
  });
}
</script>

<template>
  <div v-loading="vm.isLoading">
    <el-form label-width="150px" ref="createPurchaseFormRef" :model="createPurchaseForm">
      <el-form-item label="Code" prop="code" :rules="purchaseRules.code">
        <el-input v-model="createPurchaseForm.code" style="width: 100px"></el-input>
      </el-form-item>

      <el-form-item label="Gross Value" prop="gross_value" :rules="purchaseRules.gross_value">
        <el-input-number
          disabled
          class="small-form-input"
          v-model="createPurchaseForm.gross_value"
          :precision="2"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Discount" prop="discount" :rules="purchaseRules.discount">
        <el-input-number
          class="small-form-input"
          v-model="createPurchaseForm.discount"
          :precision="2"
          :min="0"
          :max="createPurchaseForm.gross_value"
          @change="calculateNetValue()"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Net Value" prop="net_value" :rules="purchaseRules.net_value">
        <el-input-number
          disabled
          class="small-form-input"
          v-model="createPurchaseForm.net_value"
          :precision="2"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Description" prop="description">
        <el-input v-model="createPurchaseForm.description"></el-input>
      </el-form-item>

      <el-divider></el-divider>

      <h4>Merchandises</h4>

      <el-form-item label="Product">
        <el-select
          placeholder="Select a product"
          v-model="vm.purchasedMerchandise.id"
          @change="handleMerchandiseSelect($event)"
        >
          <el-option
            v-for="merchandise in vm.merchandiseList"
            :key="merchandise.id"
            :label="`${merchandise.product.name} (${merchandise.product.name})`"
            :value="merchandise.id"
          >
            <span>{{ merchandise.product.name }}</span>
            <el-tag class="select-option-icon-position">{{ merchandise.product.name }}</el-tag>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Supplier">
        <el-select
          placeholder="Select a supplier"
          v-model.number="vm.purchasedMerchandise.supplier_id"
        >
          <el-option
            v-for="supplier in vm.supplierList"
            :key="supplier.id"
            :label="supplier.name"
            :value="supplier.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Purchase Price">
        <el-input-number
          disabled
          class="small-form-input"
          v-model="vm.purchasedMerchandise.purchase_price"
          :precision="2"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Quantity">
        <el-input-number
          class="small-form-input"
          v-model="vm.purchasedMerchandise.quantity"
          :min="1"
        ></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button :icon="Plus" @click.prevent="addPurchasedMerchandise()">Add Purchased Merchandise</el-button>
      </el-form-item>

      <el-table row-key="id" :data="createPurchaseForm.merchandises">
        <el-table-column label="Product">
          <template #default="scope">{{ getMerchandise(scope.row.id)?.product?.name }}</template>
        </el-table-column>

        <el-table-column label="Supplier">
          <template #default="scope">{{ getSupplier(scope.row.supplier_id)?.name }}</template>
        </el-table-column>

        <el-table-column prop="purchase_price" label="Purchase Price" />
        <el-table-column prop="quantity" label="Quantity" />

        <el-table-column width="250">
          <template #default="scope">
            <el-button-group class="ml-4 align-content-right">
              <el-button :icon="EditPen" @click.prevent="handleUpdateMerchandise(scope.row)"></el-button>

              <el-button
                type="danger"
                :icon="Delete"
                @click.prevent="handleDeleteMerchandise(scope.row)"
              ></el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>

      <br />

      <el-form-item>
        <el-button type="primary" :icon="Select" @click="submitForm(createPurchaseFormRef)">Submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.small-form-input {
  width: 250px;
}

.select-option-icon-position {
  float: right;
}

.el-select.el-select--default {
  width: 450px;
}

.align-content-right {
  float: right;
}
</style>
