export default function createService(connector, headers) {
  return {
    createBudgetCategory(budgetCategory) {
      return connector.post('/budget-categories', budgetCategory, headers);
    },

    updateBudgetCategory(budgetCategory) {
      return connector.put(`/budget-categories/${budgetCategory.id}`, budgetCategory, headers);
    },

    deleteBudgetCategory(budgetCategoryId) {
      return connector.delete(`/budget-categories/${budgetCategoryId}`, headers);
    },

    fetchBudgetCategory(budgetCategoryId) {
      return connector.get(`/budget-categories/${budgetCategoryId}`, headers);
    },

    fetchBudgetCategoryList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/budget-categories', config);
    },
  }
}
