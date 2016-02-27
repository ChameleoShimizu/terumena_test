Sys.Renderer.Gloval=new Object();
Sys.Renderer.Local=new Object();

Sys.Renderer.Gloval.px=32;
Sys.Renderer.Local.px=48;
Sys.Renderer.w=document.body.clientWidth;
Sys.Renderer.h=document.body.clientHeight;

Sys.Renderer.timer;

Sys.Renderer.Cvs=new Object();

Sys.Renderer.Cvs.s=document.createElement("canvas");
Sys.Renderer.Cvs.sx=Sys.Renderer.Cvs.s.getContext("2d");
Sys.Renderer.Cvs.s.width=Sys.Renderer.w;
Sys.Renderer.Cvs.s.height=Sys.Renderer.h;

Sys.Renderer.Cvs.i=document.createElement("canvas");
Sys.Renderer.Cvs.ix=Sys.Renderer.Cvs.i.getContext("2d");
Sys.Renderer.Cvs.i.width=Sys.Renderer.w;
Sys.Renderer.Cvs.i.height=Sys.Renderer.h;

Sys.Renderer.Cvs.m=document.createElement("canvas");
Sys.Renderer.Cvs.mx=Sys.Renderer.Cvs.m.getContext("2d");
Sys.Renderer.Cvs.m.width=Sys.Renderer.w;
Sys.Renderer.Cvs.m.height=Sys.Renderer.h;

Sys.Renderer.Cvs.Clear=function(){
  Sys.Renderer.Cvs.sx.clearRect(0,0,Sys.Renderer.w,Sys.Renderer.h);
  Sys.Renderer.Cvs.ix.clearRect(0,0,Sys.Renderer.w,Sys.Renderer.h);
};

document.body.appendChild(Sys.Renderer.Cvs.m);

Sys.Renderer.Image=new Object();
Sys.Renderer.Image.character=new Image(1584,1344);
Sys.Renderer.Image.character.src="./image/character.gif";
Sys.Renderer.Image.glovalMap=new Image(1584,1200);
Sys.Renderer.Image.glovalMap.src="./image/glovalMap.gif";
Sys.Renderer.Image.localMap=new Image(1584,1200);
Sys.Renderer.Image.localMap.src="./image/localMap.gif";
Sys.Renderer.Image.build=new Image(1584,1200);
Sys.Renderer.Image.build.src="./image/build.gif";
Sys.Renderer.Image.item=new Image(1584,1200);
Sys.Renderer.Image.item.src="./image/item.gif";
