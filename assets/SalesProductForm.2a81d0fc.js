import{r as C}from"./index.917c111f.js";import{r as P,e as i,f as s,o as w,c as y,w as r,h as o,u as t,B as F,s as N,l as p}from"./vendor.2c85bd1e.js";const q={code:[{required:!0,message:"Please, input the code",trigger:"blur"},{min:2,message:"Must have at least 2 characters",trigger:"blur"}],name:[{required:!0,message:"Please, input the name",trigger:"blur"}]},R=p("Back"),S=p("Submit"),j={props:{product:Object},emits:["submit"],setup(f,{emit:_}){const b=f,{id:g=null,name:v="",code:k=""}=b.product||{},m=P(),a=i({id:g,name:v,code:k}),V=i(q),h=()=>C.push({path:"/dashboard/sales-management/products"}),x=n=>{!n||n.validate(e=>{if(!e)return!1;_("submit",n.model)})};return(n,e)=>{const c=s("el-input"),u=s("el-form-item"),d=s("el-button"),B=s("el-form");return w(),y(B,{"label-width":"130px",ref_key:"createProductFormRef",ref:m,model:t(a),rules:t(V)},{default:r(()=>[o(u,{label:"Name",prop:"name"},{default:r(()=>[o(c,{modelValue:t(a).name,"onUpdate:modelValue":e[0]||(e[0]=l=>t(a).name=l)},null,8,["modelValue"])]),_:1}),o(u,{label:"Code",prop:"code"},{default:r(()=>[o(c,{modelValue:t(a).code,"onUpdate:modelValue":e[1]||(e[1]=l=>t(a).code=l),style:{width:"100px"}},null,8,["modelValue"])]),_:1}),o(u,null,{default:r(()=>[o(d,{icon:t(F),onClick:e[2]||(e[2]=l=>h())},{default:r(()=>[R]),_:1},8,["icon"]),o(d,{type:"primary",icon:t(N),onClick:e[3]||(e[3]=l=>x(m.value))},{default:r(()=>[S]),_:1},8,["icon"])]),_:1})]),_:1},8,["model","rules"])}}};export{j as _};