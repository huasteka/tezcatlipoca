import axios from 'axios';
import config from '@/config';
import setClientAPI from './client';
import setDeliveryAddressAPI from './deliveryAddess';
import setMerchandiseAPI from './merchandise';
import setProductAPI from './product';
import setPurchaseAPI from './purchase';
import setSaleAPI from './sale';
import setSupplierAPI from './supplier';

const connector = axios.create({
  baseURL: `${config.huitzilopochtli}/api`,
});

function headers(bearerToken) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
  };
}

export function extractRelationships(relationships) {
  return Object.keys(relationships || {})
    .reduce((result, attribute) => ({
      ...result,
      [attribute]: relationships[attribute].data.map(r => r.id)
    }), {})
}

export function responseToMapReducer(resourceList) {
  const dataReducer = (resourceMap, { id, attributes, relationships }) => ({
    ...resourceMap,
    [id]: { id, ...attributes, ...extractRelationships(relationships) }
  });

  return (resourceList || []).reduce(dataReducer, {});
}

export function formatIncludedData(included) {
  return (included || []).reduce(
    (resourceMap, { id, type, attributes, relationships = {} }) => ({
      ...resourceMap,
      [type]: {
        ...(resourceMap[type] || {}),
        [id]: { id, ...attributes, relationships }
      }
    }), {}
  );
}

export function createClientService(token) {
  return setClientAPI(connector, headers(token));
}

export function createDeliveryAddressService(token) {
  return setDeliveryAddressAPI(connector, headers(token));
}

export function createMerchandiseService(token) {
  return setMerchandiseAPI(connector, headers(token));
}

export function createProductService(token) {
  return setProductAPI(connector, headers(token));
}

export function createPurchaseService(token) {
  return setPurchaseAPI(connector, headers(token));
}

export function createSaleService(token) {
  return setSaleAPI(connector, headers(token));
}

export function createSupplierService(token) {
  return setSupplierAPI(connector, headers(token));
}
