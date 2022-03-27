<script setup>
import { ref } from 'vue';
import {
  Odometer,
  Setting,
  SwitchButton,
} from '@element-plus/icons-vue';
import { useAuthStore } from '@/stores/authentication';
import { useNavigationStore } from '@/stores/navigation';
import router from '@/router';
import NavigationHeaderFinance from './NavigationHeaderFinance.vue';
import NavigationHeaderSales from './NavigationHeaderSales.vue';
import NavigationHeaderStorage from './NavigationHeaderStorage.vue';

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

    <NavigationHeaderStorage />

    <NavigationHeaderFinance />

    <NavigationHeaderSales />

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
