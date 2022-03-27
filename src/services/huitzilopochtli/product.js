export default function createService(connector, headers) {
  return {
    createProduct(product) {
      return connector.post('/products', product, headers);
    },

    updateProduct({ id, ...product }) {
      return connector.put(`/products/${id}`, { ...product }, headers);
    },

    deleteProduct(product_id) {
      return connector.delete(`/products/${product_id}`, headers);
    },

    fetchProduct(product_id) {
      return connector.get(`/products/${product_id}`, headers);
    },

    fetchProductList(pagination = null) {
      let config = { ...headers };

      if (pagination !== null) {
        config = { ...config, params: { ...pagination } };
      }

      return connector.get('/products', config);
    },
  }
}
