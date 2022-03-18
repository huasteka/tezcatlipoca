<script setup>
import { reactive } from 'vue';
import { Minus, Plus, QuestionFilled, Search } from '@element-plus/icons-vue';
import { useStorageStore } from '@/stores/storage';

const store = useStorageStore();

const filter = reactive({ isLoading: true, storageId: null, storageList: [] });
store.fetchStorageList().then(() => {
  filter.isLoading = false;
  filter.storageList = store.storages;
});

const vm = reactive({ isLoading: true, history: [] });
const loadHistory = (storageId = null) => store.fetchOperationHistory(storageId)
  .then(() => {
    vm.isLoading = false;
    vm.history = store.history;
  });
loadHistory();

const getTitle = ({ operation_type }) => {
  const [first, ...rest] = operation_type
  return first.toLocaleUpperCase(navigator.language) + rest.join('')
};

const getIcon = ({ operation_type }) => {
  switch (operation_type) {
    case 'deposit':
      return Plus;
    case 'withdraw':
      return Minus;
    default:
      return QuestionFilled;
  }
};

const getType = ({ operation_type }) => {
  switch (operation_type) {
    case 'deposit':
      return 'success';
    case 'withdraw':
      return 'danger';
    default:
      return 'warning';
  }
};

const handleStorageSelection = (storageId) => {
  loadHistory(storageId);
};
</script>

<template>
  <h2>Storage Operations History</h2>

  <el-form :inline="true">
    <el-form-item>
      <el-select
        clearable
        placeholder="Select a storage"
        v-model="filter.storageId"
        @change="handleStorageSelection($event)"
      >
        <template #prefix>
          <el-icon style="vertical-align: middle">
            <Search />
          </el-icon>
        </template>

        <el-option
          v-for="storage in filter.storageList"
          :key="storage.id"
          :label="`${storage.name} (${storage.code})`"
          :value="storage.id"
        >
          <span>{{ storage.name }}</span>
          <el-tag class="select-option-icon-position">{{ storage.code }}</el-tag>
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>

  <el-divider />

  <el-timeline v-loading="vm.isLoading">
    <el-timeline-item
      size="large"
      v-for="(operation, index) in vm.history"
      :key="index"
      :icon="getIcon(operation)"
      :type="getType(operation)"
      :timestamp="(new Date(operation.created_at)).toUTCString()"
    >
      <el-descriptions class="timeline-description-max-width" :title="getTitle(operation)">
        <el-descriptions-item :label="operation.stock.storage.name">
          <el-tag>{{ operation.stock.storage.code }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item :label="operation.stock.item.name">
          <el-tag>{{ operation.stock.item.code }}</el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="Quantity">{{ operation.quantity }}</el-descriptions-item>
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
