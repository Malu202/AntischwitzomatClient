(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{23:function(e,t){e.exports='<div id=debugTools> <input id=temp type=text placeholder="Temperature in °C"> <input id=hum type=text placeholder="Humidity in %"> <input id=pres type=text placeholder="Pressure in mbar"> <button id=send>submit</button> <div> <input type=text id=sensor_id placeholder="Sensor Id (optional)"> </div> <div id=output></div> <button id=loadAllLogsButton>load all</button> </div>'},24:function(e,t,n){"use strict";n.r(t),n.d(t,"DebugComponent",(function(){return o}));var i=n(23),l=(n(1),n(0));let s=500;class o extends HTMLElement{constructor(){super(),this.innerHTML=i}connectedCallback(){this.log=this.querySelector("#output"),this.temp=this.querySelector("#temp"),this.hum=this.querySelector("#hum"),this.pres=this.querySelector("#pres"),this.sendButton=this.querySelector("#send"),this.deleteButton=this.querySelector("#delete"),this.sensor_id=this.querySelector("#sensor_id"),this.loadAllLogsButton=this.querySelector("#loadAllLogsButton"),this.refresh(),this.sendButton.addEventListener("click",()=>{let e;e=""==this.sensor_id.value?"0":this.sensor_id.value,Object(l.k)(e,this.temp.value,this.hum.value,this.pres.value).then(()=>this.refresh())}),this.loadAllLogsButton.addEventListener("click",()=>{s=1/0,this.loadAllLogsButton.parentNode.removeChild(this.loadAllLogsButton),this.refresh()})}refresh(){Object(l.f)().then(e=>{this.log.innerHTML="";var t=document.createElement("table");t.className="debug-table";var n=document.createElement("thead"),i=document.createElement("tr");let l=e=>{let t=document.createElement("td");t.innerText=e,i.appendChild(t)};l("Time"),l("Sensor ID"),l("Temperature"),l("Humidity"),l("Pressure"),l("On time"),l("Battery"),n.appendChild(i);var o=document.createElement("tbody");t.appendChild(n),t.appendChild(o);let r=e.length-s;r<0&&(r=0);for(var d=e.length-1;d>=r;d--){let t=document.createElement("tr");o.appendChild(t);let n=e=>{let n=document.createElement("td");n.innerText=e,t.appendChild(n)};n(new Date(e[d].time).toLocaleString()),n(e[d].sensor_id),n(e[d].temperature+"°C"),n(e[d].humidity+"%"),n(e[d].pressure+"mbar");let i="-";null!=e[d].ontime&&(i=e[d].ontime+"ms"),n(i);let l="-";null!=e[d].voltage&&(l=e[d].voltage),n(l)}this.log.appendChild(t)})}}customElements.define("app-debug-component",o)}}]);
//# sourceMappingURL=1.5dcc00f90a5a4f5f2baa.bundle.js.map