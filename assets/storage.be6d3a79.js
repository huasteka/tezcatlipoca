var k=Object.defineProperty,O=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var U=(t,a,e)=>a in t?k(t,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[a]=e,i=(t,a)=>{for(var e in a||(a={}))w.call(a,e)&&U(t,e,a[e]);if(m)for(var e of m(a))M.call(a,e)&&U(t,e,a[e]);return t},c=(t,a)=>O(t,I(a));var h=(t,a)=>{var e={};for(var s in t)w.call(t,s)&&a.indexOf(s)<0&&(e[s]=t[s]);if(t!=null&&m)for(var s of m(t))a.indexOf(s)<0&&M.call(t,s)&&(e[s]=t[s]);return e};import{a as b,d as _}from"./vendor.2c85bd1e.js";import{c as T,u as H}from"./index.917c111f.js";import{s as j}from"./interceptor.bb9bfcba.js";function z(t,a){return{createItem(e){return t.post("/items",e,a)},updateItem(r){var n=r,{id:e}=n,s=h(n,["id"]);return t.put(`/items/${e}`,i({},s),a)},deleteItem(e){return t.delete(`/items/${e}`,a)},fetchItem(e){return t.get(`/items/${e}`,a)},fetchItemList(e=null){let s=i({},a);return e!==null&&(s=c(i({},s),{params:i({},e)})),t.get("/items",s)}}}function D(t,a){return{createMeasureUnit(e){return t.post("/measure_units",e,a)},updateMeasureUnit(r){var n=r,{id:e}=n,s=h(n,["id"]);return t.put(`/measure_units/${e}`,i({},s),a)},deleteMeasureUnit(e){return t.delete(`/measure_units/${e}`,a)},fetchMeasureUnit(e){return t.get(`/measure_units/${e}`,a)},fetchMeasureUnitList(e=null){let s=i({},a);return e!==null&&(s=c(i({},s),{params:i({},e)})),t.get("/measure_units",s)}}}function N(t,a){return{createStockDeposit(e){return t.post("/operations/stocks/deposit",{operation:e},a)},createStockWithdraw(e){return t.post("/operations/stocks/withdraw",{operation:e},a)},createStockTransfer(e){return t.post("/operations/stocks/transfer",{transfer:e},a)},setStockMinimum({stockId:e,minimumQuantity:s}){const r={minimum_quantity:s};return t.post(`/operations/stocks/${e}/set_minimum`,r,a)},fetchOperationHistory(e=null,s=null){let r=i({},a);return e!==null&&e!==""&&(r=c(i({},r),{params:{storage_id:e}})),s!==null&&(r=c(i({},r),{params:i(i({},r.params),s)})),t.get("/operations/stocks/history",r)}}}function R(t,a){return{createStorage(e){return t.post("/storages",e,a)},createNestedStorage({parentId:e,childStorage:s}){return t.post(`/storages/${e}/add`,s,a)},updateStorage(r){var n=r,{id:e}=n,s=h(n,["id"]);return t.put(`/storages/${e}`,i({},s),a)},deleteStorage(e){return t.delete(`/storages/${e}`,a)},fetchStorage(e){return t.get(`/storages/${e}`,a)},fetchStorageList(e=null){let s=i({},a);return e!==null&&(s=c(i({},s),{params:i({},e)})),t.get("/storages",s)}}}const d=b.create({baseURL:`${T.tepoztecatl}/api`});function g(t){return{headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`}}}function W(t){return j(d,t)}function y(t){const a=(e,{id:s,attributes:r})=>c(i({},e),{[s]:i({id:s},r)});return(t||[]).reduce(a,{})}function x(t){return R(d,g(t))}function A(t){return D(d,g(t))}function q(t){return z(d,g(t))}function B(t){return N(d,g(t))}const v=H(),S=v.bearerToken;W(()=>v.logout());const o=x(S),p=A(S),l=q(S),f=B(S),J=_({id:"tepoztecatl",state:()=>({operationHistory:[],storageList:{},measureUnitList:{},itemList:{},selectedStorage:null,selectedMeasureUnit:null,selectedItem:null}),getters:{storages:t=>Object.values(t.storageList),measureUnits:t=>Object.values(t.measureUnitList),items:t=>Object.values(t.itemList),history:t=>t.operationHistory},actions:{async fetchStorageList(t=null){const a=await o.fetchStorageList(t);this.$patch(e=>e.storageList=y(a.data.data))},async fetchOneStorage(t){if(this.storageList[t]){this.$patch(e=>e.selectedStorage=this.storageList[t]);return}const{data:a}=await o.fetchStorage(t);this.$patch(e=>e.selectedStorage=i({id:a.data.id},a.data.attributes))},async createStorage({name:t,code:a}){const{data:e}=await o.createStorage({name:t,code:a});this.$patch(s=>s.storageList[e.data.id]=e.data)},async createNestedStorage({parentId:t,name:a,code:e}){const{data:s}=await o.createNestedStorage({parentId:t,childStorage:{name:a,code:e}});this.$patch(r=>{var n;return(n=r.storageList[t].children)==null?void 0:n.push(s.data)})},async updateStorage({id:t,name:a,code:e}){const s={id:t,name:a,code:e};await o.updateStorage(s),this.$patch(r=>r.storageList[t]=s)},async deleteStorage(t){await o.deleteStorage(t),this.$patch(a=>delete a.storageList[t])},async fetchMeasureUnitList(t=null){const a=await p.fetchMeasureUnitList(t);this.$patch(e=>e.measureUnitList=y(a.data.data))},async fetchOneMeasureUnit(t){if(this.measureUnitList[t]){this.$patch(e=>e.selectedMeasureUnit=this.measureUnitList[t]);return}const{data:a}=await p.fetchMeasureUnit(t);this.$patch(e=>e.selectedMeasureUnit=i({id:a.data.id},a.data.attributes))},async createMeasureUnit({name:t,acronym:a}){const{data:e}=await p.createMeasureUnit({name:t,acronym:a});this.$patch(s=>s.measureUnitList[e.data.id]=e.data)},async updateMeasureUnit({id:t,name:a,acronym:e}){const s={id:t,name:a,acronym:e};await p.updateMeasureUnit(s),this.$patch(r=>r.measureUnitList[t]=s)},async deleteMeasureUnit(t){await p.deleteMeasureUnit(t),this.$patch(a=>delete a.measureUnitList[t])},async fetchItemList(t=null){const a=await l.fetchItemList(t);this.$patch(e=>e.itemList=y(a.data.data))},async fetchOneItem(t){const{data:a}=await l.fetchItem(t);this.$patch(e=>e.selectedItem=i({id:a.data.id},a.data.attributes))},async createItem({name:t,code:a,input_measure_unit_id:e,input_quantity:s,output_measure_unit_id:r,output_quantity:n}){const $={name:t,code:a,input_measure_unit_id:e,input_quantity:s,output_measure_unit_id:r,output_quantity:n},{data:u}=await l.createItem($);this.$patch(L=>L.itemList[u.data.id]=u.data)},async updateItem({id:t,name:a,code:e,input_measure_unit_id:s,input_quantity:r,output_measure_unit_id:n,output_quantity:$}){const u={id:t,name:a,code:e,input_measure_unit_id:s,input_quantity:r,output_measure_unit_id:n,output_quantity:$};await l.updateItem(u),this.$patch(L=>L.itemList[t]=u)},async deleteItem(t){await l.deleteItem(t),this.$patch(a=>delete a.itemList[t])},async fetchOperationHistory(t=null,a=null){const e=await f.fetchOperationHistory(t,a),s=({id:r,attributes:n})=>i({id:r},n);this.$patch(r=>r.operationHistory=(e.data.data||[]).map(s))},async createDepositOperation({storage_id:t,item_id:a,quantity:e}){await f.createStockDeposit({storage_id:t,item_id:a,quantity:e})},async createWithdrawOperation({storage_id:t,item_id:a,quantity:e}){await f.createStockWithdraw({storage_id:t,item_id:a,quantity:e})},async createTransferOperation({from_storage_id:t,to_storage_id:a,item_id:e,quantity:s}){await f.createStockTransfer({from_storage_id:t,to_storage_id:a,item_id:e,quantity:s})}}});export{J as u};