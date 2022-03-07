<script setup>
import { ref } from 'vue';
import { Avatar, Lock } from '@element-plus/icons-vue';
import UserProfileForm from '@/components/UserProfileForm.vue';
import UserSecurityForm from '@/components/UserSecurityForm.vue';
import { useNavigationStore } from '@/stores/navigation';

const navigationStore = useNavigationStore();

const availableItems = {
  profile: 'dashboard/settings/profile',
  security: 'dashboard/settings/security'
};

const activeIndex = ref({
  default: navigationStore.currentSettingsPath,
  current: navigationStore.currentSettingsPath
});

const displayProfileSetup = () => {
  return activeIndex.value.current === availableItems.profile;
}

const displaySecuritySetup = () => {
  return activeIndex.value.current === availableItems.security;
}

const handleSelect = (key) => {
  navigationStore.setSettingsPath(key);
  activeIndex.value.current = key;
}
</script>

<template>
  <el-container>
    <el-aside>
      <el-menu :default-active="activeIndex.default" mode="vertical" @select="handleSelect">
        <el-menu-item index="dashboard/settings/profile">
          <el-icon>
            <Avatar />
          </el-icon>
          <span>Profile</span>
        </el-menu-item>

        <el-menu-item index="dashboard/settings/security">
          <el-icon>
            <Lock />
          </el-icon>
          <span>Security</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <div v-if="displayProfileSetup()">
        <UserProfileForm />
      </div>

      <div v-if="displaySecuritySetup()">
        <UserSecurityForm />
      </div>
    </el-main>
  </el-container>
</template>
