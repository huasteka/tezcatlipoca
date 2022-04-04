import router from '@/router';

export function setUnauthorizedInterceptor(axiosConnector, logoutCallback) {
  axiosConnector.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      logoutCallback(error);
      router.push({ path: '/' });
    }
    return Promise.reject(error);
  })
}