<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createMeasureUnitValidator from '@/validators/createMeasureUnitValidator';
import router from '@/router';

const props = defineProps({
  measureUnit: Object,
});

const emit = defineEmits(['submit']);

const { id = null, name = '', acronym = '' } = props.measureUnit || {};
const createMeasureUnitFormRef = ref();
const createMeasureUnitForm = reactive({ id, name, acronym });
const rules = reactive(createMeasureUnitValidator);

const navigateBack = () => router.push({ path: '/dashboard/storage-management/measure-units' });

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
    label-width="150px"
    ref="createMeasureUnitFormRef"
    :model="createMeasureUnitForm"
    :rules="rules"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="createMeasureUnitForm.name"></el-input>
    </el-form-item>

    <el-form-item label="Acronym" prop="acronym">
      <el-input v-model="createMeasureUnitForm.acronym" style="width: 100px"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createMeasureUnitFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>
