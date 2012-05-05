var showdown = 'var Showdown={};Showdown.converter=function(){var o;var p;var u;var v=0;this.makeHtml=function(a){o=new Array();p=new Array();u=new Array();a=a.replace(/~/g,"~T");a=a.replace(/\$/g,"~D");a=a.replace(/\r\n/g,"\n");a=a.replace(/\r/g,"\n");a="\n\n"+a+"\n\n";a=B(a);a=a.replace(/^[ \t]+$/mg,"");a=C(a);a=I(a);a=w(a);a=D(a);a=a.replace(/~D/g,"$$");a=a.replace(/~T/g,"~");return a};var I=function(b){var b=b.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,function(a,e,c,d,f){e=e.toLowerCase();o[e]=E(c);if(d){return d+f}else{if(f){p[e]=f.replace(/"/g,"&quot;")}}return""});return b};var C=function(a){a=a.replace(/\n/g,"\n\n");var e="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del";var c="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math";a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,s);a=a.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,s);a=a.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,s);a=a.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,s);a=a.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,s);a=a.replace(/\n\n/g,"\n");return a};var s=function(a,e){var c=e;c=c.replace(/\n\n/g,"\n");c=c.replace(/^\n/,"");c=c.replace(/\n+$/g,"");c="\n\n~K"+(u.push(c)-1)+"K\n\n";return c};var w=function(a){a=J(a);var e=q("<hr />");a=a.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,e);a=a.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,e);a=a.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,e);a=F(a);a=K(a);a=L(a);a=C(a);a=M(a);return a};var t=function(a){a=N(a);a=O(a);a=P(a);a=Q(a);a=R(a);a=S(a);a=E(a);a=T(a);a=a.replace(/  +\n/g," <br />\n");return a};var O=function(c){var d=/(<[a-z\/!$]("[^"]*"|\'[^\']*\'|[^\'">])*>|<!(--.*?--\s*)+>)/gi;c=c.replace(d,function(a){var e=a.replace(/(.)<\/?code>(?=.)/g,"$1`");e=r(e,"\\`*_");return e});return c};var R=function(a){a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,x);a=a.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*(([\'"])(.*?)\6[ \t]*)?\))/g,x);a=a.replace(/(\[([^\[\]]+)\])()()()()()/g,x);return a};var x=function(a,e,c,d,f,b,g,m){if(m==undefined){m=""}var h=e;var l=c;var j=d.toLowerCase();var k=f;var i=m;if(k==""){if(j==""){j=l.toLowerCase().replace(/ ?\n/g," ")}k="#"+j;if(o[j]!=undefined){k=o[j];if(p[j]!=undefined){i=p[j]}}else{if(h.search(/\(\s*\)$/m)>-1){k=""}else{return h}}}k=r(k,"*_");var n="<a href=\""+k+"\"";if(i!=""){i=i.replace(/"/g,"&quot;");i=r(i,"*_");n+=" title=\""+i+"\""}n+=">"+l+"</a>";return n};var Q=function(a){a=a.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,G);a=a.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*(([\'"])(.*?)\6[ \t]*)?\))/g,G);return a};var G=function(a,e,c,d,f,b,g,m){var h=e;var l=c;var j=d.toLowerCase();var k=f;var i=m;if(!i){i=""}if(k==""){if(j==""){j=l.toLowerCase().replace(/ ?\n/g," ")}k="#"+j;if(o[j]!=undefined){k=o[j];if(p[j]!=undefined){i=p[j]}}else{return h}}l=l.replace(/"/g,"&quot;");k=r(k,"*_");var n="<img src=\""+k+"\" alt=\""+l+"\"";i=i.replace(/"/g,"&quot;");i=r(i,"*_");n+=" title=\""+i+"\"";n+=" />";return n};var J=function(f){f=f.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(a,e){return q("<h1>"+t(e)+"</h1>")});f=f.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(a,e){return q("<h2>"+t(e)+"</h2>")});f=f.replace(/^(\#{1,8})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(a,e,c){var d=e.length;return q("<h"+d+">"+t(c)+"</h"+d+">")});return f};var y;var F=function(h){h+="~0";var l=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;if(v){h=h.replace(l,function(a,e,c){var d=e;var f=(c.search(/[*+-]/g)>-1)?"ul":"ol";d=d.replace(/\n{2,}/g,"\n\n\n");var b=y(d);b=b.replace(/\s+$/,"");b="<"+f+">"+b+"</"+f+">\n";return b})}else{l=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;h=h.replace(l,function(a,e,c,d){var f=e;var b=c;var g=(d.search(/[*+-]/g)>-1)?"ul":"ol";var b=b.replace(/\n{2,}/g,"\n\n\n");var m=y(b);m=f+"<"+g+">\n"+m+"</"+g+">\n";return m})}h=h.replace(/~0/,"");return h};y=function(h){v++;h=h.replace(/\n{2,}$/,"\n");h+="~0";h=h.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(a,e,c,d,f){var b=f;var g=e;var m=c;if(g||(b.search(/\n{2,}/)>-1)){b=w(z(b))}else{b=F(z(b));b=b.replace(/\n$/,"");b=t(b)}return"<li>"+b+"</li>\n"});h=h.replace(/~0/g,"");v--;return h};var K=function(b){b+="~0";b=b.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(a,e,c){var d=e;var f=c;d=H(z(d));d=B(d);d=d.replace(/^\n+/g,"");d=d.replace(/\n+$/g,"");d="<pre><code>"+d+"\n</code></pre>";return q(d)+f});b=b.replace(/~0/,"");return b};var q=function(a){a=a.replace(/(^\n+|\n+$)/g,"");return"\n\n~K"+(u.push(a)-1)+"K\n\n"};var N=function(g){g=g.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(a,e,c,d,f){var b=d;b=b.replace(/^([ \t]*)/g,"");b=b.replace(/[ \t]*$/g,"");b=H(b);return e+"<code>"+b+"</code>"});return g};var H=function(a){a=a.replace(/&/g,"&amp;");a=a.replace(/</g,"&lt;");a=a.replace(/>/g,"&gt;");a=r(a,"*_{}[]\\",false);return a};var T=function(a){a=a.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>");a=a.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>");return a};var L=function(g){g=g.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(d,f){var b=f;b=b.replace(/^[ \t]*>[ \t]?/gm,"~0");b=b.replace(/~0/g,"");b=b.replace(/^[ \t]+$/gm,"");b=w(b);b=b.replace(/(^|\n)/g,"$1  ");b=b.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(a,e){var c=e;c=c.replace(/^  /mg,"~0");c=c.replace(/~0/g,"");return c});return q("<blockquote>\n"+b+"\n</blockquote>")});return g};var M=function(a){a=a.replace(/^\n+/g,"");a=a.replace(/\n+$/g,"");var e=a.split(/\n{2,}/g);var c=new Array();var d=e.length;for(var f=0;f<d;f++){var b=e[f];if(b.search(/~K(\d+)K/g)>=0){c.push(b)}else{if(b.search(/\S/)>=0){b=t(b);b=b.replace(/^([ \t]*)/g,"<p>");b+="</p>";c.push(b)}}}d=c.length;for(var f=0;f<d;f++){while(c[f].search(/~K(\d+)K/)>=0){var g=u[RegExp.$1];g=g.replace(/\$/g,"$$$$");c[f]=c[f].replace(/~K\d+K/,g)}}return c.join("\n\n")};var E=function(a){a=a.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");a=a.replace(/<(?![a-z\/?\$!])/gi,"&lt;");return a};var P=function(a){a=a.replace(/\\(\\)/g,A);a=a.replace(/\\([`*_{}\[\]()>#+-.!])/g,A);return a};var S=function(c){c=c.replace(/<((https?|ftp|dict):[^\'">\s]+)>/gi,"<a href=\"$1\">$1</a>");c=c.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(a,e){return U(D(e))});return c};var U=function(d){function f(a){var e="0123456789ABCDEF";var c=a.charCodeAt(0);return(e.charAt(c>>4)+e.charAt(c&15))}var b=[function(a){return"&#"+a.charCodeAt(0)+";"},function(a){return"&#x"+f(a)+";"},function(a){return a}];d="mailto:"+d;d=d.replace(/./g,function(a){if(a=="@"){a=b[Math.floor(Math.random()*2)](a)}else{if(a!=":"){var e=Math.random();a=(e>0.9?b[2](a):e>0.45?b[1](a):b[0](a))}}return a});d="<a href=\""+d+"\">"+d+"</a>";d=d.replace(/">.+:/g,"\">");return d};var D=function(d){d=d.replace(/~E(\d+)E/g,function(a,e){var c=parseInt(e);return String.fromCharCode(c)});return d};var z=function(a){a=a.replace(/^(\t|[ ]{1,4})/gm,"~0");a=a.replace(/~0/g,"");return a};var B=function(g){g=g.replace(/\t(?=\t)/g,"    ");g=g.replace(/\t/g,"~A~B");g=g.replace(/~B(.+?)~A/g,function(a,e,c){var d=e;var f=4-d.length%4;for(var b=0;b<f;b++){d+=" "}return d});g=g.replace(/~A/g,"    ");g=g.replace(/~B/g,"");return g};var r=function(a,e,c){var d="(["+e.replace(/([\[\]\\])/g,"\\$1")+"])";if(c){d="\\\\"+d}var f=new RegExp(d,"g");a=a.replace(f,A);return a};var A=function(a,e){var c=e.charCodeAt(0);return"~E"+c+"E"}};if(typeof exports!=\'undefined\')exports.Showdown=Showdown;';
