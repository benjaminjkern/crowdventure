(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{116:function(e,t){e.exports="https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql"},117:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(19),o=a.n(r),l=a(8),u=a(52),i=a(36),s=a(23),m=a(124),d=a(125),E=a(87),g=a(132),h=a(126),w=a(129),f=a(130),b=a(127),v=a(133),N=a(128),y=a(65),p=a(89),C=function(e){var t=e.owner,a=e.account,n=e.choices,r=e.nodeID,o=e.canon,l=e.onEdit;return c.a.createElement(b.a,null,n.map((function(e){return c.a.createElement(v.a,{className:"text-center"},c.a.createElement("a",{href:e.to?"/crowdventure/#/node/".concat(e.to.ID):"",style:{pointerEvents:e.to?"auto":"none",color:e.to?void 0:"grey"},onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},c.a.createElement(v.a.Body,{style:{cursor:"pointer"}},c.a.createElement(v.a.Title,null,e.action))),c.a.createElement(N.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:c.a.createElement("span",{class:"fa"},"\uf013")},c.a.createElement(y.a.Item,{disabled:!a||a.screenName!==t.screenName,onClick:function(){return o?(t=e.ID,void x({query:'mutation{makeNonCanon(choiceID:"'.concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeNonCanon&&window.location.reload(!1)}))):function(e){x({query:'mutation{makeCanon(choiceID:"'.concat(e,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeCanon&&window.location.reload(!1)}))}(e.ID);var t}},"Make ",o?"Nonc":"C","anon"),c.a.createElement(y.a.Item,{disabled:!a||a.screenName!==e.suggestedBy.screenName&&a.screenName!==t.screenName,onClick:function(){return t=e.ID,void x({query:'mutation{removeSuggestion(choiceID:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data&&window.location.reload(!1)}));var t}},"Delete"),c.a.createElement(y.a.Item,{onClick:function(){return l(e)},disabled:!a||e.suggestedBy.screenName!==a.screenName},"Edit"),c.a.createElement(y.a.Divider,null),c.a.createElement(y.a.Item,null,"Report")),c.a.createElement(v.a.Footer,null,c.a.createElement("a",{href:"/crowdventure/#/node/".concat(r),style:{pointerEvents:a?"auto":"none",color:a?e.dislikedBy.map((function(e){return e.screenName})).includes(a.screenName)?"red":"black":"grey"},className:"fa fa-thumbs-down",onClick:function(){return t=e.ID,void(a&&x({query:'mutation{dislikeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.dislikeSuggestion&&window.location.reload(!1)})));var t}})," "+e.score+" ",c.a.createElement("a",{href:"/crowdventure/#/node/".concat(r),style:{pointerEvents:a?"auto":"none",color:a?e.likedBy.map((function(e){return e.screenName})).includes(a.screenName)?"green":"black":"grey"},className:"fa fa-thumbs-up",onClick:function(){return t=e.ID,void(a&&x({query:'mutation{likeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.likeSuggestion&&window.location.reload(!1)})));var t}}),c.a.createElement("br",null),c.a.createElement("small",{className:"text-muted"},"Suggested By:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.suggestedBy.screenName)},e.suggestedBy.screenName))))})))},O=function(e){var t=e.callback,a=e.toID,r=Object(n.useState)(void 0),o=Object(l.a)(r,2),u=o[0],i=o[1],s=Object(n.useState)(void 0),m=Object(l.a)(s,2),d=m[0],E=m[1];return Object(n.useEffect)((function(){a?x({query:'query{getNode(ID:"'.concat(a,'"){title,ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getNode?E(e.data.getNode):alert("Something went wrong when retrieving node")})):E(null),x({query:"query{allNodes{title,owner{screenName},ID}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.allNodes?i(e.data.allNodes):alert("Something went wrong when retrieving all nodes")}))}),[]),u&&void 0!==d?c.a.createElement(p.a,{filterBy:function(e,a){return""===a.text?(t(""),!0):e.title.toLowerCase().includes(a.text)||e.owner.screenName.toLowerCase().includes(a.text)},defaultSelected:[d?d.title:""],labelKey:"title",options:u,placeholder:"(Leave Empty to Create New Page)",renderMenuItemChildren:function(e){return c.a.createElement("div",{onClick:function(){return t(e.ID)}},e.title,c.a.createElement("div",null,c.a.createElement("small",null,"Author: ",e.owner.screenName)))}}):c.a.createElement("div",null,"Loading...")},j=function(e){var t=e.history,a=e.match,r=Object(n.useState)(void 0),o=Object(l.a)(r,2),u=o[0],b=o[1],v=a.params.id,N=Object(n.useState)(void 0),y=Object(l.a)(N,2),p=y[0],j=y[1],S=Object(n.useState)(void 0),I=Object(l.a)(S,2),D=I[0],k=I[1],q=Object(n.useState)(""),T=Object(l.a)(q,2),B=T[0],A=T[1],L=Object(n.useState)(!1),H=Object(l.a)(L,2),P=H[0],F=H[1],z=Object(n.useState)(""),Y=Object(l.a)(z,2),V=Y[0],G=Y[1],M=Object(n.useState)(""),U=Object(l.a)(M,2),W=U[0],J=U[1],K=Object(n.useState)(!1),R=Object(l.a)(K,2),Q=R[0],X=R[1],Z=Object(n.useState)(""),$=Object(l.a)(Z,2),_=$[0],ee=$[1],te=Object(n.useState)(""),ae=Object(l.a)(te,2),ne=ae[0],ce=ae[1],re=Object(n.useState)(void 0),oe=Object(l.a)(re,2),le=oe[0],ue=oe[1],ie=Object(n.useState)(!1),se=Object(l.a)(ie,2),me=se[0],de=se[1],Ee=Object(n.useState)(""),ge=Object(l.a)(Ee,2),he=ge[0],we=ge[1],fe=Object(n.useState)(""),be=Object(l.a)(fe,2),ve=be[0],Ne=be[1],ye=Object(n.useState)(!1),pe=Object(l.a)(ye,2),Ce=pe[0],Oe=pe[1],je=Object(n.useState)(!1),Se=Object(l.a)(je,2),Ie=Se[0],De=Se[1],ke=Object(n.useState)(""),qe=Object(l.a)(ke,2),Te=qe[0],Be=qe[1];return Object(n.useEffect)((function(){var e=new s.a,t=e.get("account");x({query:'query{getNode(ID:"'.concat(v,'"){ID,title,content,views,owner{screenName},canonChoices{suggestedBy{screenName},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}},nonCanonChoices{suggestedBy{screenName},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}}}}')}).then((function(e,t){t&&alert(t),e.data?k(e.data.getNode):k(null)})),x({query:'mutation{loginAccount(screenName:"'.concat(t,'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?j(t.data.loginAccount):(alert("Something went wrong when retrieving account"),e.set("account","",{path:"/"}))}))}),[]),void 0===D?c.a.createElement(m.a,{variant:"light"},c.a.createElement(m.a.Heading,null,"Loading...")):null===D?c.a.createElement(m.a,{variant:"danger"},c.a.createElement(m.a.Heading,null,"Oh snap! You ran into an error"),c.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):c.a.createElement(d.a,null,c.a.createElement("h1",null,D.title),c.a.createElement(d.a,null,D.content),c.a.createElement("p",null),D.canonChoices.length?c.a.createElement(C,{owner:D.owner,choices:D.canonChoices,account:p,canon:!0,nodeID:D.ID,onEdit:function(e){G(e.action),J(e.to.ID),Be(e.ID),De(!0)}}):c.a.createElement("p",{className:"text-muted"},"By decree of ",c.a.createElement("strong",null,D.owner.screenName),", this journey ends here."),c.a.createElement("p",null),c.a.createElement(E.a,{variant:"light",className:"text-primary",onClick:function(){t.back(),setTimeout((function(){return window.location.reload(!1)}),100)},size:"sm"},"Go back!"),c.a.createElement("p",null),c.a.createElement("p",null,"Owner:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(D.owner.screenName)},D.owner.screenName)," ","Views: ",D.views,p&&D.owner.screenName===p.screenName?c.a.createElement("p",null,c.a.createElement(E.a,{variant:"secondary",size:"sm",onClick:function(){we(D.title),Ne(D.content),de(!0)}},"Edit"),c.a.createElement(E.a,{variant:"danger",size:"sm",onClick:function(){return Oe(!0)}},"Delete")):""),c.a.createElement("h3",null,"Other options:",c.a.createElement("p",null),c.a.createElement(g.a,{overlay:p?c.a.createElement("p",null):c.a.createElement(h.a,{id:"tooltip-disabled"},"You must be signed in!"),style:{width:"100%"}},c.a.createElement("span",{className:"d-inline-block",style:{width:"100%"}},c.a.createElement(E.a,{onClick:function(){return F(!0)},disabled:!p,style:{width:"100%",pointerEvents:p?"auto":"none"}},"Suggest New Choice")))),c.a.createElement("p",null),c.a.createElement(C,{owner:D.owner,choices:D.nonCanonChoices,account:p,canon:!1,nodeID:D.ID,onEdit:function(e){G(e.action),J(e.to.ID),Be(e.ID),De(!0)}}),c.a.createElement(w.a,{show:Ie,onHide:function(){return De(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Editing Choice")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Action:"),c.a.createElement(f.a.Control,{required:!0,value:V,onChange:function(e){return G(e.target.value)}}),c.a.createElement(f.a.Label,null,"Go to Page:"),c.a.createElement(O,{callback:function(e){return J(e)},toID:W})),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){return function e(t){t?x({query:'mutation{editSuggestion(choiceID:"'.concat(Te,'",action:"').concat(V,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data?(De(!1),X(!1),window.location.reload(!1)):alert("Something went wrong when editing choice!")})):(De(!1),X(!0),ue([e]))}(W)}},"Edit Choice")))),c.a.createElement(w.a,{show:P,onHide:function(){return F(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Suggesting New Choice")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Action:"),c.a.createElement(f.a.Control,{required:!0,value:V,onChange:function(e){return G(e.target.value)}}),c.a.createElement(f.a.Label,null,"Go to Page:"),c.a.createElement(O,{callback:function(e){return J(e)},toID:W})),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){return function e(t){t?x({query:'mutation{suggestChoice(accountScreenName:"'.concat(p.screenName,'",fromID:"').concat(v,'",action:"').concat(V,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data?(F(!1),X(!1),window.location.reload(!1)):alert("Something went wrong when creating choice!")})):(F(!1),X(!0),ue([e]))}(W)}},"Submit New Choice")))),c.a.createElement(w.a,{show:Q,onHide:function(){return X(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Creating New Page")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Title:"),c.a.createElement(f.a.Control,{required:!0,value:_,onChange:function(e){return ee(e.target.value)}}),c.a.createElement(f.a.Label,null,"Content:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",required:!0,value:ne,onChange:function(e){return ce(e.target.value)}}),B||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){_.includes('"')?A(c.a.createElement("p",{style:{color:"red"}},"The title cannot contain (\") character! Try using (') or (`) instead!")):ne.includes('"')?A(c.a.createElement("p",{style:{color:"red"}},"The content cannot contain (\") character! Try using (') or (`) instead!")):x({query:'mutation{createNode(accountScreenName:"'.concat(p.screenName,'",title:"').concat(_,'",content:"').concat(ne,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?le[0](e.data.createNode.ID):alert("Something went wrong when creating node")}))}},"Create Page!")))),c.a.createElement(w.a,{show:me,onHide:function(){return de(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Edit Page")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Title:"),c.a.createElement(f.a.Control,{required:!0,value:he,onChange:function(e){return we(e.target.value)}}),c.a.createElement(f.a.Label,null,"Content:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",required:!0,value:ve,onChange:function(e){return Ne(e.target.value)}}),B||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){he.includes('"')?A(c.a.createElement("p",{style:{color:"red"}},"The title cannot contain (\") character! Try using (') or (`) instead!")):ve.includes('"')?A(c.a.createElement("p",{style:{color:"red"}},"The content cannot contain (\") character! Try using (') or (`) instead!")):x({query:'mutation{editNode(nodeID:"'.concat(v,'",title:"').concat(he,'",content:"').concat(ve,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editNode?(de(!1),window.location.reload(!1)):alert("Something went wrong when editing node")}))}},"Edit Page!")))),c.a.createElement(w.a,{show:Ce,onHide:function(){return Oe(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Delete Page")),c.a.createElement(w.a.Body,null,"Are you sure?"),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{variant:"danger",onClick:function(){return Oe(!1)}},"No!"),c.a.createElement(E.a,{variant:"primary",onClick:function(){x({query:'mutation{deleteNode(nodeID:"'.concat(v,'")}')}).then((function(e,t){t&&alert(t),e.data?b(c.a.createElement(i.a,{to:"/"})):alert("Something went wrong when deleting node")}))}},"Yes!"))),u||"")},S=function(e){var t=e.match.params.id,a=Object(n.useState)(void 0),r=Object(l.a)(a,2),o=r[0],u=r[1],p=Object(n.useState)(void 0),C=Object(l.a)(p,2),O=C[0],j=C[1],S=Object(n.useState)(void 0),I=Object(l.a)(S,2),D=I[0],k=I[1],q=Object(n.useState)(!1),T=Object(l.a)(q,2),B=T[0],A=T[1],L=Object(n.useState)(""),H=Object(l.a)(L,2),P=H[0],F=H[1],z=Object(n.useState)(""),Y=Object(l.a)(z,2),V=Y[0],G=Y[1],M=Object(n.useState)(""),U=Object(l.a)(M,2),W=U[0],J=U[1],K=Object(n.useState)(!1),R=Object(l.a)(K,2),Q=R[0],X=R[1],Z=Object(n.useState)(""),$=Object(l.a)(Z,2),_=$[0],ee=$[1],te=Object(n.useState)(!1),ae=Object(l.a)(te,2),ne=ae[0],ce=ae[1],re=Object(n.useState)(!1),oe=Object(l.a)(re,2);oe[0],oe[1];Object(n.useEffect)((function(){x({query:'query{getAccount(screenName:"'.concat(t,'"){bio,screenName,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data?j(e.data.getAccount):alert("Something went wrong when retrieving account")}));var e=new s.a;x({query:'mutation{loginAccount(screenName:"'.concat(e.get("account"),'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?k(t.data.loginAccount):(alert("Something went wrong when logging in account"),e.set("account","",{path:"/"}))}))}),[]);return void 0===O?c.a.createElement(m.a,{variant:"light"},c.a.createElement(m.a.Heading,null,"Loading...")):null===O?c.a.createElement(m.a,{variant:"danger"},c.a.createElement(m.a.Heading,null,"Oh snap! You ran into an error"),c.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):c.a.createElement(d.a,null,c.a.createElement("h1",{style:{position:"relative",left:"5px"}},O.screenName),O.bio?c.a.createElement(d.a,null,O.bio):"",c.a.createElement(d.a,{className:"text-muted text-right"},"Total views: ",O.totalNodeViews," Total score:"," ",O.totalSuggestionScore),c.a.createElement("p",null),c.a.createElement("h3",null,"Featured Pages:"),c.a.createElement(b.a,null,O.nodes.map((function(e){return c.a.createElement(v.a,null,c.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},c.a.createElement(v.a.Body,{className:"text-center"},c.a.createElement(v.a.Title,null,e.title))),e.featured?c.a.createElement(g.a,{overlay:c.a.createElement(h.a,null,"This page has been starred by this user!")},c.a.createElement("div",{style:{position:"absolute",top:"5px",left:"5px",color:"yellow","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none","text-shadow":"0 0 1px black"},class:"fa"},"\uf005")):"",c.a.createElement(N.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:c.a.createElement("span",{class:"fa"},"\uf013")},c.a.createElement(y.a.Item,{onClick:function(){return function(e,t){x({query:'mutation{editNode(nodeID:"'.concat(e.ID,'", featured:').concat(!t,"){title}}")}).then((function(e,t){t&&alert(t),e.data?window.location.reload(!1):alert("Something went wrong when featuring page")})),e.featured=!0}(e,e.featured)},disabled:!D||D.screenName!==O.screenName},e.featured?"Un-f":"F","eature page"),c.a.createElement(y.a.Item,{disabled:!D||D.screenName!==O.screenName},"Delete"),c.a.createElement(y.a.Item,{disabled:!D||D.screenName!==O.screenName},"Make Private"),c.a.createElement(y.a.Divider,null),c.a.createElement(y.a.Item,null,"Report")),c.a.createElement(v.a.Footer,{className:"text-muted text-center"},c.a.createElement("small",null,"Created by: ",O.screenName,c.a.createElement("br",null),"Views:"," "+e.views)))}))),c.a.createElement("p",null),D&&D.screenName===O.screenName?c.a.createElement(d.a,null,c.a.createElement(E.a,{onClick:function(){return A(!0)}},"Create new Page")," ",c.a.createElement(E.a,{variant:"light",onClick:function(){ee(O.bio),X(!0)}},"Edit Account"),c.a.createElement(w.a,{show:B,onHide:function(){return A(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Creating New Page")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Title:"),c.a.createElement(f.a.Control,{required:!0,value:P,onChange:function(e){return F(e.target.value)}}),c.a.createElement(f.a.Label,null,"Content:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",required:!0,value:V,onChange:function(e){return G(e.target.value)}}),W||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){P.includes('"')?J(c.a.createElement("p",{style:{color:"red"}},"The title cannot contain (\") character! Try using (') or (`) instead!")):V.includes('"')?J(c.a.createElement("p",{style:{color:"red"}},"The content cannot contain (\") character! Try using (') or (`) instead!")):x({query:'mutation{createNode(accountScreenName:"'.concat(O.screenName,'",title:"').concat(P,'",content:"').concat(V,'",featured:true){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?(A(!1),window.location.reload(!1)):alert("Something went wrong when creating node")}))}},"Create Page!")))),c.a.createElement(w.a,{show:Q,onHide:function(){return X(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Editing Account")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Bio:"),c.a.createElement(f.a.Control,{as:"textarea",rows:"3",value:_,onChange:function(e){return ee(e.target.value)}}),W||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{onClick:function(){_.includes('"')?J(c.a.createElement("p",{style:{color:"red"}},"Your bio cannot contain (\") character! Try using (') or (`) instead!")):x({query:'mutation{editAccount(screenName:"'.concat(O.screenName,'",bio:"').concat(_,'"){bio,screenName,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editAccount?(j(e.data.editAccount),X(!1),window.location.reload(!1)):alert("Something went wrong when editing account")}))}},"Edit Account"),c.a.createElement(E.a,{href:"/crowdventure",onClick:function(){return(new s.a).set("account","",{path:"/"})},variant:"danger"},"Log out"),c.a.createElement(E.a,{onClick:function(){return ce(!0)},variant:"danger"},"Delete Account")))),c.a.createElement(w.a,{show:ne,onHide:function(){return ce(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Delete Account")),c.a.createElement(w.a.Body,null,"Are you sure?"),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{variant:"danger",onClick:function(){return ce(!1)}},"No!"),c.a.createElement(E.a,{variant:"primary",onClick:function(){(new s.a).set("account","",{path:"/"}),x({query:'mutation{deleteAccount(screenName:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data?(u(c.a.createElement(i.a,{to:"/"})),window.location.reload(!1)):alert("Something went wrong when deleting account")}))}},"Yes!")))):"",o||"")},I=function(){var e=Object(n.useState)(void 0),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(void 0),u=Object(l.a)(o,2);u[0],u[1];return Object(n.useEffect)((function(){x({query:"query{featuredNodes{ID,title,owner{screenName},views}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.featuredNodes?r(e.data.featuredNodes):alert("Something went wrong when retrieving featured nodes")}))}),[]),c.a.createElement(d.a,null,c.a.createElement("h1",null,"Welcome!"),c.a.createElement(d.a,null,"Crowdventure is a Crowd-Sourced Choose-and-Create-Your-Own-Adventure-Game!"),c.a.createElement("p",null),c.a.createElement("h3",null,"Featured Pages:"),a?c.a.createElement(b.a,null,a.map((function(e){return c.a.createElement(v.a,{className:"text-center"},c.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},c.a.createElement(v.a.Body,null,c.a.createElement(v.a.Title,null,e.title))),c.a.createElement(v.a.Footer,null,c.a.createElement("small",{className:"text-muted"},"Created by:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.owner.screenName)},e.owner.screenName),c.a.createElement("br",null),"Views:"," "+e.views)))}))):"")},D=a(131),k=a(88),q=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],r=t[1],o=Object(n.useState)(!1),u=Object(l.a)(o,2),i=u[0],m=u[1],d=Object(n.useState)(void 0),g=Object(l.a)(d,2),h=g[0],b=g[1],v=Object(n.useState)(void 0),N=Object(l.a)(v,2),y=N[0],p=N[1],C=Object(n.useState)(""),O=Object(l.a)(C,2),j=O[0],S=O[1],I=Object(n.useState)(""),k=Object(l.a)(I,2),q=k[0],T=k[1],B=Object(n.useState)(""),A=Object(l.a)(B,2),L=A[0],H=A[1],P=function(){return x({query:'mutation{createAccount(screenName:"'.concat(j,'",password:"').concat(q,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createAccount?((new s.a).set("account",j,{path:"/"}),b(e.data.createAccount),m(!1),window.location.reload(!1)):alert("Something went wrong when creating account")}))};return Object(n.useEffect)((function(){var e=(new s.a).get("account");e&&x({query:'mutation{loginAccount(screenName:"'.concat(e,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data?b(e.data.loginAccount):(alert("Something went wrong when logging in"),(new s.a).set("account","",{path:"/"}))}))}),[]),void 0===h||null===h?c.a.createElement(D.a.Text,null,"You are not logged in."," ",c.a.createElement(E.a,{variant:"light",onClick:function(){return r(!0)},size:"sm"},"Log In")," ","or"," ",c.a.createElement(E.a,{variant:"light",onClick:function(){return m(!0)},size:"sm"},"Sign Up"),c.a.createElement(w.a,{show:a,onHide:function(){return r(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Log in")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Label,null,"Screen Name:"),c.a.createElement(f.a.Control,{required:!0,value:j,onChange:function(e){return S(e.target.value)}}),c.a.createElement(f.a.Label,null,"Password:"),c.a.createElement(f.a.Control,{required:!0,type:"password",value:q,onChange:function(e){return T(e.target.value)}}),y||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{variant:"primary",onClick:function(){j.includes('"')?p(c.a.createElement("div",{style:{color:"red"}},'Screen Name cannot include (") character!')):q.includes('"')?p(c.a.createElement("div",{style:{color:"red"}},'Password cannot include (") character!')):x({query:'mutation{loginAccount(screenName:"'.concat(j,'",password:"').concat(q,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.loginAccount?((new s.a).set("account",j,{path:"/"}),b(e.data.getAccount),r(!1),window.location.reload(!1)):p(c.a.createElement("div",{style:{color:"red"}},"That account does not exist or the password did not match!"))}))}},"Log in")))),c.a.createElement(w.a,{show:i,onHide:function(){return m(!1)}},c.a.createElement(w.a.Header,{closeButton:!0},c.a.createElement(w.a.Title,null,"Sign Up for Crowdventure!")),c.a.createElement(f.a,null,c.a.createElement(w.a.Body,null,c.a.createElement(f.a.Group,null,c.a.createElement(f.a.Label,null,"Screen Name:"),c.a.createElement(f.a.Control,{required:!0,value:j,onChange:function(e){return S(e.target.value)}}),c.a.createElement(f.a.Label,null,"Create Password:"),c.a.createElement(f.a.Control,{required:!0,type:"password",value:q,onChange:function(e){return T(e.target.value)}}),c.a.createElement(f.a.Label,null,"Confirm Password:"),c.a.createElement(f.a.Control,{required:!0,type:"password",value:L,onChange:function(e){return H(e.target.value)}})),y||""),c.a.createElement(w.a.Footer,null,c.a.createElement(E.a,{variant:"primary",onClick:function(){q!==L?p(c.a.createElement("div",{style:{color:"red"}},"Passwords must match!")):j.includes('"')?p(c.a.createElement("div",{style:{color:"red"}},'Screen Name cannot include (") character!')):q.includes('"')?p(c.a.createElement("div",{style:{color:"red"}},'Password cannot include (") character!')):x({query:'query{getAccount(screenName:"'.concat(j,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getAccount?p(c.a.createElement("div",{style:{color:"red"}},"That account already exists!")):P()}))}},"Sign Up"))))):c.a.createElement(D.a.Text,null,"You are logged in as:"," ",c.a.createElement("a",{href:"/crowdventure/#/account/".concat(h.screenName),onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},h.screenName))},T=function(){return c.a.createElement(d.a,null,c.a.createElement(D.a,{expand:"lg"},c.a.createElement(D.a.Brand,{href:"/crowdventure"},c.a.createElement("img",{href:"/crowdventure",src:"/crowdventure/logo.png",alt:"Crowdventure Logo",style:{width:"100%"}})),c.a.createElement("small",{class:"text-muted"},"Version: 0.1.3"),c.a.createElement(D.a.Toggle,{"aria-controls":"basic-navbar-nav",className:"bg-light"}),c.a.createElement(D.a.Collapse,{id:"basic-navbar-nav",className:"justify-content-end"},c.a.createElement(q,null))),c.a.createElement(u.a,null,c.a.createElement(i.d,null,c.a.createElement(i.b,{path:"/",component:I,exact:!0}),c.a.createElement(i.b,{path:"/node/:id",render:function(e){return c.a.createElement(j,Object.assign({},e,{history:k.a}))}}),c.a.createElement(i.b,{path:"/account/:id",component:S}))),c.a.createElement(D.a,{className:"text-right"},c.a.createElement("small",{class:"text-muted"},"@ 2020 Copyright: (MIT) Benjamin Kern")))},B=(a(114),(0,a(118).createApolloFetch)({uri:a(116)}));o.a.render(c.a.createElement(T,null),document.getElementById("root"));var x=t.default=B},90:function(e,t,a){e.exports=a(117)}},[[90,1,2]]]);
//# sourceMappingURL=main.cca530fc.chunk.js.map