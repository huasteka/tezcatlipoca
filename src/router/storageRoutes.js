const routes = [
  {
    path: 'storage-management/storages',
    name: 'dashboard.storage-management.storages',
    component: () => import('@/views/Storage/StorageListView.vue'),
  },
  {
    path: 'storage-management/storages/new',
    name: 'dashboard.storage-management.storages.new',
    component: () => import('@/views/Storage/StorageCreateView.vue'),
  },
  {
    path: 'storage-management/storages/:storageId/add',
    name: 'dashboard.storage-management.storages.add-child',
    component: () => import('@/views/Storage/StorageAddNestedView.vue'),
    props: ({ params }) => ({ storageId: Number.parseInt(params.storageId, 10) || 0 }),
  },
  {
    path: 'storage-management/storages/:storageId/edit',
    name: 'dashboard.storage-management.storages.edit',
    component: () => import('@/views/Storage/StorageUpdateView.vue'),
    props: ({ params }) => ({ storageId: Number.parseInt(params.storageId, 10) || 0 }),
  },
  {
    path: 'storage-management/storage-history',
    name: 'dashboard.storage-management.history',
    component: () => import('@/views/StorageOperation/StorageOperationHistoryView.vue')
  },
];

export default routes;
