// ==UserScript==
// @name 		 React Inspector
// @version 	 3.4
// @description  better user experience
// @author		 xeon | xxnn
// @match        https://*.tankionline.com/*
// @icon         https://xeon.fun/logo/blurstyle.png
// @grant        GM_xmlhttpRequest
// ==/UserScript==

GM_xmlhttpRequest({method:"GET",url:"https://xeon.fun/reactInspector/build/reactInspector.min.js",nocache:!0,onload:ev=>{eval(ev.responseText)}});