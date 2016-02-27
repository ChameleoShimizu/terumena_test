Sys.Output.Renderer=function(flag,r){
  if(flag.type=="NotField"){
    Sys.Log.id.style.visibility="hidden";
    r.Cvs.mx.drawImage(r.Cvs.s,0,0,r.w,r.h);
    r.Cvs.mx.drawImage(r.Cvs.i,0,0,r.w,r.h);
  }else{
    var player=Sys.Flag.player;
    Sys.Log.id.style.visibility="visible";
    if(flag.type=="Local"){
      var local=Sys.Gloval[player.place.gloval].Local[player.place.local];
      var display={
        w:Math.floor((r.w)/r.Local.px),
        h:Math.floor((r.h-Sys.Output.BottomMenu.height)/r.Local.px)
      };
      var center={
        x:Math.floor((r.w/2)/r.Local.px),
        y:Math.floor(((r.h-Sys.Output.BottomMenu.height)/2)/r.Local.px)
      };
      flag.x=player.x-center.x;
      flag.y=player.y-center.y;
      if(flag.x<0){
        flag.x=0;
      }
      if(flag.y<0){
        flag.y=0;
      }
      if(local.w<flag.x+display.w){
        flag.x=local.w-display.w;
      }
      if(local.h<=flag.y+display.h){
        flag.y=local.h-display.h-1;
      }
      PrintBottomMenu(r,player);
      r.Cvs.mx.drawImage(r.Cvs.s,flag.x*r.Local.px,flag.y*r.Local.px,r.w,r.h,0,0,r.w,r.h);
      r.Cvs.mx.drawImage(r.Cvs.i,0,0,r.w,r.h);
    }
    if(flag.type=="Gloval"){
      var gloval=Sys.Gloval[player.place.gloval];
      var display={
        w:Math.floor((r.w)/r.Gloval.px),
        h:Math.floor((r.h-Sys.Output.BottomMenu.height)/r.Gloval.px)
      };
      var center={
        x:Math.floor((r.w/2)/r.Gloval.px),
        y:Math.floor(((r.h-Sys.Output.BottomMenu.height)/2)/r.Gloval.px)
      };
      flag.x=player.x-center.x;
      flag.y=player.y-center.y;
      if(flag.x<0){
        flag.x=0;
      }
      if(flag.y<0){
        flag.y=0;
      }
      if(gloval.w<flag.x+display.w){
        flag.x=gloval.w-display.w;
      }
      if(gloval.h<=flag.y+display.h){
        flag.y=gloval.h-display.h-1;
      }
      PrintBottomMenu(r,player);
      r.Cvs.mx.drawImage(r.Cvs.s,flag.x*r.Gloval.px,flag.y*r.Gloval.px,(r.w-16),r.h,0,0,r.w,r.h);
      r.Cvs.mx.drawImage(r.Cvs.i,0,0,r.w,r.h);
    }

  }

  function PrintBottomMenu(r){
    r.Cvs.ix.fillStyle="#000";
    r.Cvs.ix.fillRect(Sys.Output.BottomMenu.x,Sys.Output.BottomMenu.y,Sys.Output.BottomMenu.width,Sys.Output.BottomMenu.height);
    r.Cvs.ix.fillStyle="rgba(25,50,25,0.3)";
    r.Cvs.ix.fillRect(Sys.Output.BottomMenu.x,Sys.Output.BottomMenu.y,Sys.Output.BottomMenu.width,Sys.Output.BottomMenu.height);

    r.Cvs.ix.fillStyle="#fff";
    r.Cvs.ix.font="14px 'Courier New'"
    r.Cvs.ix.textAlign="left";
    r.Cvs.ix.textBaseline="top";
    r.Cvs.ix.drawImage(r.Image.character,(player.portrait[0]%32)*r.Local.px,Math.floor(player.portrait[0]/32)*r.Local.px,r.Local.px,r.Local.px,8,Sys.Output.BottomMenu.y+56,r.Local.px,r.Local.px);
    r.Cvs.ix.fillText("HP "+player.hp+"/"+player.hpMax,64,Sys.Output.BottomMenu.y+8);
    r.Cvs.ix.fillText("MP "+player.mp+"/"+player.mpMax,64,Sys.Output.BottomMenu.y+40);

    r.Cvs.ix.fillStyle="#690A05";
    r.Cvs.ix.fillRect(64,Sys.Output.BottomMenu.y+24,(player.hp/player.hpMax)*180,8);
    r.Cvs.ix.fillStyle="#280AA8";
    r.Cvs.ix.fillRect(64,Sys.Output.BottomMenu.y+56,(player.mp/player.mpMax)*180,8);

    r.Cvs.ix.strokeStyle="rgba(255,255,255,0.25)";
    r.Cvs.ix.strokeRect(64,Sys.Output.BottomMenu.y+24,180,8);
    r.Cvs.ix.strokeRect(64,Sys.Output.BottomMenu.y+56,180,8);

    r.Cvs.ix.fillStyle="rgba(232,222,7,.5)";
    r.Cvs.ix.beginPath();
    r.Cvs.ix.arc(76,Sys.Output.BottomMenu.y+90,12,0,Math.PI*2,false);
    r.Cvs.ix.fill();

    r.Cvs.ix.fillStyle="#fff";
    r.Cvs.ix.fillText(player.gold+"G",96,Sys.Output.BottomMenu.y+82);
    r.Cvs.ix.fillText(player.nickname+"『"+player.name+"』",8,Sys.Output.BottomMenu.y+113);

  };

};
