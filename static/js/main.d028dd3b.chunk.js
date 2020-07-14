(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{112:function(e,t){e.exports="https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql"},113:function(e,t,a){"use strict";a.r(t),a.d(t,"app_fetch",(function(){return B})),a.d(t,"escape",(function(){return x}));var n=a(0),r=a.n(n),c=a(20),o=a.n(c),l=a(14),i=a(45),u=a(15),s=a(10),m=a(21),d=a(121),g=a(122),E=a(81),f=a(129),h=a(123),w=a(126),b=a(127),p=a(124),v=a(130),y=a(125),N=a(61),j=a(83),C=function(e){var t=e.owner,a=e.account,n=e.choices,c=e.nodeID,o=e.canon,l=e.onEdit;return r.a.createElement(p.a,null,n.map((function(e){return r.a.createElement(v.a,{className:"text-center"},r.a.createElement("a",{href:e.to?"/crowdventure/#/node/".concat(e.to.ID):"",style:{pointerEvents:e.to?"auto":"none",color:e.to?void 0:"grey"},onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},r.a.createElement(v.a.Body,{style:{cursor:"pointer"}},r.a.createElement(v.a.Title,null,e.action))),r.a.createElement(y.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:r.a.createElement("span",{class:"fa"},"\uf013")},r.a.createElement(N.a.Item,{disabled:!a||a.screenName!==t.screenName,onClick:function(){return o?(t=e.ID,void B({query:'mutation{makeNonCanon(choiceID:"'.concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeNonCanon&&window.location.reload(!1)}))):function(e){B({query:'mutation{makeCanon(choiceID:"'.concat(e,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeCanon&&window.location.reload(!1)}))}(e.ID);var t}},"Make ",o?"Nonc":"C","anon"),r.a.createElement(N.a.Item,{disabled:!a||a.screenName!==e.suggestedBy.screenName&&a.screenName!==t.screenName,onClick:function(){return t=e.ID,void B({query:'mutation{removeSuggestion(choiceID:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data&&window.location.reload(!1)}));var t}},"Delete"),r.a.createElement(N.a.Item,{onClick:function(){return l(e)},disabled:!o||!a||a.screenName!==e.suggestedBy.screenName&&a.screenName!==t.screenName},"Edit"),r.a.createElement(N.a.Divider,null),r.a.createElement(N.a.Item,{disabled:!0},"Report")),r.a.createElement(v.a.Footer,null,r.a.createElement("a",{href:"/crowdventure/#/node/".concat(c),style:{pointerEvents:a?"auto":"none",color:a?e.dislikedBy.map((function(e){return e.screenName})).includes(a.screenName)?"red":"black":"grey"},className:"fa fa-thumbs-down",onClick:function(){return t=e.ID,void(a&&B({query:'mutation{dislikeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.dislikeSuggestion&&window.location.reload(!1)})));var t}})," "+e.score+" ",r.a.createElement("a",{href:"/crowdventure/#/node/".concat(c),style:{pointerEvents:a?"auto":"none",color:a?e.likedBy.map((function(e){return e.screenName})).includes(a.screenName)?"green":"black":"grey"},className:"fa fa-thumbs-up",onClick:function(){return t=e.ID,void(a&&B({query:'mutation{likeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.likeSuggestion&&window.location.reload(!1)})));var t}}),r.a.createElement("br",null),r.a.createElement("small",{className:"text-muted"},"Suggested By:"," ",r.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.suggestedBy.screenName)},r.a.createElement("img",{src:e.suggestedBy.profilePicURL?e.suggestedBy.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{border:"1px solid #bbb",height:"2em",width:"2em","object-fit":"cover","border-radius":"50%"}})," ",e.suggestedBy.screenName))))})))},O=function(e){var t=e.callback,a=e.toID,c=Object(n.useState)(void 0),o=Object(s.a)(c,2),l=o[0],i=o[1],u=Object(n.useState)(void 0),m=Object(s.a)(u,2),d=m[0],g=m[1];return Object(n.useEffect)((function(){a?B({query:'query{getNode(ID:"'.concat(a,'"){title,ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getNode?g(e.data.getNode):alert("Something went wrong when retrieving node")})):g(null),B({query:"query{allNodes{title,owner{screenName},ID}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.allNodes?i(e.data.allNodes):alert("Something went wrong when retrieving all nodes")}))}),[]),l&&void 0!==d?r.a.createElement(j.a,{filterBy:function(e,a){return""===a.text?(t(""),!0):e.title.toLowerCase().includes(a.text.toLowerCase())||e.owner.screenName.toLowerCase().includes(a.text.toLowerCase())},defaultSelected:[d?d.title:""],labelKey:"title",options:l,placeholder:"(Leave Empty to Create New Page)",renderMenuItemChildren:function(e){return r.a.createElement("div",{onClick:function(){return t(e.ID)}},e.title,r.a.createElement("div",null,r.a.createElement("small",null,"Author: ",e.owner.screenName)))}}):r.a.createElement("div",null,"Loading...")},S=function(e){var t=e.history,a=e.match,c=Object(n.useState)(void 0),o=Object(s.a)(c,2),l=o[0],i=o[1],p=x(a.params.id),v=Object(n.useState)(void 0),y=Object(s.a)(v,2),N=y[0],j=y[1],S=Object(n.useState)(void 0),L=Object(s.a)(S,2),k=L[0],I=L[1],P=Object(n.useState)(""),D=Object(s.a)(P,2),q=D[0],U=D[1],R=Object(n.useState)(!1),A=Object(s.a)(R,2),T=A[0],H=A[1],F=Object(n.useState)(""),z=Object(s.a)(F,2),Y=z[0],V=z[1],M=Object(n.useState)(""),G=Object(s.a)(M,2),W=G[0],J=G[1],K=Object(n.useState)(!1),_=Object(s.a)(K,2),Q=_[0],X=_[1],Z=Object(n.useState)(""),$=Object(s.a)(Z,2),ee=$[0],te=$[1],ae=Object(n.useState)(""),ne=Object(s.a)(ae,2),re=ne[0],ce=ne[1],oe=Object(n.useState)(""),le=Object(s.a)(oe,2),ie=le[0],ue=le[1],se=Object(n.useState)(void 0),me=Object(s.a)(se,2),de=me[0],ge=me[1],Ee=Object(n.useState)(!1),fe=Object(s.a)(Ee,2),he=fe[0],we=fe[1],be=Object(n.useState)(""),pe=Object(s.a)(be,2),ve=pe[0],ye=pe[1],Ne=Object(n.useState)(""),je=Object(s.a)(Ne,2),Ce=je[0],Oe=je[1],Se=Object(n.useState)(""),Le=Object(s.a)(Se,2),ke=Le[0],Ie=Le[1],Pe=Object(n.useState)(!1),De=Object(s.a)(Pe,2),qe=De[0],Be=De[1],xe=Object(n.useState)(!1),Ue=Object(s.a)(xe,2),Re=Ue[0],Ae=Ue[1],Te=Object(n.useState)(""),He=Object(s.a)(Te,2),Fe=He[0],ze=He[1],Ye=Object(n.useState)(!1),Ve=Object(s.a)(Ye,2),Me=Ve[0],Ge=Ve[1];return Object(n.useEffect)((function(){var t=new m.a,a=x(t.get("account"));B({query:'query{getNode(ID:"'.concat(p,'"){pictureURL,fgColor,bgColor,ID,title,content,views,owner{screenName},canonChoices{suggestedBy{screenName,profilePicURL},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}},nonCanonChoices{suggestedBy{screenName,profilePicURL},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}}}}')}).then((function(t,a){a&&alert(a),t.data&&t.data.getNode?(I(t.data.getNode),e.setBgColor(t.data.getNode.bgColor),e.setFgColor(t.data.getNode.fgColor)):I(null)})),B({query:'mutation{loginAccount(screenName:"'.concat(a,'"){screenName}}')}).then((function(e,a){a&&alert(a),e.data?j(e.data.loginAccount):(alert("Something went wrong when retrieving account logging out"),t.set("account","",{path:"/"}))}))}),[]),void 0===k?r.a.createElement(d.a,{variant:"light"},r.a.createElement("title",null,"Loading Page..."),r.a.createElement(d.a.Heading,null,"Loading...")):null===k?r.a.createElement(d.a,{variant:"danger"},r.a.createElement(d.a.Heading,null,"Oh snap! You ran into an error"),r.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):r.a.createElement(g.a,null,r.a.createElement("title",null,"Crowdventure! - ",k.title),k.pictureURL?r.a.createElement("img",{src:k.pictureURL,onError:function(e){e.target.style.display="none",U(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{display:"block","margin-left":"auto","margin-right":"auto",border:"1px solid #eee","border-radius":"8px",width:"90%",height:"25vw","object-fit":"cover",cursor:"pointer"},onClick:function(){return Ge(!0)}}):"",r.a.createElement("h1",null,k.title),r.a.createElement(g.a,null,k.content.split("\n").map((function(e){return r.a.createElement("p",null,e)}))),r.a.createElement("p",null),k.canonChoices.length?r.a.createElement(C,{owner:k.owner,choices:k.canonChoices,account:N,canon:!0,nodeID:k.ID,onEdit:function(e){V(e.action),J(e.to.ID),ze(e.ID),Ae(!0)}}):r.a.createElement("p",{className:"text-muted"},"By decree of ",r.a.createElement("strong",null,k.owner.screenName),", this journey ends here."),r.a.createElement("p",null),r.a.createElement(E.a,{variant:"light",className:"text-primary",onClick:function(){t.back(),setTimeout((function(){return window.location.reload(!1)}),100)},size:"sm"},"Go back!"),r.a.createElement("p",null),r.a.createElement("p",null,"Owner:"," ",r.a.createElement("a",{href:"/crowdventure/#/account/".concat(k.owner.screenName)},k.owner.screenName)," ","Views: ",k.views,N&&k.owner.screenName===N.screenName?r.a.createElement("p",null,r.a.createElement(E.a,{variant:"secondary",size:"sm",onClick:function(){ye(k.title),Oe(k.content),Ie(k.pictureURL),we(!0)}},"Edit"),r.a.createElement(E.a,{variant:"danger",size:"sm",onClick:function(){return Be(!0)}},"Delete")):""),r.a.createElement("h3",null,"Other options:",r.a.createElement("p",null),r.a.createElement(f.a,{overlay:N?r.a.createElement("p",null):r.a.createElement(h.a,{id:"tooltip-disabled"},"You must be signed in!"),style:{width:"100%"}},r.a.createElement("span",{className:"d-inline-block",style:{width:"100%"}},r.a.createElement(E.a,{onClick:function(){return H(!0)},disabled:!N,style:{width:"100%",pointerEvents:N?"auto":"none"}},"Suggest New Choice")))),r.a.createElement("p",null),r.a.createElement(C,{owner:k.owner,choices:k.nonCanonChoices,account:N,canon:!1,nodeID:k.ID,onEdit:function(e){V(e.action),J(e.to.ID),ze(e.ID),Ae(!0)}}),r.a.createElement(w.a,{show:Re,onHide:function(){return Ae(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Editing Choice")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,r.a.createElement(b.a.Label,null,"Action:"),r.a.createElement(b.a.Control,{required:!0,value:Y,onChange:function(e){return V(e.target.value)}}),r.a.createElement(b.a.Label,null,"Go to Page:"),r.a.createElement(O,{callback:function(e){return J(e)},toID:W})),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{onClick:function(){return function e(t){if(t){var a=x(Y);B({query:'mutation{editSuggestion(choiceID:"'.concat(Fe,'",action:"').concat(a,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data?(Ae(!1),X(!1),window.location.reload(!1)):alert("Something went wrong when editing choice!")}))}else Ae(!1),X(!0),ue(k.pictureURL),ge([e])}(W)}},"Edit Choice")))),r.a.createElement(w.a,{show:T,onHide:function(){return H(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Suggesting New Choice")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,r.a.createElement(b.a.Label,null,"Action:"),r.a.createElement(b.a.Control,{required:!0,value:Y,onChange:function(e){return V(e.target.value)}}),r.a.createElement(b.a.Label,null,"Go to Page:"),r.a.createElement(O,{callback:function(e){return J(e)},toID:W})),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{onClick:function(){return function e(t){if(t){var a=x(Y);B({query:'mutation{suggestChoice(accountScreenName:"'.concat(N.screenName,'",fromID:"').concat(p,'",action:"').concat(a,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data?(H(!1),X(!1),window.location.reload(!1)):alert("Something went wrong when creating choice!")}))}else H(!1),X(!0),ue(k.pictureURL),ge([e])}(W)}},"Submit New Choice")))),r.a.createElement(w.a,{show:Q,onHide:function(){return X(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Creating New Page")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,k.pictureURL?r.a.createElement("img",{src:k.pictureURL,onError:function(e){e.target.style.display="none",U(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{opacity:k.pictureURL===ie?1:.2,width:"100%","object-fit":"contain"}}):"",r.a.createElement(b.a.Label,null,"Title:"),r.a.createElement(b.a.Control,{required:!0,value:ee,onChange:function(e){return te(e.target.value)}}),r.a.createElement(b.a.Label,null,"Content:"),r.a.createElement(b.a.Control,{as:"textarea",rows:"3",required:!0,value:re,onChange:function(e){return ce(e.target.value)}}),r.a.createElement(b.a.Label,null,"Picture URL:"),r.a.createElement(b.a.Control,{required:!0,value:ie,onChange:function(e){return ue(e.target.value)},placeholder:"(Leave empty to not use a picture)"}),q||""),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{onClick:function(){var e=x(ee),t=x(re,!0),a=x(ie);B({query:'mutation{createNode(accountScreenName:"'.concat(N.screenName,'",title:"').concat(e,'",content:"""').concat(t,'""",pictureURL:"').concat(a,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?de[0](e.data.createNode.ID):alert("Something went wrong when creating node")}))}},"Create Page!")))),r.a.createElement(w.a,{show:he,onHide:function(){return we(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Edit Page")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,k.pictureURL?r.a.createElement("img",{src:k.pictureURL,onError:function(e){e.target.style.display="none",U(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{opacity:k.pictureURL===ke?1:.2,width:"100%","object-fit":"contain"}}):"",r.a.createElement(b.a.Label,null,"Title:"),r.a.createElement(b.a.Control,{required:!0,value:ve,onChange:function(e){return ye(e.target.value)}}),r.a.createElement(b.a.Label,null,"Content:"),r.a.createElement(b.a.Control,{as:"textarea",rows:"3",required:!0,value:Ce,onChange:function(e){return Oe(e.target.value)}}),r.a.createElement(b.a.Label,null,"Picture URL:"),r.a.createElement(b.a.Control,{required:!0,value:ke,onChange:function(e){Ie(e.target.value),U("")},placeholder:"(Leave empty to not use a picture)"}),q||""),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{onClick:function(){var e=x(ve),t=x(Ce,!0),a=x(ke);B({query:'mutation{editNode(nodeID:"'.concat(p,'",title:"').concat(e,'",content:"""').concat(t,'""",pictureURL:"').concat(a,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editNode?(we(!1),window.location.reload(!1)):alert("Something went wrong when editing node")}))}},"Edit Page!")))),r.a.createElement(w.a,{show:qe,onHide:function(){return Be(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Delete Page")),r.a.createElement(w.a.Body,null,"Are you sure?"),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{variant:"danger",onClick:function(){return Be(!1)}},"No!"),r.a.createElement(E.a,{variant:"primary",onClick:function(){B({query:'mutation{deleteNode(nodeID:"'.concat(p,'")}')}).then((function(e,t){t&&alert(t),e.data?i(r.a.createElement(u.a,{to:"/"})):alert("Something went wrong when deleting node")}))}},"Yes!"))),r.a.createElement(w.a,{show:Me,onHide:function(){return Ge(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,k.title)),r.a.createElement("img",{src:k.pictureURL,onError:function(e){e.target.style.display="none",U(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{width:"100%","object-fit":"contain"}}),q||"",r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{size:"sm",onClick:function(){return Ge(!1)}},"Thanks for showing me this ",Math.random()<.5?"cool":"neat"," ","picture!"))),l||"")},L=function(e){var t=x(e.match.params.id),a=x((new m.a).get("account")),c=Object(n.useState)(void 0),o=Object(l.a)(c,2),i=o[0],s=o[1],j=Object(n.useState)(void 0),C=Object(l.a)(j,2),O=C[0],S=C[1],L=Object(n.useState)(void 0),k=Object(l.a)(L,2),I=k[0],P=k[1],D=Object(n.useState)(!1),q=Object(l.a)(D,2),U=q[0],R=q[1],A=Object(n.useState)(""),T=Object(l.a)(A,2),H=T[0],F=T[1],z=Object(n.useState)(""),Y=Object(l.a)(z,2),V=Y[0],M=Y[1],G=Object(n.useState)(""),W=Object(l.a)(G,2),J=W[0],K=W[1],_=Object(n.useState)(!1),Q=Object(l.a)(_,2),X=Q[0],Z=Q[1],$=Object(n.useState)(""),ee=Object(l.a)($,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(!1),re=Object(l.a)(ne,2),ce=re[0],oe=re[1],le=Object(n.useState)(""),ie=Object(l.a)(le,2),ue=ie[0],se=ie[1],me=Object(n.useState)(!1),de=Object(l.a)(me,2),ge=de[0],Ee=de[1];Object(n.useEffect)((function(){B({query:'query{getAccount(screenName:"'.concat(t,'"){bio,screenName,profilePicURL,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data?S(e.data.getAccount):alert("Something went wrong when retrieving account")}));var e=new m.a;B({query:'mutation{loginAccount(screenName:"'.concat(a,'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?P(t.data.loginAccount):(alert("Something went wrong when logging in account, logging out"),e.set("account","",{path:"/"}))}))}),[]);return void 0===O?r.a.createElement(d.a,{variant:"light"},r.a.createElement("title",null,"Loading Account..."),r.a.createElement(d.a.Heading,null,"Loading...")):null===O?r.a.createElement(d.a,{variant:"danger"},r.a.createElement(d.a.Heading,null,"Oh snap! You ran into an error"),r.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):r.a.createElement(g.a,null,r.a.createElement("title",null,O.screenName," on Crowdventure!"),r.a.createElement("h1",null,r.a.createElement("img",{src:O.profilePicURL?O.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{border:"1px solid #bbb",height:"3em",width:"3em","object-fit":"cover","border-radius":"50%","margin-right":"5px",cursor:"pointer"},onClick:function(){return Ee(!0)}})," ",O.screenName),O.bio?r.a.createElement(g.a,null,O.bio.split("\n").map((function(e){return r.a.createElement("p",null,e)}))):"",r.a.createElement(g.a,null,I&&I.screenName===O.screenName?r.a.createElement(E.a,{variant:"light",onClick:function(){ae(O.bio),se(O.profilePicURL),Z(!0)}},"Edit Account"):"",r.a.createElement("div",{style:{float:"right"},class:"text-muted"},"Total views: ",O.totalNodeViews," Total score:"," ",O.totalSuggestionScore)),r.a.createElement("p",null),r.a.createElement("h3",null,"Featured Pages:"),r.a.createElement(p.a,null,O.nodes.map((function(e){return r.a.createElement(v.a,null,r.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},r.a.createElement(v.a.Body,{className:"text-center"},r.a.createElement(v.a.Title,null,e.title))),e.featured?r.a.createElement(f.a,{overlay:r.a.createElement(h.a,null,"This page has been starred by this user!")},r.a.createElement("div",{style:{position:"absolute",top:"5px",left:"5px",color:"yellow","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none","text-shadow":"0 0 1px black"},class:"fa"},"\uf005")):"",r.a.createElement(y.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:r.a.createElement("span",{class:"fa"},"\uf013")},r.a.createElement(N.a.Item,{onClick:function(){return function(e,t){B({query:'mutation{editNode(nodeID:"'.concat(e.ID,'", featured:').concat(!t,"){title}}")}).then((function(e,t){t&&alert(t),e.data?window.location.reload(!1):alert("Something went wrong when featuring page")}))}(e,e.featured)},disabled:!I||I.screenName!==O.screenName},e.featured?"Un-f":"F","eature page"),r.a.createElement(N.a.Item,{disabled:!0},"Delete"),r.a.createElement(N.a.Item,{disabled:!0},"Make Private"),r.a.createElement(N.a.Divider,null),r.a.createElement(N.a.Item,{disabled:!0},"Report")),r.a.createElement(v.a.Footer,{className:"text-muted text-center"},r.a.createElement("small",null,"Created by:"," ",r.a.createElement("img",{src:O.profilePicURL?O.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{border:"1px solid #bbb",height:"2em",width:"2em","object-fit":"cover","border-radius":"50%"}})," ",O.screenName,r.a.createElement("br",null),"Views:"," "+e.views)))}))),r.a.createElement(w.a,{show:ge,onHide:function(){return Ee(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,O.screenName)),r.a.createElement("img",{src:O.profilePicURL?O.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{width:"100%","object-fit":"contain"}}),J||"",r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{size:"sm",onClick:function(){return Ee(!1)}},"Wow, ",O.screenName," has a"," ",Math.random()<.5?"cool":"neat"," profile picture!"))),r.a.createElement("p",null),I&&I.screenName===O.screenName?r.a.createElement(g.a,null,r.a.createElement(E.a,{onClick:function(){return R(!0)},style:{width:"100%"}},"Create New Page")," ",r.a.createElement(w.a,{show:U,onHide:function(){return R(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Creating New Page")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,r.a.createElement(b.a.Label,null,"Title:"),r.a.createElement(b.a.Control,{required:!0,value:H,onChange:function(e){return F(e.target.value)}}),r.a.createElement(b.a.Label,null,"Content:"),r.a.createElement(b.a.Control,{as:"textarea",rows:"3",required:!0,value:V,onChange:function(e){return M(e.target.value)}}),J||""),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{onClick:function(){var e=x(H),t=x(V);B({query:'mutation{createNode(accountScreenName:"'.concat(O.screenName,'",title:"').concat(e,'",content:"').concat(t,'",featured:true){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?(R(!1),window.location.reload(!1)):alert("Something went wrong when creating node")}))}},"Create Page!")))),r.a.createElement(w.a,{show:X,onHide:function(){return Z(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Editing Account")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,O.profilePicURL?r.a.createElement("img",{src:O.profilePicURL,onError:function(e){e.target.style.display="none",K(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{opacity:O.profilePicURL===ue?1:.2,width:"100%","object-fit":"contain"}}):"",r.a.createElement(b.a.Label,null,"Profile Pic URL:"),r.a.createElement(b.a.Control,{value:ue,onChange:function(e){return se(e.target.value)}}),r.a.createElement(b.a.Label,null,"Bio:"),r.a.createElement(b.a.Control,{as:"textarea",rows:"3",value:te,onChange:function(e){return ae(e.target.value)}}),J||""),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{onClick:function(){var e=x(te,!0),t=x(ue);B({query:'mutation{editAccount(screenName:"'.concat(O.screenName,'",bio:"""').concat(e,'""",profilePicURL:"').concat(t,'"){bio,screenName,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editAccount?(S(e.data.editAccount),Z(!1),window.location.reload(!1)):alert("Something went wrong when editing account")}))}},"Edit Account"),r.a.createElement(E.a,{href:"/crowdventure",onClick:function(){return(new m.a).set("account","",{path:"/"})},variant:"danger"},"Log out"),r.a.createElement(E.a,{onClick:function(){return oe(!0)},variant:"danger"},"Delete Account")))),r.a.createElement(w.a,{show:ce,onHide:function(){return oe(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Delete Account")),r.a.createElement(w.a.Body,null,"Are you sure?"),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{variant:"danger",onClick:function(){return oe(!1)}},"No!"),r.a.createElement(E.a,{variant:"primary",onClick:function(){(new m.a).set("account","",{path:"/"}),B({query:'mutation{deleteAccount(screenName:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data?(s(r.a.createElement(u.a,{to:"/"})),window.location.reload(!1)):alert("Something went wrong when deleting account")}))}},"Yes!")))):"",i||"")},k=(a(109),function(){var e=Object(n.useState)(void 0),t=Object(s.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(void 0),l=Object(s.a)(o,2),i=(l[0],l[1],Object(n.useState)(void 0)),y=Object(s.a)(i,2),N=(y[0],y[1],Object(n.useState)("")),j=Object(s.a)(N,2),C=(j[0],j[1],Object(n.useState)(void 0)),O=Object(s.a)(C,2),S=(O[0],O[1],Object(n.useState)(!1)),L=Object(s.a)(S,2),k=L[0],I=L[1],P=Object(n.useState)(!1),D=Object(s.a)(P,2),q=D[0],U=D[1],R=Object(n.useState)(""),A=Object(s.a)(R,2),T=A[0],H=A[1],F=Object(n.useState)(""),z=Object(s.a)(F,2),Y=z[0],V=z[1],M=Object(n.useState)(""),G=Object(s.a)(M,2),W=G[0],J=(G[1],Object(n.useState)(void 0)),K=Object(s.a)(J,2),_=K[0],Q=K[1];Object(n.useEffect)((function(){B({query:"query{featuredNodes{ID,title,owner{screenName,profilePicURL},views,size,pictureURL}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.featuredNodes?c(e.data.featuredNodes):alert("Something went wrong when retrieving featured nodes")}));var e=new m.a,t=x(e.get("account"));B({query:'mutation{loginAccount(screenName:"'.concat(t,'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?I(t.data.loginAccount):(alert("Something went wrong when retrieving account, logging out"),e.set("account","",{path:"/"}))}))}),[]);return r.a.createElement(g.a,null,r.a.createElement("title",null,"Crowdventure!"),r.a.createElement("h1",null,"Welcome!"),r.a.createElement(g.a,null,"Crowdventure is a Crowd-Sourced Choose-and-Create-Your-Own-Adventure-Game!"),r.a.createElement("p",null),r.a.createElement("h3",null,"Featured Pages:"),a?r.a.createElement(p.a,null,a.map((function(e){return r.a.createElement(v.a,{className:"text-center"},r.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},e.pictureURL?r.a.createElement(v.a.Header,{style:{"background-color":"white",padding:"0px"}},r.a.createElement(v.a.Img,{src:e.pictureURL,style:{"max-height":"56.25vw","object-fit":"cover"}})):"",r.a.createElement(v.a.Body,null,r.a.createElement(v.a.Title,null,e.title))),r.a.createElement(v.a.Footer,null,r.a.createElement("small",{className:"text-muted"},"Created by:"," ",r.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.owner.screenName)},r.a.createElement("img",{src:e.owner.profilePicURL?e.owner.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{border:"1px solid #bbb",height:"2em",width:"2em","object-fit":"cover","border-radius":"50%"}})," ",e.owner.screenName),r.a.createElement("br",null),"Story Size: ",e.size,r.a.createElement("br",null),"Views: ",e.views)))}))):r.a.createElement(d.a,{variant:"light"},r.a.createElement(d.a.Heading,null,"Loading...")),r.a.createElement(f.a,{overlay:k?r.a.createElement("p",null):r.a.createElement(h.a,{id:"tooltip-disabled"},"You must be signed in!"),style:{width:"100%"}},r.a.createElement("span",{className:"d-inline-block",style:{width:"100%"}},r.a.createElement(E.a,{onClick:function(){return U(!0)},disabled:!k,style:{width:"100%",pointerEvents:k?"auto":"none"}},"Create New!"))),r.a.createElement(w.a,{show:q,onHide:function(){return U(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Creating New Page")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,r.a.createElement(b.a.Label,null,"Title:"),r.a.createElement(b.a.Control,{required:!0,value:T,onChange:function(e){return H(e.target.value)}}),r.a.createElement(b.a.Label,null,"Content:"),r.a.createElement(b.a.Control,{as:"textarea",rows:"3",required:!0,value:Y,onChange:function(e){return V(e.target.value)}}),W||""),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{onClick:function(){var e=x(T),t=x(Y);B({query:'mutation{createNode(accountScreenName:"'.concat(k.screenName,'",title:"').concat(e,'",content:"').concat(t,'",featured:true){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?(U(!1),Q(r.a.createElement(u.a,{to:"/node/".concat(e.data.createNode.ID)}))):alert("Something went wrong when creating node")}))}},"Create Page!")))),_||"")}),I=a(128),P=a(82),D=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(!1),i=Object(l.a)(o,2),u=i[0],s=i[1],d=Object(n.useState)(void 0),g=Object(l.a)(d,2),f=g[0],h=g[1],p=Object(n.useState)(void 0),v=Object(l.a)(p,2),y=v[0],N=v[1],j=Object(n.useState)(""),C=Object(l.a)(j,2),O=C[0],S=C[1],L=Object(n.useState)(""),k=Object(l.a)(L,2),P=k[0],D=k[1],q=Object(n.useState)(""),U=Object(l.a)(q,2),R=U[0],A=U[1],T=function(){var e=x(O),t=x(P);B({query:'mutation{createAccount(screenName:"'.concat(e,'",password:"').concat(t,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createAccount?((new m.a).set("account",O,{path:"/"}),h(e.data.createAccount),s(!1),window.location.reload(!1)):alert("Something went wrong when creating account")}))};return Object(n.useEffect)((function(){var e=x((new m.a).get("account"));e&&B({query:'mutation{loginAccount(screenName:"'.concat(e,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data?h(e.data.loginAccount):(alert("Something went wrong when logging in"),(new m.a).set("account","",{path:"/"}))}))}),[]),void 0===f||null===f?r.a.createElement(I.a.Text,null,"You are not logged in."," ",r.a.createElement(E.a,{variant:"light",onClick:function(){return c(!0)},size:"sm"},"Log In")," ","or"," ",r.a.createElement(E.a,{variant:"light",onClick:function(){return s(!0)},size:"sm"},"Sign Up"),r.a.createElement(w.a,{show:a,onHide:function(){return c(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Log in")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,r.a.createElement(b.a.Label,null,"Screen Name:"),r.a.createElement(b.a.Control,{required:!0,value:O,onChange:function(e){return S(e.target.value)}}),r.a.createElement(b.a.Label,null,"Password:"),r.a.createElement(b.a.Control,{required:!0,type:"password",value:P,onChange:function(e){return D(e.target.value)}}),y||""),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{variant:"primary",onClick:function(){return function(){var e=x(O),t=x(P);B({query:'mutation{loginAccount(screenName:"'.concat(e,'",password:"').concat(t,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.loginAccount?((new m.a).set("account",O,{path:"/"}),h(e.data.getAccount),c(!1),window.location.reload(!1)):N(r.a.createElement("div",{style:{color:"red"}},"That account does not exist or the password did not match!"))}))}()}},"Log in")))),r.a.createElement(w.a,{show:u,onHide:function(){return s(!1)}},r.a.createElement(w.a.Header,{closeButton:!0},r.a.createElement(w.a.Title,null,"Sign Up for Crowdventure!")),r.a.createElement(b.a,null,r.a.createElement(w.a.Body,null,r.a.createElement(b.a.Group,null,r.a.createElement(b.a.Label,null,"Screen Name:"),r.a.createElement(b.a.Control,{required:!0,value:O,onChange:function(e){return S(e.target.value)}}),r.a.createElement(b.a.Label,null,"Create Password:"),r.a.createElement(b.a.Control,{required:!0,type:"password",value:P,onChange:function(e){return D(e.target.value)}}),r.a.createElement(b.a.Label,null,"Confirm Password:"),r.a.createElement(b.a.Control,{required:!0,type:"password",value:R,onChange:function(e){return A(e.target.value)}})),y||""),r.a.createElement(w.a.Footer,null,r.a.createElement(E.a,{variant:"primary",onClick:function(){return function(){if(P!==R)N(r.a.createElement("div",{style:{color:"red"}},"Passwords must match!"));else{var e=x(O);B({query:'query{getAccount(screenName:"'.concat(e,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getAccount?N(r.a.createElement("div",{style:{color:"red"}},"That account already exists!")):T()}))}}()}},"Sign Up"))))):r.a.createElement(I.a.Text,null,"You are logged in as:"," ",r.a.createElement("a",{href:"/crowdventure/#/account/".concat(f.screenName),onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},f.screenName))},q=function(){var e=Object(n.useState)(void 0),t=Object(l.a)(e,2),a=(t[0],t[1]),c=Object(n.useState)(void 0),o=Object(l.a)(c,2),s=(o[0],o[1]);return r.a.createElement(g.a,null,r.a.createElement(I.a,{expand:"lg"},r.a.createElement(I.a.Brand,{href:"/crowdventure"},r.a.createElement("img",{href:"/crowdventure",src:"/crowdventure/logo.png",alt:"Crowdventure Logo",style:{width:"100%"}})),r.a.createElement("small",{class:"text-muted"},"Version: 0.1.4"),r.a.createElement(I.a.Toggle,{"aria-controls":"basic-navbar-nav",className:"bg-light"}),r.a.createElement(I.a.Collapse,{id:"basic-navbar-nav",className:"justify-content-end"},r.a.createElement(D,null))),r.a.createElement(i.a,null,r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/",component:k,exact:!0}),r.a.createElement(u.b,{path:"/node/:id",render:function(e){return r.a.createElement(S,Object.assign({},e,{history:P.a,setBgColor:a,setFgColor:s}))}}),r.a.createElement(u.b,{path:"/account/:id",component:L}))),r.a.createElement(I.a,{className:"text-right"},r.a.createElement("small",{class:"text-muted"},"@ 2020 Copyright: (MIT) Benjamin Kern")),r.a.createElement("title",null,"Crowdventure! - Page not found!"))},B=(a(110),(0,a(114).createApolloFetch)({uri:a(112)})),x=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?t?e.replace(/"""/g,' "" " '):e.replace(/\n/g,"").replace(/\\/g,"\\\\").replace(/"/g,'\\"'):e};o.a.render(r.a.createElement(q,null),document.getElementById("root"))},84:function(e,t,a){e.exports=a(113)}},[[84,1,2]]]);
//# sourceMappingURL=main.d028dd3b.chunk.js.map