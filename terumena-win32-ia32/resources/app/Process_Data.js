Sys.Process.Data.Load=function(name){
  var json=JSON.parse(Sys.fs.readFileSync(Sys.Flag.dataPass+"/sav/"+name+".txt"));
  Sys.Gloval=json.Gloval;
  Sys.Flag.player=json.player;
  if(Sys.Flag.player.place.local=="Gloval"){
    Sys.Flag.player=IndexPlayer(Sys.Gloval[Sys.Flag.player.place.gloval].character);
  }else{
    Sys.Flag.player=IndexPlayer(Sys.Gloval[Sys.Flag.player.place.gloval].Local[Sys.Flag.player.place.local].character);
  }

  function IndexPlayer(c_objects){
    for(var i=0; i<c_objects.length; i++){
      if(c_objects[i].Flag.player){
        return c_objects[i];
      }
    }
  };

  return {
    gloval:Sys.Gloval,
    player:Sys.Flag.player
  };

};

Sys.Process.Data.Save=function(savname){
  var json={
    Gloval:Sys.Gloval,
    player:Sys.Flag.player
  };
  Sys.fs.writeFileSync(Sys.Flag.dataPass+"/sav/"+savname+".txt",JSON.stringify(json));
};

Sys.Process.Data.WriteVoice=function(name,txt){
  var xmlHttpRequest=new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange=function(){
    var READYSTATE_COMPLETED=4;
    var HTTP_STATUS_OK=200;
    if(this.readyState==READYSTATE_COMPLETED&&this.status==HTTP_STATUS_OK){
    }
  };

  xmlHttpRequest.open('POST','http://terumena.com/dat/writevoice.php');
  xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xmlHttpRequest.send("txt="+(name+"「"+txt+"」"));

};

Sys.Process.Data.ReadVoice=function(){
  var xmlHttpRequest=new XMLHttpRequest();
  xmlHttpRequest.onreadystatechange=function(){
    var READYSTATE_COMPLETED=4;
    var HTTP_STATUS_OK=200;
    if(this.readyState==READYSTATE_COMPLETED&&this.status==HTTP_STATUS_OK){
      Sys.Process.Log.Input(this.responseText);
    }
  };

  xmlHttpRequest.open('POST','http://terumena.com/dat/readvoice.php');
  xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xmlHttpRequest.send("");

};
