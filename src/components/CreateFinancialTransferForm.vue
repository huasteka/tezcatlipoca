<script setup>
import { ref, reactive } from 'vue';
import { Select } from '@element-plus/icons-vue';
import createFinancialTransferValidator from '@/validators/createFinancialTransferValidator';
import { useFinancialStore } from '@/stores/finance';

const store = useFinancialStore();
const emit = defineEmits(['submit']);

const vm = reactive({
  isLoading: true,
  accountList: [],
  paymentTypeList: []
});

Promise.all([
  store.fetchAccountList(),
  store.fetchPaymentTypeList(),
]).then(() => {
  vm.isLoading = false;
  vm.accountList = store.accounts;
  vm.paymentTypeList = store.paymentTypes;
});

const createOperationFormRef = ref();
const createOperationForm = reactive({
  amount: 0,
  sourceAccountId: null,
  targetAccountId: null,
  paymentTypeId: null,
});
const rules = reactive(createFinancialTransferValidator);

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    emit('submit', { model: form.model, clearForm: form.resetFields });
  });
}
</script>

<template>
  <el-form
    label-width="195px"
    ref="createOperationFormRef"
    v-loading="vm.isLoading"
    :model="createOperationForm"
    :rules="rules"
  >
    <el-form-item label="Origin account" prop="sourceAccountId">
      <el-select
        class="small-form-input"
        placeholder="Select an account"
        v-model="createOperationForm.sourceAccountId"
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

    <el-form-item label="Destination account" prop="targetAccountId">
      <el-select
        class="small-form-input"
        placeholder="Select an account"
        v-model="createOperationForm.targetAccountId"
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

    <el-form-item label="Amount" prop="amount">
      <el-input-number class="small-form-input" :min="0" v-model="createOperationForm.amount"></el-input-number>
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
