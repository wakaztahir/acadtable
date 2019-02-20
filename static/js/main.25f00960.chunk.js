(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e){e.exports={tables:[{name:"Monday Table",rows:"places",cols:"times",base:"days",baseValue:"dy7952700",id:"tl5786835"},{name:"Tuesday Table",baseValue:"dy3256093",rows:"places",cols:"times",base:"days",id:"tl6756441"},{name:"Wednesday Table",baseValue:"dy4108701",rows:"places",cols:"times",base:"days",id:"tl0912359"},{name:"Thursday Table",baseValue:"dy1700065",rows:"places",cols:"times",base:"days",id:"tl6539478"},{name:"Friday Table",baseValue:"dy7678812",rows:"places",cols:"times",base:"days",id:"tl4565578"}],lectures:[{text:null,name:"cs1self",customText:null,day:"dy7952700",place:"pl6095855",time:"tm8685748",batch:"bh6684699",subject:"st9551921",teacher:"tr1506142",display:"%batch%%subject%%teacher%",id:"bk3481321"},{text:null,name:"cs1streg",customText:null,day:"dy7952700",place:"pl9026267",time:"tm8685748",batch:"bh2407037",subject:"st2944175",teacher:"tr7099462",display:"%batch%%subject%%teacher%",id:"bk2462084"},{text:null,name:"itself",customText:null,day:"dy7952700",place:"pl6095855",time:"tm5024385",batch:"bh0060369",subject:"st9551921",teacher:"tr4218605",display:"%batch%%subject%%teacher%",id:"bk3598322"}],days:[{name:"Monday",id:"dy7952700"},{name:"Tuesday",id:"dy3256093"},{name:"Wednesday",id:"dy4108701"},{name:"Thursday",id:"dy1700065"},{name:"Friday",id:"dy7678812"},{name:"Saturday",id:"dy9991486"},{name:"Sunday",id:"dy4146822"}],times:[{name:"8:00",id:"tm8685748"},{name:"9:00",id:"tm5024385"},{name:"10:00",id:"tm4190520"},{name:"11:00",id:"tm7584056"},{name:"12:00",id:"tm5771024"}],places:[{name:"Room 1",id:"pl9026267"},{name:"Room 2",id:"pl3909920"},{name:"Room 3",id:"pl6095855"},{name:"Room 4",id:"pl8388577"},{name:"Room 5",id:"pl2676232"}],batches:[{name:"BSCS 1st Reg.",id:"bh2407037"},{name:"BSCS 1st Self.",id:"bh6684699"},{name:"BSIT 1st Reg.",id:"bh5873593"},{name:"BSIT 1st Self.",id:"bh0060369"},{name:"BSSE 1st Reg.",id:"bh7910571"},{name:"BSSE 1st Self.",id:"bh5106239"}],subjects:[{name:"Functional English",id:"st9551921"},{name:"Basic Electronics",id:"st2000964"},{name:"Thomas Calculus",id:"st2944175"},{name:"Programming Fundamentals",id:"st4206733"},{name:"ICT",id:"st9139652"}],teachers:[{name:"Prof. Abdur Rauf",id:"tr1506142"},{name:"Sir Khaleel",id:"tr6695021"},{name:"Sir Ayaaz",id:"tr7099462"},{name:"Sir Ahsan",id:"tr2977862"},{name:"Mis. Madiha",id:"tr4218605"}]}},22:function(e,t,a){e.exports=a(33)},31:function(e,t,a){},33:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(16),c=a.n(s),r=a(1),i=a(2),o=a(4),u=a(3),d=a(5),m=a(6),p="EXAMPLE_COLLECTION",h="CREATE_COLLECTION",y="SELECT_COLLECTION",b="COPY_COLLECTION",f="DELETE_COLLECTION",v="CREATE_TABLE",E="CREATE_BLOCK",g="DELETE_BLOCK",k="CREATE_TIME",C="CREATE_PLACE",D="UPDATE_PLACE",j="DELETE_PLACE",w="CREATE_BATCH",O="UPDATE_BATCH",T="DELETE_BATCH",S="CREATE_SUBJECT",N="UPDATE_SUBJECT",I="DELETE_SUBJECT",A="CREATE_TEACHER",L=a(18),x=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"x",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:7;switch(e){case"collection":e="cn";break;case"table":e="tl";break;case"block":e="bk";break;case"day":e="dy";break;case"time":e="tm";break;case"place":e="pl";break;case"batch":e="bh";break;case"subject":e="st";break;case"teacher":e="tr"}return e+Math.random().toString().split(".")[1].substr(t,a)},P=function(){function e(t,a){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;Object(r.a)(this,e),this.datacenter=t,this.datakey=a;var l=this.getData();0===Object.keys(l).length&&this.setData({}),null!=n&&this.setData(n)}return Object(i.a)(e,[{key:"getData",value:function(){var e;if("local"===this.datacenter)e=localStorage.getItem(this.datakey);else{if("session"!==this.datacenter)return!1;e=sessionStorage.getItem(this.datakey)}return this.validator(JSON.parse(e))}},{key:"setData",value:function(e){return"local"===this.datacenter?(localStorage.setItem(this.datakey,JSON.stringify(e)),!0):"session"===this.datacenter&&(sessionStorage.setItem(this.datakey,JSON.stringify(e)),!0)}},{key:"delData",value:function(){return"local"===this.datacenter?(localStorage.removeItem(this.datakey),!0):"session"===this.datacenter&&(sessionStorage.removeItem(this.datakey),!0)}},{key:"getDataItem",value:function(e){var t=this.getData();return this.validator(t[e])}},{key:"setDataItem",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=this.getData();return null!=a[e]?a[e]=Object.assign(a[e],this.validator(t)):a[e]=this.validator(t),a[e].id=e,this.setData(a),this.validator(t)}},{key:"delDataItem",value:function(e){var t=this.getData(),a=t[e];return delete t[e],this.setData(t),this.validator(a)}},{key:"validator",value:function(e){return null!=e?e:{}}}]),e}(),M=new(function(){function e(t){Object(r.a)(this,e),this.id=null!=t?t:x("collection"),this.collections=new P("local","collections"),this.local=null,this.session=null}return Object(i.a)(e,[{key:"init",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x("collection");this.id=e,this.local=new P("local",e),this.session={tables:new P("session","tables",this.local.getDataItem("tables")),batches:new P("session","batches",this.local.getDataItem("batches")),days:new P("session","days",this.local.getDataItem("days")),places:new P("session","places",this.local.getDataItem("places")),times:new P("session","times",this.local.getDataItem("times")),lectures:new P("session","lectures",this.local.getDataItem("lectures")),subjects:new P("session","subjects",this.local.getDataItem("subjects")),teachers:new P("session","teachers",this.local.getDataItem("teachers"))}}},{key:"get",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.id;return this.collections.getDataItem(e)}},{key:"set",value:function(e){return this.collections.setDataItem(this.id,e)}},{key:"getData",value:function(){arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.id;var e={};return Object.keys(this.session).forEach(function(t){var a=new P("session",t);e[t]=a.getData()}),e}},{key:"getDataItem",value:function(e){return this.session[e].getData()}},{key:"setData",value:function(e){this.local.setData(e),this.session.tables.setData(e.tables),this.session.batches.setData(e.batches),this.session.days.setData(e.days),this.session.times.setData(e.times),this.session.places.setData(e.places),this.session.lectures.setData(e.lectures),this.session.subjects.setData(e.subjects),this.session.teachers.setData(e.teachers)}},{key:"setDataItem",value:function(e,t){this.session[e]=t}},{key:"delete",value:function(){return this.local.delData(),Object.values(this.session).forEach(function(e){e.delData()||console.warning("dataitem ",e," cannot be deleted")}),this.collections.delDataItem(this.id)}},{key:"list",get:function(){return this.collections.getData()}}]),e}()),B=function(e){return M.init(e),{type:y,payload:{user:M,tables:M.getDataItem("tables"),days:M.getDataItem("days"),places:M.getDataItem("places"),lectures:M.getDataItem("lectures"),batches:M.getDataItem("batches"),times:M.getDataItem("times"),subjects:M.getDataItem("subjects"),teachers:M.getDataItem("teachers")}}},q=(a(31),function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={ftDisplay:null,collectionName:"",collectionDesc:""},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"displayCreate",value:function(){var e=this;return l.a.createElement("div",null,l.a.createElement("button",{onClick:function(){e.setState({ftDisplay:null})}},"Back"),l.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.props.createCollection({name:e.state.collectionName,desc:e.state.collectionDesc}),e.setState({ftDisplay:null})}},l.a.createElement("div",{className:"welcome-dialogue form-table"},l.a.createElement("div",{className:"form-row"},l.a.createElement("label",{htmlFor:"cName",className:"big-label"},"Collection Name"),l.a.createElement("input",{id:"cName",type:"text",onChange:function(t){return e.setState({collectionName:t.target.value})},value:this.state.collectionName,className:"big-input",placeholder:"my first collection...",required:!0})),l.a.createElement("div",{className:"form-row"},l.a.createElement("label",{htmlFor:"desc",className:"big-label"},"Description"),l.a.createElement("textarea",{id:"cdesc",className:"big-desc",onChange:function(t){e.setState({collectionDesc:t.target.value})},value:this.state.collectionDesc,placeholder:"this is the best collection ever..."})),l.a.createElement("div",{className:"form-row"},l.a.createElement("span",null),l.a.createElement("input",{type:"submit",value:"Create",className:"big-btn"})))))}},{key:"firstTime",value:function(){var e=this;return"create"===this.state.ftDisplay?this.displayCreate():"quickSetup"===this.state.ftDisplay?l.a.createElement("div",null):l.a.createElement("div",null,l.a.createElement("h2",null,"Looks like its your first time visiting acadtable."),l.a.createElement("div",{className:"welcome-buttons"},l.a.createElement("button",{onClick:function(){e.setState({ftDisplay:"create"})}},"Create A Collection"),l.a.createElement("span",{className:"info"},l.a.createElement("span",null,"Do everything from scratch")),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("button",{onClick:function(){e.setState({ftDisplay:"quickSetup"})},disabled:!0},"Quick Setup"),l.a.createElement("span",{className:"info"},l.a.createElement("span",null,"Quick setup to build tables (recommended)")),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("button",{onClick:this.props.exampleCollection},"Load An Example"),l.a.createElement("span",{className:"info"},l.a.createElement("span",null,"Load an example , premade collection"))))}},{key:"screen",value:function(){var e=this;return"create"===this.state.ftDisplay?this.displayCreate():l.a.createElement("div",{className:"wrapper"},l.a.createElement("div",{className:"screen-header"},l.a.createElement("div",{className:"welcome-buttons"},l.a.createElement("button",{onClick:function(){e.setState({ftDisplay:"create",collectionName:"",collectionDesc:""})}},"Create Another Collection")),l.a.createElement("h2",null,"Please select a collection to display")),l.a.createElement("div",{className:"cards-container"},this.props.collections.map(function(t){return l.a.createElement("div",{className:"card-item",key:t.id},l.a.createElement("div",{className:"card-heading"},t.name.length>40?t.name.substr(0,40)+"...":t.name),l.a.createElement("div",{className:"card-desc"},t.desc.length>120?t.desc.substr(0,120)+"...":t.desc),l.a.createElement("div",{className:"card-btns"},l.a.createElement("button",{onClick:function(){return e.props.selectCollection(t.id)}},"Select"),l.a.createElement("button",{onClick:function(){return e.props.copyCollection(t.id)}},"Copy"),l.a.createElement("button",{onClick:function(){return e.props.deleteCollection(t.id)}},"Delete")))})))}},{key:"render",value:function(){return l.a.createElement("div",{className:"wrapper"},l.a.createElement("h1",null,0===this.props.collections.length?"Welcome To Acadtable":"Acadtable"),l.a.createElement("div",{className:"wrapper"},0===this.props.collections.length?this.firstTime():this.screen()))}}]),t}(n.Component)),_=Object(m.b)(function(e){return{collections:e.Collections}},{createCollection:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};M.init();var t=M.set(e);return{type:h,payload:t}},selectCollection:B,copyCollection:function(e){M.init();var t=M.get(e);return t.name+=" Copy",t=M.set(t),M.setData(M.getData(e)),{type:b,payload:t}},exampleCollection:function(){M.init("example");var e=M.set({name:"Example",desc:"This is an Example Collection generated by Acadtable."});return M.setData(L),{type:p,payload:e}},deleteCollection:function(e){M.init(e);var t=M.delete();return{type:f,payload:t}}})(q),R=function(e){function t(){return Object(r.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"pattern",value:function(e){for(var t=[];e.indexOf("%")>-1;){var a=e.match(/%(.*?)%/);e=e.replace(a[0],""),t.push(a[1])}return t}},{key:"getTextFor",value:function(e,t){switch(e){case"batch":return this.props.batches.filter(function(e){return e.id===t.batch})[0].name;case"day":return this.props.days.filter(function(e){return e.id===t.day})[0].name;case"time":return this.props.times.filter(function(e){return e.id===t.time})[0].name;case"place":return this.props.places.filter(function(e){return e.id===t.place})[0].name;case"teacher":return this.props.teachers.filter(function(e){return e.id===t.teacher})[0].name;case"subject":return this.props.subjects.filter(function(e){return e.id===t.subject})[0].name;default:return""}}},{key:"render",value:function(){var e=this,t=this.props.block,a=this.pattern(t.display);return l.a.createElement("div",{className:"block"},a.map(function(a){return l.a.createElement("div",{key:"blp"+a},e.getTextFor(a,t))}),l.a.createElement("button",{onClick:function(){e.props.delete(t.id)}},"-"))}}]),t}(n.Component),F=Object(m.b)(function(e){return{selected:e.SelectedCollection,tables:e.TablesList,days:e.DaysList,places:e.PlacesList,times:e.TimesList,batches:e.BatchesList,subjects:e.SubjectsList,teachers:e.TeachersList}})(R),J=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={blocks:a.props.blocks},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this,t=this.props.base,a=this.props.baseBlockKey,n=this.props.rows,s=this.props.rowsBlockKey,c=this.props.cols,r=this.props.colsBlockKey,i=this.state.blocks,o=this.props.mode;return l.a.createElement("div",{key:this.props.id},l.a.createElement("table",null,l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("td",null,null!=t?t.name:null),c.map(function(e){return l.a.createElement("td",{key:"c"+e.id},e.name)}))),l.a.createElement("tbody",null,n.map(function(n){return l.a.createElement("tr",{key:"r"+n.id},l.a.createElement("td",null,n.name),c.map(function(c){var u=i.filter(function(e){return e[a]===t.id&&e[s]===n.id&&e[r]===c.id});return 0===u.length?"print"===o?l.a.createElement("td",{key:"emp"+c.id}):l.a.createElement("td",{onClick:function(){var l={};l[a]=t.id,l[s]=n.id,l[r]=c.id,e.props.displayAddModal(l)},key:"b"+c.id},l.a.createElement("button",null,"+")):l.a.createElement("td",{key:"b"+c.id,className:"table-block"},l.a.createElement(F,{block:u[0],delete:function(t){return e.props.deleteBlock(e.props.collectionID,t)}}))}))}))))}}]),t}(n.Component),U=Object(m.b)(function(e){return{blocks:e.BlocksList}},{deleteBlock:function(e,t){return{type:g,payload:{}}}})(J),G=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={modalType:null==a.props.type?"message":a.props.type},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"contentModal",value:function(e){return l.a.createElement("div",{className:"modal",display:this.state.display?"block":"none"},l.a.createElement("div",{className:"modal-inside"},null!=this.props.cancel?l.a.createElement("div",{onClick:this.props.cancel,className:"modal-x"},"X"):null,e))}},{key:"messageModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){};return this.contentModal(l.a.createElement("div",null,l.a.createElement("div",{className:"modal-message"},e),l.a.createElement("div",{className:"modal-buttons"},l.a.createElement("button",{onClick:function(){t()}},"Ok"))))}},{key:"confirmModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Are you sure ?",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};return this.contentModal(l.a.createElement("div",null,l.a.createElement("div",{className:"modal-message"},e),l.a.createElement("div",{className:"modal-buttons"},l.a.createElement("button",{onClick:function(){t()}},"Yes"),l.a.createElement("button",{onClick:function(){a()}},"Cancel"))))}},{key:"render",value:function(){if(!this.props.display)return null;switch(this.state.modalType){case"message":default:return this.messageModal(this.props.message);case"confirm":return this.confirmModal(this.props.message,this.props.yes,this.props.cancel);case"content":return this.contentModal(this.props.children)}}}]),t}(n.Component),V=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={property:a.props.property,keys:a.props.keys},a.saveForm=function(){var e=a.state.property;a.state.keys.forEach(function(t){t.type&&"input"!==t.type?t.type&&"select"===t.type?null==e[t.name]&&(e[t.name]=null!=a.state.property[t.name]?a.state.property[t.name]:null!=t.default?t.default:t.list.length>0?t.list[0].id:null):t.type&&"textarea"===t.type&&(e[t.name]=null!=a.state.property[t.name]?a.state.property[t.name]:null!=t.default?t.default:null):null==e[t.name]&&(e[t.name]=null!=a.state.property[t.name]?a.state.property[t.name]:null!=t.default?t.default:null)}),a.props.save(e)},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"componentWillUnmount",value:function(){this.props.nounmount||this.saveForm()}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{style:{width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},l.a.createElement("div",{style:{display:"table"}},l.a.createElement("form",{onSubmit:function(t){t.preventDefault(),e.saveForm()}},this.state.keys.map(function(t){if(null!=t.show&&!t.show)return null;var a=null!=t.type?t.type:"input";return l.a.createElement("div",{key:t.name+t.id,style:{display:"table-row"}},l.a.createElement("label",{htmlFor:t.name+t.id+"inp",style:{display:"table-cell"}},t.name),function(t,a){switch(t){case"input":default:return l.a.createElement("input",{key:a.name+"inp",type:"text",onChange:function(t){var n=t.target.value,l=e.state.property;l[a.name]=n,e.setState({property:l})},disabled:null!=a.locked&&a.locked,required:null!=a.required&&a.required,value:null!=e.state.property[a.name]?e.state.property[a.name]:null!=a.default?a.default:"",style:{display:"table-cell"}});case"select":return l.a.createElement("select",{defaultValue:null!=e.state.property[a.name]?e.state.property[a.name]:null!=a.default?a.default:a.list.length>0?a.list[0].id:null,onChange:function(t){var n=e.state.property;n[a.name]=t.target.value,e.setState({property:n})},disabled:null!=a.locked&&a.locked,required:null!=a.required&&a.required},a.list.map(function(e){return l.a.createElement("option",{value:e.id,key:e.id},e.name)}));case"textarea":return l.a.createElement("textarea",{key:a.name+"txt",onChange:function(t){var n=t.target.value,l=e.state.property;l[a.name]=n,e.setState({property:l})},disabled:null!=a.locked&&a.locked,required:null!=a.required&&a.required,style:{display:"table-cell"},value:null==e.state.property[a.name]?null!=a.default?a.default:"":e.state.property[a.name]})}}(a,t))}),this.props.children,l.a.createElement("div",{style:{display:"table-row"}},l.a.createElement("div",{style:{display:"table-cell"}}),l.a.createElement("input",{type:"submit",style:{display:"table-cell",width:"100%"},className:"btn-red"})))))}}]),t}(n.Component),K=a(19),H=a.n(K),W=a(13),Q=a.n(W),X=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,l=new Array(n),s=0;s<n;s++)l[s]=arguments[s];return(a=Object(o.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(l)))).state={mode:"edit",download:!1,downloadType:"pdf",addModal:!1,addModalParams:{}},a}return Object(d.a)(t,e),Object(i.a)(t,[{key:"downloadPDF",value:function(){var e=this.refs.screen,t=new H.a({orientation:"landscape"});t.fromHTML(e),t.save("file.pdf")}},{key:"downloadPNG",value:function(){var e=this.refs.screen;Q.a.toPng(e,{bgcolor:"#fff"}).then(function(e){var t=document.createElement("a");t.href=e,t.download="file.png",t.target="_blank",t.click()}).catch(function(e){console.error("Error converting to PNG Image")})}},{key:"downloadJPEG",value:function(){var e=this.refs.screen;Q.a.toJpeg(e,{bgcolor:"#fff"}).then(function(e){var t=document.createElement("a");t.download="file.jpeg",t.href=e,t.target="_blank",t.click()}).catch(function(e){console.error("Error converting to JPEG Image")})}},{key:"componentDidUpdate",value:function(){if(this.state.download)switch(this.state.downloadType){case"pdf":default:this.downloadPDF();break;case"png":this.downloadPNG();break;case"jpeg":this.downloadJPEG()}}},{key:"addModal",value:function(){var e=this,t=this.state.addModalParams;if(this.state.addModal){var a=[{name:"text",required:!0,locked:!0,show:!1},{name:"name",required:!0},{name:"customText"},{name:"day",type:"select",list:this.props.days,required:!0},{name:"place",type:"select",list:this.props.places,required:!0},{name:"time",type:"select",list:this.props.times,required:!0},{name:"batch",type:"select",list:this.props.batches,required:!0},{name:"subject",type:"select",list:this.props.subjects,required:!0},{name:"teacher",type:"select",list:this.props.teachers,required:!0},{name:"display",type:"textarea",required:!0,default:"%batch%%subject%%teacher%"}];return Object.keys(t).forEach(function(e){null!==t[e]&&a.forEach(function(a){null!=a&&a.name===e&&(a.default=t[e],a.show=!1)})}),l.a.createElement(G,{type:"content",display:!0,cancel:function(){e.setState({addModal:!1,addModalParams:{}})}},l.a.createElement(V,{property:{},keys:a,save:function(t){e.props.createBlock(e.props.selected.id,t),e.setState({addModal:!1,addModalParams:{}})},nounmount:!0}))}}},{key:"screen",value:function(){var e=this,t=this.props,a=t.tables,n=t.blocks,s=t.batches,c=t.days,r=t.times,i=t.places,o=t.subjects,u=t.teachers,d={tables:a,blocks:n,batches:s,days:c,times:r,places:i,subjects:o,teachers:u};return l.a.createElement("div",null,l.a.createElement("h1",null,"Acadtable"),l.a.createElement("div",null,this.addModal()),l.a.createElement("div",null,l.a.createElement("button",{onClick:function(){e.setState({mode:"print",downloadType:"pdf",download:!0})}},"Download As PDF"),l.a.createElement("button",{onClick:function(){e.setState({mode:"print",downloadType:"png",download:!0})}},"Download As PNG"),l.a.createElement("button",{onClick:function(){e.setState({mode:"print",downloadType:"jpeg",download:!0})}},"Download As JPEG")),l.a.createElement("div",null,l.a.createElement("button",{onClick:function(){e.setState({mode:"edit"})},className:"edit"===this.state.mode?"btn-red":""},"edit"),l.a.createElement("button",{onClick:function(){e.setState({mode:"print"})},className:"print"===this.state.mode?"btn-red":""},"print")),l.a.createElement("div",{ref:"screen"},a.map(function(t){var a=d[t.base].filter(function(e){return e.id===t.baseValue})[0],s=d[t.rows],c=d[t.cols];return l.a.createElement(U,{id:t.id,key:t.id,mode:e.state.mode,base:a,rows:s,cols:c,blocks:n,displayAddModal:function(t){Object.keys(d).map(function(e){var a=e;return null==t[a]&&"table"!==a&&"block"!==a&&(t[a]=null),null}),e.setState({addModal:!0,addModalParams:t})}})})))}},{key:"render",value:function(){return this.screen()}}]),t}(n.Component),Y=Object(m.b)(function(e){return{collections:e.Collections,selected:e.User,tables:e.Tables,days:e.Days,places:e.Places,times:e.Times,blocks:e.Blocks,batches:e.Batches,subjects:e.Subjects,teachers:e.Teachers}},{selectCollection:B,createBlock:function(e,t){return{type:E,payload:{}}}})(X),z=function(e){function t(){return Object(r.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return null==this.props.user?l.a.createElement(_,null):l.a.createElement(Y,null)}}]),t}(n.Component),Z=Object(m.b)(function(e){return{user:e.User}})(z),$=a(8),ee=a(21),te=a(20),ae=Object($.b)({User:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return t.payload;default:return e}},Collections:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Object.values(M.list),t=arguments.length>1?arguments[1]:void 0;switch(t.type){case h:case p:case b:return[].concat(Object(te.a)(e),[Object(ee.a)({},t.payload)]);case f:return e.filter(function(e){return e.id!==t.payload.id});default:return e}},Tables:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:case v:return t.payload.tables;default:return e}},Places:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:case C:case D:case j:return t.payload;default:return e}},Batches:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:case w:case O:case T:return t.payload.batches;default:return e}},Days:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:return t.payload.days;default:return e}},Times:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:case k:return t.payload.times;default:return e}},Lectures:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:case E:return t.payload.lectures;default:return e}},Subjects:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:case S:case N:case I:return t.payload.subjects;default:return e}},Teachers:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;switch(t.type){case y:case A:return t.payload.teachers;default:return e}}}),ne=Object($.c)(ae);c.a.render(l.a.createElement(m.a,{store:ne},l.a.createElement(Z,null)),document.querySelector("#root"))}},[[22,2,1]]]);
//# sourceMappingURL=main.25f00960.chunk.js.map