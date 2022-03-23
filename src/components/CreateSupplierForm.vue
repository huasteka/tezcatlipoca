<script setup>
import { ref, reactive } from 'vue';
import { Back, Delete, Plus, Select } from '@element-plus/icons-vue';
import { supplierValidationSchema, contactValidationSchema } from '@/validators/createSupplierValidator';
import router from '@/router';

const props = defineProps({
  supplier: Object,
});

const emit = defineEmits(['submit']);

const {
  id = null,
  name = '',
  trade_name = '',
  legal_document_code = '',
  contacts = []
} = props.supplier || {};
const createSupplierFormRef = ref();
const createSupplierForm = reactive({ id, name, trade_name, legal_document_code, contacts });
const supplierRules = reactive(supplierValidationSchema);
const contactRules = reactive(contactValidationSchema);
const vm = reactive({ hasContacts: contacts.length > 0 });

const addContact = () => {
  createSupplierForm.contacts.push({
    phone: '',
    address: '',
    address_complement: '',
    postal_code: '',
    city: '',
    region: '',
    country: '',
  });
}

const removeContact = (contactIndex) => {
  if (createSupplierForm.contacts[contactIndex].id) {
    createSupplierForm.contacts[contactIndex].deletionMarked = true;
    return;
  }

  createSupplierForm.contacts.splice(contactIndex, 1);

  if (createSupplierForm.contacts.length === 0) {
    vm.hasContacts = false;
  }
}

const handleContactToggle = (activated) => {
  if (activated) {
    addContact();
    return;
  }

  createSupplierForm.contacts = [];
}

const navigateBack = () => router.push({ path: '/dashboard/sales-management/suppliers' });

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
  <el-form label-width="180px" ref="createSupplierFormRef" :model="createSupplierForm">
    <el-form-item label="Name" prop="name" :rules="supplierRules.name">
      <el-input v-model="createSupplierForm.name"></el-input>
    </el-form-item>

    <el-form-item
      label="Trade Name"
      prop="trade_name"
      :rules="supplierRules.trade_name"
    >
      <el-input v-model="createSupplierForm.trade_name"></el-input>
    </el-form-item>

    <el-form-item
      label="Legal Document"
      prop="legal_document_code"
      :rules="supplierRules.legal_document_code"
    >
      <el-input v-model="createSupplierForm.legal_document_code"></el-input>
    </el-form-item>

    <el-form-item label="Contacts">
      <el-switch v-model="vm.hasContacts" @change="handleContactToggle($event)" />
    </el-form-item>

    <div v-if="vm.hasContacts">
      <div
        class="contact-form-area"
        v-for="(_, index) in createSupplierForm.contacts"
        :key="index"
        :class="{ 'contact-form-area-deleted': createSupplierForm.contacts[index].deletionMarked }"
      >
        <el-badge
          v-if="createSupplierForm.contacts[index].deletionMarked"
          value="To be deleted"
          class="item"
        ></el-badge>

        <el-form-item
          label="Address"
          :prop="`contacts.${index}.address`"
          :rules="contactRules.address"
        >
          <el-input v-model="createSupplierForm.contacts[index].address"></el-input>
        </el-form-item>

        <el-form-item
          label="Address Complement"
          :prop="`contacts.${index}.address_complement`"
          :rules="contactRules.address_complement"
        >
          <el-input v-model="createSupplierForm.contacts[index].address_complement"></el-input>
        </el-form-item>

        <el-form-item
          label="Postal Code"
          :prop="`contacts.${index}.postal_code`"
          :rules="contactRules.postal_code"
        >
          <el-input
            class="small-form-input"
            v-model="createSupplierForm.contacts[index].postal_code"
          ></el-input>
        </el-form-item>

        <el-form-item label="City" :prop="`contacts.${index}.city`" :rules="contactRules.city">
          <el-input class="small-form-input" v-model="createSupplierForm.contacts[index].city"></el-input>
        </el-form-item>

        <el-form-item
          label="State/Province"
          :prop="`contacts.${index}.region`"
          :rules="contactRules.region"
        >
          <el-input class="small-form-input" v-model="createSupplierForm.contacts[index].region"></el-input>
        </el-form-item>

        <el-form-item
          label="Country"
          :prop="`contacts.${index}.country`"
          :rules="contactRules.country"
        >
          <el-input class="small-form-input" v-model="createSupplierForm.contacts[index].country"></el-input>
        </el-form-item>

        <el-form-item label="Phone" :prop="`contacts.${index}.phone`" :rules="contactRules.address">
          <el-input class="small-form-input" v-model="createSupplierForm.contacts[index].phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            :icon="Delete"
            :disabled="createSupplierForm.contacts[index].deletionMarked"
            @click="removeContact(index)"
          >Delete Contact</el-button>
        </el-form-item>
      </div>
    </div>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button v-if="vm.hasContacts" :icon="Plus" @click="addContact()">Add Contact</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createSupplierFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.contact-form-area {
  border-width: thin;
  border-style: dotted;
  border-color: black;
  padding: 50px;
  margin: 20px;
}
.contact-form-area-deleted {
  border-color: red;
  border-style: solid;
}
.small-form-input {
  width: 350px;
}
</style>
