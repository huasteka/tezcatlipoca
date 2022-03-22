const routes = [
  {
    path: 'finance-management/budget-categories',
    name: 'dashboard.finance-management.budget-categories',
    component: () => import('@/views/FinancialBudgetCategory/BudgetCategoryListView.vue'),
  },
  {
    path: 'finance-management/budget-categories/new',
    name: 'dashboard.finance-management.budget-categories.new',
    component: () => import('@/views/FinancialBudgetCategory/BudgetCategoryCreateView.vue'),
  },
  {
    path: 'finance-management/budget-categories/:budgetCategoryId/edit',
    name: 'dashboard.finance-management.budget-categories.edit',
    component: () => import('@/views/FinancialBudgetCategory/BudgetCategoryUpdateView.vue'),
    props: ({ params }) => ({ budgetCategoryId: Number.parseInt(params.budgetCategoryId, 10) || 0 }),
  },
];

export default routes;
