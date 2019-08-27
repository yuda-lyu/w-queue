/*!
 * w-queue v1.0.9
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */(function(a,b){"object"==typeof exports&&"undefined"!=typeof module?module.exports=b():"function"==typeof define&&define.amd?define(b):(a=a||self,a["w-queue"]=b())})(this,function(){'use strict';function a(){var a={};return{on:function(b,c){a[b]||(a[b]=[]),a[b].push(c)},emit:function(b){if(a[b]){for(var c=arguments.length,d=Array(1<c?c-1:0),e=1;e<c;e++)d[e-1]=arguments[e];for(var f=0;f<a[b].length;f++){var g;(g=a[b])[f].apply(g,d)}}}}}return function(){function b(a){e.push(a),(0>=c.takeNumLimit||d<c.takeNumLimit)&&f.emit("message",e)}var c=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};c.takeNumLimit||(c.takeNumLimit=0);var d=0,e=[],f=new a;return f.get=function(){if(0<e.length){d+=1;var a=e.splice(0,1)[0];return a}return null},f.cb=function(){d-=1,0<e.length&&f.emit("message",e)},f.push=b,f}});
//# sourceMappingURL=w-queue.umd.js.map
