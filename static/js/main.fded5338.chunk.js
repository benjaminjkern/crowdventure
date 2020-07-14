(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{116:function(e,t){e.exports="https://3yfp7ejc0m.execute-api.us-east-1.amazonaws.com/dev/graphql"},117:function(e,t,a){"use strict";a.r(t),a.d(t,"app_fetch",(function(){return q})),a.d(t,"escape",(function(){return B}));var n=a(0),r=a.n(n),c=a(20),o=a.n(c),l=a(7),i=a(46),u=a(36),s=a(19),m=a(124),d=a(125),g=a(87),E=a(132),f=a(126),h=a(129),w=a(130),b=a(127),p=a(133),v=a(128),y=a(65),N=a(89),j=function(e){var t=e.owner,a=e.account,n=e.choices,c=e.nodeID,o=e.canon,l=e.onEdit;return r.a.createElement(b.a,null,n.map((function(e){return r.a.createElement(p.a,{className:"text-center"},r.a.createElement("a",{href:e.to?"/crowdventure/#/node/".concat(e.to.ID):"",style:{pointerEvents:e.to?"auto":"none",color:e.to?void 0:"grey"},onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},r.a.createElement(p.a.Body,{style:{cursor:"pointer"}},r.a.createElement(p.a.Title,null,e.action))),r.a.createElement(v.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:r.a.createElement("span",{class:"fa"},"\uf013")},r.a.createElement(y.a.Item,{disabled:!a||a.screenName!==t.screenName,onClick:function(){return o?(t=e.ID,void q({query:'mutation{makeNonCanon(choiceID:"'.concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeNonCanon&&window.location.reload(!1)}))):function(e){q({query:'mutation{makeCanon(choiceID:"'.concat(e,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.makeCanon&&window.location.reload(!1)}))}(e.ID);var t}},"Make ",o?"Nonc":"C","anon"),r.a.createElement(y.a.Item,{disabled:!a||a.screenName!==e.suggestedBy.screenName&&a.screenName!==t.screenName,onClick:function(){return t=e.ID,void q({query:'mutation{removeSuggestion(choiceID:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data&&window.location.reload(!1)}));var t}},"Delete"),r.a.createElement(y.a.Item,{onClick:function(){return l(e)},disabled:!o||!a||a.screenName!==e.suggestedBy.screenName&&a.screenName!==t.screenName},"Edit"),r.a.createElement(y.a.Divider,null),r.a.createElement(y.a.Item,{disabled:!0},"Report")),r.a.createElement(p.a.Footer,null,r.a.createElement("a",{href:"/crowdventure/#/node/".concat(c),style:{pointerEvents:a?"auto":"none",color:a?e.dislikedBy.map((function(e){return e.screenName})).includes(a.screenName)?"red":"black":"grey"},className:"fa fa-thumbs-down",onClick:function(){return t=e.ID,void(a&&q({query:'mutation{dislikeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.dislikeSuggestion&&window.location.reload(!1)})));var t}})," "+e.score+" ",r.a.createElement("a",{href:"/crowdventure/#/node/".concat(c),style:{pointerEvents:a?"auto":"none",color:a?e.likedBy.map((function(e){return e.screenName})).includes(a.screenName)?"green":"black":"grey"},className:"fa fa-thumbs-up",onClick:function(){return t=e.ID,void(a&&q({query:'mutation{likeSuggestion(accountScreenName:"'.concat(a.screenName,'",choiceID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.likeSuggestion&&window.location.reload(!1)})));var t}}),r.a.createElement("br",null),r.a.createElement("small",{className:"text-muted"},"Suggested By:"," ",r.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.suggestedBy.screenName)},r.a.createElement("img",{src:e.suggestedBy.profilePicURL?e.suggestedBy.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{border:"1px solid #bbb",height:"2em",width:"2em","object-fit":"cover","border-radius":"50%"}})," ",e.suggestedBy.screenName))))})))},C=function(e){var t=e.callback,a=e.toID,c=Object(n.useState)(void 0),o=Object(l.a)(c,2),i=o[0],u=o[1],s=Object(n.useState)(void 0),m=Object(l.a)(s,2),d=m[0],g=m[1];return Object(n.useEffect)((function(){a?q({query:'query{getNode(ID:"'.concat(a,'"){title,ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getNode?g(e.data.getNode):alert("Something went wrong when retrieving node")})):g(null),q({query:"query{allNodes{title,owner{screenName},ID}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.allNodes?u(e.data.allNodes):alert("Something went wrong when retrieving all nodes")}))}),[]),i&&void 0!==d?r.a.createElement(N.a,{filterBy:function(e,a){return""===a.text?(t(""),!0):e.title.toLowerCase().includes(a.text.toLowerCase())||e.owner.screenName.toLowerCase().includes(a.text.toLowerCase())},defaultSelected:[d?d.title:""],labelKey:"title",options:i,placeholder:"(Leave Empty to Create New Page)",renderMenuItemChildren:function(e){return r.a.createElement("div",{onClick:function(){return t(e.ID)}},e.title,r.a.createElement("div",null,r.a.createElement("small",null,"Author: ",e.owner.screenName)))}}):r.a.createElement("div",null,"Loading...")},O=function(e){var t=e.history,a=e.match,c=Object(n.useState)(void 0),o=Object(l.a)(c,2),i=o[0],b=o[1],p=B(a.params.id),v=Object(n.useState)(void 0),y=Object(l.a)(v,2),N=y[0],O=y[1],S=Object(n.useState)(void 0),L=Object(l.a)(S,2),k=L[0],I=L[1],P=Object(n.useState)(""),D=Object(l.a)(P,2),x=D[0],U=D[1],R=Object(n.useState)(!1),A=Object(l.a)(R,2),T=A[0],H=A[1],F=Object(n.useState)(""),z=Object(l.a)(F,2),Y=z[0],M=z[1],V=Object(n.useState)(""),G=Object(l.a)(V,2),W=G[0],J=G[1],K=Object(n.useState)(!1),_=Object(l.a)(K,2),Q=_[0],X=_[1],Z=Object(n.useState)(""),$=Object(l.a)(Z,2),ee=$[0],te=$[1],ae=Object(n.useState)(""),ne=Object(l.a)(ae,2),re=ne[0],ce=ne[1],oe=Object(n.useState)(""),le=Object(l.a)(oe,2),ie=le[0],ue=le[1],se=Object(n.useState)(void 0),me=Object(l.a)(se,2),de=me[0],ge=me[1],Ee=Object(n.useState)(!1),fe=Object(l.a)(Ee,2),he=fe[0],we=fe[1],be=Object(n.useState)(""),pe=Object(l.a)(be,2),ve=pe[0],ye=pe[1],Ne=Object(n.useState)(""),je=Object(l.a)(Ne,2),Ce=je[0],Oe=je[1],Se=Object(n.useState)(""),Le=Object(l.a)(Se,2),ke=Le[0],Ie=Le[1],Pe=Object(n.useState)(!1),De=Object(l.a)(Pe,2),qe=De[0],Be=De[1],xe=Object(n.useState)(!1),Ue=Object(l.a)(xe,2),Re=Ue[0],Ae=Ue[1],Te=Object(n.useState)(""),He=Object(l.a)(Te,2),Fe=He[0],ze=He[1],Ye=Object(n.useState)(!1),Me=Object(l.a)(Ye,2),Ve=Me[0],Ge=Me[1];return Object(n.useEffect)((function(){var t=new s.a,a=B(t.get("account"));q({query:'query{getNode(ID:"'.concat(p,'"){pictureURL,fgColor,bgColor,ID,title,content,views,owner{screenName},canonChoices{suggestedBy{screenName,profilePicURL},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}},nonCanonChoices{suggestedBy{screenName,profilePicURL},ID,action,to{ID},score,likedBy{screenName},dislikedBy{screenName}}}}')}).then((function(t,a){a&&alert(a),t.data&&t.data.getNode?(I(t.data.getNode),e.setBgColor(t.data.getNode.bgColor),e.setFgColor(t.data.getNode.fgColor)):I(null)})),q({query:'mutation{loginAccount(screenName:"'.concat(a,'"){screenName}}')}).then((function(e,a){a&&alert(a),e.data?O(e.data.loginAccount):(alert("Something went wrong when retrieving account logging out"),t.set("account","",{path:"/"}))}))}),[]),void 0===k?r.a.createElement(m.a,{variant:"light"},r.a.createElement("title",null,"Loading Page..."),r.a.createElement(m.a.Heading,null,"Loading...")):null===k?r.a.createElement(m.a,{variant:"danger"},r.a.createElement(m.a.Heading,null,"Oh snap! You ran into an error"),r.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):r.a.createElement(d.a,null,r.a.createElement("title",null,"Crowdventure! - ",k.title),k.pictureURL?r.a.createElement("img",{src:k.pictureURL,onError:function(e){e.target.style.display="none",U(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{display:"block","margin-left":"auto","margin-right":"auto",border:"1px solid #eee","border-radius":"8px",width:"75%",height:"22vh","object-fit":"cover",cursor:"pointer"},onClick:function(){return Ge(!0)}}):"",r.a.createElement("h1",null,k.title),r.a.createElement(d.a,null,k.content.split("\n").map((function(e){return r.a.createElement("p",null,e)}))),r.a.createElement("p",null),k.canonChoices.length?r.a.createElement(j,{owner:k.owner,choices:k.canonChoices,account:N,canon:!0,nodeID:k.ID,onEdit:function(e){M(e.action),J(e.to.ID),ze(e.ID),Ae(!0)}}):r.a.createElement("p",{className:"text-muted"},"By decree of ",r.a.createElement("strong",null,k.owner.screenName),", this journey ends here."),r.a.createElement("p",null),r.a.createElement(g.a,{variant:"light",className:"text-primary",onClick:function(){t.back(),setTimeout((function(){return window.location.reload(!1)}),100)},size:"sm"},"Go back!"),r.a.createElement("p",null),r.a.createElement("p",null,"Owner:"," ",r.a.createElement("a",{href:"/crowdventure/#/account/".concat(k.owner.screenName)},k.owner.screenName)," ","Views: ",k.views,N&&k.owner.screenName===N.screenName?r.a.createElement("p",null,r.a.createElement(g.a,{variant:"secondary",size:"sm",onClick:function(){ye(k.title),Oe(k.content),Ie(k.pictureURL),we(!0)}},"Edit"),r.a.createElement(g.a,{variant:"danger",size:"sm",onClick:function(){return Be(!0)}},"Delete")):""),r.a.createElement("h3",null,"Other options:",r.a.createElement("p",null),r.a.createElement(E.a,{overlay:N?r.a.createElement("p",null):r.a.createElement(f.a,{id:"tooltip-disabled"},"You must be signed in!"),style:{width:"100%"}},r.a.createElement("span",{className:"d-inline-block",style:{width:"100%"}},r.a.createElement(g.a,{onClick:function(){return H(!0)},disabled:!N,style:{width:"100%",pointerEvents:N?"auto":"none"}},"Suggest New Choice")))),r.a.createElement("p",null),r.a.createElement(j,{owner:k.owner,choices:k.nonCanonChoices,account:N,canon:!1,nodeID:k.ID,onEdit:function(e){M(e.action),J(e.to.ID),ze(e.ID),Ae(!0)}}),r.a.createElement(h.a,{show:Re,onHide:function(){return Ae(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Editing Choice")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,r.a.createElement(w.a.Label,null,"Action:"),r.a.createElement(w.a.Control,{required:!0,value:Y,onChange:function(e){return M(e.target.value)}}),r.a.createElement(w.a.Label,null,"Go to Page:"),r.a.createElement(C,{callback:function(e){return J(e)},toID:W})),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{onClick:function(){return function e(t){if(t){var a=B(Y);q({query:'mutation{editSuggestion(choiceID:"'.concat(Fe,'",action:"').concat(a,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data?(Ae(!1),X(!1),window.location.reload(!1)):alert("Something went wrong when editing choice!")}))}else Ae(!1),X(!0),ue(k.pictureURL),ge([e])}(W)}},"Edit Choice")))),r.a.createElement(h.a,{show:T,onHide:function(){return H(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Suggesting New Choice")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,r.a.createElement(w.a.Label,null,"Action:"),r.a.createElement(w.a.Control,{required:!0,value:Y,onChange:function(e){return M(e.target.value)}}),r.a.createElement(w.a.Label,null,"Go to Page:"),r.a.createElement(C,{callback:function(e){return J(e)},toID:W})),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{onClick:function(){return function e(t){if(t){var a=B(Y);q({query:'mutation{suggestChoice(accountScreenName:"'.concat(N.screenName,'",fromID:"').concat(p,'",action:"').concat(a,'",toID:"').concat(t,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data?(H(!1),X(!1),window.location.reload(!1)):alert("Something went wrong when creating choice!")}))}else H(!1),X(!0),ue(k.pictureURL),ge([e])}(W)}},"Submit New Choice")))),r.a.createElement(h.a,{show:Q,onHide:function(){return X(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Creating New Page")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,k.pictureURL?r.a.createElement("img",{src:k.pictureURL,onError:function(e){e.target.style.display="none",U(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{opacity:k.pictureURL===ie?1:.2,width:"100%","object-fit":"contain"}}):"",r.a.createElement(w.a.Label,null,"Title:"),r.a.createElement(w.a.Control,{required:!0,value:ee,onChange:function(e){return te(e.target.value)}}),r.a.createElement(w.a.Label,null,"Content:"),r.a.createElement(w.a.Control,{as:"textarea",rows:"3",required:!0,value:re,onChange:function(e){return ce(e.target.value)}}),r.a.createElement(w.a.Label,null,"Picture URL:"),r.a.createElement(w.a.Control,{required:!0,value:ie,onChange:function(e){return ue(e.target.value)},placeholder:"(Leave empty to not use a picture)"}),x||""),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{onClick:function(){var e=B(ee),t=B(re,!0),a=B(ie);q({query:'mutation{createNode(accountScreenName:"'.concat(N.screenName,'",title:"').concat(e,'",content:"""').concat(t,'""",pictureURL:"').concat(a,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?de[0](e.data.createNode.ID):alert("Something went wrong when creating node")}))}},"Create Page!")))),r.a.createElement(h.a,{show:he,onHide:function(){return we(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Edit Page")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,k.pictureURL?r.a.createElement("img",{src:k.pictureURL,onError:function(e){e.target.style.display="none",U(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{opacity:k.pictureURL===ke?1:.2,width:"100%","object-fit":"contain"}}):"",r.a.createElement(w.a.Label,null,"Title:"),r.a.createElement(w.a.Control,{required:!0,value:ve,onChange:function(e){return ye(e.target.value)}}),r.a.createElement(w.a.Label,null,"Content:"),r.a.createElement(w.a.Control,{as:"textarea",rows:"3",required:!0,value:Ce,onChange:function(e){return Oe(e.target.value)}}),r.a.createElement(w.a.Label,null,"Picture URL:"),r.a.createElement(w.a.Control,{required:!0,value:ke,onChange:function(e){Ie(e.target.value),U("")},placeholder:"(Leave empty to not use a picture)"}),x||""),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{onClick:function(){var e=B(ve),t=B(Ce,!0),a=B(ke);q({query:'mutation{editNode(nodeID:"'.concat(p,'",title:"').concat(e,'",content:"""').concat(t,'""",pictureURL:"').concat(a,'"){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editNode?(we(!1),window.location.reload(!1)):alert("Something went wrong when editing node")}))}},"Edit Page!")))),r.a.createElement(h.a,{show:qe,onHide:function(){return Be(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Delete Page")),r.a.createElement(h.a.Body,null,"Are you sure?"),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{variant:"danger",onClick:function(){return Be(!1)}},"No!"),r.a.createElement(g.a,{variant:"primary",onClick:function(){q({query:'mutation{deleteNode(nodeID:"'.concat(p,'")}')}).then((function(e,t){t&&alert(t),e.data?b(r.a.createElement(u.a,{to:"/"})):alert("Something went wrong when deleting node")}))}},"Yes!"))),r.a.createElement(h.a,{show:Ve,onHide:function(){return Ge(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Check out this ",Math.random()<.5?"cool":"neat"," picture!")),r.a.createElement("img",{src:k.pictureURL,onError:function(e){e.target.style.display="none",U(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{width:"100%","object-fit":"contain"}}),x||"",r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{size:"sm",onClick:function(){return Ge(!1)}},"Thanks for showing me this ",Math.random()<.5?"cool":"neat"," ","picture!"))),i||"")},S=function(e){var t=B(e.match.params.id),a=B((new s.a).get("account")),c=Object(n.useState)(void 0),o=Object(l.a)(c,2),i=o[0],N=o[1],j=Object(n.useState)(void 0),C=Object(l.a)(j,2),O=C[0],S=C[1],L=Object(n.useState)(void 0),k=Object(l.a)(L,2),I=k[0],P=k[1],D=Object(n.useState)(!1),x=Object(l.a)(D,2),U=x[0],R=x[1],A=Object(n.useState)(""),T=Object(l.a)(A,2),H=T[0],F=T[1],z=Object(n.useState)(""),Y=Object(l.a)(z,2),M=Y[0],V=Y[1],G=Object(n.useState)(""),W=Object(l.a)(G,2),J=W[0],K=W[1],_=Object(n.useState)(!1),Q=Object(l.a)(_,2),X=Q[0],Z=Q[1],$=Object(n.useState)(""),ee=Object(l.a)($,2),te=ee[0],ae=ee[1],ne=Object(n.useState)(!1),re=Object(l.a)(ne,2),ce=re[0],oe=re[1],le=Object(n.useState)(""),ie=Object(l.a)(le,2),ue=ie[0],se=ie[1],me=Object(n.useState)(!1),de=Object(l.a)(me,2),ge=de[0],Ee=de[1];Object(n.useEffect)((function(){q({query:'query{getAccount(screenName:"'.concat(t,'"){bio,screenName,profilePicURL,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data?S(e.data.getAccount):alert("Something went wrong when retrieving account")}));var e=new s.a;q({query:'mutation{loginAccount(screenName:"'.concat(a,'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?P(t.data.loginAccount):(alert("Something went wrong when logging in account, logging out"),e.set("account","",{path:"/"}))}))}),[]);return void 0===O?r.a.createElement(m.a,{variant:"light"},r.a.createElement("title",null,"Loading Account..."),r.a.createElement(m.a.Heading,null,"Loading...")):null===O?r.a.createElement(m.a,{variant:"danger"},r.a.createElement(m.a.Heading,null,"Oh snap! You ran into an error"),r.a.createElement("p",null,"This page does not exist, or maybe our database is down. Who knows? Not you. Hahahaha")):r.a.createElement(d.a,null,r.a.createElement("title",null,O.screenName," on Crowdventure!"),r.a.createElement("h1",null,r.a.createElement("img",{src:O.profilePicURL?O.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{border:"1px solid #bbb",height:"3em",width:"3em","object-fit":"cover","border-radius":"50%","margin-right":"5px",cursor:"pointer"},onClick:function(){return Ee(!0)}})," ",O.screenName),O.bio?r.a.createElement(d.a,null,O.bio.split("\n").map((function(e){return r.a.createElement("p",null,e)}))):"",r.a.createElement(d.a,null,I&&I.screenName===O.screenName?r.a.createElement(g.a,{variant:"light",onClick:function(){ae(O.bio),se(O.profilePicURL),Z(!0)}},"Edit Account"):"",r.a.createElement("div",{style:{float:"right"},class:"text-muted"},"Total views: ",O.totalNodeViews," Total score:"," ",O.totalSuggestionScore)),r.a.createElement("p",null),r.a.createElement("h3",null,"Featured Pages:"),r.a.createElement(b.a,null,O.nodes.map((function(e){return r.a.createElement(p.a,null,r.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},r.a.createElement(p.a.Body,{className:"text-center"},r.a.createElement(p.a.Title,null,e.title))),e.featured?r.a.createElement(E.a,{overlay:r.a.createElement(f.a,null,"This page has been starred by this user!")},r.a.createElement("div",{style:{position:"absolute",top:"5px",left:"5px",color:"yellow","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none","text-shadow":"0 0 1px black"},class:"fa"},"\uf005")):"",r.a.createElement(v.a,{variant:"light",style:{position:"absolute",top:"0px",right:"0px"},size:"sm",drop:"right",title:r.a.createElement("span",{class:"fa"},"\uf013")},r.a.createElement(y.a.Item,{onClick:function(){return function(e,t){q({query:'mutation{editNode(nodeID:"'.concat(e.ID,'", featured:').concat(!t,"){title}}")}).then((function(e,t){t&&alert(t),e.data?window.location.reload(!1):alert("Something went wrong when featuring page")}))}(e,e.featured)},disabled:!I||I.screenName!==O.screenName},e.featured?"Un-f":"F","eature page"),r.a.createElement(y.a.Item,{disabled:!0},"Delete"),r.a.createElement(y.a.Item,{disabled:!0},"Make Private"),r.a.createElement(y.a.Divider,null),r.a.createElement(y.a.Item,{disabled:!0},"Report")),r.a.createElement(p.a.Footer,{className:"text-muted text-center"},r.a.createElement("small",null,"Created by:"," ",r.a.createElement("img",{src:O.profilePicURL?O.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{border:"1px solid #bbb",height:"2em",width:"2em","object-fit":"cover","border-radius":"50%"}})," ",O.screenName,r.a.createElement("br",null),"Views:"," "+e.views)))}))),r.a.createElement(h.a,{show:ge,onHide:function(){return Ee(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,O.screenName)),r.a.createElement("img",{src:O.profilePicURL?O.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{width:"100%","object-fit":"contain"}}),J||"",r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{size:"sm",onClick:function(){return Ee(!1)}},"Wow, ",O.screenName," has a"," ",Math.random()<.5?"cool":"neat"," profile picture!"))),r.a.createElement("p",null),I&&I.screenName===O.screenName?r.a.createElement(d.a,null,r.a.createElement(g.a,{onClick:function(){return R(!0)},style:{width:"100%"}},"Create New Page")," ",r.a.createElement(h.a,{show:U,onHide:function(){return R(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Creating New Page")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,r.a.createElement(w.a.Label,null,"Title:"),r.a.createElement(w.a.Control,{required:!0,value:H,onChange:function(e){return F(e.target.value)}}),r.a.createElement(w.a.Label,null,"Content:"),r.a.createElement(w.a.Control,{as:"textarea",rows:"3",required:!0,value:M,onChange:function(e){return V(e.target.value)}}),J||""),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{onClick:function(){var e=B(H),t=B(M);q({query:'mutation{createNode(accountScreenName:"'.concat(O.screenName,'",title:"').concat(e,'",content:"').concat(t,'",featured:true){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?(R(!1),window.location.reload(!1)):alert("Something went wrong when creating node")}))}},"Create Page!")))),r.a.createElement(h.a,{show:X,onHide:function(){return Z(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Editing Account")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,O.profilePicURL?r.a.createElement("img",{src:O.profilePicURL,onError:function(e){e.target.style.display="none",K(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},style:{opacity:O.profilePicURL===ue?1:.2,width:"100%","object-fit":"contain"}}):"",r.a.createElement(w.a.Label,null,"Profile Pic URL:"),r.a.createElement(w.a.Control,{value:ue,onChange:function(e){return se(e.target.value)}}),r.a.createElement(w.a.Label,null,"Bio:"),r.a.createElement(w.a.Control,{as:"textarea",rows:"3",value:te,onChange:function(e){return ae(e.target.value)}}),J||""),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{onClick:function(){var e=B(te,!0),t=B(ue);q({query:'mutation{editAccount(screenName:"'.concat(O.screenName,'",bio:"""').concat(e,'""",profilePicURL:"').concat(t,'"){bio,screenName,suggestedChoices{action, from{title}, to{title}},totalNodeViews,totalSuggestionScore, nodes{featured,ID,title,views}}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.editAccount?(S(e.data.editAccount),Z(!1),window.location.reload(!1)):alert("Something went wrong when editing account")}))}},"Edit Account"),r.a.createElement(g.a,{href:"/crowdventure",onClick:function(){return(new s.a).set("account","",{path:"/"})},variant:"danger"},"Log out"),r.a.createElement(g.a,{onClick:function(){return oe(!0)},variant:"danger"},"Delete Account")))),r.a.createElement(h.a,{show:ce,onHide:function(){return oe(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Delete Account")),r.a.createElement(h.a.Body,null,"Are you sure?"),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{variant:"danger",onClick:function(){return oe(!1)}},"No!"),r.a.createElement(g.a,{variant:"primary",onClick:function(){(new s.a).set("account","",{path:"/"}),q({query:'mutation{deleteAccount(screenName:"'.concat(t,'")}')}).then((function(e,t){t&&alert(t),e.data?(N(r.a.createElement(u.a,{to:"/"})),window.location.reload(!1)):alert("Something went wrong when deleting account")}))}},"Yes!")))):"",i||"")},L=function(){var e=Object(n.useState)(void 0),t=Object(l.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(void 0),i=Object(l.a)(o,2),v=(i[0],i[1],Object(n.useState)(void 0)),y=Object(l.a)(v,2),N=(y[0],y[1],Object(n.useState)("")),j=Object(l.a)(N,2),C=(j[0],j[1],Object(n.useState)(void 0)),O=Object(l.a)(C,2),S=(O[0],O[1],Object(n.useState)(!1)),L=Object(l.a)(S,2),k=L[0],I=L[1],P=Object(n.useState)(!1),D=Object(l.a)(P,2),x=D[0],U=D[1],R=Object(n.useState)(""),A=Object(l.a)(R,2),T=A[0],H=A[1],F=Object(n.useState)(""),z=Object(l.a)(F,2),Y=z[0],M=z[1],V=Object(n.useState)(""),G=Object(l.a)(V,2),W=G[0],J=G[1],K=Object(n.useState)(void 0),_=Object(l.a)(K,2),Q=_[0],X=_[1];Object(n.useEffect)((function(){q({query:"query{featuredNodes{ID,title,owner{screenName,profilePicURL},views,size,pictureURL}}"}).then((function(e,t){t&&alert(t),e.data&&e.data.featuredNodes?c(e.data.featuredNodes):alert("Something went wrong when retrieving featured nodes")}));var e=new s.a,t=B(e.get("account"));q({query:'mutation{loginAccount(screenName:"'.concat(t,'"){screenName}}')}).then((function(t,a){a&&alert(a),t.data?I(t.data.loginAccount):(alert("Something went wrong when retrieving account, logging out"),e.set("account","",{path:"/"}))}))}),[]);return r.a.createElement(d.a,null,r.a.createElement("title",null,"Crowdventure!"),r.a.createElement("h1",null,"Welcome!"),r.a.createElement(d.a,null,"Crowdventure is a Crowd-Sourced Choose-and-Create-Your-Own-Adventure-Game!"),r.a.createElement("p",null),r.a.createElement("h3",null,"Featured Pages:"),a?r.a.createElement(b.a,null,a.map((function(e){return r.a.createElement(p.a,{className:"text-center"},r.a.createElement("a",{href:"/crowdventure/#/node/".concat(e.ID)},e.pictureURL?r.a.createElement(p.a.Header,{style:{"background-color":"white"}},r.a.createElement(p.a.Img,{variant:"top",onError:function(e){e.target.style.display="none",J(r.a.createElement("span",{style:{color:"red"}},"Picture not found!"))},src:e.pictureURL})):"",r.a.createElement(p.a.Body,null,r.a.createElement(p.a.Title,null,e.title))),r.a.createElement(p.a.Footer,null,r.a.createElement("small",{className:"text-muted"},"Created by:"," ",r.a.createElement("a",{href:"/crowdventure/#/account/".concat(e.owner.screenName)},r.a.createElement("img",{src:e.owner.profilePicURL?e.owner.profilePicURL:"/crowdventure/defaultProfilePic.jpg",onError:function(e){e.target.src="/crowdventure/defaultProfilePic.jpg"},style:{border:"1px solid #bbb",height:"2em",width:"2em","object-fit":"cover","border-radius":"50%"}})," ",e.owner.screenName),r.a.createElement("br",null),"Story Size: ",e.size,r.a.createElement("br",null),"Views: ",e.views)))}))):r.a.createElement(m.a,{variant:"light"},r.a.createElement(m.a.Heading,null,"Loading...")),r.a.createElement(E.a,{overlay:k?r.a.createElement("p",null):r.a.createElement(f.a,{id:"tooltip-disabled"},"You must be signed in!"),style:{width:"100%"}},r.a.createElement("span",{className:"d-inline-block",style:{width:"100%"}},r.a.createElement(g.a,{onClick:function(){return U(!0)},disabled:!k,style:{width:"100%",pointerEvents:k?"auto":"none"}},"Create New!"))),r.a.createElement(h.a,{show:x,onHide:function(){return U(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Creating New Page")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,r.a.createElement(w.a.Label,null,"Title:"),r.a.createElement(w.a.Control,{required:!0,value:T,onChange:function(e){return H(e.target.value)}}),r.a.createElement(w.a.Label,null,"Content:"),r.a.createElement(w.a.Control,{as:"textarea",rows:"3",required:!0,value:Y,onChange:function(e){return M(e.target.value)}}),W||""),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{onClick:function(){var e=B(T),t=B(Y);q({query:'mutation{createNode(accountScreenName:"'.concat(k.screenName,'",title:"').concat(e,'",content:"').concat(t,'",featured:true){ID}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createNode?(U(!1),X(r.a.createElement(u.a,{to:"/node/".concat(e.data.createNode.ID)}))):alert("Something went wrong when creating node")}))}},"Create Page!")))),Q||"")},k=a(131),I=a(88),P=function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)(!1),i=Object(l.a)(o,2),u=i[0],m=i[1],d=Object(n.useState)(void 0),E=Object(l.a)(d,2),f=E[0],b=E[1],p=Object(n.useState)(void 0),v=Object(l.a)(p,2),y=v[0],N=v[1],j=Object(n.useState)(""),C=Object(l.a)(j,2),O=C[0],S=C[1],L=Object(n.useState)(""),I=Object(l.a)(L,2),P=I[0],D=I[1],x=Object(n.useState)(""),U=Object(l.a)(x,2),R=U[0],A=U[1],T=function(){var e=B(O),t=B(P);q({query:'mutation{createAccount(screenName:"'.concat(e,'",password:"').concat(t,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.createAccount?((new s.a).set("account",O,{path:"/"}),b(e.data.createAccount),m(!1),window.location.reload(!1)):alert("Something went wrong when creating account")}))};return Object(n.useEffect)((function(){var e=B((new s.a).get("account"));e&&q({query:'mutation{loginAccount(screenName:"'.concat(e,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data?b(e.data.loginAccount):(alert("Something went wrong when logging in"),(new s.a).set("account","",{path:"/"}))}))}),[]),void 0===f||null===f?r.a.createElement(k.a.Text,null,"You are not logged in."," ",r.a.createElement(g.a,{variant:"light",onClick:function(){return c(!0)},size:"sm"},"Log In")," ","or"," ",r.a.createElement(g.a,{variant:"light",onClick:function(){return m(!0)},size:"sm"},"Sign Up"),r.a.createElement(h.a,{show:a,onHide:function(){return c(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Log in")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,r.a.createElement(w.a.Label,null,"Screen Name:"),r.a.createElement(w.a.Control,{required:!0,value:O,onChange:function(e){return S(e.target.value)}}),r.a.createElement(w.a.Label,null,"Password:"),r.a.createElement(w.a.Control,{required:!0,type:"password",value:P,onChange:function(e){return D(e.target.value)}}),y||""),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{variant:"primary",onClick:function(){return function(){var e=B(O),t=B(P);q({query:'mutation{loginAccount(screenName:"'.concat(e,'",password:"').concat(t,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.loginAccount?((new s.a).set("account",O,{path:"/"}),b(e.data.getAccount),c(!1),window.location.reload(!1)):N(r.a.createElement("div",{style:{color:"red"}},"That account does not exist or the password did not match!"))}))}()}},"Log in")))),r.a.createElement(h.a,{show:u,onHide:function(){return m(!1)}},r.a.createElement(h.a.Header,{closeButton:!0},r.a.createElement(h.a.Title,null,"Sign Up for Crowdventure!")),r.a.createElement(w.a,null,r.a.createElement(h.a.Body,null,r.a.createElement(w.a.Group,null,r.a.createElement(w.a.Label,null,"Screen Name:"),r.a.createElement(w.a.Control,{required:!0,value:O,onChange:function(e){return S(e.target.value)}}),r.a.createElement(w.a.Label,null,"Create Password:"),r.a.createElement(w.a.Control,{required:!0,type:"password",value:P,onChange:function(e){return D(e.target.value)}}),r.a.createElement(w.a.Label,null,"Confirm Password:"),r.a.createElement(w.a.Control,{required:!0,type:"password",value:R,onChange:function(e){return A(e.target.value)}})),y||""),r.a.createElement(h.a.Footer,null,r.a.createElement(g.a,{variant:"primary",onClick:function(){return function(){if(P!==R)N(r.a.createElement("div",{style:{color:"red"}},"Passwords must match!"));else{var e=B(O);q({query:'query{getAccount(screenName:"'.concat(e,'"){screenName}}')}).then((function(e,t){t&&alert(t),e.data&&e.data.getAccount?N(r.a.createElement("div",{style:{color:"red"}},"That account already exists!")):T()}))}}()}},"Sign Up"))))):r.a.createElement(k.a.Text,null,"You are logged in as:"," ",r.a.createElement("a",{href:"/crowdventure/#/account/".concat(f.screenName),onClick:function(){return setTimeout((function(){return window.location.reload(!1)}),100)}},f.screenName))},D=function(){var e=Object(n.useState)(void 0),t=Object(l.a)(e,2),a=(t[0],t[1]),c=Object(n.useState)(void 0),o=Object(l.a)(c,2),s=(o[0],o[1]);return r.a.createElement(d.a,null,r.a.createElement(k.a,{expand:"lg"},r.a.createElement(k.a.Brand,{href:"/crowdventure"},r.a.createElement("img",{href:"/crowdventure",src:"/crowdventure/logo.png",alt:"Crowdventure Logo",style:{width:"100%"}})),r.a.createElement("small",{class:"text-muted"},"Version: 0.1.4"),r.a.createElement(k.a.Toggle,{"aria-controls":"basic-navbar-nav",className:"bg-light"}),r.a.createElement(k.a.Collapse,{id:"basic-navbar-nav",className:"justify-content-end"},r.a.createElement(P,null))),r.a.createElement(i.a,null,r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/",component:L,exact:!0}),r.a.createElement(u.b,{path:"/node/:id",render:function(e){return r.a.createElement(O,Object.assign({},e,{history:I.a,setBgColor:a,setFgColor:s}))}}),r.a.createElement(u.b,{path:"/account/:id",component:S}))),r.a.createElement(k.a,{className:"text-right"},r.a.createElement("small",{class:"text-muted"},"@ 2020 Copyright: (MIT) Benjamin Kern")),r.a.createElement("title",null,"Crowdventure! - Page not found!"))},q=(a(114),(0,a(118).createApolloFetch)({uri:a(116)})),B=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return e?t?e.replace(/"""/g,' "" " '):e.replace(/\n/g,"").replace(/\\/g,"\\\\").replace(/"/g,'\\"'):e};o.a.render(r.a.createElement(D,null),document.getElementById("root"))},90:function(e,t,a){e.exports=a(117)}},[[90,1,2]]]);
//# sourceMappingURL=main.fded5338.chunk.js.map