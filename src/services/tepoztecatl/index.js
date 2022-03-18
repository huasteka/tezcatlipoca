import axios from 'axios';
import config from '@/config';
import setItemServiceAPI from './item';
import setMeasureUnitServiceAPI from './measureUnit';
import setOperationServiceAPI from './operation';
import setStorageServiceAPI from './storage';

const connector = axios.create({
  baseURL: `${config.tepoztecatl}/api`,
});

function headers(bearerToken) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
  };
}

export function responseToMapReducer(resourceList) {
  const dataReducer = (resourceMap, { id, attributes }) => ({
    ...resourceMap,
    [id]: { id, ...attributes }
  });
  return (resourceList || []).reduce(dataReducer, {});
}

export function createStorageService(token) {
  return setStorageServiceAPI(connector, headers(token));
}

export function createMeasureUnitService(token) {
  return setMeasureUnitServiceAPI(connector, headers(token));
}

export function createItemService(token) {
  return setItemServiceAPI(connector, headers(token));
}

export function createOperationService(token) {
  return setOperationServiceAPI(connector, headers(token));
}
