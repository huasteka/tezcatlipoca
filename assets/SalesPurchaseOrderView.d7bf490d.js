var re=Object.defineProperty;var P=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var O=(o,d,i)=>d in o?re(o,d,{enumerable:!0,configurable:!0,writable:!0,value:i}):o[d]=i,L=(o,d)=>{for(var i in d||(d={}))A.call(d,i)&&O(o,i,d[i]);if(P)for(var i of P(d))E.call(d,i)&&O(o,i,d[i]);return o};var Q=(o,d)=>{var i={};for(var c in o)A.call(o,c)&&d.indexOf(c)<0&&(i[c]=o[c]);if(o!=null&&P)for(var c of P(o))d.indexOf(c)<0&&E.call(o,c)&&(i[c]=o[c]);return i};import{r as ae,e as x,f as m,L as ne,M as ue,u as l,o as g,g as C,h as t,w as n,F as w,W as T,c as G,i as F,t as k,l as V,T as oe,S as U,N as ie,U as de,s as ce,p as pe,k as me}from"./vendor.2c85bd1e.js";import{u as _e}from"./merchandise.276d617b.js";import{u as he}from"./supplier.bb90ccb0.js";import{_ as fe,N as W}from"./index.917c111f.js";import{u as ge}from"./purchase.8c476328.js";import"./index.cefb1522.js";import"./interceptor.bb9bfcba.js";const be={code:[{required:!0,message:"Please, input the purchase code",trigger:"blur"},{min:2,message:"Must have at least 2 characters",trigger:"blur"}],gross_value:[{required:!0,message:"Please, input the gross value",trigger:"blur"},{type:"number",min:1,message:"Must be greater than zero",trigger:"blur"}],discount:[{required:!0,message:"Please, input the discount",trigger:"blur"},{type:"number",min:0,message:"Must be greater or equal zero",trigger:"blur"}],net_value:[{required:!0,message:"Please, input the net value",trigger:"blur"},{type:"number",min:1,message:"Must be greater than zero",trigger:"blur"}],merchandises:[{type:"array",required:!0,min:1,message:"Must inform at least one merchandise"}]};const j=o=>(pe("data-v-1fd5d73c"),o=o(),me(),o),ve=j(()=>F("h4",null,"Merchandises",-1)),Ve=V("Add Purchased Merchandise"),Me=j(()=>F("br",null,null,-1)),Se=V("Submit"),ye={emits:["submit"],setup(o,{emit:d}){const i=_e(),c=he(),f={code:"",description:"",gross_value:0,discount:0,net_value:0,merchandises:[]},M=ae(),u=x(f),S=x(be),$={id:null,supplier_id:null,purchase_price:0,quantity:1},a=x({isLoading:!0,purchasedMerchandise:L({},$),merchandiseList:[],supplierList:[]});Promise.all([i.fetchMerchandiseList(),c.fetchSupplierList()]).then(()=>{a.isLoading=!1,a.merchandiseList=i.merchandises,a.supplierList=c.suppliersFixed});const q=()=>{const{gross_value:r,discount:e}=u;r<e?u.discount=r:u.net_value=r-e},H=r=>{const e=a.merchandiseList.find(_=>_.id===r);a.purchasedMerchandise.purchase_price=parseFloat(e==null?void 0:e.purchase_price)},N=()=>{if(!a.purchasedMerchandise.id||!a.purchasedMerchandise.supplier_id)return;const p=a.purchasedMerchandise,{purchase_price:r,quantity:e}=p,_=Q(p,["purchase_price","quantity"]);u.gross_value+=r*e,u.merchandises.push(L({purchase_price:r,quantity:e},_)),a.purchasedMerchandise=L({},$),q()},J=r=>a.merchandiseList.find(e=>e.id===r),K=r=>a.supplierList.find(e=>e.id===r),X=r=>{a.purchasedMerchandise.id&&a.purchasedMerchandise.supplier_id&&N(),D(r),a.purchasedMerchandise=r},D=r=>{u.merchandises=u.merchandises.filter(({supplier_id:e,id:_})=>r.id!==_&&r.supplier_id!==e),u.gross_value-=r.purchase_price*r.quantity,q()},Y=r=>{!r||r.validate(e=>{if(!e)return!1;const _=()=>{r.resetFields(),u.merchandises=[]};d("submit",{model:r.model,clearForm:_})})};return(r,e)=>{const _=m("el-input"),p=m("el-form-item"),b=m("el-input-number"),Z=m("el-divider"),R=m("el-tag"),I=m("el-option"),B=m("el-select"),y=m("el-button"),v=m("el-table-column"),ee=m("el-button-group"),se=m("el-table"),te=m("el-form"),le=ne("loading");return ue((g(),C("div",null,[t(te,{"label-width":"150px",ref_key:"createPurchaseFormRef",ref:M,model:l(u)},{default:n(()=>[t(p,{label:"Code",prop:"code",rules:l(S).code},{default:n(()=>[t(_,{modelValue:l(u).code,"onUpdate:modelValue":e[0]||(e[0]=s=>l(u).code=s),style:{width:"100px"}},null,8,["modelValue"])]),_:1},8,["rules"]),t(p,{label:"Gross Value",prop:"gross_value",rules:l(S).gross_value},{default:n(()=>[t(b,{disabled:"",class:"small-form-input",modelValue:l(u).gross_value,"onUpdate:modelValue":e[1]||(e[1]=s=>l(u).gross_value=s),precision:2,min:0},null,8,["modelValue"])]),_:1},8,["rules"]),t(p,{label:"Discount",prop:"discount",rules:l(S).discount},{default:n(()=>[t(b,{class:"small-form-input",modelValue:l(u).discount,"onUpdate:modelValue":e[2]||(e[2]=s=>l(u).discount=s),precision:2,min:0,max:l(u).gross_value,onChange:e[3]||(e[3]=s=>q())},null,8,["modelValue","max"])]),_:1},8,["rules"]),t(p,{label:"Net Value",prop:"net_value",rules:l(S).net_value},{default:n(()=>[t(b,{disabled:"",class:"small-form-input",modelValue:l(u).net_value,"onUpdate:modelValue":e[4]||(e[4]=s=>l(u).net_value=s),precision:2,min:0},null,8,["modelValue"])]),_:1},8,["rules"]),t(p,{label:"Description",prop:"description"},{default:n(()=>[t(_,{modelValue:l(u).description,"onUpdate:modelValue":e[5]||(e[5]=s=>l(u).description=s)},null,8,["modelValue"])]),_:1}),t(Z),ve,t(p,{label:"Product"},{default:n(()=>[t(B,{placeholder:"Select a product",modelValue:l(a).purchasedMerchandise.id,"onUpdate:modelValue":e[6]||(e[6]=s=>l(a).purchasedMerchandise.id=s),onChange:e[7]||(e[7]=s=>H(s))},{default:n(()=>[(g(!0),C(w,null,T(l(a).merchandiseList,s=>(g(),G(I,{key:s.id,label:`${s.product.name} (${s.product.name})`,value:s.id},{default:n(()=>[F("span",null,k(s.product.name),1),t(R,{class:"select-option-icon-position"},{default:n(()=>[V(k(s.product.name),1)]),_:2},1024)]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(p,{label:"Supplier"},{default:n(()=>[t(B,{placeholder:"Select a supplier",modelValue:l(a).purchasedMerchandise.supplier_id,"onUpdate:modelValue":e[8]||(e[8]=s=>l(a).purchasedMerchandise.supplier_id=s),modelModifiers:{number:!0}},{default:n(()=>[(g(!0),C(w,null,T(l(a).supplierList,s=>(g(),G(I,{key:s.id,label:s.name,value:s.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),t(p,{label:"Purchase Price"},{default:n(()=>[t(b,{disabled:"",class:"small-form-input",modelValue:l(a).purchasedMerchandise.purchase_price,"onUpdate:modelValue":e[9]||(e[9]=s=>l(a).purchasedMerchandise.purchase_price=s),precision:2,min:0},null,8,["modelValue"])]),_:1}),t(p,{label:"Quantity"},{default:n(()=>[t(b,{class:"small-form-input",modelValue:l(a).purchasedMerchandise.quantity,"onUpdate:modelValue":e[10]||(e[10]=s=>l(a).purchasedMerchandise.quantity=s),min:1},null,8,["modelValue"])]),_:1}),t(p,null,{default:n(()=>[t(y,{icon:l(oe),onClick:e[11]||(e[11]=U(s=>N(),["prevent"]))},{default:n(()=>[Ve]),_:1},8,["icon"])]),_:1}),t(se,{"row-key":"id",data:l(u).merchandises},{default:n(()=>[t(v,{label:"Product"},{default:n(s=>{var h,z;return[V(k((z=(h=J(s.row.id))==null?void 0:h.product)==null?void 0:z.name),1)]}),_:1}),t(v,{label:"Supplier"},{default:n(s=>{var h;return[V(k((h=K(s.row.supplier_id))==null?void 0:h.name),1)]}),_:1}),t(v,{prop:"purchase_price",label:"Purchase Price"}),t(v,{prop:"quantity",label:"Quantity"}),t(v,{width:"120"},{default:n(s=>[t(ee,{class:"ml-4 align-content-right"},{default:n(()=>[t(y,{icon:l(ie),onClick:U(h=>X(s.row),["prevent"])},null,8,["icon","onClick"]),t(y,{type:"danger",icon:l(de),onClick:U(h=>D(s.row),["prevent"])},null,8,["icon","onClick"])]),_:2},1024)]),_:1})]),_:1},8,["data"]),Me,t(p,null,{default:n(()=>[t(y,{type:"primary",icon:l(ce),onClick:e[12]||(e[12]=s=>Y(M.value))},{default:n(()=>[Se]),_:1},8,["icon"])]),_:1})]),_:1},8,["model"])])),[[le,l(a).isLoading]])}}};var Pe=fe(ye,[["__scopeId","data-v-1fd5d73c"]]);const Le=F("h2",null,"Create Purchase Order",-1),Ne={setup(o){const d=ge(),i=({model:c,clearForm:f})=>{d.createPurchase(c).then(()=>{W.notifySuccess("A purchase order was created"),f()}).catch(()=>W.notifyError("Could not create the purchase order"))};return(c,f)=>(g(),C(w,null,[Le,t(Pe,{onSubmit:f[0]||(f[0]=M=>i(M))})],64))}};export{Ne as default};
