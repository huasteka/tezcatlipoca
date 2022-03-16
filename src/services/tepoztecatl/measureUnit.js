export default function createService(connector, headers) {
  return {
    createMeasureUnit(measureUnit) {
      return connector.post('/measure_units', measureUnit, headers);
    },

    updateMeasureUnit({id, ...measureUnit}) {
      return connector.put(`/measure_units/${id}`, {...measureUnit}, headers);
    },

    deleteMeasureUnit(measureUnitId) {
      return connector.delete(`/measure_units/${measureUnitId}`, headers);
    },

    fetchMeasureUnit(measureUnitId) {
      return connector.post(`/measure_units/${measureUnitId}`, headers);
    },

    fetchMeasureUnitList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.post('/measure_units', config);
    },
  }
}
