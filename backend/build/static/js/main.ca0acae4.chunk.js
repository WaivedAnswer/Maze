(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var o=n(1),c=n.n(o),i=n(7),r=n.n(i),a=(n(14),n(2)),s=(n(15),n(3)),u=1,l=2,d=3,j=4,f=function e(t,n){Object(s.a)(this,e),this.coord=t,this.type=n},b=n(0),h=function(e){var t,n=e.token,o=e.type,c=e.onTokenSelected;t=n&&n.isSelected?"token-selected":n&&!n.isSelected?"token":o===l?"tile-exit":o===d?"tile-wall":o===j?"tile-unknown":"tile";return Object(b.jsx)("div",{className:t,onClick:function(){n&&c(n)}})},O=n(8),m="wss://"+window.location.host,p=new WebSocket(m);p.onopen=function(){console.log("Opened!")};var v=[],y=[];p.onerror=function(e){console.log("Sorry, but there's some problem with your connection or the server is down.")},p.onmessage=function(e){try{var t=JSON.parse(e.data)}catch(c){return void console.log("Invalid JSON: ",e.data)}var n,o=Object(O.a)(v);try{for(o.s();!(n=o.n()).done;){n.value.handle(t)}}catch(i){o.e(i)}finally{o.f()}},setInterval((function(){1!==p.readyState&&console.log("Error missing connection")}),3e3);var x=function(e){p.send(e)},S=function(e){x(JSON.stringify({type:e}))},g=function(e){y.includes(e)&&S(e)},w=x,k=function(){g("RIGHT")},N=function(){g("LEFT")},E=function(){g("DOWN")},I=function(){g("UP")},T=function(e){y=e},J=function(){S("RESET")},M=function(e){x(JSON.stringify({type:"DO-SOMETHING",player:e}))},C=function(e){(v=v.filter((function(t){return t.id!==e.id}))).push(e)},D=n(4),G=n.n(D),P=function(e){var t=e.grid,n=e.tokens,o=function(e){w(JSON.stringify({type:"SELECTED",selected:e.id}))};return Object(b.jsx)("div",{className:"game-board",onKeyPress:function(e){"s"===e.key?E():"w"===e.key?I():"a"===e.key?N():"d"===e.key&&k()},tabIndex:0,children:Object(b.jsx)("table",{children:Object(b.jsx)("tbody",{children:t.map((function(e,t){return Object(b.jsx)("tr",{children:e.map((function(e,t){return Object(b.jsx)("td",{children:Object(b.jsx)(h,{type:e.type,token:(c=e.coord,n.filter((function(e){return G()(e.coord,c)}))[0]),onTokenSelected:o})},e.coord.toString());var c}))},t)}))})})})},R=n(9),H=function(){function e(t,n){Object(s.a)(this,e),this.x=t,this.y=n}return Object(R.a)(e,[{key:"toString",value:function(){return"(".concat(this.x,", ").concat(this.y,")")}}]),e}(),L=function e(t,n,o){Object(s.a)(this,e),this.id=t,this.coord=n,this.isSelected=o},W=function(e){var t=e.moves,n=e.isSelf,o="Moves:";return Object(b.jsxs)("div",{children:[n?Object(b.jsx)("h2",{children:o}):Object(b.jsx)("h3",{children:o}),Object(b.jsx)("ul",{children:t.map((function(e){return Object(b.jsx)("li",{children:e},e)}))})]})},Y=function(e){var t=e.playerName,n=e.allowedMoves,o=e.isSelf,c=e.doSomething;return Object(b.jsxs)("div",{className:o?"player-self":"player-other",children:[Object(b.jsxs)("div",{className:"player-bar",children:[Object(b.jsx)("label",{children:t}),o?"":Object(b.jsx)("button",{onClick:function(e){c(t)},children:"Do Something!"})]}),Object(b.jsx)(W,{moves:n,isSelf:o})]})},A=function(e){var t=e.notification;return null===t?null:Object(b.jsx)("div",{className:t.isGood?"notification":"notification-bad",children:t.message})},B=function(e){var t=e.remainingSeconds;if(!t)return"";var n=function(e){var t="00"+e;return t.substr(t.length-2)},o=n(Math.floor(t/60)),c=n(t%60),i=t>10?"timer":"timer-critical";return Object(b.jsx)("div",{className:i,children:"".concat(o,":").concat(c)})},F=function(e){var t=parseInt(e.x),n=parseInt(e.y);return new H(t,n)},K=function(e){return e.tokens.map((function(t,n){return new L(n,F(t),e.selected===n)}))};var U=function(){var e=Object(o.useState)([[]]),t=Object(a.a)(e,2),n=t[0],c=t[1],i=Object(o.useState)([]),r=Object(a.a)(i,2),s=r[0],h=r[1],O=Object(o.useState)([]),m=Object(a.a)(O,2),p=m[0],v=m[1],y=Object(o.useState)(""),x=Object(a.a)(y,2),S=x[0],g=x[1],w=Object(o.useState)([]),k=Object(a.a)(w,2),N=k[0],E=k[1],I=Object(o.useState)(null),D=Object(a.a)(I,2),R=D[0],L=D[1],W=Object(o.useState)(null),U=Object(a.a)(W,2),q=U[0],z=U[1],Q=function(e,t,n){L({message:e,isGood:n}),t&&setTimeout((function(){L(null)}),5e3)};C({id:"app-updates",handle:function(e){"token-update"===e.type?h(K(e.data)):"board-update"===e.type?(c(function(e){for(var t=[],n=e.board,o=n.exits.map((function(e){return F(e)})),c=n.walls.map((function(e){return F(e)})),i=n.tiles.map((function(e){return F(e)})),r=0;r<n.height;r++){for(var a=[],s=function(e){var t=new H(e,r),n=void 0;n=o.some((function(e){return G()(e,t)}))?l:c.some((function(e){return G()(e,t)}))?d:i.some((function(e){return G()(e,t)}))?u:j,a.push(new f(t,n))},b=0;b<n.width;b++)s(b);t.push(a)}return t}(e.data)),h(K(e.data))):"win"===e.type?Q("You have won the game!",!1,!0):"movements"===e.type?(T(e.data.movements),v(e.data.movements)):"name"===e.type?g(e.data.name):"all-players"===e.type?E(e.data.filter((function(e){return e.playerName!==S}))):"do-something"===e.type?Q("".concat(e.data.sender," wants you to do something."),!0,!0):"timer-update"===e.type?z(e.data.seconds):"lose"===e.type&&Q("You have lost the game..",!1,!1)}});var V=function(e){M(e)};return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(A,{notification:R}),Object(b.jsxs)("div",{className:"board-space",children:[Object(b.jsxs)("div",{className:"board-controls",children:[Object(b.jsx)(B,{remainingSeconds:q}),Object(b.jsx)("br",{}),Object(b.jsx)(Y,{playerName:S,allowedMoves:p,isSelf:!0}),Object(b.jsx)("br",{}),Object(b.jsx)("h2",{hidden:!N.length,children:"Other Players:"}),N.map((function(e){return Object(b.jsx)(Y,{playerName:e.playerName,allowedMoves:e.moves,isSelf:!1,doSomething:V},e.playerName)})),Object(b.jsx)("button",{onClick:function(e){J()},children:"Reset"})]}),Object(b.jsx)(P,{grid:n,tokens:s})]})]})};r.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(U,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.ca0acae4.chunk.js.map