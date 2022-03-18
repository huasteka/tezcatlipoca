<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createItemValidator from '@/validators/createItemValidator';
import { useStorageStore } from '@/stores/storage';
import router from '@/router';

const store = useStorageStore();

const props = defineProps({
  item: Object,
});

const emit = defineEmits(['submit']);

const {
  id = null,
  name = '',
  code = '',
  input_measure_unit = null,
  input_quantity = 0,
  output_measure_unit = null,
  output_quantity = 0
} = props.item || {};
const createItemFormRef = ref();
const createItemForm = reactive({
  id,
  name,
  code,
  input_measure_unit_id: input_measure_unit !== null ? '' + input_measure_unit.id : null,
  input_quantity: parseFloat(input_quantity),
  output_measure_unit_id: output_measure_unit !== null ? '' + output_measure_unit.id : null,
  output_quantity: parseFloat(output_quantity),
});
const rules = reactive(createItemValidator);

const vm = reactive({ isLoading: true });
store.fetchMeasureUnitList().then(() => vm.isLoading = false);

const navigateBack = () => router.push({ path: '/dashboard/storage-management/items' });

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
  <el-form label-width="150px" ref="createItemFormRef" :model="createItemForm" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model="createItemForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Code" prop="code">
      <el-input class="small-form-input" v-model="createItemForm.code"></el-input>
    </el-form-item>

    <el-row>
      <el-col :span="10">
        <el-form-item label="Input Unit" prop="input_measure_unit_id">
          <el-select
            placeholder="Select a measurement unit"
            v-model="createItemForm.input_measure_unit_id"
            :loading="vm.isLoading"
          >
            <el-option
              v-for="unit in store.measureUnits"
              :key="unit.id"
              :label="`${unit.name} (${unit.acronym})`"
              :value="unit.id"
            >
              <span>{{ unit.name }}</span>
              <el-tag class="select-option-icon-position">{{ unit.acronym }}</el-tag>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="14">
        <el-form-item label="Input Quantity" prop="input_quantity">
          <el-input-number
            class="small-form-input"
            :min="0"
            v-model="createItemForm.input_quantity"
          ></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="10">
        <el-form-item label="Output Unit" prop="output_measure_unit_id">
          <el-select
            placeholder="Select a measurement unit"
            v-model="createItemForm.output_measure_unit_id"
            :loading="vm.isLoading"
          >
            <el-option
              v-for="unit in store.measureUnits"
              :key="unit.id"
              :label="`${unit.name} (${unit.acronym})`"
              :value="unit.id"
            >
              <span>{{ unit.name }}</span>
              <el-tag class="select-option-icon-position">{{ unit.acronym }}</el-tag>
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="14">
        <el-form-item label="Output Quantity" prop="output_quantity">
          <el-input-number
            class="small-form-input"
            :min="0"
            v-model="createItemForm.output_quantity"
          ></el-input-number>
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createItemFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.small-form-input {
  width: 205px;
}
.select-option-icon-position {
  float: right;
}
</style>
