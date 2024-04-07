(()=>{var e={353:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,n="millisecond",s="second",i="minute",r="hour",a="day",l="week",o="month",c="quarter",u="year",d="date",f="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},_=function(e,t,n){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(n)+e},m={s:_,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),s=Math.floor(n/60),i=n%60;return(t<=0?"+":"-")+_(s,2,"0")+":"+_(i,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var s=12*(n.year()-t.year())+(n.month()-t.month()),i=t.clone().add(s,o),r=n-i<0,a=t.clone().add(s+(r?-1:1),o);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:o,y:u,w:l,d:a,D:d,h:r,m:i,s,ms:n,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=h;var $="$isDayjsObject",g=function(e){return e instanceof S||!(!e||!e[$])},M=function e(t,n,s){var i;if(!t)return y;if("string"==typeof t){var r=t.toLowerCase();b[r]&&(i=r),n&&(b[r]=n,i=r);var a=t.split("-");if(!i&&a.length>1)return e(a[0])}else{var l=t.name;b[l]=t,i=l}return!s&&i&&(y=i),i||!s&&y},w=function(e,t){if(g(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new S(n)},D=m;D.l=M,D.i=g,D.w=function(e,t){return w(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var S=function(){function h(e){this.$L=M(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[$]=!0}var _=h.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(D.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var s=t.match(v);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(t)}(e),this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return D},_.isValid=function(){return!(this.$d.toString()===f)},_.isSame=function(e,t){var n=w(e);return this.startOf(t)<=n&&n<=this.endOf(t)},_.isAfter=function(e,t){return w(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<w(e)},_.$g=function(e,t,n){return D.u(e)?this[t]:this.set(n,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var n=this,c=!!D.u(t)||t,f=D.p(e),v=function(e,t){var s=D.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return c?s:s.endOf(a)},p=function(e,t){return D.w(n.toDate()[e].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},h=this.$W,_=this.$M,m=this.$D,y="set"+(this.$u?"UTC":"");switch(f){case u:return c?v(1,0):v(31,11);case o:return c?v(1,_):v(0,_+1);case l:var b=this.$locale().weekStart||0,$=(h<b?h+7:h)-b;return v(c?m-$:m+(6-$),_);case a:case d:return p(y+"Hours",0);case r:return p(y+"Minutes",1);case i:return p(y+"Seconds",2);case s:return p(y+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var l,c=D.p(e),f="set"+(this.$u?"UTC":""),v=(l={},l[a]=f+"Date",l[d]=f+"Date",l[o]=f+"Month",l[u]=f+"FullYear",l[r]=f+"Hours",l[i]=f+"Minutes",l[s]=f+"Seconds",l[n]=f+"Milliseconds",l)[c],p=c===a?this.$D+(t-this.$W):t;if(c===o||c===u){var h=this.clone().set(d,1);h.$d[v](p),h.init(),this.$d=h.set(d,Math.min(this.$D,h.daysInMonth())).$d}else v&&this.$d[v](p);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[D.p(e)]()},_.add=function(n,c){var d,f=this;n=Number(n);var v=D.p(c),p=function(e){var t=w(f);return D.w(t.date(t.date()+Math.round(e*n)),f)};if(v===o)return this.set(o,this.$M+n);if(v===u)return this.set(u,this.$y+n);if(v===a)return p(1);if(v===l)return p(7);var h=(d={},d[i]=e,d[r]=t,d[s]=1e3,d)[v]||1,_=this.$d.getTime()+n*h;return D.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var s=e||"YYYY-MM-DDTHH:mm:ssZ",i=D.z(this),r=this.$H,a=this.$m,l=this.$M,o=n.weekdays,c=n.months,u=n.meridiem,d=function(e,n,i,r){return e&&(e[n]||e(t,s))||i[n].slice(0,r)},v=function(e){return D.s(r%12||12,e,"0")},h=u||function(e,t,n){var s=e<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(p,(function(e,s){return s||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return D.s(t.$y,4,"0");case"M":return l+1;case"MM":return D.s(l+1,2,"0");case"MMM":return d(n.monthsShort,l,c,3);case"MMMM":return d(c,l);case"D":return t.$D;case"DD":return D.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return d(n.weekdaysMin,t.$W,o,2);case"ddd":return d(n.weekdaysShort,t.$W,o,3);case"dddd":return o[t.$W];case"H":return String(r);case"HH":return D.s(r,2,"0");case"h":return v(1);case"hh":return v(2);case"a":return h(r,a,!0);case"A":return h(r,a,!1);case"m":return String(a);case"mm":return D.s(a,2,"0");case"s":return String(t.$s);case"ss":return D.s(t.$s,2,"0");case"SSS":return D.s(t.$ms,3,"0");case"Z":return i}return null}(e)||i.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(n,d,f){var v,p=this,h=D.p(d),_=w(n),m=(_.utcOffset()-this.utcOffset())*e,y=this-_,b=function(){return D.m(p,_)};switch(h){case u:v=b()/12;break;case o:v=b();break;case c:v=b()/3;break;case l:v=(y-m)/6048e5;break;case a:v=(y-m)/864e5;break;case r:v=y/t;break;case i:v=y/e;break;case s:v=y/1e3;break;default:v=y}return f?v:D.a(v)},_.daysInMonth=function(){return this.endOf(o).$D},_.$locale=function(){return b[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),s=M(e,t,!0);return s&&(n.$L=s),n},_.clone=function(){return D.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},h}(),k=S.prototype;return w.prototype=k,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",a],["$M",o],["$y",u],["$D",d]].forEach((function(e){k[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),w.extend=function(e,t){return e.$i||(e(t,S,w),e.$i=!0),w},w.locale=M,w.isDayjs=g,w.unix=function(e){return w(1e3*e)},w.en=b[y],w.Ls=b,w.p={},w}()},522:function(e){e.exports=function(){"use strict";var e,t,n=1e3,s=6e4,i=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,l=31536e6,o=2628e6,c=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,u={years:l,months:o,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(e){return e instanceof y},f=function(e,t,n){return new y(e,n,t.$l)},v=function(e){return t.p(e)+"s"},p=function(e){return e<0},h=function(e){return p(e)?Math.ceil(e):Math.floor(e)},_=function(e){return Math.abs(e)},m=function(e,t){return e?p(e)?{negative:!0,format:""+_(e)+t}:{negative:!1,format:""+e+t}:{negative:!1,format:""}},y=function(){function p(e,t,n){var s=this;if(this.$d={},this.$l=n,void 0===e&&(this.$ms=0,this.parseFromMilliseconds()),t)return f(e*u[v(t)],this);if("number"==typeof e)return this.$ms=e,this.parseFromMilliseconds(),this;if("object"==typeof e)return Object.keys(e).forEach((function(t){s.$d[v(t)]=e[t]})),this.calMilliseconds(),this;if("string"==typeof e){var i=e.match(c);if(i){var r=i.slice(2).map((function(e){return null!=e?Number(e):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var _=p.prototype;return _.calMilliseconds=function(){var e=this;this.$ms=Object.keys(this.$d).reduce((function(t,n){return t+(e.$d[n]||0)*u[n]}),0)},_.parseFromMilliseconds=function(){var e=this.$ms;this.$d.years=h(e/l),e%=l,this.$d.months=h(e/o),e%=o,this.$d.days=h(e/r),e%=r,this.$d.hours=h(e/i),e%=i,this.$d.minutes=h(e/s),e%=s,this.$d.seconds=h(e/n),e%=n,this.$d.milliseconds=e},_.toISOString=function(){var e=m(this.$d.years,"Y"),t=m(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=m(n,"D"),i=m(this.$d.hours,"H"),r=m(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var l=m(a,"S"),o=e.negative||t.negative||s.negative||i.negative||r.negative||l.negative,c=i.format||r.format||l.format?"T":"",u=(o?"-":"")+"P"+e.format+t.format+s.format+c+i.format+r.format+l.format;return"P"===u||"-P"===u?"P0D":u},_.toJSON=function(){return this.toISOString()},_.format=function(e){var n=e||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:t.s(this.$d.years,2,"0"),YYYY:t.s(this.$d.years,4,"0"),M:this.$d.months,MM:t.s(this.$d.months,2,"0"),D:this.$d.days,DD:t.s(this.$d.days,2,"0"),H:this.$d.hours,HH:t.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:t.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:t.s(this.$d.seconds,2,"0"),SSS:t.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(e,t){return t||String(s[e])}))},_.as=function(e){return this.$ms/u[v(e)]},_.get=function(e){var t=this.$ms,n=v(e);return"milliseconds"===n?t%=1e3:t="weeks"===n?h(t/u[n]):this.$d[n],t||0},_.add=function(e,t,n){var s;return s=t?e*u[v(t)]:d(e)?e.$ms:f(e,this).$ms,f(this.$ms+s*(n?-1:1),this)},_.subtract=function(e,t){return this.add(e,t,!0)},_.locale=function(e){var t=this.clone();return t.$l=e,t},_.clone=function(){return f(this.$ms,this)},_.humanize=function(t){return e().add(this.$ms,"ms").locale(this.$l).fromNow(!t)},_.valueOf=function(){return this.asMilliseconds()},_.milliseconds=function(){return this.get("milliseconds")},_.asMilliseconds=function(){return this.as("milliseconds")},_.seconds=function(){return this.get("seconds")},_.asSeconds=function(){return this.as("seconds")},_.minutes=function(){return this.get("minutes")},_.asMinutes=function(){return this.as("minutes")},_.hours=function(){return this.get("hours")},_.asHours=function(){return this.as("hours")},_.days=function(){return this.get("days")},_.asDays=function(){return this.as("days")},_.weeks=function(){return this.get("weeks")},_.asWeeks=function(){return this.as("weeks")},_.months=function(){return this.get("months")},_.asMonths=function(){return this.as("months")},_.years=function(){return this.get("years")},_.asYears=function(){return this.as("years")},p}(),b=function(e,t,n){return e.add(t.years()*n,"y").add(t.months()*n,"M").add(t.days()*n,"d").add(t.hours()*n,"h").add(t.minutes()*n,"m").add(t.seconds()*n,"s").add(t.milliseconds()*n,"ms")};return function(n,s,i){e=i,t=i().$utils(),i.duration=function(e,t){var n=i.locale();return f(e,{$l:n},t)},i.isDuration=d;var r=s.prototype.add,a=s.prototype.subtract;s.prototype.add=function(e,t){return d(e)?b(this,e,1):r.bind(this)(e,t)},s.prototype.subtract=function(e,t){return d(e)?b(this,e,-1):a.bind(this)(e,t)}}}()}},t={};function n(s){var i=t[s];if(void 0!==i)return i.exports;var r=t[s]={exports:{}};return e[s].call(r.exports,r,r.exports,n),r.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var s in t)n.o(t,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";function e(e){const t=document.createElement("div");return t.innerHTML=e,t.firstElementChild}function t(e,t,n="beforeend"){t.insertAdjacentElement(n,e.getElement())}class s{getTemplate(){return' <form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class i{getTemplate(){return'<ul class="trip-events__list"> </ul>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}class r{constructor({event:e,offers:t,destinations:n}){this.event=e,this.offers=t,this.destinations=n}getTemplate(){return this.event,this.offers,this.destinations,'<li class="trip-events__item">\n      <form class="event event--edit" action="#" method="post">\n        <header class="event__header">\n          <div class="event__type-wrapper">\n            <label class="event__type  event__type-btn" for="event-type-toggle-1">\n              <span class="visually-hidden">Choose event type</span>\n              <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">\n            </label>\n            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n\n            <div class="event__type-list">\n              <fieldset class="event__type-group">\n                <legend class="visually-hidden">Event type</legend>\n\n                <div class="event__type-item">\n                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">\n                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>\n                </div>\n\n                <div class="event__type-item">\n                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">\n                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>\n                </div>\n\n                <div class="event__type-item">\n                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">\n                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>\n                </div>\n\n                <div class="event__type-item">\n                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">\n                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>\n                </div>\n\n                <div class="event__type-item">\n                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">\n                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>\n                </div>\n\n                <div class="event__type-item">\n                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>\n                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>\n                </div>\n\n                <div class="event__type-item">\n                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">\n                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>\n                </div>\n\n                <div class="event__type-item">\n                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">\n                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>\n                </div>\n\n                <div class="event__type-item">\n                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">\n                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>\n                </div>\n              </fieldset>\n            </div>\n          </div>\n\n          <div class="event__field-group  event__field-group--destination">\n            <label class="event__label  event__type-output" for="event-destination-1">\n              Flight\n            </label>\n            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">\n            <datalist id="destination-list-1">\n              <option value="Amsterdam"></option>\n              <option value="Geneva"></option>\n              <option value="Chamonix"></option>\n            </datalist>\n          </div>\n\n          <div class="event__field-group  event__field-group--time">\n            <label class="visually-hidden" for="event-start-time-1">From</label>\n            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">\n            &mdash;\n            <label class="visually-hidden" for="event-end-time-1">To</label>\n            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">\n          </div>\n\n          <div class="event__field-group  event__field-group--price">\n            <label class="event__label" for="event-price-1">\n              <span class="visually-hidden">Price</span>\n              &euro;\n            </label>\n            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">\n          </div>\n\n          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n          <button class="event__reset-btn" type="reset">Cancel</button>\n        </header>\n        <section class="event__details">\n          <section class="event__section  event__section--offers">\n            <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n\n            <div class="event__available-offers">\n              <div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>\n                <label class="event__offer-label" for="event-offer-luggage-1">\n                  <span class="event__offer-title"></span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">30</span>\n                </label>\n              </div>\n\n              <div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>\n                <label class="event__offer-label" for="event-offer-comfort-1">\n                  <span class="event__offer-title"></span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">100</span>\n                </label>\n              </div>\n\n              <div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">\n                <label class="event__offer-label" for="event-offer-meal-1">\n                  <span class="event__offer-title"></span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">15</span>\n                </label>\n              </div>\n\n              <div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">\n                <label class="event__offer-label" for="event-offer-seats-1">\n                  <span class="event__offer-title"></span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">5</span>\n                </label>\n              </div>\n\n              <div class="event__offer-selector">\n                <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">\n                <label class="event__offer-label" for="event-offer-train-1">\n                  <span class="event__offer-title"></span>\n                  &plus;&euro;&nbsp;\n                  <span class="event__offer-price">40</span>\n                </label>\n              </div>\n            </div>\n          </section>\n\n          <section class="event__section  event__section--destination">\n            <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n            <p class="event__destination-description"></p>\n\n            <div class="event__photos-container">\n              <div class="event__photos-tape">\n                <img class="event__photo" src="" alt="Event photo">\n                <img class="event__photo" src="" alt="Event photo">\n                <img class="event__photo" src="" alt="Event photo">\n                <img class="event__photo" src="" alt="Event photo">\n                <img class="event__photo" src="" alt="Event photo">\n              </div>\n            </div>\n          </section>\n        </section>\n    </form>\n  </li>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}var a=n(353),l=n.n(a),o=n(522),c=n.n(o);l().extend(c());const u=e=>parseInt(e,10);class d{constructor({event:e,offers:t,destinations:n}){this.event=e,this.offers=t,this.destinations=n}getTemplate(){return function(e,t,n){const{isFavorite:s,basePrice:i,dateFrom:r,dateTo:a,type:o}=e,c=t.find((t=>t.type===e.type)).offers.filter((t=>e.offers.includes(t.id))),d=n.find((t=>t.destinations===e.destinations)),f=l()(r).format("HH:mm"),v=l()(a).format("HH:mm"),p=(h=r,_=a,l().duration(l()(_).diff(l()(h))));var h,_;const m=p.format("D"),y=p.format("HH"),b=p.format("mm"),$=u(m)?`${m}D`:"",g=u(m)||u(y)?`${y}H`:"",M=`${b}M`;return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime= ${r}>${l()(r).format("MMMM D")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${o}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${o} ${d.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime=${r}>${f}</time>\n            &mdash;\n            <time class="event__end-time" datetime=${a}>${v}</time>\n          </p>\n          <p class="event__duration"> ${$} ${g} ${M}\n          </p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${i}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n        <ul class="event__selected-offers">\n        ${c.map((e=>`<li class="event__offer">\n          <span class="event__offer-title">${e.title}</span>\n            &plus;&euro;&nbsp;\n          <span class="event__offer-price">${e.price}</span>\n        </li>`)).join("")}\n\n        </ul>\n        <button class="event__favorite-btn ${s?"event__favorite-btn--active":""}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n  </li>`}(this.event,this.offers,this.destinations)}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}}const f=[{id:"f4b62099-293f-4c3d-a702-94eec4a2808c",basePrice:1100,dateFrom:"2019-07-10T22:55:56.845Z",dateTo:"2019-07-11T11:22:13.375Z",destination:"bfa5cb75-a1fe-4b77-a83c-0e528e910e04",isFavorite:!1,offers:["b4c3e4e6-9053-42ce-b747-e281314baa31","b4c3e4e6-9053-42ce-b748-e281314baa31"],type:"taxi"},{id:"f4b62099-293-4c3d-a702-94eec4a2809c",basePrice:500,dateFrom:"2019-07-13T22:55:56.845Z",dateTo:"2019-07-15T11:22:13.375Z",destination:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",isFavorite:!0,offers:[],type:"ship"}],v=[{id:"bfa5cb75-a1fe-4b77-a83c-0e528e910e04",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Chamonix",pictures:[{src:"http://picsum.photos/300/200?r=0.0762563005163317",description:"Chamonix parliament building"}]},{id:"cfe416cq-10xa-ye10-8077-2fs9a01edcab",description:"Chamonix, is a beautiful city, a true asian pearl, with crowded streets.",name:"Moscow",pictures:[{}]}],p=[{type:"taxi",offers:[{id:"b4c3e4e6-9053-42ce-b747-e281314baa31",title:"Upgrade to a business class",price:120},{id:"b4c3e4e6-9053-42ce-b748-e281314baa31",title:"Upgrade to a vip class",price:150},{id:"b4c3e4e6-9053-42ce-b749-e281314baa31",title:"Upgrade to a economy class",price:180}]},{type:"ship",offers:[{id:"b4c3e4e6-9053-42ce-b750-e281314baa31",title:"Upgrade to a business class",price:1e3}]}],h=document.querySelector(".trip-main"),_=document.querySelector(".trip-controls__filters"),m=document.querySelector(".trip-events"),y=new class{events=f;destinations=v;offers=p;getTasks(){return this.events}getDestinations(){return this.destinations}getOffers(){return this.offers}},b=new class{sortComponent=new s;eventListComponent=new i;constructor({boardContainer:e,eventsModel:t}){this.boardContainer=e,this.eventsModel=t}init(){this.boardEvents=[...this.eventsModel.getTasks()],this.destinations=this.eventsModel.getDestinations(),this.offers=[...this.eventsModel.getOffers()],t(this.sortComponent,this.boardContainer),t(this.eventListComponent,this.boardContainer),t(new r({event:this.boardEvents[0]}),this.eventListComponent.getElement());for(let e=1;e<this.boardEvents.length;e++)t(new d({event:this.boardEvents[e],destinations:this.destinations,offers:this.offers}),this.eventListComponent.getElement())}}({boardContainer:m,eventsModel:y});t(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n    <div class="trip-filters__filter">\n      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked disabled>\n      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" disabled>\n      <label class="trip-filters__filter-label" for="filter-future">Future</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present" disabled>\n      <label class="trip-filters__filter-label" for="filter-present">Present</label>\n    </div>\n\n    <div class="trip-filters__filter">\n      <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" disabled>\n      <label class="trip-filters__filter-label" for="filter-past">Past</label>\n    </div>\n\n    <button class="visually-hidden" type="submit">Accept filter</button>\n  </form>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},_),t(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n        <div class="trip-info__main">\n          <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n          <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n        </div>\n        <p class="trip-info__cost">\n          Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n        </p>\n      </section>'}getElement(){return this.element||(this.element=e(this.getTemplate())),this.element}removeElement(){this.element=null}},h,"afterbegin"),b.init()})()})();
//# sourceMappingURL=bundle.js.map