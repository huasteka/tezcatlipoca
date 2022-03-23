const routes = [
  {
    path: 'sales-management/clients',
    name: 'dashboard.sales-management.clients',
    component: () => import('@/views/SalesClient/ClientListView.vue'),
  },
  {
    path: 'sales-management/clients/new',
    name: 'dashboard.sales-management.clients.new',
    component: () => import('@/views/SalesClient/ClientCreateView.vue'),
  },
  {
    path: 'sales-management/clients/:clientId/edit',
    name: 'dashboard.sales-management.clients.edit',
    component: () => import('@/views/SalesClient/ClientUpdateView.vue'),
    props: ({ params }) => ({ clientId: Number.parseInt(params.clientId, 10) || 0 }),
  },
];

export default routes;
