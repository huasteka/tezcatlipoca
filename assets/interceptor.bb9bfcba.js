import{r as n}from"./index.917c111f.js";function p(t,e){t.interceptors.response.use(s=>s,s=>((s.response.status===401||s.response.status===403)&&(e(s),n.push({path:"/"})),Promise.reject(s)))}export{p as s};
