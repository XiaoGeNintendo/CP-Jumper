// chrome.browserAction.onClicked.addListener(function(tab) {
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });

function addLi(url){
  var x=document.getElementsByClassName("second-level-menu-list")[0]
  var node=document.createElement("li");
  node.innerHTML=url;
  x.appendChild(node);
}

function cfps(url,delta){
  //todo
  
  var vs=url.split("/");
  var html="?",h2="?",h3="?";

  for(var i=0;i<vs.length;i++){
    if(delta==1 && vs[i]=="contest" || delta==0 && vs[i]=="problem"){
      if(delta){
        html="<a href=\"/problemset/problem/"+vs[i+1]+"/"+nqoa(vs[i+3])+"\">In Problemset</a>"
      }else{
        html="<a href=\"/contest/"+vs[i+1]+"/problem/"+nqoa(vs[i+2])+"\">In Contest</a>"
      }
      h2="<a href=\"https://vjudge.net/problem/CodeForces-"+vs[i+1]+nqoa(vs[i+2+delta])+"\">On VJudge</a>"
      h3="<a href=\"https://www.luogu.com.cn/problem/CF"+vs[i+1]+nqoa(vs[i+2+delta])+"\">On Luogu</a>"
    }
  }

  addLi(html);
  addLi(h2);
  addLi(h3);
}

function cf1(url){
  cfps(url,0);
}

function cf2(url){
  cfps(url,1);
}

function _nqoa(str,chr){
  var last=str.lastIndexOf(chr);
  return str.substr(0,(last==-1?str.length:last))
}

function nqoa(str){
  return _nqoa(_nqoa(str,"?"),"#");
}

function atc(url){
  var vs=url.split("/");
  for(var i=0;i<vs.length;i++){
    if(vs[i]=="tasks"){
      var vs2=vs[i-1].split(".");
      var conName=vs2[0];
      var taskName=nqoa(vs[i+1])

      var x=document.getElementsByClassName("nav nav-tabs")[0];
      var node=document.createElement("li");
      node.innerHTML="<a href=\"https://atcoder.jp/contests/"+conName+"/tasks/"+taskName+"\">To New UI</a>";
      x.appendChild(node);
    }
  }
}

function atc2(url){
  var vs=url.split("/");
  for(var i=0;i<vs.length;i++){
    if(vs[i]=="tasks"){
      var conName=vs[i-1];
      var taskName=nqoa(vs[i+1])

      var x=document.getElementsByClassName("nav nav-tabs")[0];
      var node=document.createElement("li");
      node.innerHTML="<a href=\"https://"+conName+".contest.atcoder.jp/tasks/"+taskName+"\">To Old UI</a>";
      x.appendChild(node);
    }
  }
}
var fun=[
  {
    url:["https?://(www.)?codeforces.com/problemset/problem/.*"],
    func:cf1
  },
  {
    url:["https?://(www.)?codeforces.com/contest/.*/problem/.*"],
    func:cf2
  },
  {
    url:["https?://.*.contest.atcoder.jp/tasks/.*"],
    func:atc
  },
  {
    url:["https?://.*atcoder.jp/contests/.*/tasks/.*"],
    func:atc2
  }
]

function urlChecker(){
  var url=document.location.href;
  for(var i=0;i<fun.length;i++){
    var ok=false;
    for(var j=0;j<fun[i].url.length;j++){
      var reg=new RegExp(fun[i].url[j],"g");
      if(reg.test(url)){
        //success
        ok=true;
        break;
      }
    }

    if(ok){
      console.log("Match "+fun[i].url)
      fun[i].func(url);
    }
  }
}

urlChecker();
