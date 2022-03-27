<script setup>
import { ref, reactive } from 'vue';
import { Delete, EditPen, Plus, Select } from '@element-plus/icons-vue';
import { salesValidationSchema } from '@/validators/createSalesValidator';
import { useSalesMerchandiseStore } from '@/stores/sales/merchandise';
import { useSalesClientStore } from '@/stores/sales/client';

const merchandiseStore = useSalesMerchandiseStore();
const clientStore = useSalesClientStore();

const emit = defineEmits(['submit']);

const salesInitialValues = {
  code: '',
  description: '',
  gross_value: 0,
  discount: 0,
  net_value: 0,
  merchandises: [],
}

const createSalesFormRef = ref();
const createSalesForm = reactive(salesInitialValues);
const salesRules = reactive(salesValidationSchema);

const soldMerchandiseInitialValues = {
  id: null,
  client_id: null,
  retail_price: 0,
  quantity: 1,
};

const vm = reactive({
  isLoading: true,
  soldMerchandise: { ...soldMerchandiseInitialValues },
  merchandiseList: [],
  clientList: []
});

Promise.all([
  merchandiseStore.fetchMerchandiseList(),
  clientStore.fetchClientList(),
]).then(() => {
  vm.isLoading = false;
  vm.merchandiseList = merchandiseStore.merchandises;
  vm.clientList = clientStore.clientsFixed;
});

const calculateNetValue = () => {
  const { gross_value, discount } = createSalesForm;
  if (gross_value < discount) {
    createSalesForm.discount = gross_value;
  } else {
    createSalesForm.net_value = gross_value - discount;
  }
}

const handleMerchandiseSelect = (merchandiseId) => {
  const selectedMerchandise = vm.merchandiseList.find((m) => m.id === merchandiseId);
  vm.soldMerchandise.retail_price = parseFloat(selectedMerchandise?.retail_price);
}

const addSalesdMerchandise = () => {
  if (!vm.soldMerchandise.id || !vm.soldMerchandise.client_id) {
    return;
  }

  const { retail_price, quantity, ...merchandise } = vm.soldMerchandise;
  createSalesForm.gross_value += retail_price * quantity;
  createSalesForm.merchandises.push({ retail_price, quantity, ...merchandise });
  vm.soldMerchandise = { ...soldMerchandiseInitialValues };
  calculateNetValue();
}

const getMerchandise = (merchandiseId) => vm.merchandiseList.find(m => m.id === merchandiseId);

const getClient = (client_id) => vm.clientList.find(s => s.id === client_id);

const handleUpdateMerchandise = (merchandiseRow) => {
  if (vm.soldMerchandise.id && vm.soldMerchandise.client_id) {
    addSalesdMerchandise();
  }

  handleDeleteMerchandise(merchandiseRow);
  vm.soldMerchandise = merchandiseRow;
}

const handleDeleteMerchandise = (merchandiseRow) => {
  createSalesForm.merchandises = createSalesForm.merchandises.filter(
    ({ client_id, id }) => merchandiseRow.id !== id && merchandiseRow.client_id !== client_id
  );

  createSalesForm.gross_value -= merchandiseRow.retail_price * merchandiseRow.quantity;
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
      createSalesForm.merchandises = [];
    }

    emit('submit', { model: form.model, clearForm });
  });
}
</script>

<template>
  <div v-loading="vm.isLoading">
    <el-form label-width="150px" ref="createSalesFormRef" :model="createSalesForm">
      <el-form-item label="Code" prop="code" :rules="salesRules.code">
        <el-input v-model="createSalesForm.code" style="width: 100px"></el-input>
      </el-form-item>

      <el-form-item label="Gross Value" prop="gross_value" :rules="salesRules.gross_value">
        <el-input-number
          disabled
          class="small-form-input"
          v-model="createSalesForm.gross_value"
          :precision="2"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Discount" prop="discount" :rules="salesRules.discount">
        <el-input-number
          class="small-form-input"
          v-model="createSalesForm.discount"
          :precision="2"
          :min="0"
          :max="createSalesForm.gross_value"
          @change="calculateNetValue()"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Net Value" prop="net_value" :rules="salesRules.net_value">
        <el-input-number
          disabled
          class="small-form-input"
          v-model="createSalesForm.net_value"
          :precision="2"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Description" prop="description">
        <el-input v-model="createSalesForm.description"></el-input>
      </el-form-item>

      <el-divider></el-divider>

      <h4>Merchandises</h4>

      <el-form-item label="Product">
        <el-select
          placeholder="Select a product"
          v-model="vm.soldMerchandise.id"
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

      <el-form-item label="Client">
        <el-select placeholder="Select a client" v-model.number="vm.soldMerchandise.client_id">
          <el-option
            v-for="client in vm.clientList"
            :key="client.id"
            :label="client.name"
            :value="client.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Retail Price">
        <el-input-number
          disabled
          class="small-form-input"
          v-model="vm.soldMerchandise.retail_price"
          :precision="2"
          :min="0"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Quantity">
        <el-input-number class="small-form-input" v-model="vm.soldMerchandise.quantity" :min="1"></el-input-number>
      </el-form-item>

      <el-form-item>
        <el-button :icon="Plus" @click.prevent="addSalesdMerchandise()">Add Sold Merchandise</el-button>
      </el-form-item>

      <el-table row-key="id" :data="createSalesForm.merchandises">
        <el-table-column label="Product">
          <template #default="scope">{{ getMerchandise(scope.row.id)?.product?.name }}</template>
        </el-table-column>

        <el-table-column label="Client">
          <template #default="scope">{{ getClient(scope.row.client_id)?.name }}</template>
        </el-table-column>

        <el-table-column prop="retail_price" label="Sales Price" />
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
        <el-button type="primary" :icon="Select" @click="submitForm(createSalesFormRef)">Submit</el-button>
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
