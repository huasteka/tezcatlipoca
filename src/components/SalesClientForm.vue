<script setup>
import { ref, reactive } from 'vue';
import { Back, Delete, Plus, Select } from '@element-plus/icons-vue';
import { clientValidationSchema, contactValidationSchema } from '@/validators/createClientValidator';
import router from '@/router';

const props = defineProps({
  client: Object,
});

const emit = defineEmits(['submit']);

const { id = null, name = '', legal_document_code = '', contacts = [] } = props.client || {};
const createClientFormRef = ref();
const createClientForm = reactive({ id, name, legal_document_code, contacts });
const clientRules = reactive(clientValidationSchema);
const contactRules = reactive(contactValidationSchema);
const vm = reactive({ hasContacts: contacts.length > 0 });

const addContact = () => {
  createClientForm.contacts.push({
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
  if (createClientForm.contacts[contactIndex].id) {
    createClientForm.contacts[contactIndex].deletionMarked = true;
    return;
  }

  createClientForm.contacts.splice(contactIndex, 1);

  if (createClientForm.contacts.length === 0) {
    vm.hasContacts = false;
  }
}

const handleContactToggle = (activated) => {
  if (activated) {
    addContact();
    return;
  }

  createClientForm.contacts = [];
}

const navigateBack = () => router.push({ path: '/dashboard/sales-management/clients' });

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
  <el-form label-width="160px" ref="createClientFormRef" :model="createClientForm">
    <el-form-item label="Name" prop="name" :rules="clientRules.name">
      <el-input v-model="createClientForm.name"></el-input>
    </el-form-item>

    <el-form-item
      label="Legal Document"
      prop="legal_document_code"
      :rules="clientRules.legal_document_code"
    >
      <el-input v-model="createClientForm.legal_document_code"></el-input>
    </el-form-item>

    <el-form-item label="Contacts">
      <el-switch v-model="vm.hasContacts" @change="handleContactToggle($event)" />
    </el-form-item>

    <div v-if="vm.hasContacts">
      <div
        class="contact-form-area"
        v-for="(_, index) in createClientForm.contacts"
        :key="index"
        :class="{ 'contact-form-area-deleted': createClientForm.contacts[index].deletionMarked }"
      >
        <el-badge
          v-if="createClientForm.contacts[index].deletionMarked"
          value="To be deleted"
          class="item"
        ></el-badge>

        <el-form-item
          label="Address"
          :prop="`contacts.${index}.address`"
          :rules="contactRules.address"
        >
          <el-input v-model="createClientForm.contacts[index].address"></el-input>
        </el-form-item>

        <el-form-item
          label="Address Complement"
          :prop="`contacts.${index}.address_complement`"
          :rules="contactRules.address_complement"
        >
          <el-input v-model="createClientForm.contacts[index].address_complement"></el-input>
        </el-form-item>

        <el-form-item
          label="Postal Code"
          :prop="`contacts.${index}.postal_code`"
          :rules="contactRules.postal_code"
        >
          <el-input class="small-form-input" v-model="createClientForm.contacts[index].postal_code"></el-input>
        </el-form-item>

        <el-form-item label="City" :prop="`contacts.${index}.city`" :rules="contactRules.city">
          <el-input class="small-form-input" v-model="createClientForm.contacts[index].city"></el-input>
        </el-form-item>

        <el-form-item
          label="State/Province"
          :prop="`contacts.${index}.region`"
          :rules="contactRules.region"
        >
          <el-input class="small-form-input" v-model="createClientForm.contacts[index].region"></el-input>
        </el-form-item>

        <el-form-item
          label="Country"
          :prop="`contacts.${index}.country`"
          :rules="contactRules.country"
        >
          <el-input class="small-form-input" v-model="createClientForm.contacts[index].country"></el-input>
        </el-form-item>

        <el-form-item label="Phone" :prop="`contacts.${index}.phone`" :rules="contactRules.address">
          <el-input class="small-form-input" v-model="createClientForm.contacts[index].phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            :icon="Delete"
            :disabled="createClientForm.contacts[index].deletionMarked"
            @click="removeContact(index)"
          >Delete Contact</el-button>
        </el-form-item>
      </div>
    </div>

    <el-form-item>
      <el-button :icon="Back" @click="navigateBack()">Back</el-button>
      <el-button v-if="vm.hasContacts" :icon="Plus" @click="addContact()">Add Contact</el-button>
      <el-button type="primary" :icon="Select" @click="submitForm(createClientFormRef)">Submit</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>
.contact-form-area {
  border-width: thin;
  border-style: dotted;
  border-color: black;
  padding: 10px;
  margin: 10px;
}
.contact-form-area-deleted {
  border-color: red;
  border-style: solid;
}
.small-form-input {
  width: 350px;
}
</style>
