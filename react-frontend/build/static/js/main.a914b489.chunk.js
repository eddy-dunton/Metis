(this["webpackJsonpreact-frontend"]=this["webpackJsonpreact-frontend"]||[]).push([[0],{122:function(e,t,s){},123:function(e,t,s){},138:function(e,t){},140:function(e,t){},151:function(e,t){},153:function(e,t){},180:function(e,t){},182:function(e,t){},183:function(e,t){},188:function(e,t){},190:function(e,t){},209:function(e,t){},22:function(e,t,s){},221:function(e,t){},224:function(e,t){},232:function(e,t,s){"use strict";s.r(t);var n=s(1),a=s.n(n),i=s(124),r=s.n(i),c=s(24),o=s(6),l=s.n(o),d=s(20),u=s(8),h=s(9),p=s(5),m=s(11),j=s(10),b=s(4),f=s(127),g=s(125),v=s.n(g),O=s.p+"static/media/pdf.1472d49b.svg",x=s.p+"static/media/cross.f590db2b.svg",k=(s(22),s.p+"static/media/logo.a8d56e25.svg"),w=s.p+"static/media/upload.07ea655c.svg",N=s.p+"static/media/search.3dac5b67.svg",y=s(0),I=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(e){var n;return Object(u.a)(this,s),(n=t.call(this,e)).state={loading:!0,profile:null,loggedIn:e.loggedIn,menuShown:!1},n.loginCallback=e.loginCallback,n.failCallback=e.failCallback,n.uploadCallback=e.uploadCallback,n.getProfileInfo=n.getProfileInfo.bind(Object(p.a)(n)),n.showMenu=n.showMenu.bind(Object(p.a)(n)),n}return Object(h.a)(s,[{key:"showMenu",value:function(){this.setState({menuShown:!this.state.menuShown})}},{key:"getProfileInfo",value:function(){var e=Object(d.a)(l.a.mark((function e(t,s){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/getUserPreview/"+t+"&token="+s);case 2:return n=e.sent,e.next=5,n.json();case 5:(a=e.sent).username?this.setState({profile:a,loading:!1,loggedIn:!0}):(this.failCallback(),this.setState({profile:null,loading:!0,loggedIn:!1}));case 7:case"end":return e.stop()}}),e,this)})));return function(t,s){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.setState({loggedIn:this.props.loggedIn}),this.props.loggedIn&&this.getProfileInfo(this.props.username,this.props.token)}},{key:"componentDidUpdate",value:function(e){e.loggedIn===this.props.loggedIn&&e.token===this.props.token||(this.setState({loggedIn:this.props.loggedIn}),this.props.loggedIn&&this.getProfileInfo(this.props.username,this.props.token))}},{key:"render",value:function(){var e=this;return Object(y.jsxs)(y.Fragment,{children:[Object(y.jsxs)("div",{className:"navbar",children:[Object(y.jsxs)(c.b,{to:"/",className:"navbar-logo clickable",children:[Object(y.jsx)("img",{src:k,alt:"Metis Logo"}),Object(y.jsx)("div",{children:"metis"})]}),Object(y.jsxs)("div",{className:"navbar-search",children:[Object(y.jsx)("img",{src:N,alt:"Search button",className:"clickable"}),Object(y.jsx)("input",{placeholder:"Search..."})]}),this.state.loggedIn?Object(y.jsx)("div",{className:"navbar-upload hover clickable",onClick:this.uploadCallback,children:Object(y.jsx)("img",{src:w,alt:"Upload button"})}):Object(y.jsx)(y.Fragment,{}),this.state.loggedIn?this.state.loading||!this.state.profile?Object(y.jsx)("div",{className:"navbar-profile",children:"Loading..."}):Object(y.jsxs)("div",{className:"navbar-profile",children:[Object(y.jsx)("div",{className:"clickable",onClick:this.showMenu,children:Object(y.jsx)("img",{src:this.state.profile.picture,alt:"Profile Pic"})}),Object(y.jsxs)("div",{className:"navbar-profile-content",children:[Object(y.jsxs)("div",{style:{display:"flex"},children:[Object(y.jsx)("div",{onClick:this.showMenu,className:"navbar-profile-name clickable",children:this.state.profile.username}),Object(y.jsx)("div",{className:"clickable",onClick:this.showMenu,style:{alignSelf:"center",marginLeft:"4px"},children:"v"})]}),Object(y.jsx)("div",{className:"navbar-profile-uni",children:this.state.profile.inst}),Object(y.jsxs)("div",{className:"navbar-profile-pens",children:[Object(y.jsx)("span",{role:"img","aria-label":"pen",children:"\ud83d\udd8b\ufe0f"})," ",this.state.profile.score," pens"]})]})]}):Object(y.jsx)("div",{className:"navbar-profile navbar-signin hover clickable",onClick:this.loginCallback,children:"Sign In"})]}),this.state.loggedIn&&this.state.menuShown?this.state.loading||!this.state.profile?Object(y.jsx)("div",{className:"navbar-profile",children:"Loading..."}):Object(y.jsxs)("div",{className:"navbar-profile-dropdown",children:[Object(y.jsx)(c.b,{onClick:this.showMenu,to:"/profile/"+this.state.profile.username,className:"hover clickable",children:"MY PROFILE"}),Object(y.jsx)("div",{onClick:function(){e.failCallback(),e.showMenu()},className:"hover clickable",children:"SIGN OUT"})]}):Object(y.jsx)(y.Fragment,{}),"}"]})}}]),s}(a.a.Component),C=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(e){var n;return Object(u.a)(this,s),(n=t.call(this,e)).state={},n}return Object(h.a)(s,[{key:"render",value:function(){return Object(y.jsx)("div",{className:"home"})}}]),s}(a.a.Component),E=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(e){var n;return Object(u.a)(this,s),(n=t.call(this,e)).state={},n}return Object(h.a)(s,[{key:"render",value:function(){return Object(y.jsx)("div",{className:"home"})}}]),s}(a.a.Component),T=function(e){var t=e.className,s=e.handleClose,n=e.show,a=e.children,i=n?"display-block":"display-none";return Object(y.jsxs)("div",{className:i,children:[Object(y.jsx)("div",{className:"modal-darken",onClick:s}),Object(y.jsxs)("section",{className:"modal-main ".concat(t),children:[a,Object(y.jsx)("img",{src:x,alt:"Close",className:"modal-close clickable hover",onClick:s})]})]})},A=s.p+"static/media/dots.65dc6538.svg",S=s.p+"static/media/arrow.0d036292.svg",P=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(){var e;Object(u.a)(this,s);for(var n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return(e=t.call.apply(t,[this].concat(a))).state={showDesc:!1},e.tglDesc=function(){e.setState({showDesc:!e.state.showDesc})},e}return Object(h.a)(s,[{key:"render",value:function(){return Object(y.jsxs)("div",{className:"note-preview",children:[Object(y.jsxs)("div",{className:"note-preview-content",children:[Object(y.jsxs)("div",{className:"note-preview-header",children:[Object(y.jsxs)("div",{className:"note-preview-left",children:[Object(y.jsx)("img",{className:"note-preview-pdf",alt:"PDF",src:O}),Object(y.jsx)(c.b,{to:"/note/"+this.props.id,className:"note-preview-name",children:this.props.title})]}),Object(y.jsxs)("div",{className:"note-preview-right",children:[Object(y.jsx)("div",{className:"note-preview-module",children:this.props.unitcode}),Object(y.jsx)("img",{width:"32px",alt:"choice dots",src:A}),Object(y.jsx)("img",{width:"32px",alt:"open note",className:"clickable",onClick:this.tglDesc,style:this.state.showDesc?{transform:"rotate(180deg)"}:{},src:S})]})]}),this.state.showDesc?Object(y.jsx)("div",{className:"note-preview-description",children:this.props.description}):Object(y.jsx)(y.Fragment,{})]}),Object(y.jsxs)("div",{className:"note-preview-under",children:[Object(y.jsxs)("div",{children:[Object(y.jsx)("span",{role:"img","aria-label":"pen",children:"\ud83d\udd8b\ufe0f"})," ",this.props.pens," pens"]}),Object(y.jsxs)("div",{children:[this.props.downloads," downloads"]})]})]})}}]),s}(a.a.Component),U=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(e){var n;return Object(u.a)(this,s),(n=t.call(this,e)).state={loading:!0,profile:null,myusername:e.myusername,token:e.token,loggedIn:e.loggedIn,search:"",unitFilter:"all",possUnits:[]},n.failCallback=e.failCallback,n.getProfileInfo=n.getProfileInfo.bind(Object(p.a)(n)),n.handleSearch=n.handleSearch.bind(Object(p.a)(n)),n}return Object(h.a)(s,[{key:"getProfileInfo",value:function(){var e=Object(d.a)(l.a.mark((function e(t,s){var n,a,i,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/getUserInfo/"+t+"&token="+s);case 2:return n=e.sent,e.next=5,n.json();case 5:if((a=e.sent).username=t,a.error?(this.failCallback(),this.setState({profile:null,loading:!1,loggedIn:!1})):this.setState({profile:a,loading:!1,loggedIn:!0}),t!==this.state.myusername){e.next=16;break}return e.next=11,fetch("/getPotentialUnits/"+t+"&token="+s);case 11:return i=e.sent,e.next=14,i.json();case 14:(r=e.sent).error?(this.failCallback(),this.setState({profile:null,loading:!1,loggedIn:!1})):this.setState({possUnits:r});case 16:case"end":return e.stop()}}),e,this)})));return function(t,s){return e.apply(this,arguments)}}()},{key:"handleSearch",value:function(e){this.setState({search:e.target.value})}},{key:"componentDidMount",value:function(){this.setState({loggedIn:this.props.loggedIn,myusername:this.props.myusername,token:this.props.token}),this.props.loggedIn&&this.getProfileInfo(this.props.username,this.props.token)}},{key:"componentDidUpdate",value:function(e){e.username===this.props.username&&e.loggedIn===this.props.loggedIn||(this.setState({loggedIn:this.props.loggedIn,myusername:this.props.myusername,token:this.props.token}),this.props.loggedIn&&this.getProfileInfo(this.props.username,this.props.token))}},{key:"render",value:function(){var e=this;return Object(y.jsx)("div",{className:"profile",children:this.state.loggedIn?this.state.loading||!this.state.profile?"Loading...":Object(y.jsxs)(y.Fragment,{children:[Object(y.jsxs)("div",{className:"profile-content",children:[Object(y.jsx)("img",{className:"profile-content-picture",alt:"profile img",src:this.state.profile.picture}),Object(y.jsx)("div",{className:"profile-content-username",children:this.state.profile.username}),Object(y.jsx)("div",{className:"profile-content-uni",children:this.state.profile.Name}),Object(y.jsx)("div",{children:this.state.profile.Biography}),this.state.possUnits.map((function(t,s){return Object(y.jsxs)("label",{children:[Object(y.jsx)("input",{type:"checkbox",value:t.UnitCode,onChange:function(t){if(t.target.checked){var s={username:e.state.myusername,token:e.state.token,unitcode:t.target.value};fetch("/joinUnit",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(s)})}},defaultChecked:e.state.profile.units.some((function(e){return e.UnitCode===t.UnitCode}))}),t.UnitName," (",t.UnitCode,")"]})})),Object(y.jsxs)("div",{className:"profile-content-pens",children:[Object(y.jsx)("span",{role:"img","aria-label":"pen",children:"\ud83d\udd8b\ufe0f"})," ",this.state.profile.Score," pens"]})]}),Object(y.jsxs)("div",{className:"profile-notes",children:[Object(y.jsxs)("div",{className:"profile-notes-input",children:[Object(y.jsx)("input",{placeholder:"Search for a note...",className:"profile-input-search",type:"text",value:this.state.search,onChange:this.handleSearch}),Object(y.jsxs)("select",{value:this.state.unitFilter,className:"profile-input-module",onChange:function(t){e.setState({unitFilter:t.target.value})},children:[Object(y.jsx)("option",{value:"all",children:"All"}),this.state.profile.units.map((function(e,t){return Object(y.jsx)("option",{value:e.UnitCode,children:e.UnitCode},t)}))]})]}),Object(y.jsx)("div",{children:this.state.profile.posts.map((function(t,s){if(t.Title.includes(e.state.search)&&("all"===e.state.unitFilter||t.UnitCode===e.state.unitFilter))return Object(y.jsx)(P,{title:t.Title,id:t.File,unitcode:t.UnitCode,pens:t.Pens,downloads:t.Downloads,description:t.Description},s)}))})]})]}):"need to be signed in to view "+this.props.username})}}]),s}(a.a.Component),M=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(){var e;Object(u.a)(this,s);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).state={drag:!1},e.dropRef=a.a.createRef(),e.handleDrag=function(e){e.preventDefault(),e.stopPropagation()},e.handleDragIn=function(t){t.preventDefault(),t.stopPropagation(),e.setState({drag:!0})},e.handleDragOut=function(t){t.preventDefault(),t.stopPropagation(),e.setState({drag:!1})},e.handleDrop=function(t){t.preventDefault(),t.stopPropagation(),e.setState({drag:!1}),e.props.handleDrop(t.dataTransfer.files)},e.handleClick=function(t){document.getElementById("browse").click(),e.setState({drag:!1}),e.props.handleDrop(t.target.files)},e}return Object(h.a)(s,[{key:"componentDidMount",value:function(){var e=this.dropRef.current;e.addEventListener("dragenter",this.handleDragIn),e.addEventListener("dragleave",this.handleDragOut),e.addEventListener("dragover",this.handleDrag),e.addEventListener("drop",this.handleDrop)}},{key:"componentWillUnmount",value:function(){var e=this.dropRef.current;e.removeEventListener("dragenter",this.handleDragIn),e.removeEventListener("dragleave",this.handleDragOut),e.removeEventListener("dragover",this.handleDrag),e.removeEventListener("drop",this.handleDrop)}},{key:"render",value:function(){return Object(y.jsxs)("div",{ref:this.dropRef,onClick:this.handleClick,className:"uploadArea clickable ".concat(this.state.drag?"dragging":""),children:[Object(y.jsx)("input",{onChange:this.handleClick,type:"file",id:"browse",name:"fileupload",style:{display:"none"},multiple:!0}),Object(y.jsxs)("div",{className:"uploadAreaText",children:["Drag and drop ",this.props.filetype?this.props.filetype:"PDF"," or click to browse"]})]})}}]),s}(a.a.Component),D=(s(122),s.p+"static/media/signUpPic1.d74dfe49.png"),L=s.p+"static/media/signUpPic2.e898354d.png",B=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(e){var n;return Object(u.a)(this,s),(n=t.call(this,e)).state={currentTab:"signin"},n.loginCallback=e.loginCallback,n.currentTab=e.currentTab,n.signInTabs=e.signInTabs,n.setCurrentTab=n.setCurrentTab.bind(Object(p.a)(n)),n}return Object(h.a)(s,[{key:"setCurrentTab",value:function(e){this.inputs=[document.getElementById("username"),document.getElementById("password")],document.getElementById("email")&&this.inputs.push(document.getElementById("email")),this.inputs.forEach((function(e){e.value="",e.nextElementSibling.innerHTML="",e.classList.remove("input-success"),e.classList.remove("input-error")})),this.setState({currentTab:e})}},{key:"render",value:function(){var e=this;return Object(y.jsxs)("div",{className:"app",children:[Object(y.jsxs)("div",{className:"display-block top-panel",children:[Object(y.jsxs)("div",{className:"text-panel",children:[Object(y.jsx)("img",{src:k,alt:"Metis Logo"}),Object(y.jsx)("h1",{className:"header-text inline",children:"Discover and Share Course Notes!"}),Object(y.jsxs)("p",{className:"content-text",children:["Metis is the quickest and easiest way of downloading and sharing course notes. Never feel alone and unprepared again, the large metis community of students are publishing their course notes and are providing feedback on others each day. ",Object(y.jsx)("em",{children:"This is Metis."})]})]}),Object(y.jsxs)("div",{className:"signin-panel",children:[Object(y.jsx)("div",{className:"tabs no-margin",children:this.signInTabs.map((function(t,s){return Object(y.jsx)("button",{onClick:function(){return e.setCurrentTab(t.name)},className:"clickable ".concat(t.name===e.state.currentTab?"active":""),children:t.label},s)}))}),this.signInTabs.find((function(t){return t.name===e.state.currentTab})).content]})]}),Object(y.jsxs)("div",{className:"display-block mid-panel",children:[Object(y.jsx)("div",{className:"image-panel",children:Object(y.jsx)("img",{src:D,className:"fit-div",alt:"IMAGE SOON COME"})}),Object(y.jsxs)("div",{className:"text-panel",children:[Object(y.jsx)("img",{src:k,alt:"Metis Logo"}),Object(y.jsx)("h1",{className:"header-text",children:"All Your Courses In One Place!"}),Object(y.jsx)("p",{className:"content-text",children:"The Metis community have provided notes on a vast array of topics for all courses. After signing up you are automatically shown the relevant notes for your current course content."})]})]}),Object(y.jsxs)("div",{className:"display-block bot-panel",children:[Object(y.jsxs)("div",{className:"text-panel",children:[Object(y.jsx)("img",{src:k,alt:"Metis Logo"}),Object(y.jsx)("h1",{className:"header-text",children:"Join The Metis Community Today!"}),Object(y.jsx)("p",{className:"content-text",children:"Metis is a powerful and completely free revision tool that anyone can use. Just sign up using a valid university email address and get browsing and uploading notes!"})]}),Object(y.jsx)("div",{className:"image-panel",children:Object(y.jsx)("img",{src:L,className:"fit-div",alt:"another image xx"})})]})]})}}]),s}(a.a.Component),R=(s(123),"data:image/png;base64,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");var F=function(e){return Object(y.jsxs)("div",{className:"comment-container",children:[Object(y.jsx)("img",{src:e.profilePicture,alt:"Profile Picture"}),Object(y.jsxs)("div",{className:"comment-info",children:[Object(y.jsxs)("h1",{children:[e.author,Object(y.jsxs)("p",{className:"inline",children:["\xb7",e.time]})]}),Object(y.jsx)("p",{children:e.text})]}),Object(y.jsxs)("p",{className:"comment-like-reply",children:[Object(y.jsx)("span",{onClick:function(){console.log("Temp Like")},children:"like"}),"\xb7",Object(y.jsx)("span",{onClick:function(){console.log("REPLY")},children:"reply"})]})]})},H=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(){return Object(u.a)(this,s),t.apply(this,arguments)}return Object(h.a)(s,[{key:"render",value:function(){return Object(y.jsxs)("div",{className:"app",children:[Object(y.jsxs)("div",{className:"breadcrumbs",children:[Object(y.jsx)("div",{className:"bc-item bc-label",children:"University of Bath"}),Object(y.jsx)("div",{className:"bc-item bc-dot"}),Object(y.jsx)("div",{className:"bc-item bc-label",children:"CM20255"}),Object(y.jsx)("div",{className:"bc-item bc-dot"}),Object(y.jsx)("div",{className:"bc-item bc-label",children:"This Note"})]}),Object(y.jsxs)("div",{className:"profile-preview",children:[Object(y.jsx)("img",{src:R,alt:"Profile Picture"}),Object(y.jsxs)("div",{className:"profile-info",children:[Object(y.jsxs)("h1",{children:["Jerry Johnson",Object(y.jsx)("p",{className:"inline",children:"\xb77h"})]}),Object(y.jsx)("p",{children:"Maths and Computer Science"})]}),Object(y.jsx)("div",{className:"pens",children:Object(y.jsxs)("div",{children:[Object(y.jsx)("span",{role:"img","aria-label":"pen",children:"\ud83d\udd8b\ufe0f"})," 187 pens"]})})]}),Object(y.jsxs)("div",{className:"main-preview",children:[Object(y.jsxs)("div",{className:"main-note-info",children:[Object(y.jsx)("div",{className:"main-pdf-icon",children:Object(y.jsx)("p",{children:"PDF"})}),Object(y.jsx)("h1",{children:"Pushdown automata"})]}),Object(y.jsxs)("div",{className:"main-note-body",children:[Object(y.jsx)("p",{children:'We study a new and more powerful model of computation which comes with a simple form of memory. This is called the pushdown automaton (PDA), and is essentially a NFA equipped with a "stack", which allows us to "pop" and "push" words from our memory as we move through the automaton. We demonstrate the power of new kind of automaton by showing that any context-free language is accepted by a suitable PDA.'}),Object(y.jsx)("div",{className:"main-body-downloads",children:Object(y.jsx)("p",{children:"23 downloads"})}),Object(y.jsx)("button",{className:"download-button",children:"DOWNLOAD (3.5mb)"})]}),Object(y.jsx)("div",{className:"main-pdf-preview"})]}),Object(y.jsxs)("div",{className:"join-strips",children:[Object(y.jsx)("div",{className:"strip left"}),Object(y.jsx)("div",{className:"strip right"})]}),Object(y.jsxs)("div",{className:"comment-preview",children:[Object(y.jsx)("div",{className:"comment-number",children:Object(y.jsx)("p",{children:"3 Comments"})}),Object(y.jsx)("input",{placeholder:"Leave a Comment"}),Object(y.jsx)(F,{author:"James Jameson",text:"Nice notes!",profilePicture:R,time:"7h"}),Object(y.jsx)(F,{author:"Deez Nuts",text:"Oh something came in the mail today? Deez nuts. [pause for laughter]. GOTEEEEMMMM",profilePicture:R,time:"5m"}),Object(y.jsx)(F,{author:"Annoyingly Long Name",text:"hi uwu :3",profilePicture:R,time:"2d"})]})]})}}]),s}(a.a.Component),V=function(e){Object(m.a)(s,e);var t=Object(j.a)(s);function s(e){var n;return Object(u.a)(this,s),(n=t.call(this,e)).cookies=new f.a,n.state={token:n.cookies.get("token"),username:n.cookies.get("username"),loggedIn:!!n.cookies.get("token"),showLogin:!1,showUpload:!1,currentTab:"signin",profile:null,files:[]},n.login=n.login.bind(Object(p.a)(n)),n.upload=n.upload.bind(Object(p.a)(n)),n.fileUploaded=n.fileUploaded.bind(Object(p.a)(n)),n.setCurrentTab=n.setCurrentTab.bind(Object(p.a)(n)),n.failedRequest=n.failedRequest.bind(Object(p.a)(n)),n.signin=n.signin.bind(Object(p.a)(n)),n.hashPassword=n.hashPassword.bind(Object(p.a)(n)),n.createAccount=n.createAccount.bind(Object(p.a)(n)),n.publishFile=n.publishFile.bind(Object(p.a)(n)),n.getProfileInfo=n.getProfileInfo.bind(Object(p.a)(n)),n.username&&n.getProfileInfo(),n.signInTabs=[{name:"signin",label:"Sign In",content:Object(y.jsxs)("div",{className:"accounts",children:[Object(y.jsxs)("div",{className:"input",children:[Object(y.jsx)("div",{children:"Email or Username"}),Object(y.jsx)("input",{type:"text",defaultValue:"",id:"username"}),Object(y.jsx)("div",{className:"error-message"})]}),Object(y.jsxs)("div",{className:"input",children:[Object(y.jsx)("div",{children:"Password"}),Object(y.jsx)("input",{type:"password",defaultValue:"",id:"password"}),Object(y.jsx)("div",{className:"error-message"}),Object(y.jsx)(c.b,{to:"/reset-password",onClick:n.login,children:"Reset Password"})]}),Object(y.jsx)("button",{onClick:n.signin,className:"clickable hover",children:"SIGN IN"})]})},{name:"create",label:"Create Account",content:Object(y.jsxs)("div",{className:"accounts",children:[Object(y.jsxs)("div",{className:"input",children:[Object(y.jsx)("div",{children:"Username"}),Object(y.jsx)("input",{type:"text",defaultValue:"",id:"username"}),Object(y.jsx)("div",{className:"error-message"})]}),Object(y.jsxs)("div",{className:"input",children:[Object(y.jsx)("div",{children:"Email"}),Object(y.jsx)("input",{type:"text",defaultValue:"",id:"email"}),Object(y.jsx)("div",{className:"error-message"})]}),Object(y.jsxs)("div",{className:"input",children:[Object(y.jsx)("div",{children:"Password"}),Object(y.jsx)("input",{type:"password",defaultValue:"",id:"password"}),Object(y.jsx)("div",{className:"error-message"})]}),Object(y.jsx)("button",{onClick:n.createAccount,className:"clickable hover",children:"CREATE ACCOUNT"})]})}],n}return Object(h.a)(s,[{key:"hashPassword",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=v()(t),e.abrupt("return",s.toString());case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"setCurrentTab",value:function(e){this.inputs=[document.getElementById("username"),document.getElementById("password")],document.getElementById("email")&&this.inputs.push(document.getElementById("email")),this.inputs.forEach((function(e){e.value="",e.nextElementSibling.innerHTML="",e.classList.remove("input-success"),e.classList.remove("input-error")})),this.setState({currentTab:e})}},{key:"error",value:function(e,t){e.classList.add("input-error"),e.classList.remove("input-success"),e.nextElementSibling.innerHTML=t}},{key:"fine",value:function(e){e.classList.add("input-success"),e.classList.remove("input-error"),e.nextElementSibling.innerHTML=""}},{key:"createAccount",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var s,n,a,i,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.username=document.getElementById("username").value,s=!1,this.username.match(/^[\w]{1,32}$/)?this.fine(document.getElementById("username")):(this.error(document.getElementById("username"),"username should be less than 32 characters long."),s=!0),this.email=document.getElementById("email").value,this.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.ac\.uk/)?this.fine(document.getElementById("email")):(this.error(document.getElementById("email"),"email not valid form."),s=!0),this.password=document.getElementById("password").value,this.password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)?this.fine(document.getElementById("password")):(this.error(document.getElementById("password"),"password should be 8 characters, have atleast 1 lower and upper case letter, a number and a special character"),s=!0),!s){e.next=9;break}return e.abrupt("return");case 9:return e.t0=this.username,e.t1=this.email,e.next=13,this.hashPassword(this.password);case 13:return e.t2=e.sent,n={username:e.t0,email:e.t1,passwordHash:e.t2},e.next=17,fetch("/createUser",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(n)});case 17:return a=e.sent,e.next=20,a.json();case 20:(i=e.sent).error?(r=!1,i.error.toLowerCase().includes("password")&&(this.error(document.getElementById("password"),i.error),r=!0),i.error.toLowerCase().includes("email")&&(this.error(document.getElementById("email"),i.error),r=!0),i.error.toLowerCase().includes("username")&&(this.error(document.getElementById("username"),i.error),r=!0),r||(this.error(document.getElementById("username"),i.error),this.error(document.getElementById("password"),i.error))):(this.setState({token:i.token,username:this.username,loggedIn:!0}),this.cookies.set("token",i.token,{path:"/"}),this.cookies.set("username",this.username,{path:"/"}),this.login(),this.getProfileInfo());case 22:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"signin",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var s,n,a,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=document.getElementById("username").value,e.next=3,this.hashPassword(document.getElementById("password").value);case 3:return e.t1=e.sent,s={username:e.t0,passwordHash:e.t1},e.next=7,fetch("/isUser",{method:"POST",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(s)});case 7:return n=e.sent,e.next=10,n.json();case 10:(a=e.sent).error?(i=!1,a.error.toLowerCase().includes("password")&&(this.error(document.getElementById("password"),a.error),i=!0),a.error.toLowerCase().includes("username")&&(this.error(document.getElementById("username"),a.error),i=!0),i||(this.error(document.getElementById("username"),a.error),this.error(document.getElementById("password"),a.error))):(this.setState({token:a.token,username:a.username,loggedIn:!0}),this.cookies.set("token",a.token,{path:"/"}),this.cookies.set("username",a.username,{path:"/"}),this.login(),this.getProfileInfo());case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getProfileInfo",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/getUserInfo/"+this.state.username+"&token="+this.state.token);case 2:return t=e.sent,e.next=5,t.json();case 5:(s=e.sent).error?(this.failedRequest(),this.setState({profile:null})):this.setState({profile:s});case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"failedRequest",value:function(){this.cookies.remove("username"),this.cookies.remove("token"),this.setState({token:"",username:"",loggedIn:!1})}},{key:"login",value:function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({showLogin:!this.state.showLogin});case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"upload",value:function(){this.getProfileInfo(),this.setState({showUpload:!this.state.showUpload})}},{key:"publishFile",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var s,n,a,i,r,c,o,d;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t.target.id.split("button")[1],n=document.getElementById("title"+s).value,a=document.getElementById("module"+s).value,i=document.getElementById("description"+s).value,(r=new FormData).append("upload",this.state.files[s]),r.append("username",this.state.username),r.append("token",this.state.token),r.append("unitcode",a),r.append("title",n),r.append("description",i),e.next=13,fetch("/createPost",{method:"POST",body:r});case 13:return c=e.sent,e.next=16,c.json();case 16:(o=e.sent).error?document.getElementById("error"+s).innerHTML=o.error:((d=this.state.files).splice(s,1),this.setState({files:d}),this.upload());case 18:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"fileUploaded",value:function(e){var t=this;if(console.log(e),e&&0!==e.length)for(var s=function(s){t.state.files.find((function(t){return t.name===e[s].name}))||(t.state.files.push(e[s]),t.setState({files:t.state.files}))},n=0;n<e.length;n++)s(n)}},{key:"render",value:function(){var e=this;return Object(y.jsxs)("div",{className:"app",children:[Object(y.jsx)(I,{token:this.state.token,failCallback:this.failedRequest,username:this.state.username,loggedIn:this.state.loggedIn,uploadCallback:this.upload,loginCallback:this.login}),Object(y.jsxs)(T,{show:this.state.showLogin,handleClose:this.login,children:[Object(y.jsx)("div",{className:"tabs",children:this.signInTabs.map((function(t,s){return Object(y.jsx)("button",{onClick:function(){return e.setCurrentTab(t.name)},className:"clickable ".concat(t.name===e.state.currentTab?"active":""),children:t.label},s)}))}),this.signInTabs.find((function(t){return t.name===e.state.currentTab})).content]}),Object(y.jsxs)(T,{className:"uploadModal",show:this.state.showUpload,handleClose:this.upload,children:[Object(y.jsx)(M,{handleDrop:this.fileUploaded,filetype:"PDF"}),Object(y.jsx)("div",{className:"queued-files",children:"Queued Files"}),Object(y.jsx)("div",{className:"uploaded-files",children:this.state.files.map((function(t,s){return Object(y.jsxs)("section",{className:"file-upload-section",children:[Object(y.jsxs)("div",{className:"file-upload-header",children:[Object(y.jsx)("img",{alt:"pdf",src:O}),Object(y.jsx)("div",{className:"file-upload-filename",children:t.name})]}),Object(y.jsxs)("div",{className:"file-upload-inputs",children:[Object(y.jsxs)("div",{className:"file-upload-title-module",children:[Object(y.jsx)("input",{id:"title"+s,className:"file-upload-title",placeholder:"Title... (required)"}),Object(y.jsx)("select",{id:"module"+s,className:"file-upload-module",onChange:function(t){e.setState({unitFilter:t.target.value})},children:e.state.profile.units.map((function(e,t){return Object(y.jsx)("option",{value:e.UnitCode,children:e.UnitCode},t)}))})]}),Object(y.jsx)("textarea",{id:"description"+s,type:"textarea",className:"file-upload-description",placeholder:"Description... (required)"}),Object(y.jsx)("div",{id:"error"+s}),Object(y.jsx)("button",{id:"button"+s,onClick:e.publishFile,children:"Publish"})]}),Object(y.jsx)("img",{src:x,alt:"Close",className:"file-upload-close clickable hover",onClick:function(){var t=e.state.files;t.splice(s,1),e.setState({files:t})}})]},s)}))})]}),Object(y.jsxs)(b.c,{children:[Object(y.jsx)(b.a,{path:"/reset-password",component:E}),Object(y.jsx)(b.a,{path:"/profile/:username",render:function(t){return Object(y.jsx)(U,{token:e.state.token,failCallback:e.failedRequest,myusername:e.state.username,username:t.match.params.username,loggedIn:e.state.loggedIn})}}),Object(y.jsx)(b.a,{path:"/note/:noteid",render:function(t){return Object(y.jsx)(H,{id:t,token:e.state.token,failCallback:e.failedRequest})}}),Object(y.jsx)(b.a,{path:"/",render:function(t){return e.state.loggedIn?Object(y.jsx)(C,{}):Object(y.jsx)(B,{loginCallback:e.login,signInTabs:e.signInTabs,currentTab:e.currentTab})}})]})]})}}]),s}(a.a.Component);r.a.render(Object(y.jsx)(c.a,{children:Object(y.jsx)(V,{})}),document.getElementById("root"))}},[[232,1,2]]]);
//# sourceMappingURL=main.a914b489.chunk.js.map