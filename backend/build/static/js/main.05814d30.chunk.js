(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{35:function(e,t,n){},37:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(22),c=n.n(o),i=(n(35),n(6)),s=n(5),l=n.n(s),d=n(9),u=(n(37),n(8)),p=-1,m=1,f=2,h=3,b=4,j=5,y=function e(t,n,a,r,o){Object(u.a)(this,e),this.coord=t,this.type=n,this.hasItem=a,this.item=r,this.tokenType=o},g=1,v=2,O=3,x=4,w=function e(t,n,a,r,o){Object(u.a)(this,e),this.id=t,this.coord=n,this.selectedBy=a,this.escaped=r,this.type=o},k=n(10),S=function(){function e(t,n){Object(u.a)(this,e),this.x=t,this.y=n}return Object(k.a)(e,[{key:"toString",value:function(){return"(".concat(this.x,", ").concat(this.y,")")}}]),e}(),N=0,C=1,M=2,T=3,I=4,E=function(e,t){return t.y<0||t.y>=e.length||t.x<0||t.x>=e[0].length?null:e[t.y][t.x]};var R=n.p+"static/media/coins_new.2254d122.png",J=n.p+"static/media/timer.c21cbb42.png",L=n.p+"static/media/axe2.3337d039.png",B=n.p+"static/media/sword.003d0d39.png",D=n.p+"static/media/arrows2.6d27d5a7.png",P=n.p+"static/media/potion.dc85f7b3.png",U=0,G=1,H=2,A=function e(t,n){Object(u.a)(this,e),this.type=t,this.tokenType=n},Y=n(3),_=function(e){var t,n=e.item,a="item",r={};switch(n.type){case U:t=R,a+=" coin";break;case G:t=J,a+=" time";break;case H:var o=function(e){switch(e.tokenType){case g:return{img:L,color:"orange"};case O:return{img:B,color:"yellow"};case x:return{img:D,color:"green"};case v:return{img:P,color:"purple"};default:throw new Error("Invalid token type")}}(n);t=o.img,a+=" weapon",r.backgroundColor=o.color;break;default:throw new Error("Unknown item type: "+JSON.stringify(n))}return Object(Y.jsx)("div",{className:a,style:r,children:Object(Y.jsx)("img",{src:t,alt:"item"})})},z=n.p+"static/media/rock.3d4d808c.png",W=n.p+"static/media/s1.cd3f2f2d.png",F=n.p+"static/media/green-portal.e3d54e5f.png",X=n.p+"static/media/orange-portal.e0a89eb5.png",K=n.p+"static/media/yellow-portal.f832ee4b.png",q=n.p+"static/media/purple-portal.f9f584fe.png",Q=n.p+"static/media/up.552f859e.png",V=n.p+"static/media/down.40f8ab30.png",Z=n.p+"static/media/left.aa0f5ff4.png",$=n.p+"static/media/right.9a984c67.png",ee=function(e){var t,n,a=e.tile,r=e.onTeleport,o=e.getTileDirection,c=a.type;if(c===f)switch(t="tile-exit",n=W,a.tokenType){case g:t+=" exit-dwarf";break;case v:t+=" exit-mage";break;case O:t+=" exit-barbarian";break;case x:t+=" exit-elf";break;default:throw new Error("Unknown token type")}else if(c===h)t="tile-wall",n=z;else if(c===p)t="tile-unknown";else if(c===b){switch(t="tile-connect",o(a)){case N:n=Q;break;case C:n=V;break;case M:n=Z;break;case T:n=$}switch(a.tokenType){case g:t+=" connect-dwarf";break;case v:t+=" connect-mage";break;case O:t+=" connect-barbarian";break;case x:t+=" connect-elf";break;default:throw new Error("Unknown token type")}}else if(c===j)switch(t="tile-portal",a.tokenType){case g:n=X;break;case v:n=q;break;case O:n=K;break;case x:n=F;break;default:throw new Error("Unknown token type")}else t="tile";return Object(Y.jsxs)("div",{className:t,children:[n?Object(Y.jsx)("img",{src:n,className:"tile-image",onClick:function(){c===j&&r(a.coord)},alt:""}):null,a.hasItem?Object(Y.jsx)(_,{item:a.item}):null]})},te=n.p+"static/media/dwarf_right.3de0ca4b.png",ne=n.p+"static/media/warrior.94e868cd.png",ae=n.p+"static/media/elf_bow.93f90f79.png",re=n.p+"static/media/mage.23ebe66e.png",oe=function(e){var t,n,a=e.token,r=e.onTokenSelected,o=e.style;if(!a||a.escaped)return"";switch(a.selectedBy?t="token-selected":a.selectedBy||(t="token"),a.type){case g:n=te,t+=" token-dwarf";break;case x:n=ae,t+=" token-elf";break;case O:n=ne,t+=" token-barbarian";break;case v:n=re,t+=" token-mage";break;default:throw new Error("Unknown token type")}return Object(Y.jsx)("div",{className:t,style:o,onClick:function(){a&&r(a)},children:Object(Y.jsx)("img",{src:n,alt:"token"})})},ce=n.p+"static/media/escalator_down.03b0327b.png",ie=n.p+"static/media/escalator_up.671e7897.png",se=0,le=1,de=function(){function e(t,n,a){Object(u.a)(this,e),this.id=t,this.startCoord=n,this.endCoord=a}return Object(k.a)(e,[{key:"getMinX",value:function(){return Math.min(this.startCoord.x,this.endCoord.x)}},{key:"getMinY",value:function(){return Math.min(this.startCoord.y,this.endCoord.y)}},{key:"getRowSpan",value:function(){return Math.abs(this.startCoord.y-this.endCoord.y)+1}},{key:"getColSpan",value:function(){return Math.abs(this.startCoord.x-this.endCoord.x)+1}},{key:"getOrientation",value:function(){var e=this.getMinX(),t=this.getMinY();return e===this.startCoord.x&&t===this.startCoord.y||e===this.endCoord.x&&t===this.endCoord.y?se:le}}]),e}(),ue=function(e){var t,n=e.escalator,a=e.onEscalate,r=n.getMinY()+1,o=n.getMinX()+1;switch(n.getOrientation()){case se:t=ce;break;case le:t=ie;break;default:throw new Error("Invalid Orientation")}var c={gridRow:"".concat(r," / span ").concat(n.getRowSpan()),gridColumn:"".concat(o," / span ").concat(n.getColSpan())};return Object(Y.jsx)("div",{className:"escalator",style:c,children:Object(Y.jsx)("img",{className:"escalator-img",src:t,onClick:function(){a(n.id)},alt:"escalator"})})},pe=function(e){var t=e.wall,n={gridRow:"".concat(t.getStartRow()," / span ").concat(t.getRowSpan()),gridColumn:"".concat(t.getStartCol()," / span ").concat(t.getColSpan()),zIndex:1};return t.isHorizontal()?(n.borderTop="10px solid #000000",n.height="0px"):(n.borderLeft="10px solid #000000",n.width="0px"),Object(Y.jsx)("div",{className:"wall",style:n})},me=function(e){var t=e.grid,n=e.tokens,a=e.escalators,r=e.walls,o=e.gameService,c=function(e){o.send(JSON.stringify({type:"SELECTED",selected:e.id}))},i=function(e){o.teleport(e)},s=function(e){o.escalate(e)},l=function(e){return function(e,t){if(0===t.length)return I;var n=E(t,new S(e.coord.x-1,e.coord.y)),a=E(t,new S(e.coord.x+1,e.coord.y)),r=E(t,new S(e.coord.x,e.coord.y-1)),o=E(t,new S(e.coord.x,e.coord.y+1)),c=0===e.coord.x,i=e.coord.x===t[0].length-1,s=0===e.coord.y,l=e.coord.y===t.length-1;return c||n&&n.type===p?M:i||a&&a.type===p?T:s||r&&r.type===p?N:l||o&&o.type===p?C:I}(e,t)},d=t.length,u=0===t.length?0:t[0].length,m={margin:"48px",overflow:"auto",display:"grid",gridTemplateColumns:"repeat(".concat(u,", 64px)"),gridTemplateRows:"repeat(".concat(d,", 64px)"),gap:"0px"},f=function(e){return{gridColumnStart:"".concat(e.x+1),gridRowStart:"".concat(e.y+1)}};return Object(Y.jsxs)("div",{className:"game-board",style:m,onKeyPress:function(e){"s"===e.key.toLowerCase()?o.moveDown():"w"===e.key.toLowerCase()?o.moveUp():"a"===e.key.toLowerCase()?o.moveLeft():"d"===e.key.toLowerCase()&&o.moveRight()},tabIndex:0,children:[t.map((function(e,t){return e.map((function(e,t){return Object(Y.jsx)("div",{className:"tile-container",style:f(e.coord),children:Object(Y.jsx)(ee,{tile:e,onTeleport:i,getTileDirection:l})},e.coord.toString())}))})),a.map((function(e){return Object(Y.jsx)(ue,{escalator:e,onEscalate:s})})),n.map((function(e){return Object(Y.jsx)(oe,{token:e,onTokenSelected:c,style:f(e.coord)})})),r.map((function(e){return Object(Y.jsx)(pe,{wall:e})}))]})},fe=n(11),he=function(){},be=function(){var e;(e=console).log.apply(e,arguments)},je=function(){var e;(e=console).error.apply(e,arguments)},ye=function(){function e(t,n){var a=this;Object(u.a)(this,e),this.setMovements=function(e){a.allowedMovements=e},this.sendBasicCommand=function(e){a.send(JSON.stringify({type:e}))},this.reset=function(){a.sendBasicCommand("RESET")},this.moveRight=function(){a.sendMovement("RIGHT")},this.moveLeft=function(){a.sendMovement("LEFT")},this.moveDown=function(){a.sendMovement("DOWN")},this.moveUp=function(){a.sendMovement("UP")},this.doSomething=function(e){a.send(JSON.stringify({type:"DO-SOMETHING",player:e}))},this.teleport=function(e){a.send(JSON.stringify({type:"TELEPORT",coord:e}))},this.escalate=function(e){a.send(JSON.stringify({type:"ESCALATE",id:e}))},this.handlers=[],this.gameId=t,this.playerName=n,this.allowedMovements=[]}return Object(k.a)(e,[{key:"addHandler",value:function(e){this.handlers=this.handlers.filter((function(t){return t.id!==e.id})),this.handlers.push(e)}},{key:"connect",value:function(){var e=this;return new Promise((function(t,n){var a="wss://"+window.location.host+"?playerName=".concat(e.playerName);e.connection=new WebSocket(a),he("Connecting to:"+a),e.connection.onopen=function(){t()},e.connection.onerror=function(e){je(e),je("Sorry, but there's some problem with your connection or the server is down."),n(e)},e.connection.onmessage=function(t){try{var n=JSON.parse(t.data)}catch(o){return void je("Invalid JSON: ",t.data)}if(n.gameId&&n.gameId!==e.gameId)be("Sent message for different game");else{var a,r=Object(fe.a)(e.handlers);try{for(r.s();!(a=r.n()).done;){a.value.handle(n)}}catch(c){r.e(c)}finally{r.f()}}},setInterval((function(){1!==e.connection.readyState&&je("Error missing connection")}),3e3)}))}},{key:"getInitialUpdate",value:function(){this.sendBasicCommand("INITIAL")}},{key:"send",value:function(e){var t=JSON.parse(e);t.gameId=this.gameId;var n=JSON.stringify(t);he("SEND: "+n),this.connection.send(n)}},{key:"sendMovement",value:function(e){this.allowedMovements.includes(e)&&this.sendBasicCommand(e)}}]),e}(),ge=function(){function e(t,n){Object(u.a)(this,e),this.startCoord=t,this.endCoord=n}return Object(k.a)(e,[{key:"getStartRow",value:function(){return Math.min(this.startCoord.y,this.endCoord.y)+1}},{key:"getStartCol",value:function(){return Math.min(this.startCoord.x,this.endCoord.x)+1}},{key:"getRowSpan",value:function(){return Math.max(1,Math.abs(this.startCoord.y-this.endCoord.y))}},{key:"getColSpan",value:function(){return Math.max(1,Math.abs(this.startCoord.x-this.endCoord.x))}},{key:"isHorizontal",value:function(){return this.startCoord.y===this.endCoord.y}}]),e}(),ve=function(e){var t,n,a=e.move,r=e.isSelf;return"LEFT"===a?(t=Z,n="A"):"RIGHT"===a?(t=$,n="D"):"UP"===a?(t=Q,n="W"):"DOWN"===a?(t=V,n="S"):console.log("Fail, move: "+a),Object(Y.jsxs)("div",{className:"move-icon",children:[Object(Y.jsx)("img",{src:t,alt:"move"}),r?Object(Y.jsx)("span",{children:n}):""]})},Oe=function(e){var t=e.playerName,n=e.allowedMoves,a=e.doSomething;return Object(Y.jsx)("div",{className:"player-other",children:Object(Y.jsxs)("div",{className:"player-bar",children:[Object(Y.jsx)("label",{children:t}),n.map((function(e){return Object(Y.jsx)(ve,{move:e,isSelf:!1},e)})),Object(Y.jsx)("button",{className:"doSomethingButton",onClick:function(e){a(t)},children:"!"})]})})},xe=function(e){var t=e.playerName,n=e.allowedMoves;return Object(Y.jsxs)("div",{className:"player-self",children:[Object(Y.jsx)("span",{id:"mainPlayer",children:t}),Object(Y.jsx)("h2",{children:"Moves"}),Object(Y.jsx)("div",{className:"player-moves",children:n.map((function(e){return Object(Y.jsx)(ve,{move:e,isSelf:!0},e)}))})]})},we=function(e){var t=e.notification;return null===t?null:Object(Y.jsx)("div",{className:t.isGood?"notification":"notification-bad",children:t.message})},ke=function(e){var t=e.remainingSeconds;if(!t)return"";var n=function(e){var t="00"+e;return t.substr(t.length-2)},a=n(Math.floor(t/60)),r=n(t%60),o=t>10?"timer":"timer-critical";return Object(Y.jsx)("div",{className:o,children:"".concat(a,":").concat(r)})},Se=n(4),Ne=function(e){var t=parseInt(e.x),n=parseInt(e.y);return new S(t,n)},Ce=function(e){var t,n=e.item;return n&&(t=new A(n.type,n.tokenType)),new y(Ne(e.pos),function(e){switch(e){case 0:return m;case 1:return h;case 2:return f;case 3:return b;case 4:return j;default:return p}}(e.type),e.hasItem,t,e.tokenType)},Me=function(e){return e.map((function(e){return function(e){return e.map((function(e){return Ce(e)}))}(e)}))},Te=function(e){return e.tokens.map((function(t,n){return new w(n,Ne(t.pos),function(e,t){var n=e.find((function(e){return e.selection===t}));return n?n.selectedBy.split(" ").map((function(e){return e[0]})).join(""):null}(e.selections,n),t.escaped,t.type)}))};var Ie=function(e){var t=e.realPlayerName,n=Object(a.useState)([[]]),r=Object(i.a)(n,2),o=r[0],c=r[1],s=Object(a.useState)([]),u=Object(i.a)(s,2),p=u[0],m=u[1],f=Object(a.useState)([]),h=Object(i.a)(f,2),b=h[0],j=h[1],y=Object(a.useState)([]),g=Object(i.a)(y,2),v=g[0],O=g[1],x=Object(a.useState)([]),w=Object(i.a)(x,2),k=w[0],S=w[1],N=Object(a.useState)([]),C=Object(i.a)(N,2),M=C[0],T=C[1],I=Object(a.useState)(null),E=Object(i.a)(I,2),R=E[0],J=E[1],L=Object(a.useState)(null),B=Object(i.a)(L,2),D=B[0],P=B[1],U=Object(a.useState)(null),G=Object(i.a)(U,2),H=G[0],A=G[1],_=function(){J(null)},z=Object(Se.p)().gameId;Object(a.useEffect)((function(){var e=new ye(z,t),n=function(e,t,n){J({message:e,isGood:n}),t&&setTimeout((function(){_()}),5e3)},a={id:"app-updates",handle:function(t){"token-update"===t.type?(he("Token update!"),O(Te(t.data))):"board-update"===t.type?(he("Board UPDATE"),c(Me(t.data.board.tiles)),m(function(e){return e.map((function(e){return new de(e.id,Ne(e.start),Ne(e.end))}))}(t.data.board.escalators)),j(function(e){return e.map((function(e){return new ge(Ne(e.start),Ne(e.end))}))}(t.data.board.walls)),O(Te(t.data.tokenData)),_()):"win"===t.type?n("You have won the game!",!1,!0):"movements"===t.type?(he("Setting movement"),e.setMovements(t.data.movements),S(t.data.movements)):"all-players"===t.type?T(t.data):"do-something"===t.type?n("".concat(t.data.sender," wants you to do something."),!0,!0):"timer-update"===t.type?P(t.data.seconds):"lose"===t.type&&n("You have lost the game..",!1,!1)}};function r(){return(r=Object(d.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.connect();case 2:e.getInitialUpdate();case 3:case"end":return t.stop()}}),t)})))).apply(this,arguments)}e.addHandler(a),function(){r.apply(this,arguments)}(),A(e)}),[z]);var W=function(e){H.doSomething(e)},F=M.filter((function(e){return e.playerName!==t}));return Object(Y.jsxs)("div",{className:"App",children:[Object(Y.jsx)(we,{notification:R}),Object(Y.jsxs)("div",{className:"board-space",children:[Object(Y.jsxs)("div",{className:"board-controls",children:[Object(Y.jsx)(ke,{remainingSeconds:D}),Object(Y.jsx)("br",{}),Object(Y.jsx)(xe,{playerName:t,allowedMoves:k}),Object(Y.jsx)("br",{}),Object(Y.jsx)("h2",{hidden:!F.length,children:"Other Players:"}),F.map((function(e){return Object(Y.jsx)(Oe,{playerName:e.playerName,allowedMoves:e.moves,isSelf:!1,doSomething:W},e.playerName)})),Object(Y.jsx)("button",{className:"button",id:"reset-button",onClick:function(e){H.reset()},children:"Reset"})]}),Object(Y.jsx)(me,{grid:o,tokens:v,escalators:p,walls:b,gameService:H})]})]})},Ee=n(16),Re=n(45);var Je=function(e){var t=e.playerName,n=e.setPlayerName,r=Object(Se.n)(),o=Object(a.useRef)(null),c=function(){var e=Object(d.a)(l.a.mark((function e(){var t,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Re.a.post("/games",{gameId:o.current.value});case 2:t=e.sent,he(t.data),n=t.data.gameId,he("Game Id response:"+n),r("/game/".concat(n));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),i=function(){var e=Object(d.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=o.current.value,r("/game/".concat(t));case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(Y.jsxs)("div",{className:"menu",children:[Object(Y.jsx)("h1",{children:"Magic Maze"}),Object(Y.jsxs)("div",{className:"menuSelections",children:[Object(Y.jsx)("div",{className:"menuRow",children:Object(Y.jsx)("input",{type:"text",value:t,onChange:function(e){n(e.target.value)},placeholder:"Nickname",className:"inputText"})}),Object(Y.jsx)("div",{className:"menuRow",children:Object(Y.jsx)("input",{type:"text",ref:o,placeholder:"Game Code",className:"inputText"})}),Object(Y.jsxs)("div",{className:"menuRow",children:[Object(Y.jsx)("button",{onClick:function(){return c()},className:"button",children:"Create"}),Object(Y.jsx)("button",{onClick:i,className:"button",children:"Join"})]})]})]})};var Le=function(){var e=Object(a.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1];return Object(Y.jsx)(Ee.a,{children:Object(Y.jsxs)(Se.c,{children:[Object(Y.jsx)(Se.a,{path:"/game/:gameId",element:Object(Y.jsx)(Ie,{realPlayerName:n})}),Object(Y.jsx)(Se.a,{path:"/",element:Object(Y.jsx)(Je,{playerName:n,setPlayerName:r})})]})})};c.a.render(Object(Y.jsx)(r.a.StrictMode,{}),document.getElementById("root")),c.a.render(Object(Y.jsx)(r.a.StrictMode,{children:Object(Y.jsx)(Le,{})}),document.getElementById("root"))}},[[43,1,2]]]);
//# sourceMappingURL=main.05814d30.chunk.js.map