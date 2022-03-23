<script setup>
import {
  Back,
  CreditCard,
  Histogram,
  Right,
  Switch,
} from '@element-plus/icons-vue';
</script>

<template>
  <el-sub-menu index="dashboard/finance-management">
    <template #title>
      <el-icon>
        <CreditCard />
      </el-icon>
      <span>Financial Management</span>
    </template>

    <el-menu-item index="budget-groups">Budget Groups</el-menu-item>
    <el-menu-item index="budget-categories">Budget Categories</el-menu-item>
    <el-menu-item index="accounts">Accounts</el-menu-item>
    <el-menu-item index="payment-types">Payment Types</el-menu-item>

    <el-menu-item-group title="Financial Operations">
      <el-menu-item index="financial-history">
        <el-icon>
          <Histogram />
        </el-icon>
        <span>History</span>
      </el-menu-item>

      <el-menu-item index="receipts">
        <el-icon>
          <Right />
        </el-icon>
        <span>Receipts</span>
      </el-menu-item>

      <el-menu-item index="payments">
        <el-icon>
          <Back />
        </el-icon>
        <span>Payments</span>
      </el-menu-item>

      <el-menu-item index="account-transfer">
        <el-icon>
          <Switch />
        </el-icon>
        <span>Transfer</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>
</template>
