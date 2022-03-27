const routes = [
  {
    path: 'sales-management/products',
    name: 'dashboard.sales-management.products',
    component: () => import('@/views/SalesProduct/ProductListView.vue'),
  },
  {
    path: 'sales-management/products/new',
    name: 'dashboard.sales-management.products.new',
    component: () => import('@/views/SalesProduct/ProductCreateView.vue'),
  },
  {
    path: 'sales-management/products/:productId/edit',
    name: 'dashboard.sales-management.products.edit',
    component: () => import('@/views/SalesProduct/ProductUpdateView.vue'),
    props: ({ params }) => ({ productId: Number.parseInt(params.productId, 10) || 0 }),
  },
];

export default routes;
