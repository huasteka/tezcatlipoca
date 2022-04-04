var p=Object.defineProperty;var s=Object.getOwnPropertySymbols;var n=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var d=(t,a,e)=>a in t?p(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,r=(t,a)=>{for(var e in a||(a={}))n.call(a,e)&&d(t,e,a[e]);if(s)for(var e of s(a))h.call(a,e)&&d(t,e,a[e]);return t};import{d as P}from"./vendor.2c85bd1e.js";import{s as l,r as L,b as f}from"./index.cefb1522.js";import{u as S}from"./index.917c111f.js";const u=S(),m=u.bearerToken;l(()=>u.logout());const c=f(m),g=P({id:"huitzilopochtli-product",state:()=>({productList:{},selectedProduct:null}),getters:{products:t=>Object.values(t.productList)},actions:{async fetchProductList(t=null){const{data:a}=await c.fetchProductList(t);this.$patch(e=>e.productList=L(a.data))},async fetchOneProduct(t){if(this.productList[t]){this.$patch(e=>e.selectedProduct=this.productList[t]);return}const{data:a}=await c.fetchProduct(t);this.$patch(e=>e.selectedProduct=r({id:a.data.id},a.data.attributes))},async createProduct({name:t,code:a}){const{data:e}=await c.createProduct({name:t,code:a});this.$patch(o=>o.productList[e.data.id]=r({id:e.data.id},e.data))},async updateProduct({id:t,name:a,code:e}){const o={id:t,name:a,code:e};await c.updateProduct(o),this.$patch(i=>i.productList[t]=o)},async deleteProduct(t){await c.deleteProduct(t),this.$patch(a=>delete a.productList[t])}}});export{g as u};
