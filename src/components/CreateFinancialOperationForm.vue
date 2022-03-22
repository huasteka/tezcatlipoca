<script setup>
import { ref, reactive } from 'vue';
import { Select } from '@element-plus/icons-vue';
import createFinancialOperationValidator from '@/validators/createFinancialOperationValidator';
import { useFinancialStore } from '@/stores/finance';

const store = useFinancialStore();
const emit = defineEmits(['submit']);

const vm = reactive({
  isLoading: true,
  budgetCategoryList: [],
  accountList: [],
  paymentTypeList: []
});

Promise.all([
  store.fetchBudgetCategoryList(),
  store.fetchAccountList(),
  store.fetchPaymentTypeList(),
]).then(() => {
  vm.isLoading = false;
  vm.budgetCategoryList = store.budgetCategoriesByGroup;
  vm.accountList = store.accounts;
  vm.paymentTypeList = store.paymentTypes;
});

const createOperationFormRef = ref();
const createOperationForm = reactive({
  code: '',
  description: '',
  grossValue: 0,
  addition: 0,
  discount: 0,
  netValue: 0,
  budgetCategoryId: null,
  accountId: null,
  paymentTypeId: null,
});
const rules = reactive(createFinancialOperationValidator);

const getDiscountLimit = () => {
  return createOperationForm.grossValue + createOperationForm.addition;
}

const calculateNetValue = () => {
  const { grossValue, addition, discount } = createOperationForm;
  createOperationForm.netValue = grossValue + addition - discount;
}

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    const { budgetCategoryId, accountId, paymentTypeId, ...attributes } = form.model;

    const operationModel = {
      ...attributes,
      category: { id: budgetCategoryId },
      account: { id: accountId },
      paymentType: { id: paymentTypeId },
    };

    emit('submit', { model: operationModel, clearForm: form.resetFields });
  });
}
</script>

<template>
  <el-form
    label-width="150px"
    ref="createOperationFormRef"
    v-loading="vm.isLoading"
    :model="createOperationForm"
    :rules="rules"
  >
    <el-form-item label="Budget category" prop="budgetCategoryId">
      <el-select
        class="small-form-input"
        placeholder="Select a budget category"
        v-model="createOperationForm.budgetCategoryId"
      >
        <el-option-group
          v-for="(group, index) in vm.budgetCategoryList"
          :key="index"
          :label="group.name"
        >
          <el-option
            v-for="category in group.categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
          />
        </el-option-group>
      </el-select>
    </el-form-item>

    <el-form-item label="Account" prop="accountId">
      <el-select
        class="small-form-input"
        placeholder="Select an account"
        v-model="createOperationForm.accountId"
      >
        <el-option
          v-for="(account, index) in vm.accountList"
          :key="index"
          :label="`${account.name} (${account.code})`"
          :value="account.id"
        >
          <span>{{ account.name }}</span>
          <el-tag class="select-option-icon-position">{{ account.code }}</el-tag>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Payment type" prop="paymentTypeId">
      <el-select
        class="small-form-input"
        placeholder="Select a payment type"
        v-model="createOperationForm.paymentTypeId"
      >
        <el-option
          v-for="(payment, index) in vm.paymentTypeList"
          :key="index"
          :label="payment.name"
          :value="payment.id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Code" prop="code">
      <el-input class="small-form-input" v-model="createOperationForm.code"></el-input>
    </el-form-item>

    <el-form-item label="Gross value" prop="grossValue">
      <el-input-number
        class="small-form-input"
        :min="0"
        v-model="createOperationForm.grossValue"
        @change="calculateNetValue()"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="Addition" prop="addition">
      <el-input-number
        class="small-form-input"
        :min="0"
        v-model="createOperationForm.addition"
        @change="calculateNetValue()"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="Discount" prop="discount">
      <el-input-number
        class="small-form-input"
        :min="0"
        :max="getDiscountLimit()"
        v-model="createOperationForm.discount"
        @change="calculateNetValue()"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="Net value" prop="netValue">
      <el-input-number
        disabled
        class="small-form-input"
        :min="0"
        v-model="createOperationForm.netValue"
      ></el-input-number>
    </el-form-item>

    <el-form-item label="Description" prop="description">
      <el-input v-model="createOperationForm.description"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" :icon="Select" @click="submitForm(createOperationFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.small-form-input {
  width: 240px;
}
.select-option-icon-position {
  float: right;
}
.el-select.el-select--default {
  width: 450px;
}
</style>
