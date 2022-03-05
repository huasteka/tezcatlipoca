<script setup>
import { ref } from 'vue';
import { Odometer, Setting, SwitchButton } from '@element-plus/icons-vue';
import { useAuthStore } from '@/stores/authentication';
import router from '@/router';

const authStore = useAuthStore();

const activeIndex = ref('dashboard');

const handleSelect = (key, keyPath) => {
  if (key === 'logout') {
    authStore.logout();
    router.push({ path: '/' });
    return;
  }

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

    <el-sub-menu index="1">
      <template #title>Item 1</template>
      <el-menu-item index="1-1">Item 1-A</el-menu-item>
      <el-menu-item index="1-2">Item 1-B</el-menu-item>
      <el-menu-item index="1-3">Item 1-C</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>Item 2</template>
      <el-menu-item index="2-1">Item 2-A</el-menu-item>
      <el-menu-item index="2-2">Item 2-B</el-menu-item>
      <el-menu-item index="2-3">Item 2-C</el-menu-item>
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
