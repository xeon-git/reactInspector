// ==UserScript==
// @name 		 React Inspector
// @version 	 3.5
// @description  better user experience
// @author		 xeon | xxnn
// @match        https://*.tankionline.com/*
// @icon         https://hierophant.host/reactInspector/attachments/logo.png
// @grant        GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({method:"GET",url:"https://hierophant.host/reactInspector/build/reactInspector.min.js",nocache:!0,onload:ev=>{eval(ev.responseText)}});