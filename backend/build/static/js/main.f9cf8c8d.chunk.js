(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{35:function(e,t,n){},37:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(22),c=n.n(r),s=(n(35),n(6)),i=n(5),l=n.n(i),u=n(9),d=(n(37),n(8)),m=-1,h=1,p=2,f=3,j=4,b=5,v=function e(t,n,a,o){Object(d.a)(this,e),this.coord=t,this.type=n,this.hasItem=a,this.item=o},O=n.p+"static/media/coins_new.2254d122.png",y=n.p+"static/media/timer.c21cbb42.png",g=0,x=1,w=function e(t){Object(d.a)(this,e),this.type=t},S=n(3),N=function(e){var t,n=e.item;return n.type===g?t=O:n.type===x&&(t=y),Object(S.jsx)("div",{className:"token",children:Object(S.jsx)("img",{src:t,alt:"token"})})},C=n.p+"static/media/rock.3d4d808c.png",k=n.p+"static/media/portal.31e8e713.png",M=function(e){var t,n,a=e.tile,o=e.onTeleport,r=a.type;r===p?t="tile-exit":r===f?(t="tile-wall",n=C):r===m?t="tile-unknown":r===j?t="tile-connect":r===b?(t="tile-portal",n=k):t="tile";return Object(S.jsxs)("div",{className:t,children:[n?Object(S.jsx)("img",{src:n,className:"tile-image",onClick:function(){r===b&&o(a.coord)},alt:""}):null,a.hasItem?Object(S.jsx)(N,{item:a.item}):null]})},I=n.p+"static/media/dwarf_right.3de0ca4b.png",T=function(e){var t,n=e.token,a=e.onTokenSelected,o=e.style;if(!n||n.escaped)return"";n.selectedBy?t="token-selected":n.selectedBy||(t="token");return Object(S.jsx)("div",{className:t,style:o,onClick:function(){n&&a(n)},children:Object(S.jsx)("img",{src:I,alt:"token"})})},E=n.p+"static/media/escalator_down.03b0327b.png",R=n.p+"static/media/escalator_up.671e7897.png",L=n(10),B=0,J=1,P=function(){function e(t,n,a){Object(d.a)(this,e),this.id=t,this.startCoord=n,this.endCoord=a}return Object(L.a)(e,[{key:"getMinX",value:function(){return Math.min(this.startCoord.x,this.endCoord.x)}},{key:"getMinY",value:function(){return Math.min(this.startCoord.y,this.endCoord.y)}},{key:"getRowSpan",value:function(){return Math.abs(this.startCoord.y-this.endCoord.y)+1}},{key:"getColSpan",value:function(){return Math.abs(this.startCoord.x-this.endCoord.x)+1}},{key:"getOrientation",value:function(){var e=this.getMinX(),t=this.getMinY();return e===this.startCoord.x&&t===this.startCoord.y||e===this.endCoord.x&&t===this.endCoord.y?B:J}}]),e}(),D=function(e){var t,n=e.escalator,a=e.onEscalate,o=n.getMinY()+1,r=n.getMinX()+1;switch(n.getOrientation()){case B:t=E;break;case J:t=R;break;default:throw new Error("Invalid Orientation")}var c={gridRow:"".concat(o," / span ").concat(n.getRowSpan()),gridColumn:"".concat(r," / span ").concat(n.getColSpan())};return Object(S.jsx)("div",{className:"escalator",style:c,children:Object(S.jsx)("img",{className:"escalator-img",src:t,onClick:function(){a(n.id)},alt:"escalator"})})},G=function(e){var t=e.wall,n={gridRow:"".concat(t.getStartRow()," / span ").concat(t.getRowSpan()),gridColumn:"".concat(t.getStartCol()," / span ").concat(t.getColSpan()),zIndex:1};return t.isHorizontal()?(n.borderTop="10px solid #000000",n.height="0px"):(n.borderLeft="10px solid #000000",n.width="0px"),Object(S.jsx)("div",{className:"wall",style:n})},H=function(e){var t=e.grid,n=e.tokens,a=e.escalators,o=e.walls,r=e.gameService,c=function(e){r.send(JSON.stringify({type:"SELECTED",selected:e.id}))},s=function(e){r.teleport(e)},i=function(e){r.escalate(e)},l=t.length,u=0===t.length?0:t[0].length,d={margin:"48px",overflow:"auto",display:"grid",gridTemplateColumns:"repeat(".concat(u,", 64px)"),gridTemplateRows:"repeat(".concat(l,", 64px)"),gap:"0px"},m=function(e){return{gridColumnStart:"".concat(e.x+1),gridRowStart:"".concat(e.y+1)}};return Object(S.jsxs)("div",{className:"game-board",style:d,onKeyPress:function(e){"s"===e.key.toLowerCase()?r.moveDown():"w"===e.key.toLowerCase()?r.moveUp():"a"===e.key.toLowerCase()?r.moveLeft():"d"===e.key.toLowerCase()&&r.moveRight()},tabIndex:0,children:[t.map((function(e,t){return e.map((function(e,t){return Object(S.jsx)("div",{className:"tile-container",style:m(e.coord),children:Object(S.jsx)(M,{tile:e,onTeleport:s})},e.coord.toString())}))})),a.map((function(e){return Object(S.jsx)(D,{escalator:e,onEscalate:i})})),n.map((function(e){return Object(S.jsx)(T,{token:e,onTokenSelected:c,style:m(e.coord)})})),o.map((function(e){return Object(S.jsx)(G,{wall:e})}))]})},U=n(11),A=function(){},Y=function(){var e;(e=console).log.apply(e,arguments)},z=function(){var e;(e=console).error.apply(e,arguments)},W=function(){function e(t,n){var a=this;Object(d.a)(this,e),this.setMovements=function(e){a.allowedMovements=e},this.sendBasicCommand=function(e){a.send(JSON.stringify({type:e}))},this.reset=function(){a.sendBasicCommand("RESET")},this.moveRight=function(){a.sendMovement("RIGHT")},this.moveLeft=function(){a.sendMovement("LEFT")},this.moveDown=function(){a.sendMovement("DOWN")},this.moveUp=function(){a.sendMovement("UP")},this.doSomething=function(e){a.send(JSON.stringify({type:"DO-SOMETHING",player:e}))},this.teleport=function(e){a.send(JSON.stringify({type:"TELEPORT",coord:e}))},this.escalate=function(e){a.send(JSON.stringify({type:"ESCALATE",id:e}))},this.handlers=[],this.gameId=t,this.playerName=n,this.allowedMovements=[]}return Object(L.a)(e,[{key:"addHandler",value:function(e){this.handlers=this.handlers.filter((function(t){return t.id!==e.id})),this.handlers.push(e)}},{key:"connect",value:function(){var e=this;return new Promise((function(t,n){var a="wss://"+window.location.host+"?playerName=".concat(e.playerName);e.connection=new WebSocket(a),A("Connecting to:"+a),e.connection.onopen=function(){t()},e.connection.onerror=function(e){z(e),z("Sorry, but there's some problem with your connection or the server is down."),n(e)},e.connection.onmessage=function(t){try{var n=JSON.parse(t.data)}catch(r){return void z("Invalid JSON: ",t.data)}if(n.gameId&&n.gameId!==e.gameId)Y("Sent message for different game");else{var a,o=Object(U.a)(e.handlers);try{for(o.s();!(a=o.n()).done;){a.value.handle(n)}}catch(c){o.e(c)}finally{o.f()}}},setInterval((function(){1!==e.connection.readyState&&z("Error missing connection")}),3e3)}))}},{key:"getInitialUpdate",value:function(){this.sendBasicCommand("INITIAL")}},{key:"send",value:function(e){var t=JSON.parse(e);t.gameId=this.gameId;var n=JSON.stringify(t);A("SEND: "+n),this.connection.send(n)}},{key:"sendMovement",value:function(e){this.allowedMovements.includes(e)&&this.sendBasicCommand(e)}}]),e}(),_=function(){function e(t,n){Object(d.a)(this,e),this.x=t,this.y=n}return Object(L.a)(e,[{key:"toString",value:function(){return"(".concat(this.x,", ").concat(this.y,")")}}]),e}(),F=function(){function e(t,n){Object(d.a)(this,e),this.startCoord=t,this.endCoord=n}return Object(L.a)(e,[{key:"getStartRow",value:function(){return Math.min(this.startCoord.y,this.endCoord.y)+1}},{key:"getStartCol",value:function(){return Math.min(this.startCoord.x,this.endCoord.x)+1}},{key:"getRowSpan",value:function(){return Math.max(1,Math.abs(this.startCoord.y-this.endCoord.y))}},{key:"getColSpan",value:function(){return Math.max(1,Math.abs(this.startCoord.x-this.endCoord.x))}},{key:"isHorizontal",value:function(){return this.startCoord.y===this.endCoord.y}}]),e}(),X=function e(t,n,a,o){Object(d.a)(this,e),this.id=t,this.coord=n,this.selectedBy=a,this.escaped=o},K=n.p+"static/media/up.552f859e.png",q=n.p+"static/media/down.40f8ab30.png",Q=n.p+"static/media/left.aa0f5ff4.png",V=n.p+"static/media/right.9a984c67.png",Z=function(e){var t,n,a=e.move,o=e.isSelf;return"LEFT"===a?(t=Q,n="A"):"RIGHT"===a?(t=V,n="D"):"UP"===a?(t=K,n="W"):"DOWN"===a?(t=q,n="S"):console.log("Fail, move: "+a),Object(S.jsxs)("div",{className:"move-icon",children:[Object(S.jsx)("img",{src:t,alt:"move"}),o?Object(S.jsx)("span",{children:n}):""]})},$=function(e){var t=e.playerName,n=e.allowedMoves,a=e.doSomething;return Object(S.jsx)("div",{className:"player-other",children:Object(S.jsxs)("div",{className:"player-bar",children:[Object(S.jsx)("label",{children:t}),n.map((function(e){return Object(S.jsx)(Z,{move:e,isSelf:!1},e)})),Object(S.jsx)("button",{className:"doSomethingButton",onClick:function(e){a(t)},children:"!"})]})})},ee=function(e){var t=e.playerName,n=e.allowedMoves;return Object(S.jsxs)("div",{className:"player-self",children:[Object(S.jsx)("span",{id:"mainPlayer",children:t}),Object(S.jsx)("h2",{children:"Moves"}),Object(S.jsx)("div",{className:"player-moves",children:n.map((function(e){return Object(S.jsx)(Z,{move:e,isSelf:!0},e)}))})]})},te=function(e){var t=e.notification;return null===t?null:Object(S.jsx)("div",{className:t.isGood?"notification":"notification-bad",children:t.message})},ne=function(e){var t=e.remainingSeconds;if(!t)return"";var n=function(e){var t="00"+e;return t.substr(t.length-2)},a=n(Math.floor(t/60)),o=n(t%60),r=t>10?"timer":"timer-critical";return Object(S.jsx)("div",{className:r,children:"".concat(a,":").concat(o)})},ae=n(4),oe=function(e){var t=parseInt(e.x),n=parseInt(e.y);return new _(t,n)},re=function(e){var t,n=e.item;return n&&(t=new w(n.type)),new v(oe(e.pos),function(e){switch(e){case 0:return h;case 1:return f;case 2:return p;case 3:return j;case 4:return b;default:return m}}(e.type),e.hasItem,t)},ce=function(e){return e.map((function(e){return function(e){return e.map((function(e){return re(e)}))}(e)}))},se=function(e){return e.tokens.map((function(t,n){return new X(n,oe(t.pos),function(e,t){var n=e.find((function(e){return e.selection===t}));return n?n.selectedBy.split(" ").map((function(e){return e[0]})).join(""):null}(e.selections,n),t.escaped)}))};var ie=function(e){var t=e.realPlayerName,n=Object(a.useState)([[]]),o=Object(s.a)(n,2),r=o[0],c=o[1],i=Object(a.useState)([]),d=Object(s.a)(i,2),m=d[0],h=d[1],p=Object(a.useState)([]),f=Object(s.a)(p,2),j=f[0],b=f[1],v=Object(a.useState)([]),O=Object(s.a)(v,2),y=O[0],g=O[1],x=Object(a.useState)([]),w=Object(s.a)(x,2),N=w[0],C=w[1],k=Object(a.useState)([]),M=Object(s.a)(k,2),I=M[0],T=M[1],E=Object(a.useState)(null),R=Object(s.a)(E,2),L=R[0],B=R[1],J=Object(a.useState)(null),D=Object(s.a)(J,2),G=D[0],U=D[1],Y=Object(a.useState)(null),z=Object(s.a)(Y,2),_=z[0],X=z[1],K=function(){B(null)},q=Object(ae.p)().gameId;Object(a.useEffect)((function(){var e=new W(q,t),n=function(e,t,n){B({message:e,isGood:n}),t&&setTimeout((function(){K()}),5e3)},a={id:"app-updates",handle:function(t){"token-update"===t.type?(A("Token update!"),g(se(t.data))):"board-update"===t.type?(A("Board UPDATE"),c(ce(t.data.board.tiles)),h(function(e){return e.map((function(e){return new P(e.id,oe(e.start),oe(e.end))}))}(t.data.board.escalators)),b(function(e){return e.map((function(e){return new F(oe(e.start),oe(e.end))}))}(t.data.board.walls)),g(se(t.data.tokenData)),K()):"win"===t.type?n("You have won the game!",!1,!0):"movements"===t.type?(A("Setting movement"),e.setMovements(t.data.movements),C(t.data.movements)):"all-players"===t.type?T(t.data):"do-something"===t.type?n("".concat(t.data.sender," wants you to do something."),!0,!0):"timer-update"===t.type?U(t.data.seconds):"lose"===t.type&&n("You have lost the game..",!1,!1)}};function o(){return(o=Object(u.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.connect();case 2:e.getInitialUpdate();case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}e.addHandler(a),function(){o.apply(this,arguments)}(),X(e)}),[q]);var Q=function(e){_.doSomething(e)},V=I.filter((function(e){return e.playerName!==t}));return Object(S.jsxs)("div",{className:"App",children:[Object(S.jsx)(te,{notification:L}),Object(S.jsxs)("div",{className:"board-space",children:[Object(S.jsxs)("div",{className:"board-controls",children:[Object(S.jsx)(ne,{remainingSeconds:G}),Object(S.jsx)("br",{}),Object(S.jsx)(ee,{playerName:t,allowedMoves:N}),Object(S.jsx)("br",{}),Object(S.jsx)("h2",{hidden:!V.length,children:"Other Players:"}),V.map((function(e){return Object(S.jsx)($,{playerName:e.playerName,allowedMoves:e.moves,isSelf:!1,doSomething:Q},e.playerName)})),Object(S.jsx)("button",{className:"button",id:"reset-button",onClick:function(e){_.reset()},children:"Reset"})]}),Object(S.jsx)(H,{grid:r,tokens:y,escalators:m,walls:j,gameService:_})]})]})},le=n(16),ue=n(45);var de=function(e){var t=e.playerName,n=e.setPlayerName,o=Object(ae.n)(),r=Object(a.useRef)(null),c=function(){var e=Object(u.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ue.a.post("/games",{gameId:r.current.value});case 2:t=e.sent,A(t.data),n=t.data.gameId,A("Game Id response:"+n),o("/game/".concat(n));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),s=function(){var e=Object(u.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=r.current.value,o("/game/".concat(t));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(S.jsxs)("div",{className:"menu",children:[Object(S.jsx)("h1",{children:"Magic Maze"}),Object(S.jsxs)("div",{className:"menuSelections",children:[Object(S.jsx)("div",{className:"menuRow",children:Object(S.jsx)("input",{type:"text",value:t,onChange:function(e){n(e.target.value)},placeholder:"Nickname",className:"inputText"})}),Object(S.jsx)("div",{className:"menuRow",children:Object(S.jsx)("input",{type:"text",ref:r,placeholder:"Game Code",className:"inputText"})}),Object(S.jsxs)("div",{className:"menuRow",children:[Object(S.jsx)("button",{onClick:function(){return c()},className:"button",children:"Create"}),Object(S.jsx)("button",{onClick:s,className:"button",children:"Join"})]})]})]})};var me=function(){var e=Object(a.useState)(""),t=Object(s.a)(e,2),n=t[0],o=t[1];return Object(S.jsx)(le.a,{children:Object(S.jsxs)(ae.c,{children:[Object(S.jsx)(ae.a,{path:"/game/:gameId",element:Object(S.jsx)(ie,{realPlayerName:n})}),Object(S.jsx)(ae.a,{path:"/",element:Object(S.jsx)(de,{playerName:n,setPlayerName:o})})]})})};c.a.render(Object(S.jsx)(o.a.StrictMode,{}),document.getElementById("root")),c.a.render(Object(S.jsx)(o.a.StrictMode,{children:Object(S.jsx)(me,{})}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.f9cf8c8d.chunk.js.map