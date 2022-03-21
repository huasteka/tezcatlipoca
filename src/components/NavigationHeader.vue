<script setup>
import { ref } from 'vue';
import {
  Back,
  CreditCard,
  Histogram,
  Odometer,
  Right,
  Setting,
  Sell,
  Shop,
  SoldOut,
  Switch,
  SwitchButton,
  TakeawayBox
} from '@element-plus/icons-vue';
import { useAuthStore } from '@/stores/authentication';
import { useNavigationStore } from '@/stores/navigation';
import router from '@/router';

const authStore = useAuthStore();
const navigationStore = useNavigationStore();

const activeIndex = ref(navigationStore.currentDashboardPath);

const handleSelect = (key, keyPath) => {
  if (key === 'logout') {
    authStore.logout();
    navigationStore.logout();
    router.push({ path: '/' });
    return;
  }

  navigationStore.setDashboardPath(key);
  router.push({ path: `/${keyPath.join('/')}` });
}
</script>

<template>
  <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <el-menu-item index="dashboard">
      <el-icon>
        <Odometer />
      </el-icon>
      <span>Dashboard</span>
    </el-menu-item>

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

    <el-menu-item index="dashboard/settings" class="dock-right">
      <el-icon>
        <Setting />
      </el-icon>
      <span>Settings</span>
    </el-menu-item>

    <el-menu-item index="logout">
      <el-icon>
        <SwitchButton />
      </el-icon>
      <span>Logout</span>
    </el-menu-item>
  </el-menu>
</template>


<style scoped>
.el-menu--horizontal > .el-menu-item.dock-right {
  margin-left: auto;
}
</style>
