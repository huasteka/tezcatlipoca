const routes = [
  {
    path: 'finance-management/budget-groups',
    name: 'dashboard.finance-management.budget-groups',
    component: () => import('@/views/FinancialBudgetGroup/BudgetGroupListView.vue'),
  },
  {
    path: 'finance-management/budget-groups/new',
    name: 'dashboard.finance-management.budget-groups.new',
    component: () => import('@/views/FinancialBudgetGroup/BudgetGroupCreateView.vue'),
  },
  {
    path: 'finance-management/budget-groups/:budgetGroupId/edit',
    name: 'dashboard.finance-management.budget-groups.edit',
    component: () => import('@/views/FinancialBudgetGroup/BudgetGroupUpdateView.vue'),
    props: ({ params }) => ({ budgetGroupId: Number.parseInt(params.budgetGroupId, 10) || 0 }),
  },
];

export default routes;
