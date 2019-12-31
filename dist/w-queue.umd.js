/*!
 * w-queue v1.0.17
 * (c) 2018-2019 yuda-lyu(semisphere)
 * Released under the MIT License.
 */
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self)["w-queue"]=t()}(this,(function(){"use strict";function e(){var e={};return{on:function(t,n){e[t]||(e[t]=[]),e[t].push(n)},emit:function(t){if(e[t]){for(var n=arguments.length,i=new Array(n>1?n-1:0),u=1;u<n;u++)i[u-1]=arguments[u];for(var o=0;o<e[t].length;o++){var f;(f=e[t])[o].apply(f,i)}}}}}return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};t.takeNumLimit||(t.takeNumLimit=0);var n=0,i=[],u=new e;return u.get=function(){return i.length>0?(n+=1,i.splice(0,1)[0]):null},u.cb=function(){n-=1,i.length>0&&u.emit("message",i)},u.push=function(e){i.push(e),(t.takeNumLimit<=0||n<t.takeNumLimit)&&u.emit("message",i)},u}}));
//# sourceMappingURL=w-queue.umd.js.map
