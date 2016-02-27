Sys.Process.Log.Set=function(){
  var elm=document.createElement("div");
  elm.style.backgroundColor="#000";
  elm.style.padding=12+"px";
  elm.style.borderTop="4px solid rgba(25,50,25,0.3)";
  elm.style.width=Sys.Log.width+"px";
  elm.style.height=Sys.Log.height-28+"px";
  elm.style.position="absolute";
  elm.style.left=Sys.Log.x+"px";
  elm.style.top=Sys.Log.y+"px";
  elm.style.zIndex=2;
  elm.style.color="#fff";
  elm.style.fontSize=14+"px";
  elm.style.fontFamily="Courier New";
  elm.style.visibility="hidden";
  elm.style.overflowY="scroll";
  elm.id="Log";
  document.body.appendChild(elm);
  Sys.Log.id=document.getElementById(elm.id);
};

Sys.Process.Log.Input=function(txt){
  var span=document.createElement("span");
  span.appendChild(document.createTextNode(txt+" "));
  Sys.Log.id.appendChild(span);
  Sys.Log.id.scrollTop=Sys.Log.id.scrollHeight;
};
