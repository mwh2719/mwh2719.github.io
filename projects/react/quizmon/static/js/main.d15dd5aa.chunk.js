(this.webpackJsonpquizmon=this.webpackJsonpquizmon||[]).push([[0],{129:function(e,t,n){},519:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n.n(a),s=n(55),i=n.n(s),o=(n(129),n(5)),c=n(6),l=n(16),u=n(12),d=n(11),b=n(31),h=n(13),m=n(56),p=n(122),j=n(37),y=n.n(j),f=n(40),v=n(2);function w(e){return Object(a.useEffect)((function(){e.audioSlide.addEventListener("onCanPlayThrough",e.loaded()),e.audioLobby.addEventListener("onCanPlayThrough",e.loaded())})),Object(v.jsx)("div",{id:"loading"})}function O(e){return e.audioSlide.isPlaying=!0,e.audioLobby.isPlaying=!0,e.audioLobby.loop=!0,Object(v.jsxs)("div",{children:[Object(v.jsxs)("div",{className:"content",children:[Object(v.jsx)("div",{id:"welcome-div",className:"welcome",children:Object(v.jsx)(m.CSSTransitionGroup,{transitionName:"welcome-title",transitionAppear:!0,transitionAppearTimeout:2e3,transitionEnter:!1,transitionLeave:!1,children:Object(v.jsxs)("h1",{className:"welcome title",children:["Welcome to ",Object(v.jsx)("span",{id:"app-title",children:"Quizmon"})," - the triva app"]})})}),Object(v.jsx)(m.CSSTransitionGroup,{transitionName:"input-fade-in",transitionAppear:!0,transitionAppearTimeout:500,transitionEnter:!1,transitionLeave:!1,children:Object(v.jsxs)("div",{id:"input-div",children:[Object(v.jsx)("hr",{}),Object(v.jsxs)("form",{onSubmit:e.database,id:"question-options-form",children:[Object(v.jsxs)("div",{id:"input-fields",children:[Object(v.jsx)("label",{htmlFor:"amount",children:"Number of Questions: "}),Object(v.jsx)("input",{type:"number",id:"amount",name:"amount",min:"1",max:"50",defaultValue:"10"}),Object(v.jsx)("br",{}),Object(v.jsx)("label",{htmlFor:"category",children:"Category: "}),Object(v.jsxs)("select",{id:"category",name:"category",children:[Object(v.jsx)("option",{value:"any",children:"Random"}),Object(v.jsx)("option",{value:"9",children:"General Knowledge"}),Object(v.jsx)("option",{value:"10",children:"Entertainment: Books"}),Object(v.jsx)("option",{value:"11",children:"Entertainment: Film"}),Object(v.jsx)("option",{value:"12",children:"Entertainment: Music"}),Object(v.jsx)("option",{value:"13",children:"Entertainment: Musicals & Theaters"}),Object(v.jsx)("option",{value:"14",children:"Entertainment: Television"}),Object(v.jsx)("option",{value:"15",children:"Entertainment: Video Games"}),Object(v.jsx)("option",{value:"16",children:"Entertainment: Board Games"}),Object(v.jsx)("option",{value:"29",children:"Entertainment: Comics"}),Object(v.jsx)("option",{value:"31",children:"Entertainment: Japanese Anime & Manga"}),Object(v.jsx)("option",{value:"32",children:"Entertainment: Cartoon & Animations"}),Object(v.jsx)("option",{value:"17",children:"Science & Nature"}),Object(v.jsx)("option",{value:"18",children:"Science: Computers"}),Object(v.jsx)("option",{value:"19",children:"Science: Mathematics"}),Object(v.jsx)("option",{value:"30",children:"Science: Gadgets"}),Object(v.jsx)("option",{value:"20",children:"Mythology"}),Object(v.jsx)("option",{value:"21",children:"Sports"}),Object(v.jsx)("option",{value:"22",children:"Geography"}),Object(v.jsx)("option",{value:"23",children:"History"}),Object(v.jsx)("option",{value:"24",children:"Politics"}),Object(v.jsx)("option",{value:"25",children:"Art"}),Object(v.jsx)("option",{value:"26",children:"Celebrities"}),Object(v.jsx)("option",{value:"27",children:"Animals"}),Object(v.jsx)("option",{value:"28",children:"Vehicles"})]}),Object(v.jsx)("br",{}),Object(v.jsx)("label",{htmlFor:"difficulty",children:"Difficulty: "}),Object(v.jsxs)("select",{id:"difficulty",name:"difficulty",children:[Object(v.jsx)("option",{value:"any",children:"Random"}),Object(v.jsx)("option",{value:"easy",children:"Easy"}),Object(v.jsx)("option",{value:"medium",children:"Medium"}),Object(v.jsx)("option",{value:"hard",children:"Hard"})]}),Object(v.jsx)("br",{}),Object(v.jsx)("label",{htmlFor:"type",children:"Question type: "}),Object(v.jsxs)("select",{id:"type",name:"type",children:[Object(v.jsx)("option",{value:"any",children:"Random"}),Object(v.jsx)("option",{value:"multiple",children:"Multiple Choice"}),Object(v.jsx)("option",{value:"boolean",children:"True / False"})]})]}),Object(v.jsx)("button",{type:"submit",className:"menu button",children:"Start Game"})]})]})})]}),Object(v.jsx)(G,{})]})}function x(e){var t=[];if("boolean"==e.results[e.questionNumber-1].type)t.push("True"),t.push("False");else{(t=e.results[e.questionNumber-1].incorrect_answers).push(e.results[e.questionNumber-1].correct_answer);var n=Object(h.a)(new Set(t));t=function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}return e}(n)}function a(n){e.saveAnswerOrder(t),e.checkAnswer(n)}var r=Object(v.jsxs)("div",{id:"timer-wrap",children:[Object(v.jsx)("audio",{className:"game audio",id:"countdown-music",autoPlay:!e.check,children:Object(v.jsx)("source",{src:"countdown.wav"})}),Object(v.jsx)(p.CountdownCircleTimer,{isPlaying:!0,duration:30,colors:[["#18A835",.33],["#E0D401",.33],["#E52809",.33]],size:75,rotation:"counterclockwise",onComplete:a})]}),s=null,i=Object(v.jsx)(G,{});return e.check&&(r=Object(v.jsx)("div",{id:"timer-wrap"}),s=Object(v.jsx)(k,{correct:e.answerCorrect,nextQuestion:function(){e.saveResult(e.answerCorrect,e.results[e.questionNumber-1]),e.questionNumber==e.results.length?e.transfer():e.incrementQuestion()}}),i=e.answerCorrect?Object(v.jsx)(F,{}):Object(v.jsx)(z,{})),Object(v.jsxs)("div",{children:[Object(v.jsxs)("div",{className:"content",children:[Object(v.jsx)("button",{className:"menu button escape",id:"leave-game",onClick:e.transferToStartMenu,children:"\u2716"}),r,Object(v.jsx)(g,{results:e.results[e.questionNumber-1],number:e.questionNumber,answered:e.check,answerArray:e.answerArray,playerAnswer:e.playerAnswer,answers:t,selectAnswer:a,correct:e.answerCorrect}),s]}),i]})}function g(e){var t=e.results.question;return t=E(t),Object(v.jsxs)("div",{id:"question-wrap",children:[Object(v.jsx)("div",{id:"question-info",children:Object(v.jsxs)(m.CSSTransitionGroup,{transitionName:"question-anim",transitionAppear:!0,transitionAppearTimeout:500,transitionEnter:!1,transitionLeave:!1,children:[Object(v.jsx)("h1",{children:e.results.category}),Object(v.jsxs)("h3",{children:["Difficulty: ",q(e.results.difficulty)]}),Object(v.jsxs)("h2",{children:[e.number,". ",t]})]})}),Object(v.jsx)(S,{result:e.results,answered:e.answered,answerArray:e.answerArray,playerAnswer:e.playerAnswer,answers:e.answers,selectAnswer:e.selectAnswer,correct:e.correct})]})}function S(e){var t,n,a=!1,r=[];if(e.answered&&(a=!0),e.answerArray.length>0)for(var s=0;s<e.answerArray.length;s++)t="answer button ",e.answerArray[s]==e.result.correct_answer?(t+=" right-answer ",e.correct&&(t+=" player-answer ")):e.answerArray[s]==e.playerAnswer&&(t+=" wrong-answer player-answer "),"boolean"==e.result.type?t+=" boolean ":t+=" mult-choice ",r.push(Object(v.jsx)("button",{value:e.answerArray[s],className:t,disabled:a,children:E(e.answerArray[s])},s));else if(t="answer active button ","boolean"==e.result.type)n=0,t+=" boolean ",r.push(Object(v.jsx)(A,{answer:"True",selectAnswer:e.selectAnswer,className:t,disabled:e.disabled,timerDelay:n},"trueButton")),n+=1,r.push(Object(v.jsx)(A,{answer:"False",selectAnswer:e.selectAnswer,className:t,disabled:e.disabled,timerDelay:n},"falseButton"));else{t+=" mult-choice ",n=0;for(var i=0;i<e.answers.length;i++)r.push(Object(v.jsx)(A,{answer:e.answers[i],selectAnswer:e.selectAnswer,className:t,disabled:e.disabled,timerDelay:n},"answer"+i+"Button")),n+=1}return Object(v.jsx)("div",{id:"answers",children:r})}function A(e){return Object(a.useEffect)((function(){setTimeout((function(){var t=document.getElementById("answers");t&&(t.children[e.timerDelay].className+=" grow-anim")}),500*e.timerDelay),document.getElementById("answers").children[e.timerDelay].onmouseover=function(){document.getElementById("answers").children[e.timerDelay].className=document.getElementById("answers").children[e.timerDelay].className.replace("grow-anim","answer-ready")}})),Object(v.jsx)("button",{value:e.answer,onClick:e.selectAnswer,className:e.className,disabled:e.disabled,children:E(e.answer)})}function k(e){return e.correct?Object(v.jsxs)("div",{children:[Object(v.jsx)("audio",{autoPlay:!0,id:"right-buzz",className:"game audio right",children:Object(v.jsx)("source",{src:"correct.wav"})}),Object(v.jsx)("button",{onClick:e.nextQuestion,id:"next-button",className:"menu button",children:"Next \u279c"})]}):Object(v.jsxs)("div",{children:[Object(v.jsx)("audio",{autoPlay:!0,id:"wrong-buzz",className:"game audio wrong",children:Object(v.jsx)("source",{src:"incorrect.mp3"})}),Object(v.jsx)("button",{onClick:e.nextQuestion,id:"next-button",className:"menu button",children:"Next \u279c"})]})}function C(e){var t,n,a=e.correct.length+e.wrong.length,r=(t=Math.floor(100*e.correct.length/a))>50?Object(v.jsx)(B,{}):Object(v.jsx)(L,{}),s=Object(v.jsx)("h1",{id:"end-response",children:"Better luck next time"});return t>50&&(n=Object(v.jsx)("audio",{autoPlay:!0,loop:!0,children:Object(v.jsx)("source",{src:"fireworks.wav"})}),s=Object(v.jsx)("h1",{id:"end-response",children:"Great job"})),Object(v.jsxs)("div",{children:[Object(v.jsx)("audio",{autoPlay:!0,loop:!1,children:Object(v.jsx)("source",{src:"drumroll.wav"})}),Object(v.jsxs)("div",{className:"content results",children:[Object(v.jsxs)("div",{id:"score-cont",children:[s,Object(v.jsxs)("h1",{id:"score",children:[t,"%"]})]}),Object(v.jsxs)("h3",{children:["Correct Answers: ",e.correct.length]}),Object(v.jsxs)("h3",{children:["Incorrect Answers: ",e.wrong.length]}),Object(v.jsx)("button",{onClick:e.transferToStat,className:"menu button",children:"Stats"}),Object(v.jsx)("button",{onClick:e.transfer,className:"menu button",id:"menu-return-button",children:"Return to menu"})]}),n,r]})}function N(e){return Object(v.jsxs)("div",{className:"content",children:[Object(v.jsx)("button",{className:"menu button escape",id:"back-to-menu",onClick:e.transferToStartMenu,children:"Menu"}),Object(v.jsx)("label",{htmlFor:"stat-select",children:"Show: "}),Object(v.jsxs)("select",{id:"stat-select",name:"stat-select",onChange:e.updateStatGraph,children:[Object(v.jsx)("option",{value:"best",children:"Best"}),Object(v.jsx)("option",{value:"by-category",children:"By Category"}),Object(v.jsx)("option",{value:"by-difficulty",children:"By Difficulty"}),Object(v.jsx)("option",{value:"by-type",children:"By Type"})]}),Object(v.jsx)("br",{}),Object(v.jsx)(T,Object(b.a)({},e))]})}function T(e){if(!e.correct.length)return Object(v.jsx)("h1",{children:"Sorry, no data to display. Try again"});var t=M(e.correct),n=M(e.wrong),a={},r=[];t.forEach((function(e){a[e.category]?a[e.category]++:(a[e.category]=1,r.push(e.category))}));var s={},i=[];t.forEach((function(e){s[e.difficulty]?s[e.difficulty]++:(s[e.difficulty]=1,i.push(e.difficulty))}));var o={},c=[];if(t.forEach((function(e){o[e.type]?o[e.type]++:(o[e.type]=1,c.push(e.type))})),r.sort((function(e,t){return a[t]-a[e]})),i.sort((function(e,t){return s[t]-s[e]})),c.sort((function(e,t){return o[t]-o[e]})),"best"==e.statsBasedOn){var l={labels:[q(r[0]),q(i[0]),q(c[0])],datasets:[{label:"Number Correct",data:[a[r[0]],s[i[0]],o[c[0]]],backgroundColor:"rgba(9, 127, 219, 0.4)",borderColor:"rgba(6, 86, 148, 1)",borderWidth:1}]};return Object(v.jsx)(f.b,{data:l,options:{scale:{min:0,ticks:{beginAtZero:!0}}},className:"graph"})}if("by-category"==e.statsBasedOn){for(var u=[],d=[],b=[],m=0;m<r.length;m++)u.push(q(r[m])),d.push(a[r[m]]);for(var p=0;p<n.length;p++)b.push(q(n[p].category));var j=Object(h.a)(new Set(b)),y=u.concat(j);u=Object(h.a)(new Set(y));for(var w=0;w<u.length;w++)d[w]||(d[w]=0);var O={labels:u,datasets:[{label:"Number Correct",data:d,backgroundColor:"rgba(9, 127, 219, 1)",borderColor:"rgba(6, 86, 148, 1)",borderWidth:1}]};return Object(v.jsx)(f.a,{data:O,options:{scale:{min:0}},className:"graph"})}if("by-difficulty"==e.statsBasedOn){for(var x=[],g=[],S=[],A=0;A<i.length;A++)x.push(q(i[A])),g.push(s[i[A]]);for(var k=0;k<n.length;k++)S.push(q(n[k].difficulty));var C=Object(h.a)(new Set(S)),N=x.concat(C);x=Object(h.a)(new Set(N));for(var T=0;T<x.length;T++)g[T]||(g[T]=0);var E={labels:x,datasets:[{label:"Number Correct",data:g,backgroundColor:"rgba(9, 127, 219, 1)",borderColor:"rgba(6, 86, 148, 1)",borderWidth:1}]};return Object(v.jsx)(f.a,{data:E,options:{scale:{min:0}},className:"graph"})}if("by-type"==e.statsBasedOn){for(var B=[],L=[],z=[],F=0;F<c.length;F++)B.push(q(c[F])),L.push(o[c[F]]);for(var G=0;G<n.length;G++)z.push(q(n[G].type));var R=Object(h.a)(new Set(z)),V=B.concat(R);B=Object(h.a)(new Set(V));for(var D=0;D<B.length;D++)L[D]||(L[D]=0);var P={labels:B,datasets:[{label:"Number Correct",data:L,backgroundColor:"rgba(9, 127, 219, 1)",borderColor:"rgba(6, 86, 148, 1)",borderWidth:1}]};return Object(v.jsx)(f.a,{data:P,options:{scale:{min:0}},className:"graph"})}return null}function E(e){if(e&&"string"===typeof e){var t=document.createElement("div");e=(e=e.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim,"")).replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim,""),t.innerHTML=e,e=t.textContent,t.textContent=""}return e}function q(e){return e.charAt(0).toUpperCase()+e.slice(1)}function M(e){for(var t=0;t<e.length;t++)"boolean"==e[t].type&&(e[t].type="True / False");return e}function B(e){return Object(v.jsx)(y.a,{className:"particles",options:{background:{color:"#075FA3",opacity:1},fullScreen:{enable:!0},fpsLimit:60,emitters:{direction:"top",life:{count:0,duration:.1,delay:.1},rate:{delay:.5,quantity:1},size:{width:100,height:0},position:{y:100,x:50}},particles:{number:{value:0},destroy:{mode:"split",split:{count:1,factor:{value:1/3},rate:{value:100},particles:{stroke:{color:{value:["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},width:1},number:{value:0},collisions:{enable:!1},opacity:{value:1,animation:{enable:!0,speed:.6,minimumValue:.1,sync:!1,startValue:"max",destroy:"min"}},shape:{type:"circle"},size:{value:1,animation:{enable:!1}},life:{count:1,duration:{value:{min:1,max:5}}},move:{enable:!0,gravity:{enable:!1},speed:3,direction:"none",random:!0,straight:!1,outMode:"destroy"}}}},life:{count:2},shape:{type:"line"},size:{value:{min:.1,max:90},animation:{enable:!0,sync:!0,speed:150,startValue:"max",destroy:"min"}},stroke:{color:{value:"#ffffff"},width:1},rotate:{path:!0},move:{enable:!0,gravity:{acceleration:15,enable:!0,inverse:!0,maxSpeed:100},speed:{min:10,max:20},outModes:{default:"destroy",top:"none"}}}}})}function L(e){return Object(v.jsx)(y.a,{className:"particles",options:{background:{color:"#075FA3",opacity:1},fullScreen:{enable:!0},fpsLimit:60,particles:{number:{value:0,density:{enable:!0,value_area:800}},color:{value:"#ff0000",animation:{enable:!0,speed:20,sync:!0}},shape:{type:"image",options:{image:{src:"https://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png",width:256,height:256}}},opacity:{value:1,random:!1,animation:{enable:!0,speed:.5,minimumValue:0,sync:!1}},size:{value:64,random:{enable:!0,minimumValue:32},animation:{enable:!1,speed:20,minimumValue:.1,sync:!1}},links:{enable:!1,distance:100,color:"#ffffff",opacity:.4,width:1},life:{duration:{value:20},count:1},move:{enable:!0,gravity:{enable:!0,acceleration:-.5},speed:3,direction:"top",random:!1,straight:!1,outModes:{default:"destroy",bottom:"none"},attract:{enable:!0,distance:300,rotate:{x:600,y:1200}}}},emitters:{direction:"top",rate:{quantity:50,delay:.05},size:{width:100,height:10},position:{x:50,y:110}}}})}function z(e){return Object(v.jsx)(y.a,{className:"particles",options:{background:{color:"#E52809",opacity:.7},fullScreen:{enable:!0},fpsLimit:60,particles:{color:{value:"#ffffff"},lineLinked:{blink:!1,color:"#000",consent:!1,distance:150,enable:!1,opacity:0,width:0},rotate:{value:0,random:!1,direction:"clockwise",animation:{enable:!1,speed:5,sync:!1}},move:{attract:{enable:!1,rotateX:600,rotateY:1200},bounce:!1,direction:"bottom",enable:!0,outMode:"out",random:!0,speed:30,straight:!0},number:{density:{enable:!0,area:800},limit:0,value:200},opacity:{animation:{enable:!1,minimumValue:.1,speed:1,sync:!1},random:!1,value:1},shape:{character:{fill:!1,font:"Verdana",style:"",value:"*",weight:"400"},image:[],polygon:{nb_sides:5},stroke:{color:"#efefefee",width:1},type:"line"},size:{animation:{enable:!1,minimumValue:.1,speed:40,sync:!1},random:!0}},polygon:{draw:{enable:!1,lineColor:"#ffffff",lineWidth:.5},move:{radius:10},scale:1,type:"none",url:""}}})}function F(e){return Object(v.jsx)(y.a,{className:"particles",options:{background:{color:"#18A835",opacity:.5},fullScreen:{enable:!0},particles:{number:{value:0},color:{value:["#1E00FF","#FF0061","#E1FF00","#00FF9E"]},shape:{type:["circle","square"]},opacity:{value:{max:1,min:0},animation:{enable:!0,speed:2,startValue:"max",destroy:"min"}},size:{value:{min:3,max:7}},life:{duration:{sync:!0,value:5},count:1},move:{enable:!0,gravity:{enable:!0,acceleration:20},speed:{min:25,max:50},drift:{min:-2,max:2},decay:.05,direction:"none",outModes:{default:"destroy",top:"none"}},rotate:{value:{min:0,max:360},direction:"random",move:!0,animation:{enable:!0,speed:60}},tilt:{direction:"random",enable:!0,move:!0,value:{min:0,max:360},animation:{enable:!0,speed:60}},roll:{darken:{enable:!0,value:25},enable:!0,speed:{min:15,max:25}},wobble:{distance:30,enable:!0,move:!0,speed:{min:-15,max:15}}},responsive:[{maxWidth:700,options:{particles:{move:{speed:20,decay:.1}},emitters:[{direction:"top-right",rate:{delay:.1,quantity:3},position:{x:0,y:50},size:{width:0,height:0}},{direction:"top-left",rate:{delay:.1,quantity:3},position:{x:100,y:50},size:{width:0,height:0}}]}}],emitters:[{direction:"top-right",rate:{delay:.1,quantity:10},position:{x:0,y:50},size:{width:0,height:0}},{direction:"top-left",rate:{delay:.1,quantity:10},position:{x:100,y:50},size:{width:0,height:0}}]}})}function G(e){return Object(v.jsx)(y.a,{className:"particles",options:{fullScreen:{enable:!0},fpsLimit:60,particles:{number:{value:80,density:{enable:!0,area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{sides:5},image:{src:"https://cdn.matteobruni.it/images/particles/github.svg",width:100,height:100}},opacity:{value:.5,random:!1,animation:{enable:!1,speed:1,minimumValue:.1,sync:!1}},size:{value:10,random:{enable:!0,minimumValue:5},animation:{enable:!1,speed:40,minimumValue:5,sync:!1}},lineLinked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{collisions:!0,enable:!0,speed:7,direction:"none",random:!1,straight:!1,out_mode:"bounce",attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onHover:{enable:!1,mode:"repulse",parallax:{enable:!1,force:60,smooth:10}},onClick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:.8,speed:3},repulse:{distance:200},push:{particles_nb:4},remove:{particles_nb:2}}},detectRetina:!0}})}var R=function(e){switch(e.currentState){case"loading":return Object(v.jsx)(w,{audioSlide:e.audioSlide,audioLobby:e.audioLobby,loaded:e.loaded});case"start":return Object(v.jsx)(O,{database:e.database,audioSlide:e.audioSlide,audioLobby:e.audioLobby});case"game":return Object(v.jsx)(x,{results:e.results,questionNumber:e.questionNumber,checkAnswer:e.checkAnswer,transfer:e.transferToEnd,check:e.check,incrementQuestion:e.incrementQuestion,playerAnswer:e.playerAnswer,saveResult:e.saveResult,saveAnswerOrder:e.saveAnswerOrder,answerArray:e.answerArray,answerCorrect:e.answerCorrect,transferToStartMenu:e.transferToStartMenu});case"end":return Object(v.jsx)(C,{correct:e.correct,wrong:e.wrong,transfer:e.transferToStartMenu,transferToStat:e.transferToStat});case"stats":return Object(v.jsx)(N,{correct:e.correct,wrong:e.wrong,transferToStartMenu:e.transferToStartMenu,updateStatGraph:e.updateStatGraph,statsBasedOn:e.statsBasedOn});default:return Object(v.jsx)("h1",{children:"An error has occured"})}},V=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).state={gameState:"loading",results:null,questionNumber:1,playerAnswer:null,correct:[],wrong:[],check:!1,answerArray:[],answerCorrect:!1,statsBasedOn:"best"},a.apiCall=a.apiCall.bind(Object(l.a)(a)),a.increment=a.increment.bind(Object(l.a)(a)),a.checkAnswer=a.checkAnswer.bind(Object(l.a)(a)),a.transferToEnd=a.transferToEnd.bind(Object(l.a)(a)),a.transferToStat=a.transferToStat.bind(Object(l.a)(a)),a.transferToStartMenu=a.transferToStartMenu.bind(Object(l.a)(a)),a.saveResult=a.saveResult.bind(Object(l.a)(a)),a.saveAnswerOrder=a.saveAnswerOrder.bind(Object(l.a)(a)),a.loaded=a.loaded.bind(Object(l.a)(a)),a.checkResults=a.checkResults.bind(Object(l.a)(a)),a.updateStatGraph=a.updateStatGraph.bind(Object(l.a)(a)),a.audioSlide=new Audio("enter.wav"),a.audioLobby=new Audio("loop.mp3"),a.buttonClickAudio=new Audio("click.wav"),a.audioLoadedCount=0,a}return Object(c.a)(n,[{key:"loaded",value:function(){this.audioLoadedCount++,2==this.audioLoadedCount&&this.setState({gameState:"start"})}},{key:"apiCall",value:function(e){var t=this;this.buttonClickAudio.play(),e.preventDefault&&e.preventDefault();var n,a="https://opentdb.com/api.php?",r=e.target?e.target:e;a+="amount="+r.amount.value,"any"!=r.category.value&&(a+="&category="+r.category.value),"any"!=r.difficulty.value&&(a+="&difficulty="+r.difficulty.value),"any"!=r.type.value&&(a+="&type="+r.type.value);try{fetch(a).then((function(e){return e.json()})).then((function(e){return n=e})).then((function(){n.response_code?alert("Could not retrieve questions with those inputs. Please adjust your inputs and try again"):t.checkResults(n.results,r.amount.value,r.category.value,r.difficulty.value,r.type.value)?t.setState({gameState:"game",results:n.results}):t.apiCall(document.getElementById("question-options-form"))}))}catch(s){alert("An error occured while trying to retrive questions")}}},{key:"checkResults",value:function(e,t,n,a,r){if(!e||e.length<=0)return!1;if(e.length!=t)return!1;for(var s=0;s<e.length;s++){if("any"!==n&&e[s].category!==n)return!1;if("any"!==a&&e[s].difficulty!==a)return!1;if("any"!==r&&e[s].type!==r)return!1}return!0}},{key:"saveAnswerOrder",value:function(e){this.setState({answerArray:e})}},{key:"checkAnswer",value:function(e){e.target?e.target.value==this.state.results[this.state.questionNumber-1].correct_answer?this.setState({playerAnswer:e.target.value,check:!0,answerCorrect:!0}):this.setState({playerAnswer:e.target.value,check:!0,answerCorrect:!1}):this.setState({playerAnswer:null,check:!0,answerCorrect:!1})}},{key:"increment",value:function(){this.setState({questionNumber:++this.state.questionNumber,playerAnswer:null,check:!1,answerArray:[],answerCorrect:!1})}},{key:"saveResult",value:function(e,t){this.buttonClickAudio.play(),t.questionNumber=this.state.questionNumber,e?this.setState((function(e){return{correct:e.correct.concat(t)}})):this.setState((function(e){return{wrong:e.wrong.concat(t)}}))}},{key:"transferToEnd",value:function(){this.buttonClickAudio.play(),this.setState({gameState:"end",questionNumber:1,playerAnswer:null})}},{key:"transferToStat",value:function(){this.buttonClickAudio.play(),this.setState({gameState:"stats",statsBasedOn:"best"})}},{key:"updateStatGraph",value:function(e){this.setState({statsBasedOn:e.target.value})}},{key:"transferToStartMenu",value:function(){this.buttonClickAudio.play(),this.setState({gameState:"start",results:null,correct:[],wrong:[],answerArray:[],playerAnswer:null,check:!1,answerCorrect:!1,questionNumber:1})}},{key:"render",value:function(){return Object(v.jsx)("div",{id:"app",children:Object(v.jsx)(R,{currentState:this.state.gameState,database:this.apiCall,results:this.state.results,questionNumber:this.state.questionNumber,incrementQuestion:this.increment,playerAnswer:this.state.playerAnswer,checkAnswer:this.checkAnswer,transferToEnd:this.transferToEnd,transferToStat:this.transferToStat,transferToStartMenu:this.transferToStartMenu,saveResult:this.saveResult,correct:this.state.correct,wrong:this.state.wrong,check:this.state.check,saveAnswerOrder:this.saveAnswerOrder,answerArray:this.state.answerArray,answerCorrect:this.state.answerCorrect,audioSlide:this.audioSlide,audioLobby:this.audioLobby,loaded:this.loaded,updateStatGraph:this.updateStatGraph,statsBasedOn:this.state.statsBasedOn})})}}]),n}(a.Component);i.a.render(Object(v.jsx)(r.a.StrictMode,{children:Object(v.jsx)(V,{})}),document.getElementById("root"))}},[[519,1,2]]]);
//# sourceMappingURL=main.d15dd5aa.chunk.js.map