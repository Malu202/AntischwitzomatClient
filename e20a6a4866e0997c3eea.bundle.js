!function(t){function e(e){for(var i,n,o=e[0],a=e[1],r=0,h=[];r<o.length;r++)n=o[r],Object.prototype.hasOwnProperty.call(s,n)&&s[n]&&h.push(s[n][0]),s[n]=0;for(i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i]);for(l&&l(e);h.length;)h.shift()()}var i={},s={0:0};function n(e){if(i[e])return i[e].exports;var s=i[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.e=function(t){var e=[],i=s[t];if(0!==i)if(i)e.push(i[2]);else{var o=new Promise((function(e,n){i=s[t]=[e,n]}));e.push(i[2]=o);var a,r=document.createElement("script");r.charset="utf-8",r.timeout=120,n.nc&&r.setAttribute("nonce",n.nc),r.src=function(t){return n.p+""+t+"."+{1:"223349836af862bfc4f3"}[t]+".bundle.js"}(t);var l=new Error;a=function(e){r.onerror=r.onload=null,clearTimeout(h);var i=s[t];if(0!==i){if(i){var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+n+": "+o+")",l.name="ChunkLoadError",l.type=n,l.request=o,i[1](l)}s[t]=void 0}};var h=setTimeout((function(){a({type:"timeout",target:r})}),12e4);r.onerror=r.onload=a,document.head.appendChild(r)}return Promise.all(e)},n.m=t,n.c=i,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)n.d(i,s,function(e){return t[e]}.bind(null,s));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/AntischwitzomatClient/",n.oe=function(t){throw console.error(t),t};var o=window.webpackJsonp=window.webpackJsonp||[],a=o.push.bind(o);o.push=e,o=o.slice();for(var r=0;r<o.length;r++)e(o[r]);var l=a;n(n.s=22)}([function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));let s="https://antischwitzomat.glitch.me/";const n={API_URL:s,api:s+"measurements",ROOM_MEASUREMENTS:s+"roommeasurements",NOTIFICATIONS_URL:s+"notifications",NOTIFICATION_PUBLIC_KEY:"BPpC0dcJVJWCBwjKNWPJW4o75bZpfiqUtGAU3Du18npgjqtCDqfWLMbHjIkMQAbDvcuPbP5eLfL9ZDSxilOFq0I"}},function(t,e,i){"use strict";i.d(e,"f",(function(){return l})),i.d(e,"k",(function(){return h})),i.d(e,"c",(function(){return c})),i.d(e,"j",(function(){return d})),i.d(e,"i",(function(){return u})),i.d(e,"e",(function(){return p})),i.d(e,"b",(function(){return f})),i.d(e,"g",(function(){return m})),i.d(e,"d",(function(){return g})),i.d(e,"a",(function(){return v})),i.d(e,"h",(function(){return x}));var s=i(0);let n=!1;async function o(){return n||await void(n||"serviceWorker"in navigator&&navigator.serviceWorker.getRegistration().then(t=>{t.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:s.a.NOTIFICATION_PUBLIC_KEY}).then((function(t){n=!0}),(function(t){console.log(t)}))})),navigator.serviceWorker.ready.then(t=>t.pushManager.getSubscription()).then(t=>JSON.parse(JSON.stringify(t)))}function a(){return window.localStorage.getItem("user_id")}function r(t){return window.localStorage.setItem("user_id",t.user_id),t}function l(){return fetch(s.a.API_URL+"measurements",{headers:{Accept:"application/json"}}).then(t=>t.json())}function h(t,e,i,n){return fetch(s.a.API_URL+"measurements",{body:JSON.stringify({i:t,t:100*e,h:100*i,p:1e4*n}),method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"}}).then(t=>t.text())}function c(){return fetch(s.a.API_URL+"measurements",{method:"DELETE"}).then(t=>t.text())}function d(){return fetch(s.a.API_URL+"sensors",{headers:{Accept:"application/json"}}).then(t=>t.json())}function u(){return null==a()?Promise.resolve([]):fetch(`${s.a.API_URL}rooms?user_id=${a()}`,{headers:{Accept:"application/json"}}).then(t=>t.json())}function p(t){return fetch(`${s.a.API_URL}rooms?room_id=${t}`,{method:"DELETE",headers:{Accept:"application/json"}}).then(t=>t.text())}function f(t,e,i,n){return fetch(s.a.API_URL+"rooms",{body:JSON.stringify({user_id:a(),name:t,type:e,sensor_id1:i,sensor_id2:n}),method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"}}).then(t=>t.json()).then(r)}function m(){return null==a()?Promise.resolve([]):fetch(`${s.a.API_URL}notifications?user_id=${a()}`,{headers:{Accept:"application/json"}}).then(t=>t.json())}function g(t){return fetch(`${s.a.API_URL}notifications?notification_id=${t}`,{method:"DELETE",headers:{Accept:"application/json"}}).then(t=>t.text())}async function v(t,e,i,n,l,h){let c=await o();return console.log(c),fetch(s.a.API_URL+"notifications",{body:JSON.stringify({user_id:a(),type:n,value:h,room_id1:e,room_id2:i,amount:l,message:t,endpoint:c.endpoint,keys:c.keys}),method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"}}).then(t=>t.json()).then(r)}function x(){return null==a()?Promise.resolve([]):fetch(`${s.a.API_URL}roomMeasurements?user_id=${a()}`,{headers:{Accept:"application/json"}}).then(t=>t.json())}},function(t,e){t.exports='<div class="mdc-card gaugesCard" id=gaugeCard> <div class="gaugeHeading mdc-typography--headline6" id=heading>Room</div> <div class=gauges id=gauges> <div id=tempGauge></div> <div id=humGauge></div> <div id=presGauge></div> </div> </div> <div id=tempCard class=mdc-card> <div class="gaugeHeading mdc-typography--headline6" id=plotHeading>Temperature</div> <div id=tempPlot></div> </div>'},function(t,e){t.exports='<div id=rooms> </div> <button id=add-room class=mdc-fab aria-label="Raum hinzufügen"> <div class=mdc-fab__ripple></div> <span class="mdc-fab__icon material-icons">add</span> </button>'},function(t,e){t.exports='<div class="mdc-card room"> <div style=display:none id=name-invalid>Namen eingeben!</div> <div class=roomRow> <label>Name:</label> <div class=mdc-text-field> <input id=roomname type=text class=mdc-text-field__input placeholder=Room1> </div> </div> <div class=roomRow> <label>Sensor 1:</label> <div class=select-container> <div class=mdc-select><i class=mdc-select__dropdown-icon></i><select id=sensor1 class="sendung mdc-select__native-control"> </select></div> </div> </div> <div class=roomRow> <label>Sensor 2 (Optional):</label> <div class=select-container> <div class=mdc-select><i class=mdc-select__dropdown-icon></i><select id=sensor2 class="sendung mdc-select__native-control"> </select></div> </div> </div> <div class=roomRow> <label>Type</label> <div class=select-container> <div class=mdc-select><i class=mdc-select__dropdown-icon></i><select id=type class="sendung mdc-select__native-control"> <option>Average</option> <option>Maximum</option> <option>Minimum</option> </select></div> </div> </div> <div class=roomRow> <div> <button id=remove class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded">delete</button> </div> <div> <button id=save class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded">save</button> </div> </div> </div>'},function(t,e){t.exports='<div id=notifications> </div> <button id=add-notification class=mdc-fab aria-label="Raum hinzufügen"> <div class=mdc-fab__ripple></div> <span class="mdc-fab__icon material-icons">add</span> </button>'},function(t,e){t.exports='<div class="mdc-card room"> <div style=display:none id=name-invalid>Text eingeben!</div> <div class=roomRow> <label>Message:</label> <div class=mdc-text-field> <input id=messageText type=text class=mdc-text-field__input> </div> </div> <div class=roomRow> <label>Value to compare:</label> <div class=select-container> <div class=mdc-select><i class=mdc-select__dropdown-icon></i><select id=value class=mdc-select__native-control> <option>Temperature</option> <option>Humidity</option> <option>Pressure</option> </select></div> </div> </div> <div class=roomRow> <label>Room 1:</label> <div class=select-container> <div class=mdc-select><i class=mdc-select__dropdown-icon></i><select id=room1 class=mdc-select__native-control> </select></div> </div> </div> <div class=roomRow> <label>Type</label> <div class=select-container> <div class=mdc-select><i class=mdc-select__dropdown-icon></i><select id=type class="sendung mdc-select__native-control"> <option>Greater than</option> <option>Less than</option> <option>Falling more than</option> <option>Rising more than</option> </select></div> </div> </div> <div class=roomRow> <label>Room 2 (Optional):</label> <div class=select-container> <div class=mdc-select><i class=mdc-select__dropdown-icon></i><select id=room2 class="sendung mdc-select__native-control"> </select></div> </div> </div> <div class=roomRow> <label>Value:</label> <div class=mdc-text-field> <input id=amount type=number step=0.5 value=0 class=mdc-text-field__input> </div> </div> <div class=roomRow> <div> <button id=remove class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded">delete</button> </div> <div> <button id=save class="mdc-icon-button material-icons mdc-top-app-bar__action-item--unbounded">save</button> </div> </div> </div>'},function(t,e){var i="/AntischwitzomatClient/sw.js";Object.defineProperty(e,"__esModule",{value:!0}),e.default={register:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return!!navigator.serviceWorker&&navigator.serviceWorker.register(i,t)}},t.exports=e.default},function(t,e){(function(){"use strict";function t(t,e,i,s,n,o,a,r){this.initialize(t,e,i,s,n,o,a,r),window.addEventListener("resize",function(t){this.initialize(this.div,this.prefix,this.value,this.suffix,this.min,this.max,this.background,this.textColor),this.setValue(i)}.bind(this))}window.Gauge=t,t.prototype.initialize=function(t,e,i,s,n,o,a,r){this.doWhenLoaded((function(){this.div=t,this.prefix=e,this.value=i,this.suffix=s,this.min=n,this.max=o,this.background=a,this.textColor=r,this.generateCanvas(t),this.size=this.height<this.width?this.height:this.width,this.min=n,this.max=o,this.canvas.style["background-color"]=a,this.textColor=r}))},t.prototype.generateCanvas=function(t){var e=window.devicePixelRatio||1,i=t.getBoundingClientRect(),s=document.createElement("canvas");this.width=Math.round(i.width),this.height=Math.round(i.height),s.width=this.width*e,s.height=this.height*e,this.ctx=s.getContext("2d"),this.ctx.scale(e,e),t.style.position="relative",t.style.overflow="hidden",t.style.top="0px",t.style.left="0px",s.style.position="absolute",s.style.top="0px",s.style.left="0px",s.style.height=this.height+"px",s.style.width=this.width+"px",t.innerHTML="",t.appendChild(s),this.canvas=s},t.prototype.setValue=function(t,i){null==i&&(i=t),this.ctx.clearRect(0,0,this.width,this.height);for(var s=(this.max+"").length-(i+"").length,n="",o=0;o<s;o++)n=" "+n;i=n+this.prefix+i+this.suffix+"",this.ctx.font="bold "+this.size/i.length+"px Arial, Helvetica, sans-serif",this.ctx.fillStyle=this.textColor,this.ctx.textAlign="center",this.ctx.textBaseline="middle",this.ctx.fillText(i,this.width/2,this.height/2),t=(t-this.min)/(this.max-this.min),this.ctx.beginPath(),this.ctx.lineWidth=.08*this.size,i=new e(0,0,255),s=new e(255,0,0),this.ctx.strokeStyle=i.mix(s,t).rgb(),this.ctx.arc(this.width/2,this.height/2,.9*this.size/2,Math.PI-Math.PI/4,Math.PI/4-(1-t)*(Math.PI+Math.PI/2),!1),this.ctx.stroke()},t.prototype.animateValue=function(t,e){this.doWhenLoaded((function(){this.currentValue=this.min,this.value=t,this.animationTime=e,window.requestAnimationFrame(this.animation.bind(this))}))};function e(t,i,s){this.r=t,this.g=i,this.b=s,this.rgb=function(){return"rgb("+this.r+","+this.g+","+this.b+")"},this.mix=function(t,i){var s=this.r-i*(this.r-t.r),n=this.g-i*(this.g-t.g);return t=this.b-i*(this.b-t.b),new e(s*(i=255/Math.max(s,n,t)),n*i,t*i)}}t.prototype.animation=function(t){if(this.lastTime){var e=t-this.lastTime;this.lastTime=t,this.currentValue+=(this.value-this.min)*e/this.animationTime}else this.firstTime=this.lastTime=t;this.setValue(this.currentValue,this.value),this.currentValue<this.value?window.requestAnimationFrame(this.animation.bind(this)):this.setValue(this.value,this.value)};var i=!1;window.addEventListener("load",(function(){i=!0})),t.prototype.doWhenLoaded=function(t){i?t.bind(this)():window.addEventListener("load",function(){t.bind(this)()}.bind(this))}}).call(this)},function(t,e,i){(function(t){(function(){"use strict";var e=e||{};function i(t,e){this.div=t,this.config=e,this.initialize(t,e),window.addEventListener("resize",function(t){this.initialize(this.div,this.config)}.bind(this))}function s(t,e){return Math.floor(t*Math.pow(10,e))/Math.pow(10,e)}function n(t,e){return Math.ceil(t*Math.pow(10,e))/Math.pow(10,e)}function o(t,e,i,s){for(var n=[],o=0;o<t.length;o++)n[o]=e*(t[o]-i)+s;return n}function a(t,e,i,s,n){for(var o=[],a=0;a<t.length;a++)o[a]=n-e*(t[a]-i)-s;return o}function r(t,e,i,s,n,o){e/=s/=20,i/=s,o.save(),o.font="20px Arial, Helvetica, sans-serif",o.fillStyle=n,o.scale(s,s),o.textAlign="center",o.textBaseline="middle",o.fillText(t,e,i),o.restore()}function l(t,e,i,s,n){n.beginPath(),n.strokeStyle=t,n.lineWidth=1,n.moveTo(e,i),n.lineTo(e+s,i),n.stroke()}function h(t,e,i,s,n){n.beginPath(),n.strokeStyle=t,n.lineWidth=1,n.moveTo(e,i),n.lineTo(e,i-s),n.stroke()}function c(t,e,i,s,n,o,a){for(var r=0;r<t.length;r++)d(t[r],e[r],i,s,n,o,a)}e.scope={},e.ASSUME_ES5=!1,e.ASSUME_NO_NATIVE_MAP=!1,e.ASSUME_NO_NATIVE_SET=!1,e.SIMPLE_FROUND_POLYFILL=!1,e.defineProperty=e.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,i){t!=Array.prototype&&t!=Object.prototype&&(t[e]=i.value)},e.getGlobal=function(e){return"undefined"!=typeof window&&window===e?e:void 0!==t&&null!=t?t:e},e.global=e.getGlobal(this),e.polyfill=function(t,i,s,n){if(i){for(s=e.global,t=t.split("."),n=0;n<t.length-1;n++){var o=t[n];o in s||(s[o]={}),s=s[o]}(i=i(n=s[t=t[t.length-1]]))!=n&&null!=i&&e.defineProperty(s,t,{configurable:!0,writable:!0,value:i})}},e.polyfill("Array.prototype.fill",(function(t){return t||function(t,e,i){var s=this.length||0;for(0>e&&(e=Math.max(0,s+e)),(null==i||i>s)&&(i=s),0>(i=Number(i))&&(i=Math.max(0,s+i)),e=Number(e||0);e<i;e++)this[e]=t;return this}}),"es6","es3"),window.Plot=i,i.prototype.initialize=function(t,e){this.doWhenLoaded((function(){for(var i in this.generateCanvas(t),e)this[i]=e[i];this.applyDefaultSettings(),this.bottomMargin=0,this.ctx=this.canvas.getContext("2d"),this.canvas.style["background-color"]=this.backgroundColor,this.calculateDataRanges(),this.calculateDrawingRanges(),this.calculateDrawingProperties(),this.scaleData(),this.draw()}))},i.prototype.generateCanvas=function(t){var e=window.devicePixelRatio||1,i=t.getBoundingClientRect(),s=document.createElement("canvas");this.width=Math.round(i.width),this.height=Math.round(i.height),s.width=this.width*e,s.height=this.height*e,this.ctx=s.getContext("2d"),this.ctx.scale(e,e),t.style.position="relative",t.style.overflow="hidden",t.style.top="0px",t.style.left="0px",s.style.position="absolute",s.style.top="0px",s.style.left="0px",s.style.height=this.height+"px",s.style.width=this.width+"px",t.innerHTML="",t.appendChild(s),this.canvas=s},i.prototype.applyDefaultSettings=function(){var t,e={backgroundColor:"#4caf50",xAxisSize:.05,yAxisSize:.05,topMargin:.05,rightMargin:.05,xAxisLabelMaxDecimals:2,yAxisLabelMaxDecimals:2,yAxisLabelSuffix:"",yAxisLabelPrefix:"",xAxisLabelSuffix:"",xAxisLabelPrefix:"",xAxisMaxLabels:11,yAxisMaxLabels:15,drawGridLineX:!0,drawGridLineY:!0,preferredLabelStepsX:[1,2,2.5,5],preferredLabelStepsY:[1,2,2.5,5],equalLabelSize:!0},i={type:"line",color:"#fff",linewidth:5,dataPointRadius:4,dataPointLinewidth:2,xHighlight:[],yHighlight:[]},s={color:"#fff",shadowColor:"#80e27e",linewidth:4,dataPointRadius:1.5,xHighlight:[],yHighlight:[]};for(t in e)null==this[t]&&(this[t]=e[t]);for(e=this.graphs.length,t=0;t<e;t++)if("shadow"==this.graphs[t].type)for(var n in s)null==this.graphs[t][n]&&(this.graphs[t][n]=s[n]);else for(n in i)null==this.graphs[t][n]&&(this.graphs[t][n]=i[n])},i.prototype.calculateDataRanges=function(){this.allXData=[],this.allYData=[];for(var t=0;t<this.graphs.length;t++)this.allXData=this.allXData.concat(this.graphs[t].x),this.allXData=this.allXData.concat(this.graphs[t].xHighlight),this.allYData=this.allYData.concat(this.graphs[t].y),this.allYData=this.allYData.concat(this.graphs[t].yHighlight);this.minX=Math.min.apply(null,this.allXData),this.minY=Math.min.apply(null,this.allYData),this.maxX=Math.max.apply(null,this.allXData),this.maxY=Math.max.apply(null,this.allYData),this.xDataRange=this.maxX-this.minX,this.yDataRange=this.maxY-this.minY,this.orderX=.1*m(this.xDataRange),(t=Math.pow(10,-this.xAxisLabelMaxDecimals))>this.orderX&&(this.orderX=t),this.decimalsX=-g(this.orderX),this.orderY=.1*m(this.yDataRange),(t=Math.pow(10,-this.yAxisLabelMaxDecimals))>this.orderY&&(this.orderY=t),this.decimalsY=-g(this.orderY)},i.prototype.calculateDrawingRanges=function(t,e,i,o){this.minPlottingX=null==t?s(Math.min.apply(null,this.allXData),this.decimalsX):t,this.minPlottingY=null==e?s(Math.min.apply(null,this.allYData),this.decimalsY):e,this.maxPlottingX=null==i?n(Math.max.apply(null,this.allXData),this.decimalsX):i,this.maxPlottingY=null==o?n(Math.max.apply(null,this.allYData),this.decimalsY):o,this.xPlottingRange=this.maxPlottingX-this.minPlottingX,this.yPlottingRange=this.maxPlottingY-this.minPlottingY,this.xScaling=this.width/this.xPlottingRange,this.yScaling=this.height/this.yPlottingRange,this.yScaling*=1-(this.topMargin+this.bottomMargin+this.xAxisSize),this.xScaling*=1-this.yAxisSize-this.rightMargin,this.bottomOffset=(this.bottomMargin+this.xAxisSize)*this.height,this.topOffset=this.topMargin*this.height,this.leftOffset=this.yAxisSize*this.width,this.rightOffset=this.rightMargin*this.width,this.bottom=this.height},i.prototype.scaleData=function(){for(var t=0;t<this.graphs.length;t++)this.graphs[t].xCoordinates=o(this.graphs[t].x,this.xScaling,this.minPlottingX,this.leftOffset),this.graphs[t].yCoordinates=a(this.graphs[t].y,this.yScaling,this.minPlottingY,this.bottomOffset,this.bottom),this.graphs[t].xCoordinatesHighlight=o(this.graphs[t].xHighlight,this.xScaling,this.minPlottingX,this.leftOffset),this.graphs[t].yCoordinatesHighlight=a(this.graphs[t].yHighlight,this.yScaling,this.minPlottingY,this.bottomOffset,this.bottom)},i.prototype.calculateLabelHeightYaxis=function(){var t=f(this.maxPlottingY+this.dataStepSizeY,this.yAxisLabelMaxDecimals);isNaN(t)&&!isNaN(this.maxPlottingY+this.dataStepSizeY)&&console.error("To many decimals, or numbers to long, cannot round, try reducing MaxDecimals"),this.longestLabelY=t.toString().length+this.yAxisLabelPrefix.length+this.yAxisLabelSuffix.length,this.labelHeightY=1.5*this.yAxisWidth/this.longestLabelY},i.prototype.calculateDrawingProperties=function(){this.calculateDrawingPropertiesX(),this.calculateDrawingPropertiesY(),this.xLabelNames?(this.gridLineCountX=this.xLabelNames.length,this.drawingStepSizeX=this.xAxisWidth/(this.gridLineCountX-1),this.dataStepSizeX=this.xDataRange/(this.gridLineCountX-1),this.calculateDrawingRanges(null,null,null,null)):this.calculateStepSizeX(),this.calculateStepSizeY()},i.prototype.calculateDrawingPropertiesX=function(){this.xAxisHeight=this.bottomOffset,this.xAxisWidth=this.width-this.leftOffset-this.rightOffset,this.longestLabelX=f(this.maxPlottingX,this.xAxisLabelMaxDecimals).toString().length+this.xAxisLabelPrefix.length+this.xAxisLabelSuffix.length,this.labelHeightX=this.xAxisHeight,this.longestLabelWidthX=this.longestLabelX*this.labelHeightX},i.prototype.calculateDrawingPropertiesY=function(){this.yAxisHeight=this.height-this.topOffset-this.bottomOffset,this.yAxisWidth=this.leftOffset,this.longestLabelY=f(this.maxPlottingY+this.dataStepSizeY,this.yAxisLabelMaxDecimals).toString().length+this.yAxisLabelPrefix.length+this.yAxisLabelSuffix.length},i.prototype.calculateStepSizeX=function(){var t=this.preferredLabelStepsX,e=this.orderX;this.preferredLabelStepsX.forEach((function(i,s){t[s]*=e}));for(var i=0;i<t.length;i++){var s=t[i]-this.maxX%t[i];s==t[i]&&(s=0);var n=this.minX-this.minX%t[i];s=this.maxX+s,this.gridLineCountX=(s-n)/t[i]+1,this.drawingStepSizeX=this.xAxisWidth/(this.gridLineCountX-1),this.dataStepSizeX=t[i];var o=this.drawingStepSizeX<this.longestLabelWidthX;if(!(this.gridLineCountX>this.xAxisMaxLabels||o)){this.calculateDrawingRanges(n,this.minY,s,this.maxY);break}i==t.length-1&&(this.preferredLabelStepsX.forEach((function(e,i){t[i]*=10})),i=-1)}},i.prototype.calculateStepSizeY=function(){var t=this.preferredLabelStepsY,e=this.orderY;this.preferredLabelStepsY.forEach((function(i,s){t[s]*=e}));for(var i=0;i<t.length;i++){var s=t[i]-this.maxY%t[i];s==t[i]&&(s=0);var n=this.minY-this.minY%t[i];s=this.maxY+s,this.gridLineCountY=(s-n)/t[i]+1,this.drawingStepSizeY=this.yAxisHeight/(this.gridLineCountY-1),this.dataStepSizeY=t[i],this.calculateLabelHeightYaxis();var o=this.drawingStepSizeY<this.labelHeightY;if(!(this.gridLineCountY>this.yAxisMaxLabels||o)){this.calculateDrawingRanges(this.minX,n,this.maxX,s);break}i==t.length-1&&(this.preferredLabelStepsY.forEach((function(e,i){t[i]*=10})),i=-1)}},i.prototype.drawAxis=function(){l("#fff",this.leftOffset,this.height-this.bottomOffset,this.width-this.leftOffset-this.rightOffset,this.ctx),h("#fff",this.leftOffset,this.height-this.bottomOffset,this.height-this.topOffset-this.bottomOffset,this.ctx);for(var t=0;t<this.gridLineCountY;t+=1){var e=this.topOffset+this.yAxisHeight-t*this.drawingStepSizeY,i=this.minPlottingY+this.dataStepSizeY*t;i=f(i,this.longestLabelY);var s=this.longestLabelY-i.toString().length-this.yAxisLabelPrefix.length-this.yAxisLabelSuffix.length;s>this.yAxisLabelMaxDecimals&&(s=this.yAxisLabelMaxDecimals),i=v(i,s),r(i=this.yAxisLabelPrefix+i+this.yAxisLabelSuffix,this.yAxisWidth/2,e,this.labelHeightY,"#fff",this.ctx),this.drawGridLineX&&l("#fff",this.leftOffset,e,this.width-this.leftOffset-this.rightOffset,this.ctx)}for(t=0;t<this.gridLineCountX;t+=1)e=this.leftOffset+t*this.drawingStepSizeX,this.xLabelNames?i=this.xLabelNames[t]:(i=f(i=this.minPlottingX+this.dataStepSizeX*t,this.longestLabelX),(s=this.longestLabelX-i.toString().length-this.xAxisLabelPrefix.length-this.xAxisLabelSuffix.length)>this.xAxisLabelMaxDecimals&&(s=this.xAxisLabelMaxDecimals),i=v(i,s)),i=this.xAxisLabelPrefix+i+this.xAxisLabelSuffix,s=this.xAxisHeight/2,this.equalLabelSize&&this.labelHeightX>this.labelHeightY&&(this.labelHeightX=this.labelHeightY),r(i,e,this.height-this.bottomOffset+s,this.labelHeightX,"#fff",this.ctx),this.drawGridLineY&&h("#fff",e,this.height-this.bottomOffset,this.height-this.topOffset-this.bottomOffset,this.ctx)},i.prototype.draw=function(){for(var t=0;t<this.graphs.length;t++)"line"==this.graphs[t].type?(u(this.graphs[t].xCoordinates,this.graphs[t].yCoordinates,this.graphs[t].color,this.graphs[t].linewidth,this.ctx),c(this.graphs[t].xCoordinatesHighlight,this.graphs[t].yCoordinatesHighlight,this.graphs[t].color,this.graphs[t].dataPointRadius,this.graphs[t].dataPointLinewidth,!1,this.ctx)):"shadow"==this.graphs[t].type&&(u(this.graphs[t].xCoordinates,this.graphs[t].yCoordinates,this.graphs[t].color,this.graphs[t].linewidth,this.ctx),c(this.graphs[t].xCoordinatesHighlight,this.graphs[t].yCoordinatesHighlight,this.graphs[t].color,this.graphs[t].dataPointRadius,this.graphs[t].linewidth,!0,this.ctx),p(this.graphs[t].xCoordinates,this.graphs[t].yCoordinates,this.graphs[t].shadowColor,this.bottom-this.bottomOffset,this.ctx));this.drawAxis()};var d=function(t,e,i,s,n,o,a){a.lineWidth=n,a.strokeStyle=i,a.beginPath(),a.arc(t,e,s,0,2*Math.PI,!0),a.fillStyle=o?i:null,a.fill(),a.stroke(),o||(a.strokeStyle="rgb(255, 255, 255)",a.globalCompositeOperation="destination-out",a.fillStyle="rgba(255,255,255,255)",a.lineWidth=1,a.beginPath(),a.arc(t,e,s-n/2,0,2*Math.PI,!0),a.fill(),a.stroke(),a.globalCompositeOperation="source-over")},u=function(t,e,i,s,n){n.lineWidth=s,n.strokeStyle=i;for(var o=0;o<t.length;o++)n.beginPath(),n.moveTo(t[o],e[o]),n.lineTo(t[o+1],e[o+1]),n.stroke();for(n.fillStyle=i,n.linewidth=1,i=Math.ceil(s/2)-1,o=0;o<t.length;o++)n.beginPath(),n.arc(t[o],e[o],i,0,2*Math.PI,!0),n.fill()},p=function(t,e,i,s,n){for(n.globalCompositeOperation="destination-over",n.lineWidth=1,n.strokeStyle=i,n.fillStyle=i,i=0;i<t.length;i++)n.beginPath(),n.moveTo(t[i],e[i]),n.lineTo(t[i],s),n.lineTo(t[i+1],s),n.lineTo(t[i+1],e[i+1]),n.fill(),n.stroke();n.globalCompositeOperation="source-over"};function f(t,e){var i=(t=t.toString()).indexOf("E"),s=t.indexOf("e"),n=0;return-1<s?(n=parseFloat(t.substring(s+1)),t=t.substring(0,s)):-1<i&&(n=parseFloat(t.substring(i+1)),t=t.substring(0,i)),Number(Math.round(t+"e"+(n+e))+"e-"+e)}function m(t){return Math.pow(10,Math.floor(Math.log(Math.abs(t))/Math.LN10+1e-9))}function g(t){return Math.round(Math.log(t)/Math.log(10))}function v(t,e){var i=-1==(t=t.toString()).indexOf(".");if(i&&1==e)return t;for(i&&1<e&&(t+=".",e--),i=0;i<e;i++)t+="0";return t}var x=!1;window.addEventListener("load",(function(){x=!0})),i.prototype.doWhenLoaded=function(t){x?t.bind(this)():window.addEventListener("load",function(){t.bind(this)()}.bind(this))}}).call(this)}).call(this,i(10))},function(t,e){var i;i=function(){return this}();try{i=i||new Function("return this")()}catch(t){"object"==typeof window&&(i=window)}t.exports=i},function(t,e,i){},function(t,e,i){const s=i(13);s.keys().forEach(s)},function(t,e,i){var s={"./android-chrome-192x192.png":14,"./apple-touch-icon.png":15,"./browserconfig.xml":16,"./favicon-16x16.png":17,"./favicon-32x32.png":18,"./favicon.ico":19,"./mstile-150x150.png":20,"./safari-pinned-tab.svg":21};function n(t){var e=o(t);return i(e)}function o(t){if(!i.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}n.keys=function(){return Object.keys(s)},n.resolve=o,t.exports=n,n.id=13},function(t,e,i){"use strict";i.r(e),e.default=i.p+"favicons/android-chrome-192x192.png"},function(t,e,i){"use strict";i.r(e),e.default=i.p+"favicons/apple-touch-icon.png"},function(t,e,i){"use strict";i.r(e),e.default=i.p+"favicons/browserconfig.xml"},function(t,e,i){"use strict";i.r(e),e.default=i.p+"favicons/favicon-16x16.png"},function(t,e,i){"use strict";i.r(e),e.default=i.p+"favicons/favicon-32x32.png"},function(t,e,i){"use strict";i.r(e),e.default=i.p+"favicons/favicon.ico"},function(t,e,i){"use strict";i.r(e),e.default=i.p+"favicons/mstile-150x150.png"},function(t,e,i){"use strict";i.r(e),e.default=i.p+"favicons/safari-pinned-tab.svg"},function(t,e,i){"use strict";i.r(e);i(8),i(9);var s=i(2),n=(i(0),i(1));function o(){let t=document.createElement("div");t.id="dashboard",t.innerHTML=s;t.querySelector("#output");const e=t.querySelector("#tempPlot"),i={};var o=[];let a=[];var r=0;function l(){this.timeLabels=[],this.times=[],this.temps=[],this.hums=[],this.press=[],this.name=""}return Object(n.h)().then(s=>{let n=Object.keys(s).length;if(a=Object.keys(s),0==n)return;!function(e){const i=t.querySelector("#gaugeCard"),s=t.querySelector("#heading"),n=t.querySelector("#gauges"),a=t.querySelector("#tempGauge"),r=t.querySelector("#humGauge"),l=t.querySelector("#presGauge");for(var h=0;h<e;h++){const e=document.createElement("div");e.classList=i.classList;const h=document.createElement("div");h.classList=n.classList;const c=document.createElement("h5");c.classList=s.classList,c.innerText="Room";const d=document.createElement("div");d.classList=a.classList;const u=document.createElement("div");u.classList=r.classList;const p=document.createElement("div");p.classList=l.classList,h.appendChild(d),h.appendChild(u),h.appendChild(p),e.appendChild(c),e.appendChild(h),t.insertBefore(e,t.firstChild);const f=[d,u,p,c];o.push(f)}}(n);for(var h=0;h<n;h++)i[a[h]]=new l;for(var c=0;c<n;c++){const t=i[a[c]];if(null==t)continue;t.name=s[a[c]].name;let e=s[a[c]].measurements;for(h=0;h<e.length;h++){const i=new Date(e[h].time);t.times.push(i.getTime()/1e3),t.temps.push(e[h].temperature),t.hums.push(e[h].humidity),t.press.push(e[h].pressure)}}for(h=n-1;h>=0;h--)i[a[h]].addGaugePanel(h);let d=1/0,u=0;for(let t=0;t<n;t++){let e=i[a[t]].times[0],s=i[a[t]].times[i[a[t]].times.length-1];e<d&&(d=e),s>u&&(u=s)}const p=1e3*(u-d)/3;let f=[];for(h=0;h<4;h++){const t=new Date(1e3*d+p*h);f.push(t.getHours()+":"+t.getMinutes())}let m=["temps","hums","press"],g=["Temperature","Humidity","Pressure"],v=["#4caf50","#0077c2","#9c64a6"],x=["#80e27e","#42a5f5","#ce93d8"];var b=["° ","% ",""];e.onclick=function(){++r>m.length-1&&(r=0),function(t,i,s,n,o,r,l){let h=[];for(let e=0;e<a.length;e++){let s=t[a[e]],n={type:"line",x:s.times,y:s[i],xHighlight:s.times,yHighlight:s[i],shadowColor:r};0==e&&(n.type="shadow"),h.push(n)}e.parentElement.style.background=o,e.parentElement.firstElementChild.innerText=l,new Plot(e,{backgroundColor:o,xAxisSize:.08,yAxisSize:.08,yAxisLabelMaxDecimals:0,yAxisMaxLabels:15,yAxisLabelSuffix:n,drawGridLineX:!1,drawGridLineY:!1,preferredLabelStepsY:[1,2,5],xLabelNames:s,graphs:h})}(i,m[r],f,b[r],v[r],x[r],g[r])},r=m.length-1,e.click()}),l.prototype.addGaugePanel=function(t){const e=o[t][0],i=o[t][1],s=o[t][2];o[t][3].innerText=this.name;var n=Math.round(this.temps[this.temps.length-1]),a=Math.round(this.hums[this.hums.length-1]),r=Math.round(this.press[this.press.length-1]);new Gauge(e,"",n,"°",5,40,"#fff","#000").animateValue(n,800);new Gauge(i,"",a,"%",30,99,"#fff","#000").animateValue(a,800);new Gauge(s,"",r," mbar",950,1050,"#fff","#000").animateValue(r,800)},t}var a=i(3),r=i(4);class l extends HTMLElement{constructor(){super(),this.innerHTML=r}connectedCallback(){this.sensor1Select=this.querySelector("#sensor1"),this.sensor2Select=this.querySelector("#sensor2"),this.typeSelect=this.querySelector("#type"),this.removeButton=this.querySelector("#remove"),this.removeButton.addEventListener("click",this.delete.bind(this)),this.saveButton=this.querySelector("#save"),this.saveButton.addEventListener("click",this.save.bind(this)),this.nameInvalid=this.querySelector("#name-invalid"),this.roomname=this.querySelector("#roomname")}save(){let t=this.roomname.value;this.nameInvalid.style.display=t?"none":"block",t&&(this.id||Object(n.b)(t,this.typeSelect.value,parseInt(this.sensor1Select.value),this.sensor2Select.value?parseInt(this.sensor2Select.value):null).then(t=>{this.id=t.room_id}))}delete(){this.id?Object(n.e)(this.id).then(()=>{this.dispatchEvent(new CustomEvent("onremove"))}):this.dispatchEvent(new CustomEvent("onremove"))}setData(t,e,i,s,n){this.id=t,this.roomname.value=e,this.sensor1Select.value=i,this.sensor2Select.value=s,this.typeSelect.value=n}setSensors(t){for(let e of[{select:this.sensor1Select,required:!0},{select:this.sensor2Select,required:!1}]){if(e.select.innerHTML="",!e.required){let t=document.createElement("option");e.select.appendChild(t)}for(let i of t){let t=document.createElement("option");t.innerText="Sensor "+i.sensor_id,t.value=i.sensor_id,e.select.appendChild(t)}}}}customElements.define("app-room-editor",l);class h extends HTMLElement{constructor(){super(),this.innerHTML=a,this.sensors=[]}connectedCallback(){this.roomsContainer=this.querySelector("#rooms"),this.addRoomButton=this.querySelector("#add-room"),this.addRoomButton.addEventListener("click",()=>this.addRoom()),this.updateSensors(),this.refreshRooms()}refreshRooms(){Object(n.i)().then(t=>{this.roomsContainer.innerHTML="";for(let e of t)this.addRoom(e)})}addRoom(t){let e=new l;this.roomsContainer.appendChild(e),e.setSensors(this.sensors),t&&e.setData(t.room_id,t.name,t.sensor_id1,t.sensor_id2,t.type),e.addEventListener("onremove",()=>{this.roomsContainer.removeChild(e)})}updateSensors(){Object(n.j)().then(t=>{this.sensors=t,this.roomsContainer.querySelectorAll("app-room-editor").forEach(e=>{e.setSensors(t)})})}}customElements.define("app-rooms-component",h);var c=i(5),d=i(6);class u extends HTMLElement{constructor(){super(),this.innerHTML=d}connectedCallback(){this.messagetext=this.querySelector("#messageText"),this.room1Select=this.querySelector("#room1"),this.room2Select=this.querySelector("#room2"),this.typeSelect=this.querySelector("#type"),this.value=this.querySelector("#value"),this.amount=this.querySelector("#amount"),this.removeButton=this.querySelector("#remove"),this.removeButton.addEventListener("click",this.delete.bind(this)),this.saveButton=this.querySelector("#save"),this.saveButton.addEventListener("click",this.save.bind(this)),this.nameInvalid=this.querySelector("#name-invalid")}delete(){this.id?Object(n.d)(this.id).then(()=>{this.dispatchEvent(new CustomEvent("onremove"))}):this.dispatchEvent(new CustomEvent("onremove"))}async save(){let t=this.messagetext.value;this.nameInvalid.style.display=t?"none":"block",t&&(this.id||Object(n.a)(t,parseInt(this.room1Select.value),"Fixed Value"!=this.room2Select.value?parseInt(this.room2Select.value):null,this.typeSelect.value,parseFloat(this.amount.value),this.value.value).then(t=>{this.id=t.notification_id}))}delete(){this.id?Object(n.d)(this.id).then(()=>{this.dispatchEvent(new CustomEvent("onremove"))}):this.dispatchEvent(new CustomEvent("onremove"))}setData(t,e,i,s,n,o,a){this.id=t,this.messagetext.value=e,this.room1Select.value=i,this.room2Select.value=s,this.typeSelect.value=o,this.value.value=a,this.amount.value=n}setRooms(t){for(let e of[{room:this.room1Select,required:!0},{room:this.room2Select,required:!1}]){if(e.room.innerHTML="",!e.required){let t=document.createElement("option");t.innerText="Fixed Value",t.value=null,e.room.appendChild(t)}for(let i of t){let t=document.createElement("option");t.innerText=""+i.name,t.value=i.room_id,e.room.appendChild(t)}}}}customElements.define("app-notification-editor",u);class p extends HTMLElement{constructor(){super(),this.innerHTML=c,this.rooms=[]}connectedCallback(){this.notificationsContainer=this.querySelector("#notifications"),this.addNotificationButton=this.querySelector("#add-notification"),this.addNotificationButton.addEventListener("click",()=>this.addNotification()),this.updateRooms(),this.refreshNotifications()}refreshNotifications(){Object(n.g)().then(t=>{this.notificationsContainer.innerHTML="";for(let e of t)this.addNotification(e)})}addNotification(t){let e=new u;this.notificationsContainer.appendChild(e),e.setRooms(this.rooms),t&&e.setData(t.notification_id,t.message,t.room_id1,t.room_id2,t.amount,t.type,t.value),e.addEventListener("onremove",()=>{this.notificationsContainer.removeChild(e)})}updateRooms(){Object(n.i)().then(t=>{this.rooms=t,this.notificationsContainer.querySelectorAll("app-notification-editor").forEach(e=>{e.setRooms(t)})})}}customElements.define("app-notifications-component",p);i(11),i(12);var f=i(7),m=i.n(f);let g=new class{constructor(t,e){this.routeResolver=t,this.routeRenderer=e,this.lastRoute=null,this.popStateListener=this.handlePopState.bind(this)}handlePopState(t){this.doRouting(window.location.pathname)}run(){let t=document.querySelector("base");this.basePrefix=t.getAttribute("href"),this.baseHref=t.href,window.addEventListener("popstate",this.popStateListener),this.doRouting(window.location.pathname)}destroy(){window.removeEventListener("popstate",this.popStateListener)}doRouting(t){let e=this.getRoute(t);return Promise.resolve(this.routeResolver.resolve(this.lastRoute,e,this)).then(t=>!!t&&(this.routeRenderer.render(t),this.lastRoute=e,!0))}getRoute(t){let e=t===this.baseHref,i=t.substr(0,this.basePrefix.length)===this.basePrefix;return e?"/":i?t.substring(this.basePrefix.length):t}navigate(t,e){let i=new URL(t,this.baseHref);this.doRouting(i.pathname).then(t=>{t&&window.history.pushState({},e||document.title,i.href)})}}(new class{resolve(t,e,s){switch(e){case"debug":return i.e(1).then(i.bind(null,24)).then((function(t){return new t.DebugComponent}));case"rooms":return new h;case"notifications":return new p;case"":return o();default:return!1}}},new class{constructor(t){this.container=t,this.currentComponent=!1}render(t){t&&(this.currentComponent&&(this.container.innerHTML=""),this.container.appendChild(t),this.currentComponent=!0)}}(document.getElementById("content")));var v,x;g.run(),v=document.querySelectorAll("a"),x=g,v.forEach(t=>{t.addEventListener("click",e=>{e.preventDefault(),x.navigate(t.getAttribute("href"))})}),document.querySelector("#home-button").addEventListener("click",()=>g.navigate("")),"serviceWorker"in navigator&&window.addEventListener("load",(function(){m.a.register().then((function(t){console.log("ServiceWorker registration successful with scope: ",t.scope)}),(function(t){console.log("ServiceWorker registration failed: ",t)}))}))}]);
//# sourceMappingURL=e20a6a4866e0997c3eea.bundle.js.map