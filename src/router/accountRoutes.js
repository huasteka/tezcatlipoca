const routes = [
  {
    path: 'finance-management/accounts',
    name: 'dashboard.finance-management.accounts',
    component: () => import('@/views/FinancialAccount/AccountListView.vue'),
  },
  {
    path: 'finance-management/accounts/new',
    name: 'dashboard.finance-management.accounts.new',
    component: () => import('@/views/FinancialAccount/AccountCreateView.vue'),
  },
  {
    path: 'finance-management/accounts/:accountId/edit',
    name: 'dashboard.finance-management.accounts.edit',
    component: () => import('@/views/FinancialAccount/AccountUpdateView.vue'),
    props: ({ params }) => ({ accountId: Number.parseInt(params.accountId, 10) || 0 }),
  },
];

export default routes;
