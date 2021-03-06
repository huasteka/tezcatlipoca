import axios from 'axios';
import config from '@/config';
import { setUnauthorizedInterceptor } from '@/services/interceptor';
import setAccountServiceAPI from './account';
import setBudgetGroupAPI from './budgetGroup';
import setBudgetCategoryServiceAPI from './budgetCategory';
import setEntryServiceAPI from './entry';
import setPaymentTypeAPI from './paymentType';

const connector = axios.create({
  baseURL: `${config.yacatecuhtli}/api`,
});

function headers(bearerToken) {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`,
    },
  };
}

export function setLogoutInterceptor(logoutCallback) {
  return setUnauthorizedInterceptor(connector, logoutCallback);
}

export function responseToMapReducer(resourceList) {
  const dataReducer = (resourceMap, { id, ...attributes }) => ({
    ...resourceMap,
    [id]: { id, ...attributes }
  });
  return (resourceList || []).reduce(dataReducer, {});
}

export function createBudgetGroupService(token) {
  return setBudgetGroupAPI(connector, headers(token));
}

export function createBudgetCategoryService(token) {
  return setBudgetCategoryServiceAPI(connector, headers(token));
}

export function createAccountService(token) {
  return setAccountServiceAPI(connector, headers(token));
}

export function createPaymentTypeService(token) {
  return setPaymentTypeAPI(connector, headers(token));
}

export function createEntryService(token) {
  return setEntryServiceAPI(connector, headers(token));
}
