import{u as V,N as y}from"./index.917c111f.js";import{r as b,e as _,f as l,L as N,M as k,u as r,o as w,g as S,h as e,w as o,N as F,i as P,l as U,c as $,O as L,P as I,Q as C}from"./vendor.2c85bd1e.js";import{u as B}from"./navigation.de91909e.js";const R={name:[{required:!0,message:"Please, input the name",trigger:"blur"}]},q=P("h2",null,"Profile Settings",-1),E=U("Update"),D={setup(x){const a=V(),u=b(),t=_({userId:"",name:""}),p=_(R),d=_({isLoading:!0});a.fetchUserProfile().then(()=>{d.isLoading=!1,t.userId=a.userProfile.id,t.name=a.userProfile.name});const g=n=>{!n||n.validate(s=>{if(!s)return!1;a.changeUserName(n.model).then(()=>{y.notifySuccess("Successfully updated user profile","Profile updated")}).catch(()=>y.notifyError("Could not update user profile"))})};return(n,s)=>{const c=l("el-input"),i=l("el-form-item"),h=l("el-button"),f=l("el-form"),v=N("loading");return k((w(),S("div",null,[q,e(f,{"label-width":"175px",ref_key:"userProfileFormRef",ref:u,model:r(t),rules:r(p)},{default:o(()=>[e(i,{label:"Name",prop:"name"},{default:o(()=>[e(c,{modelValue:r(t).name,"onUpdate:modelValue":s[0]||(s[0]=m=>r(t).name=m)},null,8,["modelValue"])]),_:1}),e(i,null,{default:o(()=>[e(h,{type:"primary",icon:r(F),onClick:s[1]||(s[1]=m=>g(u.value))},{default:o(()=>[E]),_:1},8,["icon"])]),_:1})]),_:1},8,["model","rules"])])),[[v,r(d).isLoading]])}}},M={password:[{required:!0,message:"Please, input the password",trigger:"blur"},{min:6,message:"Must have at least 6 characters",trigger:"blur"}],passwordConfirmation:[{required:!0,message:"Please, input the password confirmation",trigger:"blur"}]},A=P("h2",null,"Security Settings",-1),O=U("Update"),Q={setup(x){const a=V();a.fetchUserProfile();const u=b(),t=_({userId:"",password:"",passwordConfirmation:""}),p=_(M),d=_({isLoading:!0});a.fetchUserProfile().then(()=>{d.isLoading=!1,t.userId=a.userProfile.id});const g=n=>{!n||n.validate(s=>{if(!s)return!1;a.changePassword(n.model).then(()=>{n.resetFields(),y.notifySuccess("Successfully changed user password","Password updated")}).catch(()=>y.notifyError("Could not change user password"))})};return(n,s)=>{const c=l("el-input"),i=l("el-form-item"),h=l("el-button"),f=l("el-form"),v=N("loading");return k((w(),S("div",null,[A,e(f,{"label-width":"175px",ref_key:"userSecurityFormRef",ref:u,model:r(t),rules:r(p)},{default:o(()=>[e(i,{label:"Password",prop:"password"},{default:o(()=>[e(c,{modelValue:r(t).password,"onUpdate:modelValue":s[0]||(s[0]=m=>r(t).password=m),type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(i,{label:"Password Confirmation",prop:"passwordConfirmation"},{default:o(()=>[e(c,{modelValue:r(t).passwordConfirmation,"onUpdate:modelValue":s[1]||(s[1]=m=>r(t).passwordConfirmation=m),type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1}),e(i,null,{default:o(()=>[e(h,{type:"primary",icon:r(F),onClick:s[2]||(s[2]=m=>g(u.value))},{default:o(()=>[O]),_:1},8,["icon"])]),_:1})]),_:1},8,["model","rules"])])),[[v,r(d).isLoading]])}}},T=P("span",null,"Profile",-1),j=P("span",null,"Security",-1),z={key:0},G={key:1},W={setup(x){const a=B(),u={profile:"dashboard/settings/profile",security:"dashboard/settings/security"},t=b({default:a.currentSettingsPath,current:a.currentSettingsPath}),p=()=>t.value.current===u.profile,d=()=>t.value.current===u.security,g=n=>{a.setSettingsPath(n),t.value.current=n};return(n,s)=>{const c=l("el-icon"),i=l("el-menu-item"),h=l("el-menu"),f=l("el-col"),v=l("el-row");return w(),$(v,{gutter:15},{default:o(()=>[e(f,{xs:24,sm:8,md:8},{default:o(()=>[e(h,{mode:"vertical","default-active":t.value.default,onSelect:g},{default:o(()=>[e(i,{index:"dashboard/settings/profile"},{default:o(()=>[e(c,null,{default:o(()=>[e(r(L))]),_:1}),T]),_:1}),e(i,{index:"dashboard/settings/security"},{default:o(()=>[e(c,null,{default:o(()=>[e(r(I))]),_:1}),j]),_:1})]),_:1},8,["default-active"])]),_:1}),e(f,{xs:24,sm:16,md:16},{default:o(()=>[p()?(w(),S("div",z,[e(D)])):C("",!0),d()?(w(),S("div",G,[e(Q)])):C("",!0)]),_:1})]),_:1})}}};export{W as default};
