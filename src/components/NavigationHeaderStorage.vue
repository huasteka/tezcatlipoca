<script setup>
import {
  Back,
  Histogram,
  Right,
  Switch,
  TakeawayBox
} from '@element-plus/icons-vue';
</script>

<template>
  <el-sub-menu index="dashboard/storage-management">
    <template #title>
      <el-icon>
        <TakeawayBox />
      </el-icon>
      <span>Storage Management</span>
    </template>

    <el-menu-item index="storages">Storages</el-menu-item>
    <el-menu-item index="measure-units">Measurement Units</el-menu-item>
    <el-menu-item index="items">Items</el-menu-item>

    <el-menu-item-group title="Storage Operations">
      <el-menu-item index="storage-history">
        <el-icon>
          <Histogram />
        </el-icon>
        <span>History</span>
      </el-menu-item>

      <el-menu-item index="storage-deposit">
        <el-icon>
          <Right />
        </el-icon>
        <span>Deposit</span>
      </el-menu-item>

      <el-menu-item index="storage-withdraw">
        <el-icon>
          <Back />
        </el-icon>
        <span>Withdraw</span>
      </el-menu-item>

      <el-menu-item index="storage-transfer">
        <el-icon>
          <Switch />
        </el-icon>
        <span>Transfer</span>
      </el-menu-item>
    </el-menu-item-group>
  </el-sub-menu>
</template>
