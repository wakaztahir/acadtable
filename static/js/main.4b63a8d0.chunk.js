(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{22:function(e,t,n){e.exports=n(32)},32:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(19),c=n.n(r),i=n(2),s=n(3),o=n(7),u=n(6),m=n(8),b=n(35),d=n(34),h=n(33),f=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("header",null,l.a.createElement("nav",null,l.a.createElement(h.a,{to:"/"},l.a.createElement("button",null,"Home")),l.a.createElement(h.a,{to:"/tables"},l.a.createElement("button",null,"Tables"))))}}]),t}(a.Component),p=n(10),E=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("span",null,"Welcome !"),l.a.createElement("p",null,"You have't created any tables",l.a.createElement("br",null),l.a.createElement(h.a,{to:"/tables"},"Click Here")))}}]),t}(a.Component),v=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"welcomeMessage",value:function(){return l.a.createElement(E,null)}},{key:"nothingSelected",value:function(){return l.a.createElement("div",null,l.a.createElement("span",null,"You have't selected a table"),l.a.createElement("br",null),l.a.createElement(h.a,{to:"/tables"},"Click Here"))}},{key:"screen",value:function(){return l.a.createElement("div",null,"This is the screen")}},{key:"render",value:function(){return 0===this.props.list.length?this.welcomeMessage():null===this.props.selected?this.nothingSelected():this.screen()}}]),t}(a.Component),y=Object(p.b)(function(e){return{list:e.TablesList,selected:e.SelectedTable}})(v),O=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;Object(i.a)(this,e),this.init(t)}return Object(s.a)(e,[{key:"init",value:function(e){null!=e&&(this.id=e)}},{key:"getBatchList",value:function(){}},{key:"createBatch",value:function(e){console.log("batch","create",e)}},{key:"renameBatch",value:function(e,t){console.log("batch","rename",e,t)}},{key:"deleteBatch",value:function(e){console.log("batch","delete",e)}},{key:"getLectureList",value:function(){}},{key:"createLecture",value:function(e){console.log("lecture","create",e)}},{key:"renameLecture",value:function(e,t){console.log("lecture","rename",e,t)}},{key:"deleteLecture",value:function(e){console.log("lecture","delete",e)}}],[{key:"create",value:function(t,n){var a=e.getList(),l={name:t,id:n},r={name:t,id:n,blockList:[],batchesList:[],lecturesList:[]};a.push(l),e.saveList(a),e.saveData(n,r)}},{key:"getList",value:function(){var e=sessionStorage.getItem("tables-list")||"[]";try{e=JSON.parse(e)}catch(t){e=[]}return e}},{key:"saveList",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];sessionStorage.setItem("tables-list",JSON.stringify(e))}},{key:"getData",value:function(e){var t=sessionStorage.getItem("td-"+e);return void 0!==(t=JSON.parse(t))&&null!==t?t:{}}},{key:"saveData",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};sessionStorage.setItem("td-"+e,JSON.stringify(t))}},{key:"rename",value:function(t,n){var a=e.getList().map(function(e){return e.id===t&&(e.name=n),e});e.saveList(a)}},{key:"delete",value:function(t){var n=e.getList().filter(function(e){return e.id!==t});e.saveList(n),sessionStorage.removeItem("td-"+t)}}]),e}(),g=new O,j=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return this.props.list.map(function(t){var n=null==e.props.selected?{id:""}:e.props.selected,a=t.id===n.id?"selected-card":"";return l.a.createElement("div",{key:t.id,className:"table-card card-box ".concat(a)},l.a.createElement("div",{className:"card-title"},t.name),l.a.createElement("div",{className:"buttons-list blue"},l.a.createElement("button",{onClick:function(){e.props.select(t.id)},className:"select-btn"},"Select"),l.a.createElement("button",{onClick:function(){e.props.edit(t)}},"Edit"),l.a.createElement("button",{onClick:function(){e.props.delete(t.id)}},"Delete")))})}}]),t}(a.Component),k=Object(p.b)(function(e){return{list:e.TablesList,selected:e.SelectedTable}},{select:function(e){return g.init(e),{type:"SELECT_TABLE",table:O.getData(e)}},delete:function(e){return O.delete(e),{type:"DELETE_TABLE",deleted:e,list:O.getList()}}})(j),L=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,l=new Array(a),r=0;r<a;r++)l[r]=arguments[r];return(n=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={form:{name:""}},n.handleSubmit=function(e){e.preventDefault(),n.props.action(n.state.form)},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("form",{onSubmit:this.handleSubmit,className:"row-block"},l.a.createElement("label",{htmlFor:"name",className:"item"},"Table Name :"),l.a.createElement("input",{type:"text",name:"name",className:"item",value:this.state.form.name,onChange:function(t){e.setState({form:{name:t.target.value}})}}),l.a.createElement("input",{type:"submit",className:"item"}),l.a.createElement("button",{onClick:this.props.cancel,className:"item"},"Cancel"))}}]),t}(a.Component),T=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,l=new Array(a),r=0;r<a;r++)l[r]=arguments[r];return(n=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={form:{newname:n.props.name}},n.handleSubmit=function(e){e.preventDefault(),n.props.action(n.state.form)},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("form",{onSubmit:this.handleSubmit,className:"row-block"},l.a.createElement("label",{htmlFor:"name",className:"item"},"Table Name :"),l.a.createElement("input",{type:"text",name:"name",className:"item",value:this.state.form.newname,onChange:function(t){e.setState({form:{newname:t.target.value}})}}),l.a.createElement("input",{type:"submit",className:"item",value:"Save"}),l.a.createElement("button",{onClick:this.props.cancel,className:"item"},"Cancel"))}}]),t}(a.Component),S=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,l=new Array(a),r=0;r<a;r++)l[r]=arguments[r];return(n=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={showCreateForm:!1,editTable:null,showEditForm:!1},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("h1",null,"Tables"),l.a.createElement(function(){return e.state.showCreateForm?l.a.createElement(L,{cancel:function(){e.setState({showCreateForm:!1})},action:function(t){e.props.create(t.name),e.setState({showCreateForm:!1})}}):l.a.createElement("ul",{className:"buttons-list"},l.a.createElement("li",null,l.a.createElement("button",{onClick:function(){e.setState({showCreateForm:!0})}},"Create A Table")))},null),l.a.createElement(function(){return null!=e.state.editTable&&e.state.showEditForm?l.a.createElement(T,{name:e.state.editTable.name,action:function(t){e.props.rename(e.state.editTable.id,t.newname),e.setState({showEditForm:!1,editTable:null})},cancel:function(){e.setState({showEditForm:!1,editTable:null})}}):null},null),l.a.createElement(function(){return l.a.createElement("div",{className:"list-contaienr"},l.a.createElement(k,{edit:function(t){e.setState({showEditForm:!0,editTable:t})}}))},null))}}]),t}(a.Component),w=Object(p.b)(function(e){return{list:e.TablesList,selected:e.SelectedTable}},{create:function(e){var t=Math.random().toString().split(".")[1].substr(0,5);return O.create(e,t),{type:"CREATE_TABLE",list:O.getList()}},rename:function(e,t){return O.rename(e,t),{type:"RENAME_TABLE",list:O.getList()}}})(S),C=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement(b.a,null,l.a.createElement("div",null,l.a.createElement(d.a,{path:"/",component:f}),l.a.createElement("div",{className:"wrapper"},l.a.createElement(d.a,{path:"/",exact:!0,component:y}),l.a.createElement(d.a,{path:"/tables",exact:!0,component:w}))))}}]),t}(a.Component),N=n(11),A=Object(N.b)({TablesList:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O.getList(),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CREATE_TABLE":case"RENAME_TABLE":case"DELETE_TABLE":return t.list;default:return e}},SelectedTable:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SELECT_TABLE":return t.table||null;case"DELETE_TABLE":return null!==e&&t.deleted===e.id?null:e;default:return e}}}),B=Object(N.c)(A);c.a.render(l.a.createElement(p.a,{store:B},l.a.createElement(C,null)),document.querySelector("#root"))}},[[22,2,1]]]);
//# sourceMappingURL=main.4b63a8d0.chunk.js.map