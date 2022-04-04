<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import {
  merchandiseValidationSchema,
  selectProductValidationSchema,
  createProductValidationSchema,
} from '@/validators/createMerchandiseValidator';
import { useSalesProductStore } from '@/stores/sales/product';
import router from '@/router';

const productStore = useSalesProductStore();

const props = defineProps({
  merchandise: Object,
});

const emit = defineEmits(['submit']);

const {
  id = null,
  retail_price = '0.00',
  purchase_price = '0.00',
  product = null
} = props.merchandise || {};
const createMerchandiseFormRef = ref();
const createMerchandiseForm = reactive({
  id,
  retail_price: parseFloat(retail_price),
  purchase_price: parseFloat(purchase_price),
  product_id: product?.id,
  product: { name: '', code: '' },
});

const merchandiseRules = reactive(merchandiseValidationSchema);
const selectProductRules = reactive(selectProductValidationSchema);
const createProductRules = reactive(createProductValidationSchema);

const vm = reactive({ isLoading: true, blockProductCreate: product !== null, hasProduct: product !== null, productList: [] });
productStore.fetchProductList().then(() => {
  vm.productList = productStore.products;
  vm.isLoading = false;
});

const navigateBack = () => router.push({ path: '/dashboard/sales-management/merchandises' });

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    emit('submit', form.model);
  });
}
</script>

<template>
  <el-form
    v-loading="vm.isLoading"
    label-width="130px"
    ref="createMerchandiseFormRef"
    :model="createMerchandiseForm"
  >
    <el-form-item>
      <el-radio-group v-model="vm.hasProduct">
        <el-radio border :label="true">Select Product</el-radio>
        <el-radio border :label="false" :disabled="vm.blockProductCreate">Create Product</el-radio>
      </el-radio-group>
    </el-form-item>

    <div v-if="vm.hasProduct">
      <el-form-item label="Product" prop="product_id" :rules="selectProductRules.product_id">
        <el-select
          class="small-form-input"
          placeholder="Select a product"
          v-model="createMerchandiseForm.product_id"
        >
          <el-option
            v-for="(product, index) in vm.productList"
            :key="index"
            :label="`${product.name} (${product.code})`"
            :value="`${product.id}`"
          >
            <span>{{ product.name }}</span>
            <el-tag class="select-option-icon-position">{{ product.code }}</el-tag>
          </el-option>
        </el-select>
      </el-form-item>
    </div>

    <div v-else>
      <el-form-item label="Product Name" prop="product.name" :rules="createProductRules.name">
        <el-input v-model="createMerchandiseForm.product.name"></el-input>
      </el-form-item>

      <el-form-item label="Product Code" prop="product.code" :rules="createProductRules.code">
        <el-input v-model="createMerchandiseForm.product.code" style="width: 100px"></el-input>
      </el-form-item>
    </div>

    <el-form-item label="Retail Price" prop="retail_price" :rules="merchandiseRules.retail_price">
      <el-input-number
        class="small-form-input"
        v-model="createMerchandiseForm.retail_price"
        :precision="2"
        :min="0"
      ></el-input-number>
    </el-form-item>

    <el-form-item
      label="Purchase Price"
      prop="purchase_price"
      :rules="merchandiseRules.purchase_price"
    >
      <el-input-number
        class="small-form-input"
        v-model="createMerchandiseForm.purchase_price"
        :precision="2"
        :min="0"
      ></el-input-number>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createMerchandiseFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
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
</style>
