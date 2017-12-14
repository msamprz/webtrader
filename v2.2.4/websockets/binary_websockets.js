define(["exports","jquery","text!../oauth/app_id.json","common/util"],function(a,b,c){"use strict";function d(a){return a&&a.__esModule?a:{"default":a}}Object.defineProperty(a,"__esModule",{value:!0}),a.sell_expired=a.is_authenticated=a.send=a.cached=a.switch_account=a.execute=a.proposal_open_contract=a.events=a.invalidate=a.server_url=a.app_id=a.socket_url=void 0;var e=d(b),f=d(c),g=!1,h=null,i=!1,j={},k=function(){var a=JSON.parse(f["default"]),b=localStorage.getItem("config.app_id");if(!b){var c=window.location.href;for(var d in a)if(0==c.lastIndexOf(d,0)){b=a[d];break}}return localStorage.setItem("config.default_app_id",b),b},l=function(){return localStorage.getItem("config.app_id")||k()||11},m=function(){return localStorage.getItem("config.server_url")||"frontend.binaryws.com"},n=function(){var a=m();return"wss://"+a+"/websockets/v3"},o=a.socket_url=n(),p=a.app_id=l(),q=a.server_url=m(),r=function(){var a=(local_storage.get("i18n")||{value:"en"}).value,b=o+"?l="+a+"&app_id="+p,c=new WebSocket(b);return c.addEventListener("open",A),c.addEventListener("close",t),c.addEventListener("message",B),c.addEventListener("error",function(){e["default"].growl.error({message:"Connection error.".i18n()}),t()}),c},s=!1,t=function(){require(["windows/tracker"],function(a){var b=a.get_trade_dialogs(),c=a.get_unique_dialogs();g=!1,I("logout"),s||(s=!0,setTimeout(function(){s=!1,h=r(),local_storage.get("oauth")&&V.cached.authorize().then(function(){a.reopen_trade_dialogs(b),setTimeout(function(){return a.reopen_unique_dialogs(c)},0)})},1e3))})},u={},v=[],w=[],x={},y={},z=function(){return h&&1===h.readyState},A=function(){for(h.send(JSON.stringify({website_status:1,subscribe:1}));w.length>0;){var a=w.shift();x[a.req_id]||h.send(JSON.stringify(a))}for(var b in x){var c=x[b];c&&(c.sent_before?c.reject({message:"Connection closed.".i18n()}):(c.sent_before=!0,h.send(JSON.stringify(c.data))))}for(;v.length>0;)v.shift()()},B=function(a){var b=JSON.parse(a.data);u[b.msg_type]=u[b.msg_type]||[];for(var c=function(a){var c=u[b.msg_type][a];setTimeout(function(){return c(b)},0)},d=0;d<u[b.msg_type].length;d++)c(d);var e=b.req_id,f=x[e]||j[e];f&&(delete x[e],delete j[e],b.error?(b.error.echo_req=b.echo_req,b.error.req_id=b.req_id,f.reject(b.error)):f.resolve(b))};h=r();var C=function(a){for(var b in{balance:1,statement:1,profit_table:1,portfolio:1,proposal_open_contract:1,buy:1,sell:1,get_self_exclusion:1,set_self_exclusion:1})if(b in a)return!0;return!1},D=0,E=function(a){return a.req_id=++D,new Promise(function(b,c){return i?(x[a.req_id]={resolve:b,reject:c,data:a},void(z()?h.send(JSON.stringify(a)):w.push(a))):void(j[a.req_id]={resolve:b,reject:c,data:a})})},F=function(a){var b=!1,c={authorize:a},d=JSON.stringify(c),e=E(c);return e.then(function(a){g=!0,local_storage.set("authorize",a.authorize);var f=-1!==a.authorize.landing_company_name.indexOf("japan");if(f||I("login",a),local_storage.get("oauth-login")){var h=local_storage.get("oauth-login").value;local_storage.remove("oauth-login"),h&&!f&&I("oauth-login",a)}return b=!0,y[d]={data:c,promise:e},a})["catch"](function(a){throw"SelfExclusion"===a.code||b||(g=!1,I("logout"),local_storage.remove("oauth")),delete y[d],a})},G=a.invalidate=function(){local_storage.remove("oauth"),local_storage.remove("authorize"),I("reset_realitycheck"),I("reset_accountstatus"),V.send({logout:1})["catch"](function(a){e["default"].growl.error({message:a.message}),h.close()});for(var a in y)(C(y[a].data)||"authorize"in y[a].data)&&delete y[a];g=!1},H=function(a){if(g)return E(a);var b=E.bind(null,a);if(local_storage.get("oauth")){var c=local_storage.get("oauth"),d=c[0].token;return F(d).then(b)}return Promise.reject({message:"Please log in".i18n()})},I=function(a){for(var b=arguments.length,c=Array(b>1?b-1:0),d=1;b>d;d++)c[d-1]=arguments[d];var e=u[a]||[];e.forEach(function(a){setTimeout(function(){return a.apply(void 0,c)},0)})},J=function(a,b){setTimeout(function(){var b=x[a];b&&(delete x[a],b.reject({message:"Timeout for websocket request".i18n()}))},b)},K={},L={},M={},N=a.events={on:function(a,b){return(u[a]=u[a]||[]).push(b),b},off:function(a,b){if(u[a]){var c=u[a].indexOf(b);-1!==c&&u[a].splice(c,1)}},on_till:function(a,b){var c=function d(){var c=b.apply(void 0,arguments);c&&V.events.off(a,d)};V.events.on(a,c)}},O=a.proposal_open_contract={subscribe:function(a){if(L[a]&&L[a].subscribers>0)return L[a].subscribers++,L[a].promise;var b=V.send({proposal_open_contract:1,contract_id:a,subscribe:1}).then(function(b){return L[a].stream_id=b.proposal_open_contract.id,b})["catch"](function(b){throw L[a]=void 0,b});return L[a]={subscribers:1,promise:b},b},forget:function W(a){var b=L[a],W=M[a];if(!b)return W||Promise.resolve();if(0==b.subscribers)return W;if(b.subscribers--,b.subscribers>0)return Promise.resolve();var c=function(){return L[a]=void 0,V.send({forget:b.stream_id})["catch"](function(b){throw M[a]=void 0,b}).then(function(b){return M[a]=void 0,b})};return M[a]=b.stream_id?c():b.promise["catch"](function(){}).then(function(){return b.stream_id?c():void 0}),M[a]}},P=a.execute=function(a){z()?setTimeout(a,0):v.push(a)},Q=a.switch_account=function(a){var b=local_storage.get("oauth");if(!b)return Promise.reject({message:"Account token not found.".i18n()});var c=b.map(function(a){return a.id}).indexOf(a);if(-1===c)return promise.reject({message:"Account id not found.".i18n()});var d=b[c];b.splice(c,1),b.unshift(d),local_storage.set("oauth",b);for(var e in y)(C(y[e].data)||"authorize"in y[e].data)&&delete y[e];return g=!1,V.send({forget_all:"transaction"})["catch"](function(a){return void 0}),V.send({forget_all:"balance"})["catch"](function(a){return void 0}),V.cached.authorize().then(function(a){return I("switch_account",a)})},R=a.cached={send:function(a){var b=JSON.stringify(a);return y[b]?y[b].promise:(y[b]={data:a,promise:null},y[b].promise=V.send(a).then(function(a){return a},function(a){throw delete y[b],a}))},authorize:function(a){var b=local_storage.get("oauth"),c=b&&b[0]&&b[0].token,d=JSON.stringify({authorize:c});return g&&c&&y[d]&&!a?y[d].promise:c?F(c):Promise.reject("Please log in.".i18n())}},S=a.send=function(a,b){if(a&&C(a))return H(a);var c=E(a);return b&&J(a.req_id,b),c},T=a.is_authenticated=function(){return g},U=a.sell_expired=function(a){var b=(new Date).getTime()/1e3|0;a=a||b+1,!K[a]&&1*a>b&&(K[a]=setTimeout(function(){K[a]=void 0,V.send({sell_expired:1})["catch"](function(a){return void 0})},1e3*(a+2-b)))},V={events:N,proposal_open_contract:O,execute:P,switch_account:Q,cached:R,send:S,is_authenticated:T,sell_expired:U,invalidate:G,app_id:p,socket_url:o,server_url:q};V.events.on("website_status",function(a){if(i=a.website_status&&"up"===a.website_status.site_status.toLowerCase())for(var b in j)j[b].is_sent||(h.send(JSON.stringify(j[b].data)),j[b].is_sent=1)}),V.events.on("login",function(){V.send({transaction:1,subscribe:1})["catch"](function(a){return void 0}),V.send({balance:1,subscribe:1})["catch"](function(a){return void 0})}),V.events.on("logout",function(){V.send({forget_all:"transaction"})["catch"](function(a){return void 0}),V.send({forget_all:"balance"})["catch"](function(a){return void 0})}),a["default"]=V});