const routes = [
  {
    path: 'sales-management/sales-history',
    name: 'dashboard.sales-management.history',
    component: () => import('@/views/SalesOperation/SalesOperationHistoryView.vue'),
  },
  {
    path: 'sales-management/purchase-order',
    name: 'dashboard.sales-management.purchase-order',
    component: () => import('@/views/SalesOperation/SalesPurchaseOrderView.vue'),
  },
  {
    path: 'sales-management/sales-order',
    name: 'dashboard.sales-management.sales-order',
    component: () => import('@/views/SalesOperation/SalesSalesOrderView.vue'),
  },
];

export default routes;
