const routes = [
  {
    path: 'sales-management/suppliers',
    name: 'dashboard.sales-management.suppliers',
    component: () => import('@/views/SalesSupplier/SupplierListView.vue'),
  },
  {
    path: 'sales-management/suppliers/new',
    name: 'dashboard.sales-management.suppliers.new',
    component: () => import('@/views/SalesSupplier/SupplierCreateView.vue'),
  },
  {
    path: 'sales-management/suppliers/:supplierId/edit',
    name: 'dashboard.sales-management.suppliers.edit',
    component: () => import('@/views/SalesSupplier/SupplierUpdateView.vue'),
    props: ({ params }) => ({ supplierId: Number.parseInt(params.supplierId, 10) || 0 }),
  },
];

export default routes;
