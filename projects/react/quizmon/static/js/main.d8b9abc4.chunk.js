(this.webpackJsonpquizmon=this.webpackJsonpquizmon||[]).push([[0],{354:function(e,t,n){"use strict";n.r(t);var a=n(11),r=n.n(a),s=n(27),i=n.n(s),o=(n(70),n(60)),c=n(61),l=n(13),u=n(65),d=n(64),b=n(63),m=n(28),h=n(62),j=n(21),p=n.n(j),y=n(2);function v(e){return Object(a.useEffect)((function(){e.audioSlide.addEventListener("onCanPlayThrough",e.loaded()),e.audioLobby.addEventListener("onCanPlayThrough",e.loaded())})),Object(y.jsx)("div",{})}function f(e){return e.audioSlide.isPlaying=!0,e.audioLobby.isPlaying=!0,e.audioLobby.loop=!0,Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{className:"content",children:[Object(y.jsx)("div",{id:"welcome-div",className:"welcome",children:Object(y.jsx)(m.CSSTransitionGroup,{transitionName:"welcome-title",transitionAppear:!0,transitionAppearTimeout:2e3,transitionEnter:!1,transitionLeave:!1,children:Object(y.jsxs)("h1",{className:"welcome title",children:["Welcome to ",Object(y.jsx)("span",{id:"app-title",children:"Quizmon"})," - the triva app"]})})}),Object(y.jsx)(m.CSSTransitionGroup,{transitionName:"input-fade-in",transitionAppear:!0,transitionAppearTimeout:500,transitionEnter:!1,transitionLeave:!1,children:Object(y.jsxs)("div",{id:"input-div",children:[Object(y.jsx)("hr",{}),Object(y.jsxs)("form",{onSubmit:e.database,children:[Object(y.jsxs)("div",{id:"input-fields",children:[Object(y.jsx)("label",{htmlFor:"amount",children:"Number of Questions: "}),Object(y.jsx)("input",{type:"number",id:"amount",name:"amount",min:"1",max:"50",defaultValue:"10"}),Object(y.jsx)("br",{}),Object(y.jsx)("label",{htmlFor:"category",children:"Category: "}),Object(y.jsxs)("select",{id:"category",name:"category",children:[Object(y.jsx)("option",{value:"any",children:"Random"}),Object(y.jsx)("option",{value:"9",children:"General Knowledge"}),Object(y.jsx)("option",{value:"10",children:"Entertainment: Books"}),Object(y.jsx)("option",{value:"11",children:"Entertainment: Film"}),Object(y.jsx)("option",{value:"12",children:"Entertainment: Music"}),Object(y.jsx)("option",{value:"13",children:"Entertainment: Musicals & Theaters"}),Object(y.jsx)("option",{value:"14",children:"Entertainment: Television"}),Object(y.jsx)("option",{value:"15",children:"Entertainment: Video Games"}),Object(y.jsx)("option",{value:"16",children:"Entertainment: Board Games"}),Object(y.jsx)("option",{value:"29",children:"Entertainment: Comics"}),Object(y.jsx)("option",{value:"31",children:"Entertainment: Japanese Anime & Manga"}),Object(y.jsx)("option",{value:"32",children:"Entertainment: Cartoon & Animations"}),Object(y.jsx)("option",{value:"17",children:"Science & Nature"}),Object(y.jsx)("option",{value:"18",children:"Science: Computers"}),Object(y.jsx)("option",{value:"19",children:"Science: Mathematics"}),Object(y.jsx)("option",{value:"30",children:"Science: Gadgets"}),Object(y.jsx)("option",{value:"20",children:"Mythology"}),Object(y.jsx)("option",{value:"21",children:"Sports"}),Object(y.jsx)("option",{value:"22",children:"Geography"}),Object(y.jsx)("option",{value:"23",children:"History"}),Object(y.jsx)("option",{value:"24",children:"Politics"}),Object(y.jsx)("option",{value:"25",children:"Art"}),Object(y.jsx)("option",{value:"26",children:"Celebrities"}),Object(y.jsx)("option",{value:"27",children:"Animals"}),Object(y.jsx)("option",{value:"28",children:"Vehicles"})]}),Object(y.jsx)("br",{}),Object(y.jsx)("label",{htmlFor:"difficulty",children:"Difficulty: "}),Object(y.jsxs)("select",{id:"difficulty",name:"difficulty",children:[Object(y.jsx)("option",{value:"any",children:"Random"}),Object(y.jsx)("option",{value:"easy",children:"Easy"}),Object(y.jsx)("option",{value:"medium",children:"Medium"}),Object(y.jsx)("option",{value:"hard",children:"Hard"})]}),Object(y.jsx)("br",{}),Object(y.jsx)("label",{htmlFor:"type",children:"Question type: "}),Object(y.jsxs)("select",{id:"type",name:"type",children:[Object(y.jsx)("option",{value:"any",children:"Random"}),Object(y.jsx)("option",{value:"multiple",children:"Multiple Choice"}),Object(y.jsx)("option",{value:"boolean",children:"True / False"})]})]}),Object(y.jsx)("button",{type:"submit",className:"menu button",children:"Start Game"})]})]})})]}),Object(y.jsx)(q,{})]})}function w(e){var t=[];if("boolean"==e.results[e.questionNumber-1].type)t.push("True"),t.push("False");else{(t=e.results[e.questionNumber-1].incorrect_answers).push(e.results[e.questionNumber-1].correct_answer);var n=Object(b.a)(new Set(t));t=function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*(t+1)),a=[e[n],e[t]];e[t]=a[0],e[n]=a[1]}return e}(n)}function a(n){e.saveAnswerOrder(t),e.checkAnswer(n)}var r=Object(y.jsxs)("div",{id:"timer-wrap",children:[Object(y.jsx)("audio",{className:"game audio",id:"countdown-music",autoPlay:!e.check,children:Object(y.jsx)("source",{src:"countdown.wav"})}),Object(y.jsx)(h.CountdownCircleTimer,{isPlaying:!0,duration:30,colors:[["#18A835",.33],["#E0D401",.33],["#E52809",.33]],size:75,rotation:"counterclockwise",onComplete:a})]}),s=null,i=Object(y.jsx)(q,{});return e.check&&(r=Object(y.jsx)("div",{id:"timer-wrap"}),s=Object(y.jsx)(A,{correct:e.answerCorrect,nextQuestion:function(){e.saveResult(e.answerCorrect,e.results[e.questionNumber-1]),e.questionNumber==e.results.length?e.transfer():e.incrementQuestion()}}),i=e.answerCorrect?Object(y.jsx)(T,{}):Object(y.jsx)(E,{})),Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{className:"content",children:[Object(y.jsx)("button",{className:"menu button",id:"escape",onClick:e.transferToStartMenu,children:"\u2716"}),r,Object(y.jsx)(x,{results:e.results[e.questionNumber-1],number:e.questionNumber,answered:e.check,answerArray:e.answerArray,playerAnswer:e.playerAnswer,answers:t,selectAnswer:a,correct:e.answerCorrect}),s]}),i]})}function x(e){var t=e.results.question;return t=k(t),Object(y.jsxs)("div",{id:"question-wrap",children:[Object(y.jsx)("div",{id:"question-info",children:Object(y.jsxs)(m.CSSTransitionGroup,{transitionName:"question-anim",transitionAppear:!0,transitionAppearTimeout:500,transitionEnter:!1,transitionLeave:!1,children:[Object(y.jsx)("h1",{children:e.results.category}),Object(y.jsxs)("h3",{children:["Difficulty: ",e.results.difficulty]}),Object(y.jsxs)("h2",{children:[e.number,". ",t]})]})}),Object(y.jsx)(O,{result:e.results,answered:e.answered,answerArray:e.answerArray,playerAnswer:e.playerAnswer,answers:e.answers,selectAnswer:e.selectAnswer,correct:e.correct})]})}function O(e){var t,n,a=!1,r=[];if(e.answered&&(a=!0),e.answerArray.length>0)for(var s=0;s<e.answerArray.length;s++)t="answer ",e.answerArray[s]==e.result.correct_answer?(t+=" right-answer ",e.correct&&(t+=" player-answer ")):e.answerArray[s]==e.playerAnswer&&(t+=" wrong-answer player-answer "),"boolean"==e.result.type?t+=" boolean ":t+=" mult-choice ",r.push(Object(y.jsx)("button",{value:e.answerArray[s],className:t,disabled:a,children:k(e.answerArray[s])},s));else if(t="answer active ","boolean"==e.result.type)n=0,t+=" boolean ",r.push(Object(y.jsx)(g,{answer:"True",selectAnswer:e.selectAnswer,className:e.className,disabled:e.disabled,timerDelay:n})),n+=1,r.push(Object(y.jsx)(g,{answer:"False",selectAnswer:e.selectAnswer,className:e.className,disabled:e.disabled,timerDelay:n}));else{t+=" mult-choice ",n=0;for(var i=0;i<e.answers.length;i++)r.push(Object(y.jsx)(g,{answer:e.answers[i],selectAnswer:e.selectAnswer,className:t,disabled:e.disabled,timerDelay:n})),n+=1}return Object(y.jsx)("div",{id:"answers",children:r})}function g(e){return Object(a.useEffect)((function(){setTimeout((function(){document.getElementById("answers").children[e.timerDelay].className+=" grow-anim"}),500*e.timerDelay),document.getElementById("answers").children[e.timerDelay].onmouseover=function(){document.getElementById("answers").children[e.timerDelay].className=document.getElementById("answers").children[e.timerDelay].className.replace("grow-anim","answer-ready")}})),Object(y.jsx)("button",{value:e.answer,onClick:e.selectAnswer,className:e.className,disabled:e.disabled,children:k(e.answer)})}function A(e){return e.correct?Object(y.jsxs)("div",{children:[Object(y.jsx)("audio",{autoPlay:!0,id:"right-buzz",className:"game audio right",children:Object(y.jsx)("source",{src:"correct.wav"})}),Object(y.jsx)("button",{onClick:e.nextQuestion,id:"next-button",className:"menu button",children:"Next \u279c"})]}):Object(y.jsxs)("div",{children:[Object(y.jsx)("audio",{autoPlay:!0,id:"wrong-buzz",className:"game audio wrong",children:Object(y.jsx)("source",{src:"incorrect.mp3"})}),Object(y.jsx)("button",{onClick:e.nextQuestion,id:"next-button",className:"menu button",children:"Next \u279c"})]})}function S(e){var t,n,a=e.correct.length+e.wrong.length,r=(t=Math.floor(100*e.correct.length/a))>50?Object(y.jsx)(N,{}):Object(y.jsx)(C,{}),s=Object(y.jsx)("h1",{id:"end-response",children:"Better luck next time"});return t>50&&(n=Object(y.jsx)("audio",{autoPlay:!0,loop:!0,children:Object(y.jsx)("source",{src:"fireworks.wav"})}),s=Object(y.jsx)("h1",{id:"end-response",children:"Great job"})),Object(y.jsxs)("div",{children:[Object(y.jsxs)("div",{className:"content",children:[s,Object(y.jsxs)("h1",{id:"score",children:[t,"%"]}),Object(y.jsxs)("h3",{children:["Correct Answers: ",e.correct.length]}),Object(y.jsxs)("h3",{children:["Incorrect Answers: ",e.wrong.length]}),Object(y.jsx)("button",{onClick:e.transfer,className:"menu button",id:"menu-return-button",children:"Return to menu"})]}),n,r]})}function k(e){if(e&&"string"===typeof e){var t=document.createElement("div");e=(e=e.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim,"")).replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim,""),t.innerHTML=e,e=t.textContent,t.textContent=""}return e}function N(e){return Object(y.jsx)(p.a,{options:{background:{color:"#075FA3",opacity:1},fullScreen:{enable:!0},fpsLimit:60,emitters:{direction:"top",life:{count:0,duration:.1,delay:.1},rate:{delay:.5,quantity:1},size:{width:100,height:0},position:{y:100,x:50}},particles:{number:{value:0},destroy:{mode:"split",split:{count:1,factor:{value:1/3},rate:{value:100},particles:{stroke:{color:{value:["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},width:1},number:{value:0},collisions:{enable:!1},opacity:{value:1,animation:{enable:!0,speed:.6,minimumValue:.1,sync:!1,startValue:"max",destroy:"min"}},shape:{type:"circle"},size:{value:1,animation:{enable:!1}},life:{count:1,duration:{value:{min:1,max:5}}},move:{enable:!0,gravity:{enable:!1},speed:3,direction:"none",random:!0,straight:!1,outMode:"destroy"}}}},life:{count:2},shape:{type:"line"},size:{value:{min:.1,max:90},animation:{enable:!0,sync:!0,speed:150,startValue:"max",destroy:"min"}},stroke:{color:{value:"#ffffff"},width:1},rotate:{path:!0},move:{enable:!0,gravity:{acceleration:15,enable:!0,inverse:!0,maxSpeed:100},speed:{min:10,max:20},outModes:{default:"destroy",top:"none"}}}}})}function C(e){return Object(y.jsx)(p.a,{options:{background:{color:"#075FA3",opacity:1},fullScreen:{enable:!0},fpsLimit:60,particles:{number:{value:0,density:{enable:!0,value_area:800}},color:{value:"#ff0000",animation:{enable:!0,speed:20,sync:!0}},shape:{type:"image",options:{image:{src:"https://www.blog.jonnycornwell.com/wp-content/uploads/2012/07/Smoke10.png",width:256,height:256}}},opacity:{value:1,random:!1,animation:{enable:!0,speed:.5,minimumValue:0,sync:!1}},size:{value:64,random:{enable:!0,minimumValue:32},animation:{enable:!1,speed:20,minimumValue:.1,sync:!1}},links:{enable:!1,distance:100,color:"#ffffff",opacity:.4,width:1},life:{duration:{value:20},count:1},move:{enable:!0,gravity:{enable:!0,acceleration:-.5},speed:3,direction:"top",random:!1,straight:!1,outModes:{default:"destroy",bottom:"none"},attract:{enable:!0,distance:300,rotate:{x:600,y:1200}}}},emitters:{direction:"top",rate:{quantity:50,delay:.05},size:{width:100,height:10},position:{x:50,y:110}}}})}function E(e){return Object(y.jsx)(p.a,{className:"particles",options:{background:{color:"#E52809",opacity:.7},fullScreen:{enable:!0},fpsLimit:60,particles:{color:{value:"#ffffff"},lineLinked:{blink:!1,color:"#000",consent:!1,distance:150,enable:!1,opacity:0,width:0},rotate:{value:0,random:!1,direction:"clockwise",animation:{enable:!1,speed:5,sync:!1}},move:{attract:{enable:!1,rotateX:600,rotateY:1200},bounce:!1,direction:"bottom",enable:!0,outMode:"out",random:!0,speed:30,straight:!0},number:{density:{enable:!0,area:800},limit:0,value:200},opacity:{animation:{enable:!1,minimumValue:.1,speed:1,sync:!1},random:!1,value:1},shape:{character:{fill:!1,font:"Verdana",style:"",value:"*",weight:"400"},image:[],polygon:{nb_sides:5},stroke:{color:"#efefefee",width:1},type:"line"},size:{animation:{enable:!1,minimumValue:.1,speed:40,sync:!1},random:!0}},polygon:{draw:{enable:!1,lineColor:"#ffffff",lineWidth:.5},move:{radius:10},scale:1,type:"none",url:""}}})}function T(e){return Object(y.jsx)(p.a,{className:"particles",options:{background:{color:"#18A835",opacity:.5},fullScreen:{enable:!0},particles:{number:{value:0},color:{value:["#1E00FF","#FF0061","#E1FF00","#00FF9E"]},shape:{type:["circle","square"]},opacity:{value:{max:1,min:0},animation:{enable:!0,speed:2,startValue:"max",destroy:"min"}},size:{value:{min:3,max:7}},life:{duration:{sync:!0,value:5},count:1},move:{enable:!0,gravity:{enable:!0,acceleration:20},speed:{min:25,max:50},drift:{min:-2,max:2},decay:.05,direction:"none",outModes:{default:"destroy",top:"none"}},rotate:{value:{min:0,max:360},direction:"random",move:!0,animation:{enable:!0,speed:60}},tilt:{direction:"random",enable:!0,move:!0,value:{min:0,max:360},animation:{enable:!0,speed:60}},roll:{darken:{enable:!0,value:25},enable:!0,speed:{min:15,max:25}},wobble:{distance:30,enable:!0,move:!0,speed:{min:-15,max:15}}},responsive:[{maxWidth:700,options:{particles:{move:{speed:20,decay:.1}},emitters:[{direction:"top-right",rate:{delay:.1,quantity:3},position:{x:0,y:50},size:{width:0,height:0}},{direction:"top-left",rate:{delay:.1,quantity:3},position:{x:100,y:50},size:{width:0,height:0}}]}}],emitters:[{direction:"top-right",rate:{delay:.1,quantity:10},position:{x:0,y:50},size:{width:0,height:0}},{direction:"top-left",rate:{delay:.1,quantity:10},position:{x:100,y:50},size:{width:0,height:0}}]}})}function q(e){return Object(y.jsx)(p.a,{className:"particles",options:{fullScreen:{enable:!0},fpsLimit:60,particles:{number:{value:80,density:{enable:!0,area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{sides:5},image:{src:"https://cdn.matteobruni.it/images/particles/github.svg",width:100,height:100}},opacity:{value:.5,random:!1,animation:{enable:!1,speed:1,minimumValue:.1,sync:!1}},size:{value:10,random:{enable:!0,minimumValue:5},animation:{enable:!1,speed:40,minimumValue:5,sync:!1}},lineLinked:{enable:!1,distance:150,color:"#ffffff",opacity:.4,width:1},move:{collisions:!0,enable:!0,speed:7,direction:"none",random:!1,straight:!1,out_mode:"bounce",attract:{enable:!1,rotateX:600,rotateY:1200}}},interactivity:{detect_on:"canvas",events:{onHover:{enable:!1,mode:"repulse",parallax:{enable:!1,force:60,smooth:10}},onClick:{enable:!0,mode:"push"},resize:!0},modes:{grab:{distance:400,line_linked:{opacity:1}},bubble:{distance:400,size:40,duration:2,opacity:.8,speed:3},repulse:{distance:200},push:{particles_nb:4},remove:{particles_nb:2}}},detectRetina:!0}})}var M=function(e){switch(e.currentState){case"loading":return Object(y.jsx)(v,{audioSlide:e.audioSlide,audioLobby:e.audioLobby,loaded:e.loaded});case"start":return Object(y.jsx)(f,{database:e.database,audioSlide:e.audioSlide,audioLobby:e.audioLobby});case"game":return Object(y.jsx)(w,{results:e.results,questionNumber:e.questionNumber,checkAnswer:e.checkAnswer,transfer:e.transferToEnd,check:e.check,incrementQuestion:e.incrementQuestion,playerAnswer:e.playerAnswer,saveResult:e.saveResult,saveAnswerOrder:e.saveAnswerOrder,answerArray:e.answerArray,answerCorrect:e.answerCorrect,transferToStartMenu:e.transferToStartMenu});case"end":return Object(y.jsx)(S,{correct:e.correct,wrong:e.wrong,transfer:e.transferToStartMenu});case"stats":break;default:return Object(y.jsx)("h1",{children:"An error has occured"})}},L=function(e){Object(u.a)(n,e);var t=Object(d.a)(n);function n(e){var a;return Object(o.a)(this,n),(a=t.call(this,e)).audioSlide=new Audio("enter.wav"),a.audioLobby=new Audio("loop.mp3"),a.audioLoadedCount=0,a.state={gameState:"loading",results:null,questionNumber:1,playerAnswer:null,correct:[],wrong:[],check:!1,answerArray:[],answerCorrect:!1},a.apiCall=a.apiCall.bind(Object(l.a)(a)),a.increment=a.increment.bind(Object(l.a)(a)),a.checkAnswer=a.checkAnswer.bind(Object(l.a)(a)),a.transferToEnd=a.transferToEnd.bind(Object(l.a)(a)),a.transferToStat=a.transferToStat.bind(Object(l.a)(a)),a.transferToStartMenu=a.transferToStartMenu.bind(Object(l.a)(a)),a.saveResult=a.saveResult.bind(Object(l.a)(a)),a.saveAnswerOrder=a.saveAnswerOrder.bind(Object(l.a)(a)),a.loaded=a.loaded.bind(Object(l.a)(a)),a}return Object(c.a)(n,[{key:"loaded",value:function(){this.audioLoadedCount++,2==this.audioLoadedCount&&this.setState({gameState:"start"})}},{key:"apiCall",value:function(e){var t=this;e.preventDefault();var n,a="https://opentdb.com/api.php?";a+="amount="+e.target.amount.value,"any"!=e.target.category.value&&(a+="&category="+e.target.category.value),"any"!=e.target.difficulty.value&&(a+="&difficulty="+e.target.difficulty.value),"any"!=e.target.type.value&&(a+="&type="+e.target.type.value);try{fetch(a).then((function(e){return e.json()})).then((function(e){return n=e})).then((function(){n.response_code?alert("Could not retrieve questions. Please try again"):t.setState({gameState:"game",results:n.results})}))}catch(r){alert("An error occured while trying to retrive questions")}}},{key:"saveAnswerOrder",value:function(e){this.setState({answerArray:e})}},{key:"checkAnswer",value:function(e){e.target?e.target.value==this.state.results[this.state.questionNumber-1].correct_answer?this.setState({playerAnswer:e.target.value,check:!0,answerCorrect:!0}):this.setState({playerAnswer:e.target.value,check:!0,answerCorrect:!1}):this.setState({playerAnswer:null,check:!0,answerCorrect:!1})}},{key:"increment",value:function(){this.setState({questionNumber:++this.state.questionNumber,playerAnswer:null,check:!1,answerArray:[],answerCorrect:!1})}},{key:"saveResult",value:function(e,t){t.questionNumber=this.state.questionNumber,e?this.setState((function(e){return{correct:e.correct.concat(t)}})):this.setState((function(e){return{wrong:e.wrong.concat(t)}}))}},{key:"transferToEnd",value:function(){this.setState({gameState:"end",questionNumber:1,playerAnswer:null})}},{key:"transferToStat",value:function(){this.setState({gameState:"stats"})}},{key:"transferToStartMenu",value:function(){this.setState({gameState:"start",results:null,correct:[],wrong:[],answerArray:[],playerAnswer:null,check:!1,answerCorrect:!1})}},{key:"render",value:function(){return Object(y.jsx)("div",{id:"app",children:Object(y.jsx)(M,{currentState:this.state.gameState,database:this.apiCall,results:this.state.results,questionNumber:this.state.questionNumber,incrementQuestion:this.increment,playerAnswer:this.state.playerAnswer,checkAnswer:this.checkAnswer,transferToEnd:this.transferToEnd,transferToStat:this.transferToStat,transferToStartMenu:this.transferToStartMenu,saveResult:this.saveResult,correct:this.state.correct,wrong:this.state.wrong,check:this.state.check,saveAnswerOrder:this.saveAnswerOrder,answerArray:this.state.answerArray,answerCorrect:this.state.answerCorrect,audioSlide:this.audioSlide,audioLobby:this.audioLobby,loaded:this.loaded})})}}]),n}(a.Component);i.a.render(Object(y.jsx)(r.a.StrictMode,{children:Object(y.jsx)(L,{})}),document.getElementById("root"))},70:function(e,t,n){}},[[354,1,2]]]);
//# sourceMappingURL=main.d8b9abc4.chunk.js.map