<script setup>
import { ref, reactive } from 'vue';
import { Select } from '@element-plus/icons-vue';
import createStorageTransferValidator from '@/validators/createStorageTransferValidator';
import { useStorageStore } from '@/stores/storage';

const store = useStorageStore();
const emit = defineEmits(['submit']);

const vm = reactive({ isLoading: true, storageList: [], itemList: [] });
Promise.all([
  store.fetchStorageList(),
  store.fetchItemList(),
]).then(() => {
  vm.isLoading = false;
  vm.storageList = store.storages;
  vm.itemList = store.items;
});

const createStorageTransferFormRef = ref();
const createStorageTransferForm = reactive({
  from_storage_id: null,
  to_storage_id: null,
  item_id: null,
  quantity: 0
});
const rules = reactive(createStorageTransferValidator);

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
    label-width="150px"
    ref="createStorageTransferFormRef"
    v-loading="vm.isLoading"
    :model="createStorageTransferForm"
    :rules="rules"
  >
    <el-form-item label="Source storage" prop="from_storage_id">
      <el-select
        class="small-form-input"
        placeholder="Select a source storage"
        v-model="createStorageTransferForm.from_storage_id"
      >
        <el-option
          v-for="storage in vm.storageList"
          :key="storage.id"
          :label="`${storage.name} (${storage.code})`"
          :value="storage.id"
        >
          <span>{{ storage.name }}</span>
          <el-tag class="select-option-icon-position">{{ storage.code }}</el-tag>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Target storage" prop="to_storage_id">
      <el-select
        class="small-form-input"
        placeholder="Select a target storage"
        v-model="createStorageTransferForm.to_storage_id"
      >
        <el-option
          v-for="storage in vm.storageList"
          :key="storage.id"
          :label="`${storage.name} (${storage.code})`"
          :value="storage.id"
        >
          <span>{{ storage.name }}</span>
          <el-tag class="select-option-icon-position">{{ storage.code }}</el-tag>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Item" prop="item_id">
      <el-select placeholder="Select an item" v-model="createStorageTransferForm.item_id">
        <el-option
          v-for="item in vm.itemList"
          :key="item.id"
          :label="`${item.name} (${item.code})`"
          :value="item.id"
        >
          <span>{{ item.name }}</span>
          <el-tag class="select-option-icon-position">{{ item.code }}</el-tag>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="Quantity" prop="quantity">
      <el-input-number
        class="small-form-input"
        :min="0"
        v-model="createStorageTransferForm.quantity"
      ></el-input-number>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :icon="Select"
        @click="submitForm(createStorageTransferFormRef)"
      >Submit</el-button>
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
