(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var o=n(1),c=n.n(o),r=n(7),i=n.n(r),s=(n(14),n(4)),a=(n(15),n(2)),l=1,u=2,d=3,j=4,f=function e(t,n){Object(a.a)(this,e),this.coord=t,this.type=n},b=n(0),h=function(e){var t,n=e.token,o=e.type,c=e.onTokenSelected;t=n&&n.isSelected?"token-selected":n&&!n.isSelected?"token":o===u?"tile-exit":o===d?"tile-wall":o===j?"tile-unknown":"tile";return Object(b.jsx)("div",{className:t,onClick:function(){n&&c(n)}})},p=n(8),O="wss://"+window.location.host,v=new WebSocket(O);v.onopen=function(){console.log("Opened!")};var y=[],m=[];v.onerror=function(e){console.log("Sorry, but there's some problem with your connection or the server is down.")},v.onmessage=function(e){try{var t=JSON.parse(e.data)}catch(c){return void console.log("Invalid JSON: ",e.data)}var n,o=Object(p.a)(y);try{for(o.s();!(n=o.n()).done;){n.value.handle(t)}}catch(r){o.e(r)}finally{o.f()}},setInterval((function(){1!==v.readyState&&console.log("Error missing connection")}),3e3);var x=function(e){v.send(JSON.stringify({type:e}))},S=function(e){m.includes(e)&&x(e)},w=function(e){v.send(e)},k=function(){S("RIGHT")},g=function(){S("LEFT")},N=function(){S("DOWN")},E=function(){S("UP")},I=function(e){m=e},J=function(){x("RESET")},M=function(e){(y=y.filter((function(t){return t.id!==e.id}))).push(e)},T=n(3),C=n.n(T),P=function(e){var t=e.grid,n=e.tokens,o=function(e){w(JSON.stringify({type:"SELECTED",selected:e.id}))};return Object(b.jsx)("div",{className:"game-board",onKeyPress:function(e){"s"===e.key?N():"w"===e.key?E():"a"===e.key?g():"d"===e.key&&k()},tabIndex:0,children:Object(b.jsx)("table",{children:Object(b.jsx)("tbody",{children:t.map((function(e,t){return Object(b.jsx)("tr",{children:e.map((function(e,t){return Object(b.jsx)("td",{children:Object(b.jsx)(h,{type:e.type,token:(c=e.coord,n.filter((function(e){return C()(e.coord,c)}))[0]),onTokenSelected:o},e.coord.toString())});var c}))},t)}))})})})},R=n(9),D=function(){function e(t,n){Object(a.a)(this,e),this.x=t,this.y=n}return Object(R.a)(e,[{key:"toString",value:function(){return"(".concat(this.x,", ").concat(this.y,")")}}]),e}(),L=function e(t,n,o){Object(a.a)(this,e),this.id=t,this.coord=n,this.isSelected=o},W=function(e){var t=e.moves,n=e.isSelf,o="Moves:";return Object(b.jsxs)("div",{children:[n?Object(b.jsx)("h2",{children:o}):Object(b.jsx)("h3",{children:o}),Object(b.jsx)("ul",{children:t.map((function(e){return Object(b.jsx)("li",{children:e},e)}))})]})},A=function(e){var t=e.playerName,n=e.allowedMoves,o=e.isSelf,c=o?"ME:":t;return Object(b.jsxs)("div",{className:o?"player-self":"player-other",children:[o?"":Object(b.jsx)("label",{children:c}),Object(b.jsx)(W,{moves:n,isSelf:o})]})},B=function(e){var t=parseInt(e.x),n=parseInt(e.y);return new D(t,n)},F=function(e){return e.tokens.map((function(t,n){return new L(n,B(t),e.selected===n)}))};var G=function(){var e=Object(o.useState)([[]]),t=Object(s.a)(e,2),n=t[0],c=t[1],r=Object(o.useState)([]),i=Object(s.a)(r,2),a=i[0],h=i[1],p=Object(o.useState)([]),O=Object(s.a)(p,2),v=O[0],y=O[1],m=Object(o.useState)(""),x=Object(s.a)(m,2),S=x[0],w=x[1],k=Object(o.useState)([]),g=Object(s.a)(k,2),N=g[0],E=g[1],T={id:"app-updates",handle:function(e){"token-update"===e.type?(console.log(e),h(F(e.data))):"board-update"===e.type?(c(function(e){for(var t=[],n=e.board,o=B(n.exit),c=n.walls.map((function(e){return B(e)})),r=n.tiles.map((function(e){return B(e)})),i=0;i<n.height;i++){for(var s=[],a=function(e){var t=new D(e,i),n=void 0;n=C()(o,t)?u:c.some((function(e){return C()(e,t)}))?d:r.some((function(e){return C()(e,t)}))?l:j,s.push(new f(t,n))},b=0;b<n.width;b++)a(b);t.push(s)}return t}(e.data)),h(F(e.data))):"win"===e.type?alert("You have won the game!"):"movements"===e.type?(I(e.data.movements),y(e.data.movements)):"name"===e.type?w(e.data.name):"all-players"===e.type&&E(e.data.filter((function(e){return e.playerName!==S})))}};return console.log(N),M(T),Object(b.jsx)("div",{className:"App",children:Object(b.jsxs)("div",{className:"board-space",children:[Object(b.jsxs)("div",{className:"board-controls",children:[Object(b.jsx)(A,{playerName:S,allowedMoves:v,isSelf:!0}),Object(b.jsx)("br",{}),Object(b.jsx)("h2",{hidden:!N.length,children:"Other Players:"}),N.map((function(e){return Object(b.jsx)(A,{playerName:e.playerName,allowedMoves:e.moves,isSelf:!1},e.playerName)})),Object(b.jsx)("button",{onClick:function(e){J()},children:"Reset"})]}),Object(b.jsx)(P,{grid:n,tokens:a})]})})};i.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(G,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.8fb6e1bf.chunk.js.map