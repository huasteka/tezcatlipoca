import { defineStore } from 'pinia';
import {
  createBudgetGroupService,
  createBudgetCategoryService,
  createAccountService,
  responseToMapReducer
} from '@/services/yacatecuhtli';
import { useAuthStore } from './authentication';

const bearerToken = useAuthStore().bearerToken;
const budgetGroupService = createBudgetGroupService(bearerToken);
const budgetCategoryService = createBudgetCategoryService(bearerToken);
const accountService = createAccountService(bearerToken);

export const useFinancialStore = defineStore({
  id: 'yacatecuhtli',

  state: () => ({
    budgetGroupList: {},
    budgetCategoryList: {},
    accountList: {},
    selectedBudgetGroup: null,
    selectedBudgetCategory: null,
    selectedAccount: null,
  }),

  getters: {
    budgetGroups: (state) => Object.values(state.budgetGroupList),
    budgetCategories: (state) => Object.values(state.budgetCategoryList),
    accounts: (state) => Object.values(state.accountList),
  },

  actions: {
    async fetchBudgetGroupList(pagination = null) {
      const response = await budgetGroupService.fetchBudgetGroupList(pagination);
      this.$patch((state) => state.budgetGroupList = responseToMapReducer(response.data.attributes));
    },

    async fetchOneBudgetGroup(budgetGroupId) {
      if (this.budgetGroupList[budgetGroupId]) {
        this.$patch((state) => state.selectedBudgetGroup = this.budgetGroupList[budgetGroupId]);
        return;
      }

      const { data } = await budgetGroupService.fetchBudgetGroup(budgetGroupId);
      this.$patch((state) => state.selectedBudgetGroup = data.attributes);
    },

    async createBudgetGroup({ name }) {
      const { data } = await budgetGroupService.createBudgetGroup({ name });
      this.$patch((state) => state.budgetGroupList[data.attributes.id] = data.attributes);
    },

    async updateBudgetGroup({ id, name }) {
      const updatedBudgetGroup = { id, name };
      await budgetGroupService.updateBudgetGroup(updatedBudgetGroup);
      this.$patch((state) => state.budgetGroupList[id] = updatedBudgetGroup);
    },

    async deleteBudgetGroup(budgetGroupId) {
      await budgetGroupService.deleteBudgetGroup(budgetGroupId);
      this.$patch((state) => delete state.budgetGroupList[budgetGroupId]);
    },

    async fetchBudgetCategoryList(pagination = null) {
      const response = await budgetCategoryService.fetchBudgetCategoryList(pagination);
      this.$patch((state) => state.budgetCategoryList = responseToMapReducer(response.data.attributes));
    },

    async fetchOneBudgetCategory(budgetCategoryId) {
      if (this.budgetCategoryList[budgetCategoryId]) {
        this.$patch((state) => state.selectedBudgetCategory = this.budgetCategoryList[budgetCategoryId]);
        return;
      }

      const { data } = await budgetCategoryService.fetchBudgetCategory(budgetCategoryId);
      this.$patch((state) => state.selectedBudgetCategory = data.attributes);
    },

    async createBudgetCategory({ name, group }) {
      const { data } = await budgetCategoryService.createBudgetCategory({ name, group });
      this.$patch((state) => state.budgetCategoryList[data.attributes.id] = data.attributes);
    },

    async updateBudgetCategory({ id, name, group }) {
      const updatedBudgetCategory = { id, name, group };
      await budgetCategoryService.updateBudgetCategory(updatedBudgetCategory);
      this.$patch((state) => state.budgetCategoryList[id] = updatedBudgetCategory);
    },

    async deleteBudgetCategory(budgetCategoryId) {
      await budgetCategoryService.deleteBudgetCategory(budgetCategoryId);
      this.$patch((state) => delete state.budgetCategoryList[budgetCategoryId]);
    },

    async fetchAccountList(pagination = null) {
      const response = await accountService.fetchAccountList(pagination);
      this.$patch((state) => state.accountList = responseToMapReducer(response.data.attributes));
    },

    async fetchOneAccount(accountId) {
      if (this.accountList[accountId]) {
        this.$patch((state) => state.selectedAccount = this.accountList[accountId]);
        return;
      }

      const { data } = await accountService.fetchAccount(accountId);
      this.$patch((state) => state.selectedAccount = data.attributes);
    },

    async createAccount({ name, code }) {
      const { data } = await accountService.createAccount({ name, code });
      this.$patch((state) => state.accountList[data.attributes.id] = data.attributes);
    },

    async updateAccount({ id, name, code }) {
      const updatedAccount = { id, name, code };
      await accountService.updateAccount(updatedAccount);
      this.$patch((state) => state.accountList[id] = updatedAccount);
    },

    async deleteAccount(accountId) {
      await accountService.deleteAccount(accountId);
      this.$patch((state) => delete state.accountList[accountId]);
    },
  },
});
