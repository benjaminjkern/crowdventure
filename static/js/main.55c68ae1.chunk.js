(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{59:function(e,t,a){e.exports=a(73)},73:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(18),o=a.n(r),l=a(6),u=a(54),i=a(10),m=a(16),s=a(79),d=a(80),E=a(52),g=a(83),h=a(84),w=a(81),f=a(86),v=a(82),y=a(42),b=function(e){var t=e.owner,a=e.account,n=e.choices,r=e.nodeID,o=e.canon;return c.a.createElement(w.a,null,n.map((function(e){return c.a.createElement(f.a,{className:"text-center"},c.a.createElement("a",{href:e.to?"/crowdventure/#/node/".concat(e.to.ID):"",style:{pointerEvents:e.to?"auto":"none",color:e.to?void 0:"grey"},onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},c.a.createElement(f.a.Body,{style:{cursor:"pointer"}},c.a.createElement(f.a.Title,null,e.action))),c.a.createElement(v.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:c.a.createElement("span",{class:"fa"},"\uf013")},c.a.createElement(y.a.Item,{disabled:!a||a.screenName!==t.screenName,onClick:function(){return o?(t=e.ID,void I({query:'mutation{makeNonCanon(choiceID:"'.concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeNonCanon&&window.location.reload(!1)}))):function(e){I({query:'mutation{makeCanon(choiceID:"'.concat(e,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeCanon&&window.location.reload(!1)}))}(e.ID);var t}},"Make ",o?"Nonc":"C","anon"),c.a.createElement(y.a.Item,{disabled:!a||a.screenName!==e.suggestedBy.screenName&&a.screenName!==t.screenName,onClick:function(){return t=e.ID,void I({query:'mutation{removeSuggestion(choiceID:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data&&window.location.reload(!1)}));var t}},"Delete"),c.a.createElement(y.a.Item,{disabled:!a||e.suggestedBy.screenName!==a.screenName},"Edit"),c.a.createElement(y.a.Divider,null),c.a.createElement(y.a.Item,null,"Report")),c.a.createElement(f.a.Footer,null,c.a.createElement("a",{href:"/crowdventure/#/node/".concat(r),style:{pointerEvents:a?"auto":"none",color:a?e.dislikedBy.map((function(e){return e.screenName})).includes(a.screenName)?"red":"black":"grey"},className:"fa fa-thumbs-down",onClick:function(){return t=e.ID,void(a&&I({query:'mutation{dislikeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.dislikeSuggestion&&window.location.reload(!1)})));var t}})," "+e.score+" ",c.a.createElement("a",{href:"/crowdventure/#/node/".concat(r),style:{pointerEvents:a?"auto":"none",color:a?e.likedBy.map((function(e){return e.screenName})).includes(a.screenName)?"green":"black":"grey"},className:"fa fa-thumbs-up",onClick:function(){return t=e.ID,void(a&&I({query:'mutation{likeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.likeSuggestion&&window.location.reload(!1)})));var t}}),c.a.createElement("br",null),c.a.createElement("small",{className:"text-muted"},"Suggested By:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.suggestedBy.screenName)},e.suggestedBy.screenName))))})))},N=function(e){var t=new m.a,a=Object(n.useState)(void 0),r=Object(l.a)(a,2),o=r[0],u=r[1],i=Object(n.useState)(void 0),w=Object(l.a)(i,2),f=w[0],v=w[1],y=Object(n.useState)(""),N=Object(l.a)(y,2),p=N[0],C=N[1],S=Object(n.useState)(!1),O=Object(l.a)(S,2),j=O[0],D=O[1],k=Object(n.useState)(""),q=Object(l.a)(k,2),B=q[0],T=q[1],A=Object(n.useState)(""),H=Object(l.a)(A,2),L=H[0],P=H[1],x=Object(n.useState)(!1),F=Object(l.a)(x,2),z=F[0],Y=F[1],V=Object(n.useState)(""),G=Object(l.a)(V,2),U=G[0],W=G[1],J=Object(n.useState)(""),M=Object(l.a)(J,2),R=M[0],K=M[1],Q=Object(n.useState)(!1),X=Object(l.a)(Q,2),Z=X[0],$=X[1],_=Object(n.useState)(""),ee=Object(l.a)(_,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(""),ce=Object(l.a)(ne,2),re=ce[0],oe=ce[1],le=Object(n.useState)(!1),ue=Object(l.a)(le,2),ie=ue[0],me=ue[1],se=function(t){t?I({query:'mutation{suggestChoice(accountScreenName:"'.concat(o.screenName,'",fromID:"').concat(e.match.params.id,'",action:"').concat(B,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.suggestChoice?(D(!1),Y(!1),window.location.reload(!1)):alert("Something went wrong when creating choice!")})):(D(!1),Y(!0))};return Object(n.useEffect)((function(){var a=t.get("account");I({query:'query{getNode(ID:"'.concat(e.match.params.id,'"){ID,title,content,views,owner{screenName},canonChoices{suggestedBy{screenName},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}},nonCanonChoices{suggestedBy{screenName},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}}}}')}).then((function(e,t){t&&alert(t),e.data?v(e.data.getNode):v(null)})),I({query:'query{getAccount(screenName:"'.concat(a,'"){screenName}}')}).then((function(e,a){a&&alert(a),e.data?u(e.data.getAccount):(alert("Something went wrong when retrieving account"),t.set("account","",{path:"/"}))}))}),[]),void 0===f?c.a.createElement(s.a,{variant:"light"},c.a.createElement(s.a.Heading,null,"Loading...")):null===f?c.a.createElement(s.a,{variant:"danger"},c.a.createElement(s.a.Heading,null,"Oh snap! You ran into an error"),c.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):c.a.createElement(d.a,null,c.a.createElement("h1",null,f.title),c.a.createElement(d.a,null,f.content),c.a.createElement("p",null),f.canonChoices.length?c.a.createElement(b,{owner:f.owner,choices:f.canonChoices,account:o,canon:!0,nodeID:f.ID}):c.a.createElement("p",{className:"text-muted"},"By decree of ",c.a.createElement("strong",null,f.owner.screenName),", this journey ends here."),c.a.createElement("p",null),c.a.createElement("p",null,"Owner:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(f.owner.screenName)},f.owner.screenName),o&&f.owner.screenName===o.screenName?c.a.createElement("p",null,c.a.createElement(E.a,{variant:"secondary",size:"sm",onClick:function(){ae(f.title),oe(f.content),$(!0)}},"Edit"),c.a.createElement(E.a,{variant:"danger",size:"sm",onClick:function(){return me(!0)}},"Delete")):""),c.a.createElement("h3",null,"Other options:",c.a.createElement(E.a,{className:"float-right",onClick:function(){return D(!0)},disabled:!o,size:"lg"},"Suggest New Choice")),c.a.createElement("p",null),c.a.createElement(b,{owner:f.owner,choices:f.nonCanonChoices,account:o,canon:!1,nodeID:f.ID}),c.a.createElement(g.a,{show:j,onHide:function(){return D(!1)}},c.a.createElement(g.a.Header,{closeButton:!0},c.a.createElement(g.a.Title,null,"Suggesting New Choice")),c.a.createElement(h.a,null,c.a.createElement(g.a.Body,null,c.a.createElement(h.a.Label,null,"Action:"),c.a.createElement(h.a.Control,{required:!0,value:B,onChange:function(e){return T(e.target.value)}}),c.a.createElement(h.a.Label,null,"Go to Page:"),c.a.createElement(h.a.Control,{value:L,placeholder:"(Leave Empty to Create New Page)",onChange:function(e){return P(e.target.value)}})),c.a.createElement(g.a.Footer,null,c.a.createElement(E.a,{onClick:function(){return se(L)}},"Submit New Choice")))),c.a.createElement(g.a,{show:z,onHide:function(){return Y(!1)}},c.a.createElement(g.a.Header,{closeButton:!0},c.a.createElement(g.a.Title,null,"Creating New Page")),c.a.createElement(h.a,null,c.a.createElement(g.a.Body,null,c.a.createElement(h.a.Label,null,"Title:"),c.a.createElement(h.a.Control,{required:!0,value:U,onChange:function(e){return W(e.target.value)}}),c.a.createElement(h.a.Label,null,"Content:"),c.a.createElement(h.a.Control,{required:!0,value:R,onChange:function(e){return K(e.target.value)}}),p||""),c.a.createElement(g.a.Footer,null,c.a.createElement(E.a,{onClick:function(){U.includes('"')?C(c.a.createElement("p",{style:{color:"red"}},"The title cannot contain (\") character! Try using (') or (`) instead!")):R.includes('"')?C(c.a.createElement("p",{style:{color:"red"}},"The content cannot contain (\") character! Try using (') or (`) instead!")):I({query:'mutation{createNode(accountScreenName:"'.concat(o.screenName,'",title:"').concat(U,'",content:"').concat(R,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?se(e.data.createNode.ID):alert("Something went wrong when creating node")}))}},"Create Page!")))),c.a.createElement(g.a,{show:Z,onHide:function(){return $(!1)}},c.a.createElement(g.a.Header,{closeButton:!0},c.a.createElement(g.a.Title,null,"Edit Page")),c.a.createElement(h.a,{onSubmit:function(){te.includes('"')?C(c.a.createElement("p",{style:{color:"red"}},"The title cannot contain (\") character! Try using (') or (`) instead!")):re.includes('"')?C(c.a.createElement("p",{style:{color:"red"}},"The content cannot contain (\") character! Try using (') or (`) instead!")):I({query:'mutation{editNode(nodeID:"'.concat(e.match.params.id,'",title:"').concat(te,'",content:"').concat(re,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editNode?$(!1):alert("Something went wrong when editing node")}))}},c.a.createElement(g.a.Body,null,c.a.createElement(h.a.Label,null,"Title:"),c.a.createElement(h.a.Control,{required:!0,value:te,onChange:function(e){return ae(e.target.value)}}),c.a.createElement(h.a.Label,null,"Content:"),c.a.createElement(h.a.Control,{required:!0,value:re,onChange:function(e){return oe(e.target.value)}}),p||""),c.a.createElement(g.a.Footer,null,c.a.createElement(E.a,{type:"submit"},"Edit Page!")))),c.a.createElement(g.a,{show:ie,onHide:function(){return me(!1)}},c.a.createElement(g.a.Header,{closeButton:!0},c.a.createElement(g.a.Title,null,"Delete Page")),c.a.createElement(g.a.Body,null,"Are you sure?"),c.a.createElement(g.a.Footer,null,c.a.createElement(E.a,{variant:"danger",onClick:function(){return me(!1)}},"No!"),c.a.createElement(E.a,{variant:"primary",onClick:function(){I({query:'mutation{deleteNode(nodeID:"'.concat(e.match.params.id,'")}')})},href:"/crowdventure"},"Yes!"))))},p=function(e){var t=Object(n.useState)(void 0),a=Object(l.a)(t,2),r=a[0],o=a[1],u=Object(n.useState)((new m.a).get("account")),i=Object(l.a)(u,2),v=i[0],y=(i[1],Object(n.useState)(!1)),b=Object(l.a)(y,2),N=b[0],p=b[1],C=Object(n.useState)(""),S=Object(l.a)(C,2),O=S[0],j=S[1],D=Object(n.useState)(""),k=Object(l.a)(D,2),q=k[0],B=k[1],T=Object(n.useState)(""),A=Object(l.a)(T,2),H=A[0],L=A[1],P=Object(n.useState)(!1),x=Object(l.a)(P,2),F=x[0],z=x[1],Y=Object(n.useState)(!1),V=Object(l.a)(Y,2);V[0],V[1];Object(n.useEffect)((function(){I({query:'query{getAccount(screenName:"'.concat(e.match.params.id,'"){bio,screenName,nodes{title,views},suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data?o(e.data.getAccount):alert("Something went wrong when retrieving account")}))}),[]);return void 0===r?c.a.createElement(s.a,{variant:"light"},c.a.createElement(s.a.Heading,null,"Loading...")):null===r?c.a.createElement(s.a,{variant:"danger"},c.a.createElement(s.a.Heading,null,"Oh snap! You ran into an error"),c.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):c.a.createElement(d.a,null,c.a.createElement("h1",{style:{position:"relative",left:"5px"}},r.screenName),r.bio?c.a.createElement("p",null,"Bio"):"",c.a.createElement("h3",null,"Pages:"),c.a.createElement(w.a,null,r.nodes.map((function(e){return c.a.createElement(f.a,null,c.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},c.a.createElement(f.a.Body,null,c.a.createElement(f.a.Title,null,e.title))),c.a.createElement(f.a.Footer,null,"Created by: ",r.screenName,c.a.createElement("br",null),"Views:"," "+e.views))}))),c.a.createElement("p",null),v===r.screenName?c.a.createElement(d.a,null,c.a.createElement(E.a,{onClick:function(){return p(!0)}},"Create new Page")," ",c.a.createElement(E.a,{href:"/crowdventure",variant:"danger",onClick:function(){(new m.a).set("account","",{path:"/"})}},"Log out")," ",c.a.createElement(E.a,{variant:"danger",onClick:function(){return z(!0)}},"Delete"),c.a.createElement(g.a,{show:N,onHide:function(){return p(!1)}},c.a.createElement(g.a.Header,{closeButton:!0},c.a.createElement(g.a.Title,null,"Creating New Page")),c.a.createElement(h.a,{onSubmit:function(){O.includes('"')?L(c.a.createElement("p",{style:{color:"red"}},"The title cannot contain (\") character! Try using (') or (`) instead!")):q.includes('"')?L(c.a.createElement("p",{style:{color:"red"}},"The content cannot contain (\") character! Try using (') or (`) instead!")):I({query:'mutation{createNode(accountScreenName:"'.concat(r.screenName,'",title:"').concat(O,'",content:"').concat(q,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?p(!1):alert("Something went wrong when creating node")}))}},c.a.createElement(g.a.Body,null,c.a.createElement(h.a.Label,null,"Title:"),c.a.createElement(h.a.Control,{required:!0,value:O,onChange:function(e){return j(e.target.value)}}),c.a.createElement(h.a.Label,null,"Content:"),c.a.createElement(h.a.Control,{required:!0,value:q,onChange:function(e){return B(e.target.value)}}),H||""),c.a.createElement(g.a.Footer,null,c.a.createElement(E.a,{type:"submit"},"Create Page!")))),c.a.createElement(g.a,{show:F,onHide:function(){return z(!1)}},c.a.createElement(g.a.Header,{closeButton:!0},c.a.createElement(g.a.Title,null,"Delete Account")),c.a.createElement(g.a.Body,null,"Are you sure?"),c.a.createElement(g.a.Footer,null,c.a.createElement(E.a,{variant:"danger",onClick:function(){return z(!1)}},"No!"),c.a.createElement(E.a,{variant:"primary",onClick:function(){(new m.a).set("account","",{path:"/"}),I({query:'mutation{deleteAccount(screenName:"'.concat(e.match.params.id,'")}')})},href:"/crowdventure"},"Yes!")))):"")},C=function(){var e=Object(n.useState)(void 0),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(void 0),u=Object(l.a)(o,2),i=u[0],m=u[1];return Object(n.useEffect)((function(){I({query:"query{allNodes{ID,title,owner{screenName},views}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.allNodes?r(e.data.allNodes):alert("Something went wrong when retrieving nodes")})),I({query:"query{allAccounts{screenName,totalNodeViews,totalSuggestionScore}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.allAccounts?m(e.data.allAccounts):alert("Something went wrong when retrieving accounts")}))}),[]),c.a.createElement(d.a,null,c.a.createElement("h1",null,"Welcome!"),c.a.createElement(d.a,null,"Crowdventure is a Crowd-Sourced Choose/Create-Your-Own-Adventure-Game!"),c.a.createElement("p",null),c.a.createElement("h3",null,"Featured Pages:"),a?c.a.createElement(w.a,null,a.slice(0,1).map((function(e){return c.a.createElement(f.a,null,c.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},c.a.createElement(f.a.Body,null,c.a.createElement(f.a.Title,null,e.title))),c.a.createElement(f.a.Footer,null,"Created by:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.owner.screenName)},e.owner.screenName),c.a.createElement("br",null),"Views:"," "+e.views))}))):"",c.a.createElement("h3",null,"Featured Accounts:"),i?c.a.createElement(w.a,null,i.map((function(e){return c.a.createElement(f.a,null,c.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.screenName)},c.a.createElement(f.a.Body,null,c.a.createElement(f.a.Title,null,e.screenName))),c.a.createElement(f.a.Footer,null,"Total Views:",e.totalNodeViews,c.a.createElement("br",null),"Total Score:",e.totalSuggestionScore))}))):"")},S=a(85),O=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(!1),u=Object(l.a)(o,2),i=u[0],s=u[1],d=Object(n.useState)(void 0),w=Object(l.a)(d,2),f=w[0],v=w[1],y=Object(n.useState)(void 0),b=Object(l.a)(y,2),N=b[0],p=b[1],C=Object(n.useState)(""),O=Object(l.a)(C,2),j=O[0],D=O[1],k=Object(n.useState)(""),q=Object(l.a)(k,2),B=q[0],T=q[1],A=Object(n.useState)(""),H=Object(l.a)(A,2),L=H[0],P=H[1],x=function(){return I({query:'mutation{createAccount(screenName:"'.concat(j,'",password:"').concat(B,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createAccount?((new m.a).set("account",j,{path:"/"}),v(e.data.createAccount),s(!1),window.location.reload(!1)):alert("Something went wrong when creating account")}))};return Object(n.useEffect)((function(){var e=(new m.a).get("account");e&&I({query:'query{getAccount(screenName:"'.concat(e,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data?v(e.data.getAccount):(alert("Something went wrong when logging in"),(new m.a).set("account","",{path:"/"}))}))}),[]),void 0===f||null===f?c.a.createElement(S.a.Text,null,"You are not logged in."," ",c.a.createElement(E.a,{variant:"light",onClick:function(){return r(!0)},size:"sm"},"Log In")," ","or"," ",c.a.createElement(E.a,{variant:"light",onClick:function(){return s(!0)},size:"sm"},"Sign Up"),c.a.createElement(g.a,{show:a,onHide:function(){return r(!1)}},c.a.createElement(g.a.Header,{closeButton:!0},c.a.createElement(g.a.Title,null,"Log in")),c.a.createElement(h.a,null,c.a.createElement(g.a.Body,null,c.a.createElement(h.a.Label,null,"Screen Name:"),c.a.createElement(h.a.Control,{required:!0,value:j,onChange:function(e){return D(e.target.value)}}),c.a.createElement(h.a.Label,null,"Password:"),c.a.createElement(h.a.Control,{required:!0,type:"password",value:B,onChange:function(e){return T(e.target.value)}}),N||""),c.a.createElement(g.a.Footer,null,c.a.createElement(E.a,{variant:"primary",onClick:function(){j.includes('"')?p(c.a.createElement("div",{style:{color:"red"}},'Screen Name cannot include (") character!')):B.includes('"')?p(c.a.createElement("div",{style:{color:"red"}},'Password cannot include (") character!')):I({query:'query{getAccount(screenName:"'.concat(j,'",password:"').concat(B,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getAccount?((new m.a).set("account",j,{path:"/"}),v(e.data.getAccount),r(!1),window.location.reload(!1)):p(c.a.createElement("div",{style:{color:"red"}},"That account does not exist or the password did not match!"))}))}},"Log in")))),c.a.createElement(g.a,{show:i,onHide:function(){return s(!1)}},c.a.createElement(g.a.Header,{closeButton:!0},c.a.createElement(g.a.Title,null,"Sign Up for Crowdventure!")),c.a.createElement(h.a,null,c.a.createElement(g.a.Body,null,c.a.createElement(h.a.Group,null,c.a.createElement(h.a.Label,null,"Screen Name:"),c.a.createElement(h.a.Control,{required:!0,value:j,onChange:function(e){return D(e.target.value)}}),c.a.createElement(h.a.Label,null,"Create Password:"),c.a.createElement(h.a.Control,{required:!0,type:"password",value:B,onChange:function(e){return T(e.target.value)}}),c.a.createElement(h.a.Label,null,"Confirm Password:"),c.a.createElement(h.a.Control,{required:!0,type:"password",value:L,onChange:function(e){return P(e.target.value)}})),N||""),c.a.createElement(g.a.Footer,null,c.a.createElement(E.a,{variant:"primary",onClick:function(){B!==L?p(c.a.createElement("div",{style:{color:"red"}},"Passwords must match!")):j.includes('"')?p(c.a.createElement("div",{style:{color:"red"}},'Screen Name cannot include (") character!')):B.includes('"')?p(c.a.createElement("div",{style:{color:"red"}},'Password cannot include (") character!')):I({query:'query{getAccount(screenName:"'.concat(j,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getAccount?p(c.a.createElement("div",{style:{color:"red"}},"That account already exists!")):x()}))}},"Sign Up"))))):c.a.createElement(S.a.Text,null,"You are logged in as:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(f.screenName),onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},f.screenName))},j=function(){return c.a.createElement(d.a,null,c.a.createElement(S.a,null,c.a.createElement(S.a.Brand,{href:"/crowdventure"},c.a.createElement("img",{src:"/crowdventure/logo.png",alt:"Crowdventure Logo"})),c.a.createElement(S.a.Collapse,{className:"justify-content-end"},c.a.createElement(O,null))),c.a.createElement(u.a,null,c.a.createElement(i.c,null,c.a.createElement(i.a,{path:"/",component:C,exact:!0}),c.a.createElement(i.a,{path:"/node/:id",component:N}),c.a.createElement(i.a,{path:"/account/:id",component:p}))))},D=(a(71),(0,a(74).createApolloFetch)({uri:"https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql"}));o.a.render(c.a.createElement(j,null),document.getElementById("root"));var I=t.default=D}},[[59,1,2]]]);
//# sourceMappingURL=main.55c68ae1.chunk.js.map