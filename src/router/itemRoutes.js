const routes = [
  {
    path: 'storage-management/items',
    name: 'dashboard.storage-management.items',
    component: () => import('@/views/StorageItem/ItemListView.vue'),
  },
  {
    path: 'storage-management/items/new',
    name: 'dashboard.storage-management.items.new',
    component: () => import('@/views/StorageItem/ItemCreateView.vue'),
  },
  {
    path: 'storage-management/items/:itemId/edit',
    name: 'dashboard.storage-management.items.edit',
    component: () => import('@/views/StorageItem/ItemUpdateView.vue'),
    props: ({ params }) => ({ itemId: Number.parseInt(params.itemId, 10) || 0 }),
  },
];

export default routes;
