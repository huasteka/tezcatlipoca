import{u as j}from"./finance.0403ad60.js";import{_ as R,r as W}from"./index.917c111f.js";import{r as z,e as y,f as r,o as u,c as k,w as s,h as a,u as t,g as _,F as x,W as F,Q as D,i as E,t as I,l as f,B as O,s as Y}from"./vendor.2c85bd1e.js";const G={name:[{required:!0,message:"Please, input the name",trigger:"blur"},{min:3,message:"Must have at least 3 characters",trigger:"blur"}],terms:[{type:"object",fields:{stagedPayment:{type:"boolean",required:!0,message:"Please, inform if payment is staged"},tax:{required:!0,message:"Please, input the tax",trigger:"blur"},installmentQuantity:[{required:!0,message:"Please, input the installment quantity",trigger:"blur"},{type:"number",min:1,message:"Must be greater than zero",trigger:"blur"}],firstInstallmentTerm:{required:!0,message:"Please, input the first installment term",trigger:"blur"},installmentTerm:{required:!0,message:"Please, input the installment periodicity",trigger:"blur"}}}],paymentAccountId:[{required:!0,message:"Please, select a default payment account",trigger:"blur"}]};const H={key:0},J=f("Back"),K=f("Submit"),X={props:{paymentType:Object},emits:["submit"],setup(h,{emit:B}){const q=h,g=j(),{id:S=null,name:A="",terms:U={stagedPayment:!1,tax:0},paymentAccount:d=null}=q.paymentType||{},b=z(),n=y({id:S,name:A,terms:U,paymentAccountId:d==null?void 0:d.id}),w=y(G),C=[{label:"Immediate",value:1},{label:"Weekly",value:7},{label:"Biweekly",value:15},{label:"Monthly",value:30},{label:"Bimontly",value:60},{label:"Trimontly",value:90},{label:"Semiannually",value:182},{label:"Yearly",value:365}],v=y({isLoading:!0});g.fetchAccountList().then(()=>v.isLoading=!1);const L=()=>W.push({path:"/dashboard/finance-management/payment-types"}),N=i=>{!i||i.validate(l=>{if(!l)return!1;const{id:p,name:m,terms:c,paymentAccountId:o}=i.model;B("submit",{id:p,name:m,terms:c,paymentAccount:{id:o}})})};return(i,l)=>{const p=r("el-input"),m=r("el-form-item"),c=r("el-switch"),o=r("el-input-number"),V=r("el-option"),P=r("el-select"),Q=r("el-tag"),T=r("el-button"),$=r("el-form");return u(),k($,{"label-width":"170px",ref_key:"createPaymentTypeFormRef",ref:b,model:t(n),rules:t(w)},{default:s(()=>[a(m,{label:"Name",prop:"name"},{default:s(()=>[a(p,{modelValue:t(n).name,"onUpdate:modelValue":l[0]||(l[0]=e=>t(n).name=e)},null,8,["modelValue"])]),_:1}),a(m,{label:"Staged payment?",prop:"terms.stagedPayment"},{default:s(()=>[a(c,{modelValue:t(n).terms.stagedPayment,"onUpdate:modelValue":l[1]||(l[1]=e=>t(n).terms.stagedPayment=e)},null,8,["modelValue"])]),_:1}),t(n).terms.stagedPayment===!0?(u(),_("div",H,[a(m,{label:"Tax",prop:"terms.tax"},{default:s(()=>[a(o,{class:"small-form-input",modelValue:t(n).terms.tax,"onUpdate:modelValue":l[2]||(l[2]=e=>t(n).terms.tax=e),precision:2,step:.1,min:0},null,8,["modelValue","step"])]),_:1}),a(m,{label:"Installment amount",prop:"terms.installmentQuantity"},{default:s(()=>[a(o,{class:"small-form-input",min:0,modelValue:t(n).terms.installmentQuantity,"onUpdate:modelValue":l[3]||(l[3]=e=>t(n).terms.installmentQuantity=e)},null,8,["modelValue"])]),_:1}),a(m,{label:"First installment term",prop:"terms.firstInstallmentTerm"},{default:s(()=>[a(o,{class:"small-form-input",min:0,modelValue:t(n).terms.firstInstallmentTerm,"onUpdate:modelValue":l[4]||(l[4]=e=>t(n).terms.firstInstallmentTerm=e)},null,8,["modelValue"])]),_:1}),a(m,{label:"Installment periodicity",prop:"terms.installmentTerm"},{default:s(()=>[a(P,{class:"small-form-input",placeholder:"Select the periodicity",modelValue:t(n).terms.installmentTerm,"onUpdate:modelValue":l[5]||(l[5]=e=>t(n).terms.installmentTerm=e)},{default:s(()=>[(u(),_(x,null,F(C,(e,M)=>a(V,{key:M,label:e.label,value:e.value},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1})])):D("",!0),a(m,{label:"Payment account",prop:"paymentAccountId"},{default:s(()=>[a(P,{class:"small-form-input",placeholder:"Select an account",modelValue:t(n).paymentAccountId,"onUpdate:modelValue":l[6]||(l[6]=e=>t(n).paymentAccountId=e),loading:t(v).isLoading},{default:s(()=>[(u(!0),_(x,null,F(t(g).accounts,e=>(u(),k(V,{key:e.id,label:`${e.name} (${e.code})`,value:e.id},{default:s(()=>[E("span",null,I(e.name),1),a(Q,{class:"select-option-icon-position"},{default:s(()=>[f(I(e.code),1)]),_:2},1024)]),_:2},1032,["label","value"]))),128))]),_:1},8,["modelValue","loading"])]),_:1}),a(m,null,{default:s(()=>[a(T,{icon:t(O),onClick:l[7]||(l[7]=e=>L())},{default:s(()=>[J]),_:1},8,["icon"]),a(T,{type:"primary",icon:t(Y),onClick:l[8]||(l[8]=e=>N(b.value))},{default:s(()=>[K]),_:1},8,["icon"])]),_:1})]),_:1},8,["model","rules"])}}};var le=R(X,[["__scopeId","data-v-4c02a738"]]);export{le as F};