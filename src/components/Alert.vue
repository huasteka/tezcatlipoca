<script setup>
import { reactive } from 'vue';
import { useAlertStore } from '@/stores/alerts';

const store = useAlertStore();

const currentAlerts = reactive(store.currentAlerts);

const closeAlert = (alertId) => store.remove(alertId);
</script>

<template>
  <div class="spacing-between-alerts" v-for="alert in currentAlerts" :key="alert.id">
    <el-alert show-icon :type="alert.type" @close="closeAlert(alert.id)">{{ alert.message }}</el-alert>
  </div>
</template>

<style scoped>
.spacing-between-alerts {
  margin: 5px;
}
</style>
