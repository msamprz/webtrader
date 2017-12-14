define(["exports","babel-runtime/regenerator","jquery","../websockets/binary_websockets","lodash","shownotice/shownotice","../tc/tc","../financialassessment/financialassessment","../taxInformation/taxInformation","../cashier/currency","../common/util"],function(a,b,c,d,e,f,g,h,i,j){"use strict";function k(a){return a&&a.__esModule?a:{"default":a}}function l(a){return function(){var b=a.apply(this,arguments);return new Promise(function(a,c){function d(e,f){try{var g=b[e](f),h=g.value}catch(i){return void c(i)}return g.done?void a(h):Promise.resolve(h).then(function(a){d("next",a)},function(a){d("throw",a)})}return d("next")})}}function m(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(a,"__esModule",{value:!0}),a.init=void 0;var n=k(b),o=k(c),p=k(d),q=k(e),r=k(f),s=k(g),t=k(h),u=k(i),v=k(j),w=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),x=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),y=function(a){o["default"](".webtrader-dialog").parent().each(function(){var b=1*o["default"](this).css("top").replace("px","");a>=b&&o["default"](this).animate({top:a+"px"},300)})},z=!1,A=function(){function a(){var b=this;m(this,a);var c=this,d=function(){var a=l(n["default"].mark(function d(a){var e,f,g,h,i,j,k,l;return n["default"].wrap(function(b){for(;;)switch(b.prev=b.next){case 0:if(e=o["default"]("#msg-notification"),1!==+a.authorize.is_virtual){b.next=6;break}return e.is(":visible")&&e.slideUp(500),z=!1,y(115),b.abrupt("return");case 6:return b.next=8,c.getStatus(a.authorize);case 8:f=b.sent,g=w(f,5),h=g[0],i=g[1],j=g[2],k=g[3],l=g[4],c.tc_accepted=!1,c.financial_assessment_submitted=!0,c.is_mlt=/^malta$/gi.test(a.authorize.landing_company_name),c.is_mf=/^maltainvest$/gi.test(a.authorize.landing_company_name),c.is_cr=/^costarica$/gi.test(a.authorize.landing_company_name),c.has_mt5_account=l.mt5_login_list.length>0,c.is_authenticated=!h.get_account_status.prompt_client_to_authenticate,i&&i.website_status&&j&&j.get_settings&&(c.tc_accepted=i.website_status.terms_conditions_version===j.get_settings.client_tnc_status),("high"===h.get_account_status.risk_classification||c.is_mf)&&(c.financial_assessment_submitted=-1==h.get_account_status.status.indexOf("financial_assessment_not_complete")),c.checkStatus(a.authorize,h.get_account_status.status);case 25:case"end":return b.stop()}},d,b)}));return function(){return a.apply(this,arguments)}}();p["default"].events.on("login",d),p["default"].events.on("reset_accountstatus",function(){var a=o["default"]("#msg-notification");a.is(":visible")&&a.slideUp(500),z=!1})}return x(a,[{key:"getStatus",value:function(){return Promise.all([p["default"].send({get_account_status:1}),p["default"].send({website_status:1}),p["default"].send({get_settings:1}),p["default"].cached.send({get_financial_assessment:1}),p["default"].send({mt5_login_list:1})])}},{key:"checkStatus",value:function(a,b){var c=o["default"]("#msg-notification"),d=this,e={tc:{message:"Please [_1]accept the updated Terms and Conditions[_2] to lift your withdrawal and trading limits.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return d.tc_accepted},callback:s["default"].init},risk:{message:"Please complete the [_1]financial assessment form[_2] to lift your withdrawal and trading limits.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return d.financial_assessment_submitted},callback:t["default"].init},tax:{message:"Please [_1]complete your account profile[_2] to lift your withdrawal and trading limits.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return!d.is_mf||/crs_tin_information/.test(b)},callback:u["default"].init},currency:{message:"Please set the [_1]currency[_2] of your account".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return local_storage.get("currency")},callback:v["default"].check_currency},authenticate:{message:"[_1]Authenticate your account[_2] now to take full advantage of all withdrawal options available.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return d.is_authenticated},callback:r["default"].init},unwelcome:{message:"Your account is restricted. Kindly [_1]contact customer support[_2] for assistance.".i18n().replace("[_1]","<a href='#'>").replace("[_2]","</a>"),is_valid:function(){return!/(unwelcome|(cashier|withdrawal)_locked)/.test(b)},callback:function(){var a=local_storage.get("i18n").value?local_storage.get("i18n").value:"en",b=window.open("http://www.binary.com/"+a+"/contact.html");b.focus()}}},f=q["default"].find(e,function(a){return!a.is_valid()});f?(c.html(f.message),c.find("a").on("click",f.callback),c.slideDown(500),y(140),z=!0):(c.is(":visible")&&c.slideUp(500),y(115),z=!1)}}]),a}(),B=a.init=new A;a["default"]={init:B,is_shown:function(){return z}}});