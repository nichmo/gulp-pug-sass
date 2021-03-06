
/*------SP版 IOSタップバグ対策------*/
$(function(){
	var ua =navigator.userAgent;
	if(ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1 || ua.indexOf('iPod')  > -1){
		$("body").attr("ontouchend","");
	}
});

// function(){

// }


/*------SP版 横に倒した際にリロード------*/
$(window).on('orientationchange resize', function() {
	if (Math.abs(window.orientation) === 90) {
		$(window).load();
	} else {
		$(window).load();
	}
});

/*------スムーススクロール------*/
(function(e){
	var c="1.4.10",f={
		exclude:[],
		excludeWithin:[],
		offset:0,direction:"top",
		scrollElement:null,
		scrollTarget:null,
		beforeScroll:function(){},
		afterScroll:function(){},
		easing:"swing",
		speed:400,
		autoCoefficent:2
	},
	a=function(i){
		var j=[],
		h=false,
		g=i.dir&&i.dir=="left"?"scrollLeft":"scrollTop";

		this.each(function(){if(this==document||this==window){return}var k=e(this);if(k[g]()>0){j.push(this)}else{k[g](1);h=k[g]()>0;if(h){j.push(this)}k[g](0)}});if(!j.length){this.each(function(k){if(this.nodeName==="BODY"){j=[this]}})}if(i.el==="first"&&j.length>1){j=[j[0]]}return j},b="ontouchend" in document;e.fn.extend({scrollable:function(g){var h=a.call(this,{dir:g});return this.pushStack(h)},firstScrollable:function(g){var h=a.call(this,{el:"first",dir:g});return this.pushStack(h)},smoothScroll:function(g){g=g||{};var h=e.extend({},e.fn.smoothScroll.defaults,g),i=e.smoothScroll.filterPath(location.pathname);this.unbind("click.smoothscroll").bind("click.smoothscroll",function(k){var s=this,r=e(this),m=h.exclude,p=h.excludeWithin,t=0,o=0,l=true,u={},n=((location.hostname===s.hostname)||!s.hostname),j=h.scrollTarget||(e.smoothScroll.filterPath(s.pathname)||i)===i,q=d(s.hash);if(!h.scrollTarget&&(!n||!j||!q)){l=false}else{while(l&&t<m.length){if(r.is(d(m[t++]))){l=false}}while(l&&o<p.length){if(r.closest(p[o++]).length){l=false}}}if(l){k.preventDefault();e.extend(u,h,{scrollTarget:h.scrollTarget||q,link:s});e.smoothScroll(u)}});return this}});e.smoothScroll=function(r,n){var g,h,q,j,p=0,k="offset",m="scrollTop",o={},l={},i=[];if(typeof r==="number"){g=e.fn.smoothScroll.defaults;q=r}else{g=e.extend({},e.fn.smoothScroll.defaults,r||{});if(g.scrollElement){k="position";if(g.scrollElement.css("position")=="static"){g.scrollElement.css("position","relative")}}}g=e.extend({link:null},g);m=g.direction=="left"?"scrollLeft":m;if(g.scrollElement){h=g.scrollElement;p=h[m]()}else{h=e("html, body").firstScrollable()}g.beforeScroll.call(h,g);q=(typeof r==="number")?r:n||(e(g.scrollTarget)[k]()&&e(g.scrollTarget)[k]()[g.direction])||0;o[m]=q+p+g.offset;j=g.speed;if(j==="auto"){j=o[m]||h.scrollTop();j=j/g.autoCoefficent}l={duration:j,easing:g.easing,complete:function(){g.afterScroll.call(g.link,g)}};if(g.step){l.step=g.step}if(h.length){h.stop().animate(o,l)}else{g.afterScroll.call(g.link,g)}};e.smoothScroll.version=c;e.smoothScroll.filterPath=function(g){return g.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")};e.fn.smoothScroll.defaults=f;function d(g){return g.replace(/(:|\.)/g,"\\$1")}})(jQuery);

/*------マッチハイト------*/
(function(l){var k=-1,i=-1,e=function(b){return parseFloat(b)||0},d=function(f){var c=null,g=[];l(f).each(function(){var m=l(this),n=m.offset().top-e(m.css("margin-top")),b=0<g.length?g[g.length-1]:null;null===b?g.push(m):1>=Math.floor(Math.abs(c-n))?g[g.length-1]=b.add(m):g.push(m);c=n});return g},j=function(f){var c={byRow:!0,property:"height",target:null,remove:!1};if("object"===typeof f){return l.extend(c,f)}"boolean"===typeof f?c.byRow=f:"remove"===f&&(c.remove=!0);return c},a=l.fn.matchHeight=function(b){b=j(b);if(b.remove){var c=this;this.css(b.property,"");l.each(a._groups,function(g,f){f.elements=f.elements.not(c)});return this}if(1>=this.length&&!b.target){return this}a._groups.push({elements:this,options:b});a._apply(this,b);return this};a._groups=[];a._throttle=80;a._maintainScroll=!1;a._beforeUpdate=null;a._afterUpdate=null;a._apply=function(g,q){var r=j(q),o=l(g),n=[o],c=l(window).scrollTop(),p=l("html").outerHeight(!0),b=o.parents().filter(":hidden");b.each(function(){var f=l(this);f.data("style-cache",f.attr("style"))});b.css("display","block");r.byRow&&!r.target&&(o.each(function(){var m=l(this),f="inline-block"===m.css("display")?"inline-block":"block";m.data("style-cache",m.attr("style"));m.css({display:f,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"})}),n=d(o),o.each(function(){var f=l(this);f.attr("style",f.data("style-cache")||"")}));l.each(n,function(s,m){var u=l(m),t=0;if(r.target){t=r.target.outerHeight(!1)}else{if(r.byRow&&1>=u.length){u.css(r.property,"");return}u.each(function(){var v=l(this),f={display:"inline-block"===v.css("display")?"inline-block":"block"};f[r.property]="";v.css(f);v.outerHeight(!1)>t&&(t=v.outerHeight(!1));v.css("display","")})}u.each(function(){var v=l(this),f=0;r.target&&v.is(r.target)||("border-box"!==v.css("box-sizing")&&(f+=e(v.css("border-top-width"))+e(v.css("border-bottom-width")),f+=e(v.css("padding-top"))+e(v.css("padding-bottom"))),v.css(r.property,t-f))})});b.each(function(){var f=l(this);f.attr("style",f.data("style-cache")||null)});a._maintainScroll&&l(window).scrollTop(c/p*l("html").outerHeight(!0));return this};a._applyDataApi=function(){var b={};l("[data-match-height], [data-mh]").each(function(){var c=l(this),f=c.attr("data-mh")||c.attr("data-match-height");b[f]=f in b?b[f].add(c):c});l.each(b,function(){this.matchHeight(!0)})};var h=function(b){a._beforeUpdate&&a._beforeUpdate(b,a._groups);l.each(a._groups,function(){a._apply(this.elements,this.options)});a._afterUpdate&&a._afterUpdate(b,a._groups)};a._update=function(b,c){if(c&&"resize"===c.type){var f=l(window).width();if(f===k){return}k=f}b?-1===i&&(i=setTimeout(function(){h(c);i=-1},a._throttle)):h(c)};l(a._applyDataApi);l(window).bind("load",function(b){a._update(!1,b)});l(window).bind("resize orientationchange",function(b){a._update(!0,b)})})(jQuery);