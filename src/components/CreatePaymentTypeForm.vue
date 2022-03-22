<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createPaymentTypeValidator from '@/validators/createPaymentTypeValidator';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const props = defineProps({
  paymentType: Object,
});

const emit = defineEmits(['submit']);

const {
  id = null,
  name = '',
  terms = { stagedPayment: false, tax: 0 },
  paymentAccount = null
} = props.paymentType || {};
const createPaymentTypeFormRef = ref();
const createPaymentTypeForm = reactive({ id, name, terms, paymentAccountId: paymentAccount?.id });
const rules = reactive(createPaymentTypeValidator);

const installmentFrequency = [
  { label: 'Immediate', value: 1 },
  { label: 'Weekly', value: 7 },
  { label: 'Biweekly', value: 15 },
  { label: 'Monthly', value: 30 },
  { label: 'Bimontly', value: 60 },
  { label: 'Trimontly', value: 90 },
  { label: 'Semiannually', value: 182 },
  { label: 'Yearly', value: 365 },
];

const vm = reactive({ isLoading: true });
store.fetchAccountList().then(() => vm.isLoading = false);

const navigateBack = () => router.push({ path: '/dashboard/finance-management/payment-types' });

const submitForm = (form) => {
  if (!form) {
    return;
  }

  form.validate((valid) => {
    if (!valid) {
      return false;
    }

    const { id, name, terms, paymentAccountId } = form.model;
    emit('submit', { id, name, terms, paymentAccount: { id: paymentAccountId } });
  });
}
</script>

<template>
  <el-form
    label-width="185px"
    ref="createPaymentTypeFormRef"
    :model="createPaymentTypeForm"
    :rules="rules"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="createPaymentTypeForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Staged payment?" prop="terms.stagedPayment">
      <el-switch v-model="createPaymentTypeForm.terms.stagedPayment" />
    </el-form-item>

    <div v-if="createPaymentTypeForm.terms.stagedPayment === true">
      <el-form-item label="Tax" prop="terms.tax">
        <el-input-number
          class="small-form-input"
          v-model="createPaymentTypeForm.terms.tax"
          :precision="2"
          :step="0.1"
          :min="0"
        />
      </el-form-item>

      <el-form-item label="Installment amount" prop="terms.installmentQuantity">
        <el-input-number
          class="small-form-input"
          :min="0"
          v-model="createPaymentTypeForm.terms.installmentQuantity"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="First installment term" prop="terms.firstInstallmentTerm">
        <el-input-number
          class="small-form-input"
          :min="0"
          v-model="createPaymentTypeForm.terms.firstInstallmentTerm"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Installment periodicity" prop="terms.installmentTerm">
        <el-select
          class="small-form-input"
          placeholder="Select the periodicity"
          v-model="createPaymentTypeForm.terms.installmentTerm"
        >
          <el-option
            v-for="(frequency, index) in installmentFrequency"
            :key="index"
            :label="frequency.label"
            :value="frequency.value"
          ></el-option>
        </el-select>
      </el-form-item>
    </div>

    <el-form-item label="Payment account" prop="paymentAccountId">
      <el-select
        class="small-form-input"
        placeholder="Select an account"
        v-model="createPaymentTypeForm.paymentAccountId"
        :loading="vm.isLoading"
      >
        <el-option
          v-for="account in store.accounts"
          :key="account.id"
          :label="`${account.name} (${account.code})`"
          :value="account.id"
        >
          <span>{{ account.name }}</span>
          <el-tag class="select-option-icon-position">{{ account.code }}</el-tag>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createPaymentTypeFormRef)">Submit</el-button>
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
</style>
