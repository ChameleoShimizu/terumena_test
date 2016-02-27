/*------------------------------------------------------
  terumena
------------------------------------------------------*/
var Sys=new Object();

Sys.ipcRenderer=require('ipc');
Sys.fs=require("fs");

Sys.Gloval=new Object();
Sys.Gloval.Terumena=new Object();
Sys.Gloval.Terumena.Local=new Object();
Sys.Gloval.Terumena.Local.Home=new Object();
Sys.Gloval.Terumena.Local.Home.character=new Array();
Sys.Gloval.Terumena.Local.Home.map=new Array();

Sys.Renderer=new Object();

Sys.Log=new Object();
Sys.Log.width=(document.body.clientWidth/4)*3;
Sys.Log.height=Math.floor(document.body.clientHeight/6);
Sys.Log.x=(document.body.clientWidth/4);
Sys.Log.y=document.body.clientHeight-Sys.Log.height;
Sys.Log.id="Log";


Sys.Flag=new Object();

Sys.Flag.Output=new Object();
Sys.Flag.Output.Renderer=new Object();
Sys.Flag.Output.Log=false;

Sys.Flag.Title=new Object();
Sys.Flag.Title.cursor=0;
Sys.Flag.Resumption=new Object();
Sys.Flag.Resumption.cursor=0;

Sys.Flag.Menu=new Object();
Sys.Flag.Menu.bool=false;
Sys.Flag.Menu.cursor=0;
Sys.Flag.Menu.menuName=new String();
Sys.Flag.Menu.kind=new String();
Sys.Flag.Menu.page=0;
Sys.Flag.Menu._page=0;
Sys.Flag.Menu.pageMax=0;
Sys.Flag.Menu.choice=new Array();
Sys.Flag.Menu.flag="Normal";
Sys.Flag.Menu.w=(document.body.clientWidth/6)*4;
Sys.Flag.Menu.h=((document.body.clientHeight-Sys.Log.height)/6)*4;
Sys.Flag.Menu.x=(document.body.clientWidth/6);
Sys.Flag.Menu.y=((document.body.clientHeight-Sys.Log.height)/6);

Sys.Flag.Death=new Object();
Sys.Flag.Death.bool=true;

Sys.Flag.dataPass=Sys.ipcRenderer.sendSync('getAppPath');


Sys.Input=new Object();
Sys.Input.Key=new Object();
Sys.Input.Key.flag=true;
Sys.Input.Key.state=new Array();
document.onkeydown=function(e){
  Sys.Input.Key.state[e.keyCode]=true;
};
Sys.Input.Key.Reset=function(state){
  state=new Array();
  return state;
};

Sys.Input.Mouse=new Object();

Sys.Process=new Object();
Sys.Process.Scene=new Object();
Sys.Process.Scene.CharacterCreate=new Object();
Sys.Process.Scene.Local=new Function();

Sys.Process.Menu=new Object();
Sys.Process.Menu.Item=new Function();
Sys.Process.Menu.Equipment=new Function();
Sys.Process.Menu.Status=new Function();

Sys.Process.Item=new Object();
Sys.Process.Equipment=new Object();

Sys.Process.Status=new Object();
Sys.Process.Status.Plus=new Function();
Sys.Process.Status.Minus=new Function();

Sys.Process.Log=new Object();
Sys.Process.Log.Input=new Function();
Sys.Process.Log.Clear=new Function();

Sys.Process.Data=new Object();
Sys.Process.Data.Save=new Function();
Sys.Process.Data.Load=new Function();
Sys.Process.Data.Delete=new Function();

Sys.Process.Field=new Object();

Sys.Output=new Object();
Sys.Output.Renderer=new Function();
Sys.Output.BottomMenu=new Object();
Sys.Output.BottomMenu.width=document.body.clientWidth;
Sys.Output.BottomMenu.height=Math.floor(document.body.clientHeight/6);
Sys.Output.BottomMenu.x=0;
Sys.Output.BottomMenu.y=document.body.clientHeight-Sys.Output.BottomMenu.height;

/*----------------------------------------------------*/
