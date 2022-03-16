const routes = [
  {
    path: 'storage-management/measure-units',
    name: 'dashboard.storage-management.measure-units',
    component: () => import('@/views/StorageMeasureUnit/MeasureUnitListView.vue'),
  },
  {
    path: 'storage-management/measure-units/new',
    name: 'dashboard.storage-management.measure-units.new',
    component: () => import('@/views/StorageMeasureUnit/MeasureUnitCreateView.vue'),
  },
  {
    path: 'storage-management/measure-units/:measureUnitId/edit',
    name: 'dashboard.storage-management.measure-units.edit',
    component: () => import('@/views/StorageMeasureUnit/MeasureUnitUpdateView.vue'),
    props: ({ params }) => ({ measureUnitId: Number.parseInt(params.measureUnitId, 10) || 0 }),
  },
];

export default routes;
