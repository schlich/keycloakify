"use strict";(self.webpackChunkkeycloakfiy_landingpage=self.webpackChunkkeycloakfiy_landingpage||[]).push([[3047],{40595:function(e){function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,r){if(t.language===a){var i=t.tokenStack=[];t.code=t.code.replace(o,(function(e){if("function"===typeof r&&!r(e))return e;for(var o,c=i.length;-1!==t.code.indexOf(o=n(a,c));)++c;return i[c]=e,o})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var o=0,r=Object.keys(t.tokenStack);!function i(c){for(var u=0;u<c.length&&!(o>=r.length);u++){var l=c[u];if("string"===typeof l||l.content&&"string"===typeof l.content){var g=r[o],p=t.tokenStack[g],s="string"===typeof l?l:l.content,f=n(a,g),k=s.indexOf(f);if(k>-1){++o;var y=s.substring(0,k),d=new e.Token(a,e.tokenize(p,t.grammar),"language-"+a,p),h=s.substring(k+f.length),m=[];y&&m.push.apply(m,i([y])),m.push(d),h&&m.push.apply(m,i([h])),"string"===typeof l?c.splice.apply(c,[u,1].concat(m)):l.content=m}}else l.content&&i(l.content)}return c}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markupTemplating.0564ee82.chunk.js.map