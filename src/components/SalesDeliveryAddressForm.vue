<script setup>
import { ref, reactive } from 'vue';
import { Back, Select } from '@element-plus/icons-vue';
import createDeliveryAddressValidator from '@/validators/createDeliveryAddressValidator';
import router from '@/router';

const props = defineProps({
  deliveryAddress: Object,
});

const emit = defineEmits(['submit']);

const {
  id = null,
  is_default = false,
  contacts: {
    phone = '',
    address = '',
    address_complement = '',
    postal_code = '',
    city = '',
    region = '',
    country = '',
  } = {},
} = props.deliveryAddress || {};
const createDeliveryAddressFormRef = ref();
const createDeliveryAddressForm = reactive({
  id,
  is_default,
  phone,
  address,
  address_complement,
  postal_code,
  city,
  region,
  country,
});
const rules = reactive(createDeliveryAddressValidator);

const navigateBack = () => router.push({ path: '/dashboard/sales-management/delivery-addresses' });

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
    label-width="170px"
    ref="createDeliveryAddressFormRef"
    :model="createDeliveryAddressForm"
    :rules="rules"
  >
    <el-form-item label="Main Address?">
      <el-switch v-model="createDeliveryAddressForm.is_default" />
    </el-form-item>

    <el-form-item label="Address" prop="address">
      <el-input v-model="createDeliveryAddressForm.address"></el-input>
    </el-form-item>

    <el-form-item label="Address Complement" prop="address_complement">
      <el-input v-model="createDeliveryAddressForm.address_complement"></el-input>
    </el-form-item>

    <el-form-item label="Postal Code" prop="postal_code">
      <el-input class="small-form-input" v-model="createDeliveryAddressForm.postal_code"></el-input>
    </el-form-item>

    <el-form-item label="City" prop="city">
      <el-input class="small-form-input" v-model="createDeliveryAddressForm.city"></el-input>
    </el-form-item>

    <el-form-item label="State/Province" prop="region">
      <el-input class="small-form-input" v-model="createDeliveryAddressForm.region"></el-input>
    </el-form-item>

    <el-form-item label="Country" prop="country">
      <el-input class="small-form-input" v-model="createDeliveryAddressForm.country"></el-input>
    </el-form-item>

    <el-form-item label="Phone" prop="phone">
      <el-input class="small-form-input" v-model="createDeliveryAddressForm.phone"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button
        type="primary"
        :icon="Select"
        @click="submitForm(createDeliveryAddressFormRef)"
      >Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.small-form-input {
  width: 350px;
}
</style>