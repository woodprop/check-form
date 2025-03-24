var d=Object.defineProperty;var u=(a,e,t)=>e in a?d(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t;var c=(a,e,t)=>u(a,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();const h="https://script.google.com/macros/s/AKfycbxVWlAlL95CIkBJrqcjrzmFeke7FBav_0RH7UN_3t0bWa5Z0LRYOnngxNbHI9jKR_INfw/exec",l={url:h,sheets:{tech:"Техно",marketing:"Маркетинг",office:"Офис",base:"База",corps:"Корпики",school:"Школа капитанов"},validValuesSource:{common:{paymentSource:"A",globalTarget:"B",direction:"C"},marketing:{purpose:"E",name:"F"},tech:{purpose:"K",name:"L"},office:{purpose:"G",name:"H"},base:{purpose:"I",name:"J"},corps:{purpose:"M",name:"N"},school:{purpose:"O",name:"P"}}};function i(a,e){const t=document.createElement(a);return e&&(t.className=e),t}class m{constructor(){c(this,"el");c(this,"fields");c(this,"selectElements");this.el=document.createElement("form"),this.el.className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4",this.el.action=l.url,this.el.method="post",this.selectElements={};const e=i("div","flex items-center justify-between"),t=i("button","bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline");t.type="submit",t.innerText="Отправить",e.append(t),this.fields={fieldSelectDepartment:this.createDropdown("departmentName","Отдел"),fieldDate:this.createInput("date","date","Дата"),fieldDescription:this.createInput("description","text","Описание"),fieldSeller:this.createInput("seller","text","Контрагент"),fieldPrice:this.createInput("price","number","Сумма"),fieldSelectPaymentMethod:this.createDropdown("paymentMethod","Фин. поток"),fieldSelectDirection:this.createDropdown("direction","Направление"),fieldSelectGlobalPurpose:this.createDropdown("department","Глобальная статья"),fieldSelectPurpose:this.createDropdown("purpose","Статья расхода"),fieldSelectName:this.createDropdown("name","Кто внёс"),fieldButton:e},this.selectElements.departmentName.append(this.createOption("Выберите отдел...",""),this.createOption("Техно","tech"),this.createOption("Маркетинг","marketing"),this.createOption("Офис","office"),this.createOption("База","base"),this.createOption("Корпики","corps"),this.createOption("Школа капитанов","school")),this.el.append(this.fields.fieldSelectDepartment),this.el.addEventListener("submit",this.sendForm.bind(this))}showFields(){this.el.append(...Object.values(this.fields))}addOptions(e){const t=this.selectElements.departmentName.value;this.selectElements.paymentMethod.innerHTML="",this.selectElements.department.innerHTML="",this.selectElements.purpose.innerHTML="",this.selectElements.name.innerHTML="",e.common.paymentSource.forEach(o=>{this.selectElements.paymentMethod.append(this.createOption(o))}),e.common.globalTarget.forEach(o=>{this.selectElements.department.append(this.createOption(o))}),e.common.direction.forEach(o=>{this.selectElements.direction.append(this.createOption(o))}),e[t].purpose.forEach(o=>{this.selectElements.purpose.append(this.createOption(o))}),e[t].name.forEach(o=>{this.selectElements.name.append(this.createOption(o))})}async sendForm(e){e.preventDefault();const t=new FormData(this.el),o=this.selectElements.departmentName.value;t.append("sheet",l.sheets[o]),t.append("action","add");try{const n=await fetch(l.url,{method:"POST",body:t});console.log(await n.json()),n.status===200&&this.afterSend(!0)}catch{this.afterSend(!1)}}createInput(e,t="text",o){const n=i("div","mb-4"),s=i("label","block text-gray-700 text-sm font-bold mb-2");s.htmlFor=e,s.innerText=o;const r=i("input","shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline");return r.name=e,r.id=e,r.type=t,r.required=!0,n.append(s,r),n}createDropdown(e,t){const o=i("div","mb-4"),n=i("label","block text-gray-700 text-sm font-bold mb-2");n.htmlFor=e,n.innerText=t;const s=i("div","relative"),r=i("select","block relative appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:shadow-outline");r.name=e,r.id=e;const p=i("div","pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700");return p.innerHTML='<svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>',s.append(r,p),o.append(n,s),this.selectElements[e]=r,o}createOption(e,t=e){const o=document.createElement("option");return o.textContent=e,o.value=t,o}afterSend(e){const t=document.querySelector("#app"),o=i("div");o.className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4";const n=i("img","block mb-4"),s=i("h3","mb-4"),r=i("button");r.className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",r.textContent="Я потратил ещё",r.addEventListener("click",()=>{window.location.href="./"}),e?(n.src="icon-success.svg",s.textContent="Успешно внесено"):(n.src="icon-error.svg",s.textContent=`Что-то пошло не так...
Проверь таблицу!`),o.append(n,s,r),t&&t.replaceChildren(o)}}class f{constructor(){c(this,"appContainer");c(this,"form");c(this,"inputValidValues");this.appContainer=document.querySelector("#app-container"),this.form=new m}async init(){const e=i("h2","text-center text-4xl font-extrabold mb-4");e.textContent=">>>",this.appContainer.prepend(e),this.inputValidValues=await this.getValidValues(),this.inputValidValues?(e.remove(),this.appContainer.prepend(this.form.el),this.form.selectElements.departmentName.addEventListener("change",this.selectDepartmentHandler.bind(this))):e.textContent="<< Error <<"}selectDepartmentHandler(){this.inputValidValues&&(this.form.addOptions(this.inputValidValues),this.form.showFields())}async getValidValues(){const e=new FormData;e.append("action","getValidValues"),e.append("request",JSON.stringify(l.validValuesSource));try{const t=await fetch(l.url,{method:"POST",body:e});if(t.status===200)return await t.json()}catch(t){console.log(t)}}}const b=new f;b.init();
