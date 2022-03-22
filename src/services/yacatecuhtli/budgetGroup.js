export default function createService(connector, headers) {
  return {
    createBudgetGroup(budgetGroup) {
      return connector.post('/budget-groups', budgetGroup, headers);
    },

    updateBudgetGroup(budgetGroup) {
      return connector.put(`/budget-groups/${budgetGroup.id}`, budgetGroup, headers);
    },

    deleteBudgetGroup(budgetGroupId) {
      return connector.delete(`/budget-groups/${budgetGroupId}`, headers);
    },

    fetchBudgetGroup(budgetGroupId) {
      return connector.get(`/budget-groups/${budgetGroupId}`, headers);
    },

    fetchBudgetGroupList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/budget-groups', config);
    },
  }
}
