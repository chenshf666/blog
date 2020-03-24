webpackJsonp([1],{"+cgv":function(t,e){},"/m0x":function(t,e){},"2AAv":function(t,e){},"3dwl":function(t,e){},"3f40":function(t,e){},"4qOc":function(t,e){},"59n4":function(t,e){},"6d3U":function(t,e){},CNkX:function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("7+uW"),n=s("mtWM"),a=s.n(n),i={name:"Header",data:function(){return{msg:"Welcome to Your Vue.js App"}},props:["hasLogin"],methods:{logout:function(){this.$parent.setLogin(""),localStorage.removeItem("token")}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"outer"},[s("div",{staticClass:"nav"},[s("router-link",{attrs:{to:"/",exact:""}},[t._v("首页")]),t._v(" "),s("router-link",{attrs:{to:"/writeBlog",exact:""}},[t._v("写博客")]),t._v(" "),t.hasLogin?t._e():s("router-link",{attrs:{to:"/register",exact:""}},[t._v("注册")]),t._v(" "),t.hasLogin?t._e():s("router-link",{attrs:{to:"/login",exact:""}},[t._v("登录")]),t._v(" "),t.hasLogin?s("router-link",{attrs:{to:"/userBlogs/"+t.hasLogin,exact:""}},[t._v(t._s(t.hasLogin))]):t._e(),t._v(" "),t.hasLogin?s("span",{on:{click:t.logout}},[s("a",{attrs:{href:"javascript:void(0)"}},[t._v("注销")])]):t._e()],1)])},staticRenderFns:[]};var l=s("VU/8")(i,r,!1,function(t){s("2AAv")},null,null).exports,c={name:"Login",data:function(){return{username:"",password:"",warning:""}},methods:{login:function(){var t=this;""==this.username||""==this.password?this.$message({type:"warning",showClose:!0,message:"请输入完整信息"}):a()({method:"post",url:"/api/login",data:{username:this.username,password:this.password}}).then(function(e){switch(e.data.status){case 0:localStorage.setItem("token",e.data.token),t.$parent.setLogin(t.username),t.$router.push({path:"/"});break;case 1:t.$parent.setLogin(""),t.$message({type:"error",showClose:!0,message:"用户名不存在或者密码错误"});break;case 2:t.$message({type:"error",showClose:!0,message:"发生异常，请重试"})}e.data.status}).catch(function(){t.$message({type:"warning",showClose:!0,message:"发生异常，请重试"})})}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"register-box"},[s("el-input",{staticClass:"register-input",attrs:{placeholder:"请输入用户名"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),s("el-input",{staticClass:"register-input",attrs:{placeholder:"请输入密码","show-password":""},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),s("el-button",{staticClass:"register-button",attrs:{type:"primary"},on:{click:t.login}},[t._v("登录")]),t._v(" "),s("div",{staticClass:"login-tip"},[s("router-link",{attrs:{to:"/register"}},[t._v("还没有账号？点此注册")])],1)],1)},staticRenderFns:[]};var g=s("VU/8")(c,u,!1,function(t){s("59n4")},null,null).exports,d={name:"App",components:{Header:l,Login:g},data:function(){return{isLogin:sessionStorage.getItem("isLogin")}},methods:{setLogin:function(t){this.isLogin=t,sessionStorage.setItem("isLogin",t)}},mounted:function(){var t=this;a()({method:"post",url:"/api/validate",data:{token:localStorage.getItem("token")||""}}).then(function(e){0==e.data.status&&t.setLogin(e.data.username)}).catch(function(t){console.error(t)})}},h={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("Header",{attrs:{hasLogin:this.isLogin}}),this._v(" "),e("router-view",{key:this.$route.fullPath})],1)},staticRenderFns:[]};var p=s("VU/8")(d,h,!1,function(t){s("YYvM")},null,null).exports,m=s("/ocq"),f={name:"Register",data:function(){return{username:"",password1:"",password2:"",warning:""}},methods:{register:function(){var t=this;""==this.username||""==this.password1||""==this.password2?this.$message({type:"warning",showClose:!0,message:"请输入完整信息"}):this.password1!=this.password2?this.$message({type:"warning",showClose:!0,message:"两次密码输入不一致"}):(this.warning="",a()({method:"post",url:"/api/register",data:{username:this.username,password:this.password1}}).then(function(e){switch(e.data.status){case 0:t.$message({type:"success",showClose:!0,message:"注册成功"});break;case 1:t.$parent.setLogin(""),t.$message({type:"error",showClose:!0,message:"用户名已经被注册"});break;case 2:t.$message({type:"error",showClose:!0,message:"发生异常，请重试"})}}).catch(function(){t.$message({type:"warning",showClose:!0,message:"发生异常，请重试"})}))}}},v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"register-box"},[s("el-input",{staticClass:"register-input",attrs:{placeholder:"请输入用户名"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),s("el-input",{staticClass:"register-input",attrs:{placeholder:"请输入密码","show-password":""},model:{value:t.password1,callback:function(e){t.password1=e},expression:"password1"}}),t._v(" "),s("el-input",{staticClass:"register-input",attrs:{placeholder:"请确认密码","show-password":""},model:{value:t.password2,callback:function(e){t.password2=e},expression:"password2"}}),t._v(" "),s("el-button",{staticClass:"register-button",attrs:{type:"primary"},on:{click:t.register}},[t._v("注册")]),t._v(" "),s("div",{staticClass:"login-tip"},[s("router-link",{attrs:{to:"/login"}},[t._v("已经有账号了？点此登录")])],1)],1)},staticRenderFns:[]};var _=s("VU/8")(f,v,!1,function(t){s("/m0x")},null,null).exports,w={name:"writeBlog",data:function(){return{content:localStorage.getItem("blog_draft")||"",title:localStorage.getItem("blog_title")||"",loading:!1,editorOption:{theme:"snow"}}},computed:{editor:function(){return this.$refs.myQuillEditor.quill}},methods:{onEditorReady:function(t){},onEditorBlur:function(){},onEditorFocus:function(){},onEditorChange:function(){},saveLocal:function(t){this.loading=!0,localStorage.setItem("blog_draft",this.content),localStorage.setItem("blog_title",this.title),this.$message({type:"success",showClose:!0,message:"保存成功"}),this.loading=!1},sendToServer:function(){var t=this;if(this.loading=!0,""===this.title||""===this.content)return this.$message({showClose:!0,message:"请填写标题和内容！！！！",type:"warning"}),void(this.loading=!1);var e=new FormData;this.getFileOfImg().forEach(function(t,s){e.append(s+t.name,t)}),e.append("content",this.content.replace(/<img src="data[^>]*>/g,"<img>")),e.append("title",this.title),e.append("token",localStorage.getItem("token")||""),a()({method:"post",url:"/api/add_blog",data:e}).then(function(e){switch(e.data.status){case 0:t.$message({type:"success",showClose:!0,message:"上传成功"});break;case 1:t.$parent.setLogin(""),t.$message({type:"error",showClose:!0,message:"身份验证失败，请重新登录"});break;case 2:t.$message({type:"error",showClose:!0,message:"发生异常，请重试"})}t.loading=!1}).catch(function(){t.$message({type:"error",showClose:!0,message:"发生异常，请重试"}),t.loading=!1})},getFileOfImg:function(){for(var t=document.getElementsByTagName("img"),e=[],s=0;s<t.length;s++)if(t[s].src.startsWith("data:image/")){var o=this.dataURLtoFile(t[s].src,"");e.push(o)}return e},dataURLtoFile:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"file",s=t.split(","),o=s[0].match(/:(.*?);/)[1],n=o.split("/")[1],a=atob(s[1]),i=a.length,r=new Uint8Array(i);i--;)r[i]=a.charCodeAt(i);return new File([r],e+"."+n,{type:o})}}},b={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"writeBlog_edit_container",attrs:{"element-loading-text":"拼命上传中"}},[s("div",{staticClass:"writeBlog_blog_title"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.title,expression:"title"}],attrs:{type:"text",placeholder:"请输入标题"},domProps:{value:t.title},on:{input:function(e){e.target.composing||(t.title=e.target.value)}}})]),t._v(" "),s("quill-editor",{ref:"myQuillEditor",staticClass:"writeBlog_editor",attrs:{options:t.editorOption},on:{blur:function(e){return t.onEditorBlur(e)},focus:function(e){return t.onEditorFocus(e)},change:function(e){return t.onEditorChange(e)}},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}}),t._v(" "),s("button",{attrs:{type:"primary"},on:{click:t.sendToServer}},[t._v("发布博客")]),t._v(" "),s("button",{attrs:{type:"primary"},on:{click:t.saveLocal}},[t._v("保存到草稿")])],1)},staticRenderFns:[]};var C=s("VU/8")(w,b,!1,function(t){s("CNkX")},null,null).exports,y={name:"showBlogs",data:function(){return{blogs:[],page:0,timer:null,isLogin:sessionStorage.getItem("isLogin"),getAll:!1}},methods:{getMore:function(){var t=this,e=this.$refs.blogs_ref;e.scrollTop+e.clientHeight>=e.scrollHeight&&!this.getAll&&a()({method:"get",url:"/api/get_blogs",params:{page:this.page,author:this.$route.params.author||""}}).then(function(e){e.data.forEach(function(e){t.blogs.push(e)}),t.page++,0==e.data.length&&(t.getAll=!0)}).catch(function(t){console.log(t)})},delete_blog:function(t,e){var s=this;this.$confirm("此操作将永久删除该博客, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){a()({method:"post",url:"/api/delete_blog",data:{id:e,token:localStorage.getItem("token")||""}}).then(function(e){switch(e.data.status){case 0:s.$message({type:"success",showClose:!0,message:"删除成功"}),s.blogs.splice(t,1),s.$forceUpdate();break;case 1:s.$parent.setLogin(""),s.$message({type:"error",showClose:!0,message:"身份验证失败，请重新登录"});break;case 2:s.$message({type:"error",showClose:!0,message:"发生异常，请重试"})}}).catch(function(t){s.$message({type:"error",showClose:!0,message:"发生异常，请重试"})})}).catch(function(){s.$message({type:"info",message:"已取消删除",showClose:!0})})}},mounted:function(){var t=this;a()({method:"get",url:"/api/get_blogs",params:{page:this.page,author:this.$route.params.author||""}}).then(function(e){t.blogs=e.data,t.page++}).catch(function(t){console.log(t)})},filters:{toChunjing:function(t){return(t=t.replace(/<[^>]+>/g,"").replace(/<.*$/,"")).slice(0,33)+"..."}}},$={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{ref:"blogs_ref",staticClass:"showBlogs_test",on:{scroll:t.getMore}},[s("div",{staticClass:"showBlogs_zhanwei"}),t._v(" "),t.$route.params.author?s("div",{staticClass:"showBlogs_blog_desc",staticStyle:{"font-weight":"bolder","text-align":"center"}},[t._v("\n    "+t._s(t.$route.params.author)+"的博客\n  ")]):t._e(),t._v(" "),t._l(t.blogs,function(e,o){return s("div",{key:o},[s("div",{staticClass:"showBlogs_blog_desc"},[s("router-link",{attrs:{to:"/singleBlog/"+e.id}},[s("span",{staticClass:"showBlogs_blog_title"},[t._v(t._s(e.title))]),t._v(" "),s("span",{staticClass:"showBlogs_blog_content"},[t._v(t._s(t._f("toChunjing")(e.content)))]),t._v(" "),s("span",{staticClass:"showBlogs_blog_author"},[s("router-link",{attrs:{to:"/userBlogs/"+e.author}},[t._v("\n              "+t._s(e.author)+"\n            ")])],1)]),t._v(" "),t.$route.params.author&&t.$route.params.author===t.isLogin?s("span",{staticClass:"showBlogs_blog_delete",on:{click:function(s){return t.delete_blog(o,e.id)}}},[s("a",{attrs:{href:"javascript:void(0)"}},[t._v("删除")])]):t._e()],1)])})],2)},staticRenderFns:[]};var k=s("VU/8")(y,$,!1,function(t){s("3dwl")},null,null).exports,B=s("BO1k"),L=s.n(B),x={name:"singleBlog",data:function(){return{content:this.$route.params.id,title:"",time:"",author:"",urls:"",isLogin:sessionStorage.getItem("isLogin"),canDelete:!1,imgs:[],editorOption:{theme:"snow"}}},mounted:function(){var t=this;a()({url:"/api/get_single_blog",method:"get",params:{id:this.$route.params.id}}).then(function(e){t.$refs.blog_body.innerHTML=e.data.content,t.title=e.data.title,t.author=e.data.author,t.time=e.data.create_time,t.urls=JSON.parse(e.data.img_urls),t.author===t.isLogin&&(t.canDelete=!0);var s=document.getElementsByTagName("img"),o=!0,n=!1,a=void 0;try{for(var i,r=L()(s);!(o=(i=r.next()).done);o=!0){var l=i.value;l.src||(l.width=l.height="501",t.imgs.push(l))}}catch(t){n=!0,a=t}finally{try{!o&&r.return&&r.return()}finally{if(n)throw a}}t.check()}).catch(function(t){console.log(t)})},methods:{lazyload:function(){var t=this,e=null;null==e&&(e=setTimeout(function(){t.check(),e=null},1e3))},check:function(){for(var t=this,e=function(){var e=t.imgs[s];!e.src&&t.isInScreen(s,e)&&(e.src=t.urls[s],e.onload=function(){e.removeAttribute("width"),e.removeAttribute("height")},t.imgs.splice(s,1),t.urls.splice(s,1))},s=this.imgs.length-1;s>-1;s--)e()},isInScreen:function(t,e){return e.getBoundingClientRect().top<=document.documentElement.clientHeight}}},E={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"singleBlog_blog_container",on:{scroll:t.lazyload}},[s("div",{staticClass:"singleBlog_whole_blog"},[s("div",{staticClass:"singleBlog_zhanwei"}),t._v(" "),s("div",{staticClass:"singleBlog_blog_title"},[t._v(t._s(t.title))]),t._v(" "),s("div",{staticClass:"singleBlog_blog_author"},[s("router-link",{attrs:{to:"/userBlogs/"+t.author}},[t._v(t._s(t.author))])],1),t._v(" "),s("div",{staticClass:"singleBlog_blog_time"},[t._v("最后发布于"+t._s(t.time))]),t._v(" "),s("div",{ref:"blog_body",staticClass:"ql-snow ql-editor ql-container"})])])},staticRenderFns:[]};var S=s("VU/8")(x,E,!1,function(t){s("6d3U"),s("yD2L")},null,null).exports;o.default.use(m.a);var I=new m.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:[{path:"/",name:"showBlogs",component:k},{path:"/userBlogs/:author",name:"userBlogs",component:k},{path:"/register",name:"Register",component:_},{path:"/login",name:"Login",component:g},{path:"/writeBlog",name:"writeBlog",component:C},{path:"/singleBlog/:id",name:"singleBlog",component:S}]}),A=s("zL8q"),R=s.n(A),F=s("G0J2"),U=s.n(F);s("tvR6"),s("3f40"),s("4qOc"),s("+cgv");o.default.use(U.a),o.default.use(R.a),o.default.config.productionTip=!1,new o.default({el:"#app",router:I,components:{App:p},template:"<App/>"})},YYvM:function(t,e){},tvR6:function(t,e){},yD2L:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.deb1564714b7195be7de.js.map