import{_ as l}from"./FinancialBudgetGroupForm.cf21181b.js";import{N as n,r as m}from"./index.917c111f.js";import{u as f}from"./finance.0403ad60.js";import{e as b,L as h,o,g as r,M as G,u,h as _,Q as v,F as B,i as L}from"./vendor.2c85bd1e.js";import"./interceptor.bb9bfcba.js";const N=L("h2",null,"Update budget group",-1),y={key:0},C={props:{budgetGroupId:Number},setup(i){const d=i,t=f(),e=b({budgetGroup:null,isLoading:!0});t.fetchOneBudgetGroup(d.budgetGroupId).then(()=>{e.isLoading=!1,e.budgetGroup=t.selectedBudgetGroup});const p=s=>{e.isLoading=!0,t.updateBudgetGroup(s).then(()=>{n.notifySuccess("Budget group updated"),m.push({path:"/dashboard/finance-management/budget-groups"})}).catch(()=>n.notifyError("Could not update budget group")).finally(()=>e.isLoading=!1)};return(s,a)=>{const c=h("loading");return o(),r(B,null,[N,G((o(),r("div",null,[u(e).budgetGroup!==null?(o(),r("div",y,[_(l,{budgetGroup:u(e).budgetGroup,onSubmit:a[0]||(a[0]=g=>p(g))},null,8,["budgetGroup"])])):v("",!0)])),[[c,u(e).isLoading]])],64)}}};export{C as default};