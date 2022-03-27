const routes = [
  {
    path: 'sales-management/merchandises',
    name: 'dashboard.sales-management.merchandises',
    component: () => import('@/views/SalesMerchandise/MerchandiseListView.vue'),
  },
  {
    path: 'sales-management/merchandises/new',
    name: 'dashboard.sales-management.merchandises.new',
    component: () => import('@/views/SalesMerchandise/MerchandiseCreateView.vue'),
  },
  {
    path: 'sales-management/merchandises/:merchandiseId/edit',
    name: 'dashboard.sales-management.merchandises.edit',
    component: () => import('@/views/SalesMerchandise/MerchandiseUpdateView.vue'),
    props: ({ params }) => ({ merchandiseId: Number.parseInt(params.merchandiseId, 10) || 0 }),
  },
];

export default routes;
