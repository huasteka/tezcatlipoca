const routes = [
  {
    path: 'storage-management/storage-history',
    name: 'dashboard.storage-management.history',
    component: () => import('@/views/StorageOperation/StorageOperationHistoryView.vue'),
  },
  {
    path: 'storage-management/storage-deposit',
    name: 'dashboard.storage-management.deposit',
    component: () => import('@/views/StorageOperation/StorageOperationDepositView.vue'),
  },
  {
    path: 'storage-management/storage-withdraw',
    name: 'dashboard.storage-management.withdraw',
    component: () => import('@/views/StorageOperation/StorageOperationWithdrawView.vue'),
  },
  {
    path: 'storage-management/storage-transfer',
    name: 'dashboard.storage-management.transfer',
    component: () => import('@/views/StorageOperation/StorageOperationTransferView.vue'),
  },
];

export default routes;
