const routes = [
  {
    path: 'finance-management/payment-types',
    name: 'dashboard.finance-management.payment-types',
    component: () => import('@/views/FinancialPaymentType/PaymentTypeListView.vue'),
  },
  {
    path: 'finance-management/payment-types/new',
    name: 'dashboard.finance-management.payment-types.new',
    component: () => import('@/views/FinancialPaymentType/PaymentTypeCreateView.vue'),
  },
  {
    path: 'finance-management/payment-types/:paymentTypeId/edit',
    name: 'dashboard.finance-management.payment-types.edit',
    component: () => import('@/views/FinancialPaymentType/PaymentTypeUpdateView.vue'),
    props: ({ params }) => ({ paymentTypeId: Number.parseInt(params.paymentTypeId, 10) || 0 }),
  },
];

export default routes;
