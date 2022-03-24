const routes = [
  {
    path: 'sales-management/delivery-addresses',
    name: 'dashboard.sales-management.delivery-addresses',
    component: () => import('@/views/SalesDeliveryAddress/DeliveryAddressListView.vue'),
  },
  {
    path: 'sales-management/delivery-addresses/new',
    name: 'dashboard.sales-management.delivery-addresses.new',
    component: () => import('@/views/SalesDeliveryAddress/DeliveryAddressCreateView.vue'),
  },
  {
    path: 'sales-management/delivery-addresses/:deliveryAddressId/edit',
    name: 'dashboard.sales-management.delivery-addresses.edit',
    component: () => import('@/views/SalesDeliveryAddress/DeliveryAddressUpdateView.vue'),
    props: ({ params }) => ({ deliveryAddressId: Number.parseInt(params.deliveryAddressId, 10) || 0 }),
  },
];

export default routes;
