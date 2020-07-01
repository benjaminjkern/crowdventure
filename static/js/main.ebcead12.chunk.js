(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{116:function(e,t){e.exports="https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql"},117:function(e,t,a){"use strict";a.r(t),a.d(t,"app_fetch",(function(){return x})),a.d(t,"escape",(function(){return A}));var n=a(0),c=a.n(n),r=a(20),o=a.n(r),l=a(8),u=a(46),i=a(36),s=a(19),m=a(124),d=a(125),E=a(87),g=a(132),h=a(126),w=a(129),f=a(130),b=a(127),v=a(133),N=a(128),p=a(65),y=a(89),C=function(e){var t=e.owner,a=e.account,n=e.choices,r=e.nodeID,o=e.canon,l=e.onEdit;return c.a.createElement(b.a,null,n.map((function(e){return c.a.createElement(v.a,{className:"text-center"},c.a.createElement("a",{href:e.to?"/crowdventure/#/node/".concat(e.to.ID):"",style:{pointerEvents:e.to?"auto":"none",color:e.to?void 0:"grey"},onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},c.a.createElement(v.a.Body,{style:{cursor:"pointer"}},c.a.createElement(v.a.Title,null,e.action))),c.a.createElement(N.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:c.a.createElement("span",{class:"fa"},"\uf013")},c.a.createElement(p.a.Item,{disabled:!a||a.screenName!==t.screenName,onClick:function(){return o?(t=e.ID,void x({query:'mutation{makeNonCanon(choiceID:"'.concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeNonCanon&&window.location.reload(!1)}))):function(e){x({query:'mutation{makeCanon(choiceID:"'.concat(e,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeCanon&&window.location.reload(!1)}))}(e.ID);var t}},"Make ",o?"Nonc":"C","anon"),c.a.createElement(p.a.Item,{disabled:!a||a.screenName!==e.suggestedBy.screenName&&a.screenName!==t.screenName,onClick:function(){return t=e.ID,void x({query:'mutation{removeSuggestion(choiceID:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data&&window.location.reload(!1)}));var t}},"Delete"),c.a.createElement(p.a.Item,{onClick:function(){return l(e)},disabled:!o||!a||a.screenName!==e.suggestedBy.screenName&&a.screenName!==t.screenName},"Edit"),c.a.createElement(p.a.Divider,null),c.a.createElement(p.a.Item,{disabled:!0},"Report")),c.a.createElement(v.a.Footer,null,c.a.createElement("a",{href:"/crowdventure/#/node/".concat(r),style:{pointerEvents:a?"auto":"none",color:a?e.dislikedBy.map((function(e){return e.screenName})).includes(a.screenName)?"red":"black":"grey"},className:"fa fa-thumbs-down",onClick:function(){return t=e.ID,void(a&&x({query:'mutation{dislikeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.dislikeSuggestion&&window.location.reload(!1)})));var t}})," "+e.score+" ",c.a.createElement("a",{href:"/crowdventure/#/node/".concat(r),style:{pointerEvents:a?"auto":"none",color:a?e.likedBy.map((function(e){return e.screenName})).includes(a.screenName)?"green":"black":"grey"},className:"fa fa-thumbs-up",onClick:function(){return t=e.ID,void(a&&x({query:'mutation{likeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.likeSuggestion&&window.location.reload(!1)})));var t}}),c.a.createElement("br",null),c.a.createElement("small",{className:"text-muted"},"Suggested By:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.suggestedBy.screenName)},e.suggestedBy.screenName))))})))},O=function(e){var t=e.callback,a=e.toID,r=Object(n.useState)(void 0),o=Object(l.a)(r,2),u=o[0],i=o[1],s=Object(n.useState)(void 0),m=Object(l.a)(s,2),d=m[0],E=m[1];return Object(n.useEffect)((function(){a?x({query:'query{getNode(ID:"'.concat(a,'"){title,ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getNode?E(e.data.getNode):alert("Something went wrong when retrieving node")})):E(null),x({query:"query{allNodes{title,owner{screenName},ID}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.allNodes?i(e.data.allNodes):alert("Something went wrong when retrieving all nodes")}))}),[]),u&&void 0!==d?c.a.createElement(y.a,{filterBy:function(e,a){return""===a.text?(t(""),!0):e.title.toLowerCase().includes(a.text.toLowerCase())||e.owner.screenName.toLowerCase().includes(a.text.toLowerCase())},defaultSelected:[d?d.title:""],labelKey:"title",options:u,placeholder:"(Leave Empty to Create New Page)",renderMenuItemChildren:function(e){return c.a.createElement("div",{onClick:function(){return t(e.ID)}},e.title,c.a.createElement("div",null,c.a.createElement("small",null,"Author: ",e.owner.screenName)))}}):c.a.createElement("div",null,"Loading...")},j=function(e){var t=e.history,a=e.match,r=Object(n.useState)(void 0),o=Object(l.a)(r,2),u=o[0],b=o[1],v=A(a.params.id),N=Object(n.useState)(void 0),p=Object(l.a)(N,2),y=p[0],j=p[1],S=Object(n.useState)(void 0),I=Object(l.a)(S,2),k=I[0],D=I[1],q=Object(n.useState)(""),B=Object(l.a)(q,2),T=B[0],L=(B[1],Object(n.useState)(!1)),H=Object(l.a)(L,2),P=H[0],F=H[1],z=Object(n.useState)(""),Y=Object(l.a)(z,2),V=Y[0],G=Y[1],M=Object(n.useState)(""),U=Object(l.a)(M,2),W=U[0],J=U[1],K=Object(n.useState)(!1),R=Object(l.a)(K,2),_=R[0],Q=R[1],X=Object(n.useState)(""),Z=Object(l.a)(X,2),$=Z[0],ee=Z[1],te=Object(n.useState)(""),ae=Object(l.a)(te,2),ne=ae[0],ce=ae[1],re=Object(n.useState)(void 0),oe=Object(l.a)(re,2),le=oe[0],ue=oe[1],ie=Object(n.useState)(!1),se=Object(l.a)(ie,2),me=se[0],de=se[1],Ee=Object(n.useState)(""),ge=Object(l.a)(Ee,2),he=ge[0],we=ge[1],fe=Object(n.useState)(""),be=Object(l.a)(fe,2),ve=be[0],Ne=be[1],pe=Object(n.useState)(!1),ye=Object(l.a)(pe,2),Ce=ye[0],Oe=ye[1],je=Object(n.useState)(!1),Se=Object(l.a)(je,2),Ie=Se[0],ke=Se[1],De=Object(n.useState)(""),qe=Object(l.a)(De,2),Be=qe[0],xe=qe[1];return Object(n.useEffect)((function(){var e=new s.a,t=A(e.get("account"));x({query:'query{getNode(ID:"'.concat(v,'"){ID,title,content,views,owner{screenName},canonChoices{suggestedBy{screenName},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}},nonCanonChoices{suggestedBy{screenName},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}}}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getNode?D(e.data.getNode):D(null)})),x({query:'mutation{loginAccount(screenName:"'.concat(t,'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?j(t.data.loginAccount):(alert("Something went wrong when retrieving account logging out"),e.set("account","",{path:"/"}))}))}),[]),void 0===k?c.a.createElement(m.a,{variant:"light"},c.a.createElement(m.a.Heading,null,"Loading...")):null===k?c.a.createElement(m.a,{variant:"danger"},c.a.createElement(m.a.Heading,null,"Oh snap! You ran into an error"),c.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):c.a.createElement(d.a,null,c.a.createElement("h1",null,k.title),c.a.createElement(d.a,null,k.content.split("\n").map((function(e){return c.a.createElement("p",null,e)}))),c.a.createElement("p",null),k.canonChoices.length?c.a.createElement(C,{owner:k.owner,choices:k.canonChoices,account:y,canon:!0,nodeID:k.ID,onEdit:function(e){G(e.action),J(e.to.ID),xe(e.ID),ke(!0)}}):c.a.createElement("p",{className:"text-muted"},"By decree of ",c.a.createElement("strong",null,k.owner.screenName),", this journey ends here."),c.a.createElement("p",null),c.a.createElement(E.a,{variant:"light",className:"text-primary",onClick:function(){t.back(),setTimeout((function(){return window.location.reload(!1)}),100)},size:"sm"},"Go back!"),c.a.createElement("p",null),c.a.createElement("p",null,"Owner:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(k.owner.screenName)},k.owner.screenName)," ","Views: ",k.views,y&&k.owner.screenName===y.screenName?c.a.createElement("p",null,c.a.createElement(E.a,{variant:"secondary",size:"sm",onClick:function(){we(k.title),Ne(k.content),de(!0)}},"Edit"),c.a.createElement(E.a,{variant:"danger",size:"sm",onClick:function(){return Oe(!0)}},"Delete")):""),c.a.createElement("h3",null,"Other options:",c.a.createElement("p",null),c.a.createElement(g.a,{overlay:y?c.a.createElement("p",null):c.a.createElement(h.a,{id:"tooltip-disabled"},"You must be signed in!"),style:{width:"100%"}},c.a.createElement("span",{className:"d-inline-block",style:{width:"100%"}},c.a.createElement(E.a,{onClick:function(){return F(!0)},disabled:!y,style:{width:"100%",pointerEvents:y?"auto":"none"}},"Suggest New Choice")))),c.a.createElement("p",null),c.a.createElement(C,{owner:k.owner,choices:k.nonCanonChoices,account:y,canon:!1,nodeID:k.ID,onEdit:function(e){G(e.action),J(e.to.ID),xe(e.ID),ke(!0)}}),c.a.createElement(w.a,{show:Ie,onHide:function(){return ke(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Editing Choice")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Action:"),c.a.createElement(f.a.Control,{required:!0,value:V,onChange:function(e){return G(e.target.value)}}),c.a.createElement(f.a.Label,null,"Go to Page:"),c.a.createElement(O,{callback:function(e){return J(e)},toID:W})),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){return function e(t){if(t){var a=A(V);x({query:'mutation{editSuggestion(choiceID:"'.concat(Be,'",action:"').concat(a,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data?(ke(!1),Q(!1),window.location.reload(!1)):alert("Something went wrong when editing choice!")}))}else ke(!1),Q(!0),ue([e])}(W)}},"Edit Choice")))),c.a.createElement(w.a,{show:P,onHide:function(){return F(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Suggesting New Choice")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Action:"),c.a.createElement(f.a.Control,{required:!0,value:V,onChange:function(e){return G(e.target.value)}}),c.a.createElement(f.a.Label,null,"Go to Page:"),c.a.createElement(O,{callback:function(e){return J(e)},toID:W})),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){return function e(t){if(t){var a=A(V);x({query:'mutation{suggestChoice(accountScreenName:"'.concat(y.screenName,'",fromID:"').concat(v,'",action:"').concat(a,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data?(F(!1),Q(!1),window.location.reload(!1)):alert("Something went wrong when creating choice!")}))}else F(!1),Q(!0),ue([e])}(W)}},"Submit New Choice")))),c.a.createElement(w.a,{show:_,onHide:function(){return Q(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Creating New Page")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Title:"),c.a.createElement(f.a.Control,{required:!0,value:$,onChange:function(e){return ee(e.target.value)}}),c.a.createElement(f.a.Label,null,"Content:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",required:!0,value:ne,onChange:function(e){return ce(e.target.value)}}),T||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){var e=A($),t=A(ne,!0);x({query:'mutation{createNode(accountScreenName:"'.concat(y.screenName,'",title:"').concat(e,'",content:"""').concat(t,'"""){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?le[0](e.data.createNode.ID):alert("Something went wrong when creating node")}))}},"Create Page!")))),c.a.createElement(w.a,{show:me,onHide:function(){return de(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Edit Page")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Title:"),c.a.createElement(f.a.Control,{required:!0,value:he,onChange:function(e){return we(e.target.value)}}),c.a.createElement(f.a.Label,null,"Content:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",required:!0,value:ve,onChange:function(e){return Ne(e.target.value)}}),T||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){var e=A(he),t=A(ve,!0);x({query:'mutation{editNode(nodeID:"'.concat(v,'",title:"').concat(e,'",content:"""').concat(t,'"""){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editNode?(de(!1),window.location.reload(!1)):alert("Something went wrong when editing node")}))}},"Edit Page!")))),c.a.createElement(w.a,{show:Ce,onHide:function(){return Oe(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Delete Page")),c.a.createElement(w.a.Body,null,"Are you sure?"),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{variant:"danger",onClick:function(){return Oe(!1)}},"No!"),c.a.createElement(E.a,{variant:"primary",onClick:function(){x({query:'mutation{deleteNode(nodeID:"'.concat(v,'")}')}).then((function(e,t){t&&alert(t),e.data?b(c.a.createElement(i.a,{to:"/"})):alert("Something went wrong when deleting node")}))}},"Yes!"))),u||"")},S=function(e){var t=A(e.match.params.id),a=A((new s.a).get("account")),r=Object(n.useState)(void 0),o=Object(l.a)(r,2),u=o[0],y=o[1],C=Object(n.useState)(void 0),O=Object(l.a)(C,2),j=O[0],S=O[1],I=Object(n.useState)(void 0),k=Object(l.a)(I,2),D=k[0],q=k[1],B=Object(n.useState)(!1),T=Object(l.a)(B,2),L=T[0],H=T[1],P=Object(n.useState)(""),F=Object(l.a)(P,2),z=F[0],Y=F[1],V=Object(n.useState)(""),G=Object(l.a)(V,2),M=G[0],U=G[1],W=Object(n.useState)(""),J=Object(l.a)(W,2),K=J[0],R=(J[1],Object(n.useState)(!1)),_=Object(l.a)(R,2),Q=_[0],X=_[1],Z=Object(n.useState)(""),$=Object(l.a)(Z,2),ee=$[0],te=$[1],ae=Object(n.useState)(!1),ne=Object(l.a)(ae,2),ce=ne[0],re=ne[1],oe=Object(n.useState)(!1),le=Object(l.a)(oe,2);le[0],le[1];Object(n.useEffect)((function(){x({query:'query{getAccount(screenName:"'.concat(t,'"){bio,screenName,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data?S(e.data.getAccount):alert("Something went wrong when retrieving account")}));var e=new s.a;x({query:'mutation{loginAccount(screenName:"'.concat(a,'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?q(t.data.loginAccount):(alert("Something went wrong when logging in account, logging out"),e.set("account","",{path:"/"}))}))}),[]);return void 0===j?c.a.createElement(m.a,{variant:"light"},c.a.createElement(m.a.Heading,null,"Loading...")):null===j?c.a.createElement(m.a,{variant:"danger"},c.a.createElement(m.a.Heading,null,"Oh snap! You ran into an error"),c.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):c.a.createElement(d.a,null,c.a.createElement("h1",{style:{position:"relative",left:"5px"}},j.screenName),j.bio?c.a.createElement(d.a,null,j.bio.split("\n").map((function(e){return c.a.createElement("p",null,e)}))):"",c.a.createElement(d.a,{className:"text-muted text-right"},"Total views: ",j.totalNodeViews," Total score:"," ",j.totalSuggestionScore),c.a.createElement("p",null),c.a.createElement("h3",null,"Featured Pages:"),c.a.createElement(b.a,null,j.nodes.map((function(e){return c.a.createElement(v.a,null,c.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},c.a.createElement(v.a.Body,{className:"text-center"},c.a.createElement(v.a.Title,null,e.title))),e.featured?c.a.createElement(g.a,{overlay:c.a.createElement(h.a,null,"This page has been starred by this user!")},c.a.createElement("div",{style:{position:"absolute",top:"5px",left:"5px",color:"yellow","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none","text-shadow":"0 0 1px black"},class:"fa"},"\uf005")):"",c.a.createElement(N.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:c.a.createElement("span",{class:"fa"},"\uf013")},c.a.createElement(p.a.Item,{onClick:function(){return function(e,t){x({query:'mutation{editNode(nodeID:"'.concat(e.ID,'", featured:').concat(!t,"){title}}")}).then((function(e,t){t&&alert(t),e.data?window.location.reload(!1):alert("Something went wrong when featuring page")}))}(e,e.featured)},disabled:!D||D.screenName!==j.screenName},e.featured?"Un-f":"F","eature page"),c.a.createElement(p.a.Item,{disabled:!0},"Delete"),c.a.createElement(p.a.Item,{disabled:!0},"Make Private"),c.a.createElement(p.a.Divider,null),c.a.createElement(p.a.Item,{disabled:!0},"Report")),c.a.createElement(v.a.Footer,{className:"text-muted text-center"},c.a.createElement("small",null,"Created by: ",j.screenName,c.a.createElement("br",null),"Views:"," "+e.views)))}))),c.a.createElement("p",null),D&&D.screenName===j.screenName?c.a.createElement(d.a,null,c.a.createElement(E.a,{onClick:function(){return H(!0)}},"Create New Page")," ",c.a.createElement(E.a,{variant:"light",onClick:function(){te(j.bio),X(!0)}},"Edit Account"),c.a.createElement(w.a,{show:L,onHide:function(){return H(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Creating New Page")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Title:"),c.a.createElement(f.a.Control,{required:!0,value:z,onChange:function(e){return Y(e.target.value)}}),c.a.createElement(f.a.Label,null,"Content:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",required:!0,value:M,onChange:function(e){return U(e.target.value)}}),K||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){var e=A(z),t=A(M);x({query:'mutation{createNode(accountScreenName:"'.concat(j.screenName,'",title:"').concat(e,'",content:"').concat(t,'",featured:true){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?(H(!1),window.location.reload(!1)):alert("Something went wrong when creating node")}))}},"Create Page!")))),c.a.createElement(w.a,{show:Q,onHide:function(){return X(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Editing Account")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Bio:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",value:ee,onChange:function(e){return te(e.target.value)}}),K||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){var e=A(ee,!0);x({query:'mutation{editAccount(screenName:"'.concat(j.screenName,'",bio:"""').concat(e,'"""){bio,screenName,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editAccount?(S(e.data.editAccount),X(!1),window.location.reload(!1)):alert("Something went wrong when editing account")}))}},"Edit Account"),c.a.createElement(E.a,{href:"/crowdventure",onClick:function(){return(new s.a).set("account","",{path:"/"})},variant:"danger"},"Log out"),c.a.createElement(E.a,{onClick:function(){return re(!0)},variant:"danger"},"Delete Account")))),c.a.createElement(w.a,{show:ce,onHide:function(){return re(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Delete Account")),c.a.createElement(w.a.Body,null,"Are you sure?"),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{variant:"danger",onClick:function(){return re(!1)}},"No!"),c.a.createElement(E.a,{variant:"primary",onClick:function(){(new s.a).set("account","",{path:"/"}),x({query:'mutation{deleteAccount(screenName:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data?(y(c.a.createElement(i.a,{to:"/"})),window.location.reload(!1)):alert("Something went wrong when deleting account")}))}},"Yes!")))):"",u||"")},I=function(){var e=Object(n.useState)(void 0),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(void 0),u=Object(l.a)(o,2),m=(u[0],u[1],Object(n.useState)(void 0)),N=Object(l.a)(m,2),p=(N[0],N[1],Object(n.useState)("")),y=Object(l.a)(p,2),C=(y[0],y[1],Object(n.useState)(void 0)),O=Object(l.a)(C,2),j=(O[0],O[1],Object(n.useState)(!1)),S=Object(l.a)(j,2),I=S[0],k=S[1],D=Object(n.useState)(!1),q=Object(l.a)(D,2),B=q[0],T=q[1],L=Object(n.useState)(""),H=Object(l.a)(L,2),P=H[0],F=H[1],z=Object(n.useState)(""),Y=Object(l.a)(z,2),V=Y[0],G=Y[1],M=Object(n.useState)(""),U=Object(l.a)(M,2),W=U[0],J=(U[1],Object(n.useState)(void 0)),K=Object(l.a)(J,2),R=K[0],_=K[1];Object(n.useEffect)((function(){x({query:"query{featuredNodes{ID,title,owner{screenName},views}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.featuredNodes?r(e.data.featuredNodes):alert("Something went wrong when retrieving featured nodes")}));var e=new s.a,t=A(e.get("account"));x({query:'mutation{loginAccount(screenName:"'.concat(t,'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?k(t.data.loginAccount):(alert("Something went wrong when retrieving account, logging out"),e.set("account","",{path:"/"}))}))}),[]);return c.a.createElement(d.a,null,c.a.createElement("h1",null,"Welcome!"),c.a.createElement(d.a,null,"Crowdventure is a Crowd-Sourced Choose-and-Create-Your-Own-Adventure-Game!"),c.a.createElement("p",null),c.a.createElement("h3",null,"Featured Pages:"),a?c.a.createElement(b.a,null,a.map((function(e){return c.a.createElement(v.a,{className:"text-center"},c.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},c.a.createElement(v.a.Body,null,c.a.createElement(v.a.Title,null,e.title))),c.a.createElement(v.a.Footer,null,c.a.createElement("small",{className:"text-muted"},"Created by:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.owner.screenName)},e.owner.screenName),c.a.createElement("br",null),"Views:"," "+e.views)))}))):"",c.a.createElement(g.a,{overlay:I?c.a.createElement("p",null):c.a.createElement(h.a,{id:"tooltip-disabled"},"You must be signed in!"),style:{width:"100%"}},c.a.createElement("span",{className:"d-inline-block",style:{width:"100%"}},c.a.createElement(E.a,{onClick:function(){return T(!0)},disabled:!I,style:{width:"100%",pointerEvents:I?"auto":"none"}},"Create New!"))),c.a.createElement(w.a,{show:B,onHide:function(){return T(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Creating New Page")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Title:"),c.a.createElement(f.a.Control,{required:!0,value:P,onChange:function(e){return F(e.target.value)}}),c.a.createElement(f.a.Label,null,"Content:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",required:!0,value:V,onChange:function(e){return G(e.target.value)}}),W||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){var e=A(P),t=A(V);x({query:'mutation{createNode(accountScreenName:"'.concat(I.screenName,'",title:"').concat(e,'",content:"').concat(t,'",featured:true){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?(T(!1),_(c.a.createElement(i.a,{to:"/node/".concat(e.data.createNode.ID)}))):alert("Something went wrong when creating node")}))}},"Create Page!")))),R||"")},k=a(131),D=a(88),q=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(!1),u=Object(l.a)(o,2),i=u[0],m=u[1],d=Object(n.useState)(void 0),g=Object(l.a)(d,2),h=g[0],b=g[1],v=Object(n.useState)(void 0),N=Object(l.a)(v,2),p=N[0],y=N[1],C=Object(n.useState)(""),O=Object(l.a)(C,2),j=O[0],S=O[1],I=Object(n.useState)(""),D=Object(l.a)(I,2),q=D[0],B=D[1],T=Object(n.useState)(""),L=Object(l.a)(T,2),H=L[0],P=L[1],F=function(){var e=A(j),t=A(q);x({query:'mutation{createAccount(screenName:"'.concat(e,'",password:"').concat(t,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createAccount?((new s.a).set("account",j,{path:"/"}),b(e.data.createAccount),m(!1),window.location.reload(!1)):alert("Something went wrong when creating account")}))};return Object(n.useEffect)((function(){var e=A((new s.a).get("account"));e&&x({query:'mutation{loginAccount(screenName:"'.concat(e,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data?b(e.data.loginAccount):(alert("Something went wrong when logging in"),(new s.a).set("account","",{path:"/"}))}))}),[]),void 0===h||null===h?c.a.createElement(k.a.Text,null,"You are not logged in."," ",c.a.createElement(E.a,{variant:"light",onClick:function(){return r(!0)},size:"sm"},"Log In")," ","or"," ",c.a.createElement(E.a,{variant:"light",onClick:function(){return m(!0)},size:"sm"},"Sign Up"),c.a.createElement(w.a,{show:a,onHide:function(){return r(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Log in")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Screen Name:"),c.a.createElement(f.a.Control,{required:!0,value:j,onChange:function(e){return S(e.target.value)}}),c.a.createElement(f.a.Label,null,"Password:"),c.a.createElement(f.a.Control,{required:!0,type:"password",value:q,onChange:function(e){return B(e.target.value)}}),p||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{variant:"primary",onClick:function(){return function(){var e=A(j),t=A(q);x({query:'mutation{loginAccount(screenName:"'.concat(e,'",password:"').concat(t,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.loginAccount?((new s.a).set("account",j,{path:"/"}),b(e.data.getAccount),r(!1),window.location.reload(!1)):y(c.a.createElement("div",{style:{color:"red"}},"That account does not exist or the password did not match!"))}))}()}},"Log in")))),c.a.createElement(w.a,{show:i,onHide:function(){return m(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Sign Up for Crowdventure!")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Group,null,c.a.createElement(f.a.Label,null,"Screen Name:"),c.a.createElement(f.a.Control,{required:!0,value:j,onChange:function(e){return S(e.target.value)}}),c.a.createElement(f.a.Label,null,"Create Password:"),c.a.createElement(f.a.Control,{required:!0,type:"password",value:q,onChange:function(e){return B(e.target.value)}}),c.a.createElement(f.a.Label,null,"Confirm Password:"),c.a.createElement(f.a.Control,{required:!0,type:"password",value:H,onChange:function(e){return P(e.target.value)}})),p||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{variant:"primary",onClick:function(){return function(){if(q!==H)y(c.a.createElement("div",{style:{color:"red"}},"Passwords must match!"));else{var e=A(j);x({query:'query{getAccount(screenName:"'.concat(e,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getAccount?y(c.a.createElement("div",{style:{color:"red"}},"That account already exists!")):F()}))}}()}},"Sign Up"))))):c.a.createElement(k.a.Text,null,"You are logged in as:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(h.screenName),onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},h.screenName))},B=function(){return c.a.createElement(d.a,null,c.a.createElement(k.a,{expand:"lg"},c.a.createElement(k.a.Brand,{href:"/crowdventure"},c.a.createElement("img",{href:"/crowdventure",src:"/crowdventure/logo.png",alt:"Crowdventure Logo",style:{width:"100%"}})),c.a.createElement("small",{class:"text-muted"},"Version: 0.1.3"),c.a.createElement(k.a.Toggle,{"aria-controls":"basic-navbar-nav",className:"bg-light"}),c.a.createElement(k.a.Collapse,{id:"basic-navbar-nav",className:"justify-content-end"},c.a.createElement(q,null))),c.a.createElement(u.a,null,c.a.createElement(i.d,null,c.a.createElement(i.b,{path:"/",component:I,exact:!0}),c.a.createElement(i.b,{path:"/node/:id",render:function(e){return c.a.createElement(j,Object.assign({},e,{history:D.a}))}}),c.a.createElement(i.b,{path:"/account/:id",component:S}))),c.a.createElement(k.a,{className:"text-right"},c.a.createElement("small",{class:"text-muted"},"@ 2020 Copyright: (MIT) Benjamin Kern")))},x=(a(114),(0,a(118).createApolloFetch)({uri:a(116)})),A=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return t?e.replace(/"""/g,' "" " '):e.replace(/\n/g,"").replace(/\\/g,"\\\\").replace(/"/g,'\\"')};o.a.render(c.a.createElement(B,null),document.getElementById("root"))},90:function(e,t,a){e.exports=a(117)}},[[90,1,2]]]);
//# sourceMappingURL=main.ebcead12.chunk.js.map