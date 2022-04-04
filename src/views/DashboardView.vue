<script setup>
import FinancialManagementImage from '@/components/FinancialManagementImage.vue';
import SalesManagementImage from '@/components/SalesManagementImage.vue';
import StorageManagementImage from '@/components/StorageManagementImage.vue';
</script>

<template>
  <el-row class="template-row-margin-top" :gutter="15">
    <el-col :xs="24" :sm="12" :md="8">
      <RouterLink to="/dashboard/storage-management/storage-history" v-slot="{ href }" custom>
        <el-link type="primary" :href="href" :underline="false">
          <StorageManagementImage />
          <span>Storage Management</span>
        </el-link>
      </RouterLink>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <RouterLink to="/dashboard/finance-management/financial-history" v-slot="{ href }" custom>
        <el-link type="primary" :href="href" :underline="false">
          <FinancialManagementImage />
          <span>Financial Management</span>
        </el-link>
      </RouterLink>
    </el-col>

    <el-col :xs="24" :sm="12" :md="8">
      <RouterLink to="/dashboard/sales-management/sales-history" v-slot="{ href }" custom>
        <el-link type="primary" :href="href" :underline="false">
          <SalesManagementImage />
          <span>Sales Management</span>
        </el-link>
      </RouterLink>
    </el-col>
  </el-row>
</template>

<style scoped>
.template-row-margin-top {
  margin-top: 50px;
}
</style>