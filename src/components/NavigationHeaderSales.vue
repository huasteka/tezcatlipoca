<script setup>
import {
  Histogram,
  Sell,
  Shop,
  SoldOut,
} from '@element-plus/icons-vue';
</script>

<template>
  <el-sub-menu index="dashboard/sales-management">
    <template #title>
      <el-icon>
        <Shop />
      </el-icon>
      <span>Sales Management</span>
    </template>

    <el-menu-item index="clients">Clients</el-menu-item>
    <el-menu-item index="suppliers">Suppliers</el-menu-item>
    <el-menu-item index="products">Products</el-menu-item>
    <el-menu-item index="merchandises">Merchandises</el-menu-item>
    <el-menu-item index="delivery-addresses">Delivery Addresses</el-menu-item>

    <el-menu-item-group title="Sales Operations">
      <el-menu-item index="sales-history">
        <el-icon>
          <Histogram />
        </el-icon>
        <span>History</span>
      </el-menu-item>

      <el-menu-item index="purchase-order">
        <el-icon>
          <SoldOut />
        </el-icon>
        <span>Purchase Order</span>
      </el-menu-item>

      <el-menu-item index="sales-order">
        <el-icon>
          <Sell />
        </el-icon>
        <span>Sales Order</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>
</template>
