Sys.Main=function(){

  Sys.Process.Log.Set();
  Sys.Flag.Scene=Sys.Process.Scene.Title;
  Sys.Flag.Output.Renderer={
    type:"NotField",
    _x:0,
    _y:0,
    x:0,
    y:0,
    Local:{
      w:0,
      h:0
    },
    Gloval:{
      w:0,
      h:0
    },
    flag:true
  };

  Sys.StopMin=function(time){
    Sys.Flag.Output.Renderer.flag=false;
    Sys.Input.Key.flag=false;
    setTimeout(function(){
      Sys.Flag.Output.Renderer.flag=true;
      Sys.Input.Key.flag=true;
    },time);
  };

  Sys.Renderer.timer=setInterval(function(){
    Sys.Renderer.Cvs.Clear();
    if(!Sys.Input.Key.flag){
      Sys.Input.Key.state=Sys.Input.Key.Reset(Sys.Input.Key.state);
    }
    Sys.Renderer=Sys.Flag.Scene(Sys.Input,Sys.Flag,Sys.Renderer);
    if(Sys.Flag.Output.Renderer.flag){
      Sys.Output.Renderer(Sys.Flag.Output.Renderer,Sys.Renderer);
    }
    Sys.Input.Key.state=Sys.Input.Key.Reset(Sys.Input.Key.state);
  },32);

};
