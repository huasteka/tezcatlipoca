import { defineStore } from 'pinia';
import {
  createBudgetGroupService,
  responseToMapReducer
} from '@/services/yacatecuhtli';
import { useAuthStore } from './authentication';

const bearerToken = useAuthStore().bearerToken;
const budgetGroupService = createBudgetGroupService(bearerToken);

export const useFinancialStore = defineStore({
  id: 'yacatecuhtli',

  state: () => ({
    budgetGroupList: {},
    selectedBudgetGroup: null,
  }),
  
  getters: {
    budgetGroups: (state) => Object.values(state.budgetGroupList),
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
  },
});
