!function(e,r){"object"==typeof exports&&"object"==typeof module?module.exports=r(require("react"),require("prop-types"),require("react-redux"),require("react-loading"),require("superagent"),require("find-in-object"),require("file-saver"),require("react-symbol"),require("redux"),require("react-router-redux")):"function"==typeof define&&define.amd?define("wikomData",["react","prop-types","react-redux","react-loading","superagent","find-in-object","file-saver","react-symbol","redux","react-router-redux"],r):"object"==typeof exports?exports.wikomData=r(require("react"),require("prop-types"),require("react-redux"),require("react-loading"),require("superagent"),require("find-in-object"),require("file-saver"),require("react-symbol"),require("redux"),require("react-router-redux")):e.wikomData=r(e.react,e["prop-types"],e["react-redux"],e["react-loading"],e.superagent,e["find-in-object"],e["file-saver"],e["react-symbol"],e.redux,e["react-router-redux"])}(this,function(e,r,t,n,a,o,u,i,l,c){return function(e){function r(n){if(t[n])return t[n].exports;var a=t[n]={exports:{},id:n,loaded:!1};return e[n].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}var t={};return r.m=e,r.c=t,r.p="",r(0)}([function(e,r,t){"use strict";function n(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0}),r.directDelete=r.confirmAndDelete=r.refreshData=r.clearData=r.configureRequest=r.setUser=r.submit=r.download=r.loadData=r.actions=r.userReducer=r.errorReducer=r.queriesReducer=r.dataReducer=r.ajaxErrorMiddleware=r.actionTypes=r.AppError=r.DataProvider=void 0;var o=t(1),u=a(o),i=t(11),l=a(i),c=t(10),s=n(c),d=t(6),f=n(d),p=t(13),m=a(p),A=t(14),y=a(A),b=t(16),v=a(b),_=t(17),D=a(_),g=t(19),h=a(g),O=f.loadData,E=f.download,P=f.submit,T=f.setUser,R=f.configureRequest,L=f.clearData,S=f.refreshData,j=f.confirmAndDelete,x=f.directDelete;r.default=u.default,r.DataProvider=u.default,r.AppError=l.default,r.actionTypes=s,r.ajaxErrorMiddleware=m.default,r.dataReducer=y.default,r.queriesReducer=v.default,r.errorReducer=D.default,r.userReducer=h.default,r.actions=f,r.loadData=O,r.download=E,r.submit=P,r.setUser=T,r.configureRequest=R,r.clearData=L,r.refreshData=S,r.confirmAndDelete=j,r.directDelete=x},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,r){var t={};for(var n in e)r.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function u(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function i(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function l(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}Object.defineProperty(r,"__esModule",{value:!0});var c=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),f=t(2),p=n(f),m=t(3),A=n(m),y=t(4),b=t(5),v=n(b),_=t(6),D=function(e){function r(){return u(this,r),i(this,(r.__proto__||Object.getPrototypeOf(r)).apply(this,arguments))}return l(r,e),d(r,[{key:"componentDidMount",value:function(){this.props.force&&(this._pendingFetch=this.props.loadData({name:this.props.name,url:this.props.url}))}},{key:"componentWillReceiveProps",value:function(e){(this.props.force&&this.props.url!==e.url||e.refresh===!0)&&(this._pendingFetch&&this._pendingFetch.cancel(),this.props.clearData({name:this.props.name}),this._pendingFetch=this.props.loadData({name:e.name,url:e.url}))}},{key:"componentWillUnmount",value:function(){this._pendingFetch&&this._pendingFetch.cancel(),this.props.force&&this.props.clearData({name:this.props.name})}},{key:"render",value:function(){return this.props.onlyLoaded&&this.props.isLoading?p.default.createElement("span",null,this.props.loading):p.default.createElement("span",null,this.props.children)}}]),r}(f.Component),g=function(e,r,t,n,a,u,i){var l,d=r.data&&r.data[a]||null,f=!!e.props.hasOwnProperty(t)&&e.props[t],m=e.props.hasOwnProperty("overwriteInitial")&&e.props.overwriteInitial;if(f)switch("undefined"==typeof f?"undefined":s(f)){case"object":Array.isArray(f)?Array.isArray(f)&&Array.isArray(d)&&(f=f.concat(d)):Array.isArray(d)?m&&(f=d):f=m?c({},f,d):c({},d,f);break;default:m&&(f=d)}else f=d;return"function"==typeof u&&"object"===("undefined"==typeof f?"undefined":s(f))&&f instanceof Array&&(f=f.map(u)),p.default.cloneElement(e,c((l={},o(l,n,!r.queries[a]||r.queries[a].isPending===!0),o(l,t,f),o(l,"pagination",r.data&&r.data.pagination&&r.data.pagination[a]||null),l),i))},h=function(e,r){var t=r.children,n=r.name,o=(r.url,r.force),u=r.dataProp,i=r.isLoadingProp,l=r.refresh,c=r.dataMap,s=a(r,["children","name","url","force","dataProp","isLoadingProp","refresh","dataMap"]);return{isLoading:!e.queries[n]||e.queries[n].isPending===!0,refresh:l||e.queries[n]&&e.queries[n].isQueued===!0,force:o||!e.queries[n]||e.queries[n].isComplete===!1,children:p.default.Children.map(t,function(r){return g(r,e,u,i,n,c,s)})}},O=function(e){return{loadData:function(r){var t=r.name,n=r.url;return e((0,_.loadData)({name:t,url:n}))},clearData:function(r){var t=r.name;return e((0,_.clearData)({name:t}))}}},E=(0,y.connect)(h,O)(D);E.defaultProps={dataProp:"data",isLoadingProp:"isLoading",loading:p.default.createElement(v.default,null),force:!1,refresh:!1,onlyLoaded:!1,dataMap:null},E.propTypes={name:A.default.string.isRequired,url:A.default.string.isRequired,children:A.default.node.isRequired,dataProp:A.default.string,isLoadingProp:A.default.string,force:A.default.bool,refresh:A.default.bool,onlyLoaded:A.default.bool,dataMap:A.default.func},r.default=E},function(r,t){r.exports=e},function(e,t){e.exports=r},function(e,r){e.exports=t},function(e,r){e.exports=n},function(e,r,t){"use strict";function n(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0}),r.confirmAndDelete=r.directDelete=r.submit=r.download=r.loadData=r.clearPagination=r.setPagination=r.refreshData=r.clearData=r.loadDataProgress=r.loadDataCancel=r.loadDataFailure=r.loadDataSuccess=r.loadDataPending=r.types=r.del=r.put=r.post=r.get=r.baseRequest=r.configureRequest=r.setUser=void 0;var o=t(7),u=a(o),i=t(8),l=a(i),c=t(9),s=t(10),d=n(s),f=(r.setUser=function(e){var r=e.user;return{type:d.SET_USER,user:r}},{}),p=(r.configureRequest=function(){return function(e,r){var t=(0,l.default)("user.access_token",r());t&&(f.Accept="application/json",f.Authorization="Bearer "+t)}},r.baseRequest=function(e){var r=e.method,t=void 0===r?"GET":r,n=e.url;return(0,u.default)(t,n).set(f)}),m=r.get=function(e){var r=e.url;return p({url:r})},A=r.post=function(e){var r=e.url,t=e.data;return p({method:"POST",url:r}).send(t)},y=r.put=function(e){var r=e.url,t=e.data;return p({method:"PUT",url:r}).send(t)},b=r.del=function(e){var r=e.url;return p({method:"DELETE",url:r})};r.types=d;var v=r.loadDataPending=function(e){var r=e.name,t=e.url;return{type:d.LOAD_DATA_PENDING,name:r,url:t}},_=r.loadDataSuccess=function(e){var r=e.name,t=e.url,n=e.data;return{type:d.LOAD_DATA_SUCCESS,name:r,url:t,data:n}},D=r.loadDataFailure=function(e){var r=e.name,t=e.url,n=e.error;return{type:d.LOAD_DATA_FAILURE,name:r,url:t,error:n}},g=r.loadDataCancel=function(e){var r=e.name,t=e.url;return{type:d.LOAD_DATA_CANCEL,name:r,url:t}},h=r.loadDataProgress=function(e){var r=e.name,t=e.url,n=e.percent;return{type:d.LOAD_DATA_PROGRESS,name:r,url:t,percent:n}},O=(r.clearData=function(e){var r=e.name;return{type:d.CLEAR_DATA,name:r}},r.refreshData=function(e){var r=e.name;return{type:d.REFRESH_DATA,name:r}}),E=r.setPagination=function(e){var r=e.name,t=e.data;return{type:d.SET_PAGINATION,name:r,data:t}},P=r.clearPagination=function(e){var r=e.name;return{type:d.CLEAR_PAGINATION,name:r}},T=(r.loadData=function(e){var r=e.name,t=e.url;return function(e,n){if(!n().queries.pending||n().queries.pending.indexOf(t)===-1){e(v({name:r,url:t}));var a=m({url:t}),o=a.on("progress",function(n){e(h({name:r,url:t,percent:n.percent||100}))}).then(function(n){if(o.cancel=function(){},n.ok&&n.body&&(e(_({name:r,url:t,data:n.body.data})),n.header["x-pagination-current-page"])){var a={currentPage:Number(n.header["x-pagination-current-page"]),pageCount:Number(n.header["x-pagination-page-count"]),perPage:Number(n.header["x-pagination-per-page"]),totalCount:Number(n.header["x-pagination-total-count"])};e(E({name:r,data:a}))}}).catch(function(n){e(D({name:r,url:t,error:n})),e(P({name:r}))});return o.cancel=function(){a.abort(),e(g({name:r,url:t}))},o}}},r.download=function(e){var r=e.name,t=e.url;return function(e){e(v({name:r,url:t}));var n=function(e){var r=e["content-disposition"];if(r&&r.indexOf("attachment")!==-1){var t=/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,n=t.exec(r);if(n&&n[1])return n[1].replace(/['"]/g,"")}return null},a=m({url:t}),o=a.responseType("blob").on("progress",function(n){e(h({name:r,url:t,percent:n.percent||100}))}).then(function(a){if(o.cancel=function(){},a.ok&&a.body){var u=n(a.header)||r;(0,c.saveAs)(a.body,u),e(_({name:r,url:t,data:null}))}}).catch(function(n){e(D({name:r,url:t,error:n}))});return o.cancel=function(){a.abort(),e(g({name:r,url:t}))},o}},r.submit=function(e){var r=e.url,t=e.data,n=void 0===t?{}:t,a=e.primaryKey,o=void 0===a?"id":a;return function(){var e=n.hasOwnProperty(o)?y({url:r+"/"+(0,l.default)(o,n),data:n}):A({url:r,data:n}),t=e;return t.cancel=function(){return e.abort()},t}},function(e){var r=e.url;return function(){var e=b({url:r}),t=e;return t.cancel=function(){return e.abort()},t}}),R=r.directDelete=function(e){var r=e.url,t=e.refresh,n=void 0===t?null:t;return function(e){return e(T({url:r})).then(function(r){return null!==n?e(O({name:n})):Promise.resolve("success")}).catch(function(e){return Promise.reject("errored")})}};r.confirmAndDelete=function(e){var r=e.url,t=e.refresh,n=void 0===t?null:t,a=e.message,o=void 0===a?"Sind Sie sicher, dass Sie diesen Eintrag löschen möchten?":a;return function(e){return confirm(o)?e(R({url:r,refresh:n})):Promise.resolve("canceled")}}},function(e,r){e.exports=a},function(e,r){e.exports=o},function(e,r){e.exports=u},function(e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t="@@wikom-data/";r.LOAD_DATA_PENDING=t+"LOAD_DATA_PENDING",r.LOAD_DATA_SUCCESS=t+"LOAD_DATA_SUCCESS",r.LOAD_DATA_FAILURE=t+"LOAD_DATA_FAILURE",r.LOAD_DATA_CANCEL=t+"LOAD_DATA_CANCEL",r.LOAD_DATA_PROGRESS=t+"LOAD_DATA_PROGRESS",r.CLEAR_DATA=t+"CLEAR_DATA",r.REFRESH_DATA=t+"REFRESH_DATA",r.SET_PAGINATION=t+"SET_PAGINATION",r.CLEAR_PAGINATION=t+"CLEAR_PAGINATION",r.SET_USER=t+"SET_USER"},function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(r,"__esModule",{value:!0});var a=t(2),o=n(a),u=t(3),i=n(u),l=t(4),c=t(12),s=n(c),d=function(e){var r=e.error;return o.default.createElement("div",{className:"alert alert-danger",id:"page-alert-danger",role:"alert"},o.default.createElement("button",{type:"button",className:"close","data-dismiss":"alert","aria-label":"Close"},o.default.createElement(s.default,{symbol:"times"})),o.default.createElement("h4",null,o.default.createElement(s.default,{symbol:{symbol:"ban",className:"icon"}}),r.status," ",r.name),o.default.createElement("ul",null,o.default.createElement("li",null,r.message)))},f=function(e){var r=e.errors;return r.length>0?o.default.createElement("div",null,r.map(function(e,r){return o.default.createElement(d,{key:r,error:e})})):null};f.defaultProps={errors:[]},f.propTypes={errors:i.default.arrayOf(i.default.object)};var p=function(e,r){return{errors:e.errors}},m=(0,l.connect)(p)(f);r.default=m},function(e,r){e.exports=i},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(6),a=function(e){return function(r){return function(r){return function(t){return t.type===n.types.LOAD_DATA_FAILURE&&401===t.error.status&&(location.href=e),r(t)}}}};r.default=a},function(e,r,t){"use strict";function n(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}Object.defineProperty(r,"__esModule",{value:!0});var a=t(15),o=t(10),u=n(o),i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,r=e?(0,a.combineReducers)(e):null;return function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments[1],a=Object.assign({},t);switch(n.type){case u.LOAD_DATA_SUCCESS:a[n.name]=n.data;break;case u.LOAD_DATA_FAILURE:a[n.name]=[];break;case u.CLEAR_DATA:delete a[n.name];break;case u.SET_PAGINATION:a.pagination||(a.pagination={}),a.pagination[n.name]=n.data;break;case u.CLEAR_PAGINATION:a.pagination||(a.pagination={}),a.pagination[n.name]={};break;default:a=t}if(r){var o=Object.keys(e).reduce(function(e,r){return e[r]=t[r],e},{});return Object.assign({},a,r(o,n))}return a}};r.default=i},function(e,r){e.exports=l},function(e,r,t){"use strict";function n(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r}function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}Object.defineProperty(r,"__esModule",{value:!0});var o=t(10),u=n(o),i=function(e){return{url:e,isQueued:!1,isPending:!0,isComplete:!1,percent:0}},l=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments[1];switch(r.type){case u.LOAD_DATA_PENDING:return Object.assign({},e,a({},r.name,i(r.url)));case u.LOAD_DATA_SUCCESS:case u.LOAD_DATA_FAILURE:var t=e[r.name]?Object.assign({},e[r.name]):i(r.url);return t.isPending=!1,t.isComplete=!0,t.percent=100,Object.assign({},e,a({},r.name,t));case u.LOAD_DATA_CANCEL:var n=Object.assign({},e);return delete n[r.name],n;case u.LOAD_DATA_PROGRESS:var o=e[r.name]?Object.assign({},e[r.name]):i(r.url);return o.percent=r.percent,Object.assign({},e,a({},r.name,o));case u.REFRESH_DATA:var l=e[r.name]?Object.assign({},e[r.name]):i(r.url);return l.isQueued=!0,l.isPending=!1,l.isComplete=!1,l.percent=0,Object.assign({},e,a({},r.name,l));case u.CLEAR_DATA:var c=Object.assign({},e);return delete c[r.name],c;default:return e}};r.default=l},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=t(10),o=t(18),u=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],r=arguments[1];switch(r.type){case a.LOAD_DATA_FAILURE:var t={status:0,name:"Unbekannter Fehler",message:"Es ist ein unbekannter Fehler aufgetreten."};return"object"===n(r.error)&&(t.status=r.error.status,"object"===n(r.error.response)&&"object"===n(r.error.response.body)&&(t.name=r.error.response.body.name,t.message=r.error.response.body.message)),e.concat(t);case o.LOCATION_CHANGE:return[];default:return e}};r.default=u},function(e,r){e.exports=c},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t(10),a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments[1];switch(r.type){case n.SET_USER:return r.user;default:return e}};r.default=a}])});
//# sourceMappingURL=index.js.map