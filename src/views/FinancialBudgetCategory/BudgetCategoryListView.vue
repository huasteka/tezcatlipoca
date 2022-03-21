<script setup>
import { reactive } from 'vue';
import { ElMessageBox } from 'element-plus';
import { Delete, EditPen, Plus } from '@element-plus/icons-vue';
import NotificationService from '@/services/notify';
import { useFinancialStore } from '@/stores/finance';
import router from '@/router';

const store = useFinancialStore();

const vm = reactive({ isLoading: true });
store.fetchBudgetCategoryList().then(() => {
  vm.isLoading = false;
});

const handleNewBudgetCategory = () => {
  router.push({ path: '/dashboard/finance-management/budget-categories/new' });
}

const handleUpdateBudgetCategory = (event) => {
  router.push({ path: `/dashboard/finance-management/budget-categories/${event.id}/edit` })
}

const handleDeleteBudgetCategory = (event) => {
  ElMessageBox.confirm('Are you sure to delete this budget category?')
    .then(() => {
      store.deleteBudgetCategory(event.id)
        .then(() => NotificationService.notifySuccess('Budget category deleted'))
        .catch(() => NotificationService.notifyError('Could not delete budget category'));
    })
    .catch(() => null);
}
</script>

<template>
  <h2>List budget categories</h2>

  <el-table
    class="resize-and-center-data-table"
    row-key="id"
    :data="store.budgetCategories"
    v-loading="vm.isLoading"
  >
    <el-table-column width="100" prop="id" label="#" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="group.name" label="Budget Group" />

    <el-table-column width="250">
      <template #header>
        <el-button
          class="align-content-right"
          type="primary"
          size="small"
          @click.prevent="handleNewBudgetCategory()"
        >
          <el-icon>
            <Plus />
          </el-icon>
          <span>New</span>
        </el-button>
      </template>

      <template #default="scope">
        <el-button-group class="align-content-right">
          <el-button size="small" @click.prevent="handleUpdateBudgetCategory(scope.row)">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>Update</span>
          </el-button>

          <el-button type="danger" size="small" @click.prevent="handleDeleteBudgetCategory(scope.row)">
            <el-icon>
              <Delete />
            </el-icon>
            <span>Delete</span>
          </el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.resize-and-center-data-table {
  margin: 0 auto;
  width: 80%;
}
.align-content-right {
  float: right;
}
</style>
