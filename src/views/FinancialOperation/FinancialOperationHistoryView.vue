<script setup>
import { reactive } from 'vue';
import { Minus, Plus, QuestionFilled, Search } from '@element-plus/icons-vue';
import CurrencyService from '@/services/currencyFormatter';
import { useFinancialStore } from '@/stores/finance';

const store = useFinancialStore();

const operationTypes = {
  DEPOSIT: 'DEPOSIT',
  WITHDRAW: 'WITHDRAW',
};

const vm = reactive({ isLoading: true, history: [] });
const loadHistory = (accountId) => store.fetchOperationHistory(accountId)
  .then(() => {
    vm.isLoading = false;
    vm.history = store.history;
  });

const filter = reactive({
  isLoading: true,
  accountId: null,
  accountList: []
});
store.fetchAccountList().then(() => {
  filter.isLoading = false;
  if (store.accounts && store.accounts.length > 0) {
    filter.accountList = store.accounts;
    filter.accountId = filter.accountList[0].id;
    loadHistory(filter.accountId);
  }
});

const getTitle = ({ type, description }) => {
  const [first, ...rest] = type;
  const operationType = [first + rest.join('').toLocaleLowerCase(navigator.language)];
  if (description) {
    operationType.push(description);
  }
  return operationType.join(' - ');
};

const getIcon = ({ type }) => {
  switch (type) {
    case operationTypes.DEPOSIT:
      return Plus;
    case operationTypes.WITHDRAW:
      return Minus;
    default:
      return QuestionFilled;
  }
};

const getType = ({ type }) => {
  switch (type) {
    case operationTypes.DEPOSIT:
      return 'success';
    case operationTypes.WITHDRAW:
      return 'danger';
    default:
      return 'warning';
  }
};

const getBudgetGroup = ({ category }) => {
  return category.id === null ? '-' : `${category.group.name} > ${category.name}`;
}

const getMoney = (numericValue = 0) => {
  return CurrencyService.format(numericValue);
}

const handleAccountSelection = (accountId) => {
  loadHistory(accountId);
};
</script>

<template>
  <h2>Account Operations History</h2>

  <el-form :inline="true" v-loading="filter.isLoading">
    <el-form-item>
      <el-select
        placeholder="Select an account"
        v-model="filter.accountId"
        @change="handleAccountSelection($event)"
      >
        <template #prefix>
          <el-icon style="vertical-align: middle">
            <Search />
          </el-icon>
        </template>

        <el-option
          v-for="account in filter.accountList"
          :key="account.id"
          :label="`${account.name} (${account.code})`"
          :value="account.id"
        >
          <span>{{ account.name }}</span>
          <el-tag class="select-option-icon-position">{{ account.code }}</el-tag>
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>

  <el-divider />

  <el-timeline v-loading="vm.isLoading">
    <el-timeline-item
      size="large"
      v-for="operation in vm.history"
      :key="operation.id"
      :icon="getIcon(operation)"
      :type="getType(operation)"
      :timestamp="(new Date(operation.issuedAt)).toUTCString()"
    >
      <el-descriptions
        border
        class="timeline-description-max-width"
        :column="2"
        :title="getTitle(operation)"
      >
        <el-descriptions-item label="Code">{{ operation.code || '-' }}</el-descriptions-item>
        <el-descriptions-item label="Budget">{{ getBudgetGroup(operation) }}</el-descriptions-item>
        <el-descriptions-item label="Payment type">{{ operation.paymentType.name }}</el-descriptions-item>
        <el-descriptions-item label="Gross value">{{ getMoney(operation.grossValue) }}</el-descriptions-item>
      </el-descriptions>
    </el-timeline-item>
  </el-timeline>
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
