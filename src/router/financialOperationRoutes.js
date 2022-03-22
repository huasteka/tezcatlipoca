const routes = [
  {
    path: 'finance-management/financial-history',
    name: 'dashboard.finance-management.history',
    component: () => import('@/views/FinancialOperation/FinancialOperationHistoryView.vue'),
  },
  {
    path: 'finance-management/receipts',
    name: 'dashboard.finance-management.receipts',
    component: () => import('@/views/FinancialOperation/FinancialOperationDepositView.vue'),
  },
  {
    path: 'finance-management/payments',
    name: 'dashboard.finance-management.payments',
    component: () => import('@/views/FinancialOperation/FinancialOperationWithdrawView.vue'),
  },
  {
    path: 'finance-management/account-transfer',
    name: 'dashboard.finance-management.transfer',
    component: () => import('@/views/FinancialOperation/FinancialOperationTransferView.vue'),
  },
];

export default routes;
