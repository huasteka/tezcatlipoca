import{_ as n}from"./StorageMeasureUnitForm.ffff4884.js";import{N as r,r as m}from"./index.917c111f.js";import{u}from"./storage.be6d3a79.js";import{o as i,g as c,h as p,F as f,i as l}from"./vendor.2c85bd1e.js";import"./interceptor.bb9bfcba.js";const _=l("h2",null,"Create measurement unit",-1),B={setup(d){const o=u(),a=e=>{o.createMeasureUnit(e).then(()=>{r.notifySuccess("Measurement unit created"),m.push({path:"/dashboard/storage-management/measure-units"})}).catch(()=>r.notifyError("Could not create measurement unit"))};return(e,t)=>(i(),c(f,null,[_,p(n,{onSubmit:t[0]||(t[0]=s=>a(s))})],64))}};export{B as default};
