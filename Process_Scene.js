Sys.Process.Scene.Title=function(input,flag,renderer){
  var selection=["冒険を再開する","新しい冒険者を作成する","設定の変更","終了"];

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.Title.cursor);
  }else if(input.Key.state[40]){
    flag.Title.cursor=CursorMove(flag.Title.cursor,true);
  }else if(input.Key.state[38]){
    flag.Title.cursor=CursorMove(flag.Title.cursor,false);
  }

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function CursorEnter(cursor){
    if(cursor==0){
      return Sys.Process.Scene.Resumption;
    }else if(cursor==1){
      flag.CharacterCreate=new Object();
      flag.CharacterCreate.Race=new Object();
      flag.CharacterCreate.Race.cursor=0;
      flag.CharacterCreate.Gender=new Object();
      flag.CharacterCreate.Gender.cursor=0;
      flag.CharacterCreate.Occupation=new Object();
      flag.CharacterCreate.Occupation.cursor=0;
      flag.CharacterCreate.Status=new Object();
      flag.CharacterCreate.Status.cursor=0;
      flag.CharacterCreate.Status.slot=new Array(3);
      flag.CharacterCreate.Status.lock=null;
      flag.CharacterCreate.Ability=new Object();
      flag.CharacterCreate.Ability.cursor=0;
      flag.CharacterCreate.Ability.select=new Array();
      flag.CharacterCreate.Ability.count=0;
      flag.CharacterCreate.Nickname=new Object();
      flag.CharacterCreate.Nickname.cursor=0;
      flag.CharacterCreate.Portrait=new Object();
      flag.CharacterCreate.Portrait.slide=new Array();
      flag.CharacterCreate.Portrait.cursor=0;
      flag.CharacterCreate.Profile=new Object();
      flag.CharacterCreate.Profile.cursor=0;
      flag.CharacterCreate.Name=new Object();
      flag.CharacterCreate.Name.bool=true;
      flag.CharacterCreate.Name.inputName;

      flag.player=new Object();
      flag.player.Flag=new Object();
      flag.player.Equipment=new Object();
      flag.player.item=new Array();
      flag.player.portrait=new Array();
      return Sys.Process.Scene.CharacterCreate.Race;
    }else if(cursor==2){
      return Sys.Process.Scene.Config;
    }else if(cursor==3){
      return Sys.Process.Scene.Exit;
    }
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("terumena",256,256);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(252,512+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i],256,512+(32*i));
    }

    return r;
  }

  return Rendering(renderer,flag.Title.cursor);

};

Sys.Process.Scene.Resumption=function(input,flag,renderer){
  var selection=new Array();
  var fileName=Sys.fs.readdirSync(Sys.Flag.dataPass+"/sav");

  for(var i=0; i<fileName.length; i++){
    selection[i]=fileName[i].substr(0,(fileName[i].length-4));
  }

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.Resumption.cursor);
  }else if(input.Key.state[40]){
    flag.Resumption.cursor=CursorMove(flag.Resumption.cursor,true);
  }else if(input.Key.state[38]){
    flag.Resumption.cursor=CursorMove(flag.Resumption.cursor,false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.Resumption.cursor);
  }

  function CursorEnter(cursor){
    var memory=Sys.Process.Data.Load(selection[cursor]);
    Sys.StopMin(100);
    if(memory.player.place.local=="Gloval"){
      var gloval=memory.gloval[memory.player.place.gloval];
      Sys.Renderer.Cvs.s.width=gloval.w*renderer.Gloval.px;
      Sys.Renderer.Cvs.s.height=gloval.h*renderer.Gloval.px;
      flag.Output.Renderer.type="Gloval";
      return Sys.Process.Scene.Gloval;
    }else{
      var local=memory.gloval[memory.player.place.gloval].Local[memory.player.place.local];
      Sys.Renderer.Cvs.s.width=local.w*renderer.Local.px;
      Sys.Renderer.Cvs.s.height=local.h*renderer.Local.px;
      flag.Output.Renderer.type="Local";
      return Sys.Process.Scene.Local;
    }
  };

  function CursorShift(cursor){
    return Sys.Process.Scene.Title;
  };

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillStyle="#fff";

    r.Cvs.sx.fillText("ロードするデータを選んでください。",96,64);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(92,128+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i],96,128+(32*i));
    }

    r.Cvs.sx.fillText("[shift] 戻る",96,768);

    return r;
  }
  return Rendering(renderer,flag.Resumption.cursor);
};

Sys.Process.Scene.CharacterCreate.Race=function(input,flag,renderer){
  var selection=["ヤディン","シェーレ","リチャード"];

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Race.cursor);
  }else if(input.Key.state[40]){
    flag.CharacterCreate.Race.cursor=CursorMove(flag.CharacterCreate.Race.cursor,true);
  }else if(input.Key.state[38]){
    flag.CharacterCreate.Race.cursor=CursorMove(flag.CharacterCreate.Race.cursor,false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.CharacterCreate.Race.cursor);
  }

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function CursorEnter(cursor){
    flag.player.race=selection[cursor];
    return Sys.Process.Scene.CharacterCreate.Gender;
  };

  function CursorShift(cursor){
    return Sys.Process.Scene.Title;
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("種族を選んでください。",96,64);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(92,128+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i],96,128+(32*i));
    }

    r.Cvs.sx.fillText("[shift] 戻る",96,768);

    return r;
  }

  return Rendering(renderer,flag.CharacterCreate.Race.cursor);

};

Sys.Process.Scene.CharacterCreate.Gender=function(input,flag,renderer){
  var selection=["男性","女性"];

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Gender.cursor);
  }else if(input.Key.state[40]){
    flag.CharacterCreate.Gender.cursor=CursorMove(flag.CharacterCreate.Gender.cursor,true);
  }else if(input.Key.state[38]){
    flag.CharacterCreate.Gender.cursor=CursorMove(flag.CharacterCreate.Gender.cursor,false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.CharacterCreate.Gender.cursor);
  }

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function CursorEnter(cursor){
    flag.player.gender=selection[cursor];
    return Sys.Process.Scene.CharacterCreate.Occupation;
  };

  function CursorShift(cursor){
    return Sys.Process.Scene.Race;
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("性別を選んでください。",96,64);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(92,128+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i],96,128+(32*i));
    }

    r.Cvs.sx.fillText("[shift] 戻る",96,768);

    return r;
  }

  return Rendering(renderer,flag.CharacterCreate.Gender.cursor);

};

Sys.Process.Scene.CharacterCreate.Occupation=function(input,flag,renderer){
  var selection=["戦士","盗賊","魔道士","農民","狩人","魔道戦士","神官"];

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Occupation.cursor);
  }else if(input.Key.state[40]){
    flag.CharacterCreate.Occupation.cursor=CursorMove(flag.CharacterCreate.Occupation.cursor,true);
  }else if(input.Key.state[38]){
    flag.CharacterCreate.Occupation.cursor=CursorMove(flag.CharacterCreate.Occupation.cursor,false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.CharacterCreate.Occupation.cursor);
  }

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function CursorEnter(cursor){
    flag.player.occupation=selection[cursor];
    return Sys.Process.Scene.CharacterCreate.Status;
  };

  function CursorShift(cursor){
    return Sys.Process.Scene.CharacterCreate.Race;
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("職業を選んでください。",96,64);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(92,128+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i],96,128+(32*i));
    }

    r.Cvs.sx.fillText("[shift] 戻る",96,768);

    return r;
  };

  return Rendering(renderer,flag.CharacterCreate.Occupation.cursor);

};

Sys.Process.Scene.CharacterCreate.Status=function(input,flag,renderer){
  var selection=["リロール","決定","筋力","耐久","魔力"];

  if(!flag.CharacterCreate.Status.slot[0]){
    flag.CharacterCreate.Status.slot=Reroll(flag.CharacterCreate.Status.slot);
  }

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Status.cursor);
  }else if(input.Key.state[40]){
    flag.CharacterCreate.Status.cursor=CursorMove(flag.CharacterCreate.Status.cursor,true);
  }else if(input.Key.state[38]){
    flag.CharacterCreate.Status.cursor=CursorMove(flag.CharacterCreate.Status.cursor,false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.CharacterCreate.Status.cursor);
  }

  function Reroll(slot){
    var point=100;
    var rem=0;
    var len=slot.length;
    if(flag.CharacterCreate.Status.lock!=null){
      point-=slot[flag.CharacterCreate.Status.lock];
    }
    if(slot.length-1==flag.CharacterCreate.Status.lock){
      len--;
    }
    for(var i=0; i<len; i++){
      if(i!=flag.CharacterCreate.Status.lock){
        if(i<len-1){
          rem=Math.floor(Math.random()*(point));
          point-=rem;
          slot[i]=rem;
        }else{
          slot[i]=point;
        }
      }
    }
    return slot;
  };

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function CursorEnter(cursor){
    if(cursor==0){
      flag.CharacterCreate.Status.slot=Reroll(flag.CharacterCreate.Status.slot);
      return Sys.Process.Scene.CharacterCreate.Status;
    }else if(cursor==1){
      flag.player.muscle=flag.CharacterCreate.Status.slot[0];
      flag.player.endurance=flag.CharacterCreate.Status.slot[1];
      flag.player.magical=flag.CharacterCreate.Status.slot[2];
      return Sys.Process.Scene.CharacterCreate.Ability;
    }else{
      if(flag.CharacterCreate.Status.lock==cursor-2){
        flag.CharacterCreate.Status.lock=null;
      }else{
        flag.CharacterCreate.Status.lock=cursor-2;
      }
      return Sys.Process.Scene.CharacterCreate.Status;
    }
  };

  function CursorShift(cursor){
    return Sys.Process.Scene.CharacterCreate.Occupation;
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("生き延びるには、ある程度の能力は必要だね。",96,64);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(92,128+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i],96,128+(32*i));
    }
    for(var i=0; i<flag.CharacterCreate.Status.slot.length; i++){
      r.Cvs.sx.fillText(flag.CharacterCreate.Status.slot[i],192,192+(32*i));
    }
    if(flag.CharacterCreate.Status.lock!=null){
      r.Cvs.sx.fillText("Lock",224,192+(32*(flag.CharacterCreate.Status.lock)));
    }

    r.Cvs.sx.fillText("[shift] 戻る",96,768);

    return r;
  };

  return Rendering(renderer,flag.CharacterCreate.Status.cursor);

};

Sys.Process.Scene.CharacterCreate.Ability=function(input,flag,renderer){
  var selection=["腕相撲","石の守備","魔力の遺伝子","俊足","幸運の持ち主","回避の訓練者"];

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Ability.cursor);
  }else if(input.Key.state[40]){
    flag.CharacterCreate.Ability.cursor=CursorMove(flag.CharacterCreate.Ability.cursor,true);
  }else if(input.Key.state[38]){
    flag.CharacterCreate.Ability.cursor=CursorMove(flag.CharacterCreate.Ability.cursor,false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.CharacterCreate.Ability.cursor);
  }

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function CursorEnter(cursor){
    for(var i=0; i<flag.CharacterCreate.Ability.select.length; i++){
      if(flag.CharacterCreate.Ability.select[i]==cursor){
        return Sys.Process.Scene.CharacterCreate.Ability;
      }
    }
    flag.CharacterCreate.Ability.select.push(cursor);
    flag.CharacterCreate.Ability.count++;
    if(3<=flag.CharacterCreate.Ability.count){
      flag.player.ability=flag.CharacterCreate.Ability.select;
      flag.CharacterCreate.Ability.count=0;
      flag.CharacterCreate.Ability.select=new Array();
      return Sys.Process.Scene.CharacterCreate.Nickname;
    }else{
      return Sys.Process.Scene.CharacterCreate.Ability;
    }
  };

  function CursorShift(cursor){
    if(0==flag.CharacterCreate.Ability.count){
      return Sys.Process.Scene.CharacterCreate.Status;
    }else{
      flag.CharacterCreate.Ability.count--;
      flag.CharacterCreate.Ability.select.pop();
      return Sys.Process.Scene.CharacterCreate.Ability;
    }
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("特異能力とは、あなたが持っている有益な特徴だ。3つまで選べるよ。",96,64);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(92,128+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillStyle="#fff";
      for(var j=0; j<flag.CharacterCreate.Ability.select.length; j++){
        if(i==flag.CharacterCreate.Ability.select[j]){
          r.Cvs.sx.fillStyle="#a00";
        }
      }
      r.Cvs.sx.fillText(selection[i],96,128+(32*i));
    }

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.fillText("選択した特異能力",512,256);

    for(var i=0; i<flag.CharacterCreate.Ability.select.length; i++){
      r.Cvs.sx.fillText(selection[flag.CharacterCreate.Ability.select[i]],512,288+(32*i));
    }

    if(0==flag.CharacterCreate.Ability.count){
      r.Cvs.sx.fillText("[shift] 戻る",96,768);
    }else{
      r.Cvs.sx.fillText("[shift] やり直す",96,768);
    }

    return r;
  }

  return Rendering(renderer,flag.CharacterCreate.Ability.cursor);

};

Sys.Process.Scene.CharacterCreate.Nickname=function(input,flag,renderer){
  var selection=["リロード","ラルクアンシエル","ラルクアンシエル","ラルクアンシエル","ラルクアンシエル"];

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Nickname.cursor);
  }else if(input.Key.state[40]){
    flag.CharacterCreate.Nickname.cursor=CursorMove(flag.CharacterCreate.Nickname.cursor,true);
  }else if(input.Key.state[38]){
    flag.CharacterCreate.Nickname.cursor=CursorMove(flag.CharacterCreate.Nickname.cursor,false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.CharacterCreate.Nickname.cursor);
  }

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function CursorEnter(cursor){
    if(cursor==0){

      return Sys.Process.Scene.CharacterCreate.Nickname;
    }else{
      flag.player.nickname=selection[cursor];
      return Sys.Process.Scene.CharacterCreate.Portrait;
    }
  };

  function CursorShift(cursor){
    return Sys.Process.Scene.CharacterCreate.Ability;
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("異名を選んでください。",96,64);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(92,128+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i],96,128+(32*i));
    }

    r.Cvs.sx.fillText("[shift] 戻る",96,768);

    return r;
  }

  return Rendering(renderer,flag.CharacterCreate.Nickname.cursor);

};

Sys.Process.Scene.CharacterCreate.Portrait=function(input,flag,renderer){
  var selection=[["決定"],["肖像",[1,2,3,4,5,6,7,8,9,10,11,11,12,13,14,15,16]]];

  if(!flag.CharacterCreate.Portrait.slide[1]){
    flag.CharacterCreate.Portrait.slide=new Array(selection.length-1);
    for(var i=1; i<selection.length; i++){
      flag.CharacterCreate.Portrait.slide[i]=0;
    }
  }

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Portrait.cursor);
  }else if(input.Key.state[40]){
    flag.CharacterCreate.Portrait.cursor=CursorMove(flag.CharacterCreate.Portrait.cursor,true);
  }else if(input.Key.state[38]){
    flag.CharacterCreate.Portrait.cursor=CursorMove(flag.CharacterCreate.Portrait.cursor,false);
  }else if(input.Key.state[39]){
    flag.CharacterCreate.Portrait.slide[flag.CharacterCreate.Portrait.cursor]=SlideMove(flag.CharacterCreate.Portrait.cursor,flag.CharacterCreate.Portrait.slide[flag.CharacterCreate.Portrait.cursor],true);
  }else if(input.Key.state[37]){
    flag.CharacterCreate.Portrait.slide[flag.CharacterCreate.Portrait.cursor]=SlideMove(flag.CharacterCreate.Portrait.cursor,flag.CharacterCreate.Portrait.slide[flag.CharacterCreate.Portrait.cursor],false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.CharacterCreate.Portrait.cursor);
  }

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function SlideMove(cursor,slide,bool){
    if(cursor!=0){
      if(bool){
        slide++;
        if(selection[cursor][1].length<=slide) slide=0;
        return slide;
      }else{
        slide--;
        if(slide<0) slide=selection[cursor][1].length-1;
        return slide;
      }
    }else{
      return slide;
    }
  };

  function CursorEnter(cursor){
    if(cursor==0){
      for(var i=1; i<selection.length; i++){
        flag.player.portrait.push(selection[i][1][flag.CharacterCreate.Portrait.slide[i]]);
      }
      return Sys.Process.Scene.CharacterCreate.Profile;
    }else{
      return Sys.Process.Scene.CharacterCreate.Portrait;
    }
  };

  function CursorShift(cursor){
    return Sys.Process.Scene.CharacterCreate.Nickname;
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("肖像を選んでください。",96,64);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(92,128+(32*cursor)-24,256,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i][0],144,128+(32*i));
      if(i!=0){
        r.Cvs.sx.fillText("<<",112,128+(32*i));
        r.Cvs.sx.fillText(selection[i][1][flag.CharacterCreate.Portrait.slide[i]],192,128+(32*i));
        r.Cvs.sx.fillText(">>",224,128+(32*i));
      }
    }
    r.Cvs.sx.drawImage(r.Image.character,(selection[1][1][flag.CharacterCreate.Portrait.slide[1]]%32)*r.Local.px,Math.floor(selection[1][1][flag.CharacterCreate.Portrait.slide[1]]/32)*r.Local.px,r.Local.px,r.Local.px,384,144,r.Local.px,r.Local.px);

    r.Cvs.sx.fillText("[shift] 戻る",96,768);

    return r;
  }

  return Rendering(renderer,flag.CharacterCreate.Portrait.cursor);

};

Sys.Process.Scene.CharacterCreate.Profile=function(input,flag,renderer){
  var selection=["リロード","決定"];

  if(typeof(flag.player.age)=="undefined"){
    flag.player=Reload(flag.player);
  }

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Profile.cursor);
  }else if(input.Key.state[40]){
    flag.CharacterCreate.Profile.cursor=CursorMove(flag.CharacterCreate.Profile.cursor,true);
  }else if(input.Key.state[38]){
    flag.CharacterCreate.Profile.cursor=CursorMove(flag.CharacterCreate.Profile.cursor,false);
  }else if(input.Key.state[16]){
    flag.Scene=CursorShift(flag.CharacterCreate.Profile.cursor);
  }

  function Reload(player){
    player.age=13+Math.floor(Math.random()*100);
    player.stature=100+Math.floor(Math.random()*100);
    player.weight=10+Math.floor(Math.random()*100);
    return player;
  };

  function CursorMove(cursor,bool){
    if(bool){
      cursor++;
      if(selection.length<=cursor) cursor=0;
      return cursor;
    }else{
      cursor--;
      if(cursor<0) cursor=selection.length-1;
      return cursor;
    }
  };

  function CursorEnter(cursor){
    if(cursor==0){
      flag.player=Reload(flag.player);
      return Sys.Process.Scene.CharacterCreate.Profile;
    }else if(cursor==1){
      return Sys.Process.Scene.CharacterCreate.Name;
    }
  };

  function CursorShift(cursor){
    return Sys.Process.Scene.CharacterCreate.Portrait;
  };

  function Rendering(r,cursor){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("年齢とか身長とか体重とか決めてください。",96,64);

    r.Cvs.sx.fillText("名前",96,128);
      r.Cvs.sx.fillText("????",144,128);
    r.Cvs.sx.fillText("異名",96,152);
      r.Cvs.sx.fillText(flag.player.nickname,144,152);
    r.Cvs.sx.fillText("種族",96,176);
      r.Cvs.sx.fillText(flag.player.race,144,176);
    r.Cvs.sx.fillText("性別",96,200);
      r.Cvs.sx.fillText(flag.player.gender,144,200);

    r.Cvs.sx.fillText("職業",384,128);
      r.Cvs.sx.fillText(flag.player.occupation,432,128);
    r.Cvs.sx.fillText("年齢",384,152);
      r.Cvs.sx.fillText(flag.player.age+"歳",432,152);
    r.Cvs.sx.fillText("身長",384,176);
      r.Cvs.sx.fillText(flag.player.stature+"cm",432,176);
    r.Cvs.sx.fillText("体重",384,200);
      r.Cvs.sx.fillText(flag.player.weight+"kg",432,200);

    r.Cvs.sx.fillStyle="rgba(255,255,255,.1)";
    r.Cvs.sx.fillRect(764,720+(32*cursor)-24,128,36);

    r.Cvs.sx.fillStyle="#fff";
    for(var i=0; i<selection.length; i++){
      r.Cvs.sx.fillText(selection[i],768,720+(32*i));
    }

    r.Cvs.sx.fillText("[shift] 戻る",96,768);

    return r;
  }

  return Rendering(renderer,flag.CharacterCreate.Profile.cursor);

};

Sys.Process.Scene.CharacterCreate.Name=function(input,flag,renderer){

  if(flag.CharacterCreate.Name.bool){
    flag.CharacterCreate.Name.bool=false;
    var inputName=document.createElement("input");
    inputName.id="inputName";
    inputName.style.width=256+"px";
    inputName.style.height=20+"px";
    inputName.style.left=(Sys.Renderer.w/2)-128+"px";
    inputName.style.top=(Sys.Renderer.h/2)+"px";
    document.body.appendChild(inputName);
    flag.CharacterCreate.Name.inputName=document.getElementById("inputName");
    flag.CharacterCreate.Name.inputName.focus();
  }

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.CharacterCreate.Name.inputName.value);
  }

  function CursorEnter(name){
    if(document.activeElement.id=="inputName"){
      flag.player.savname=name;
      flag.player.name=name;
      flag.player.place=new Object();
      flag.player.place.gloval="Terumena";
      flag.player.place.local="Home";
      flag.player.Flag.player=true;

      flag.player.x=10;
      flag.player.y=10;
      flag.player.hpMax=128;
      flag.player.hp=flag.player.hpMax;
      flag.player.mpMax=48;
      flag.player.mp=flag.player.mpMax;
      flag.player.hungerMax=50;
      flag.player.hunger=flag.player.hungerMax;
      flag.player.speed=100;
      flag.player.equipment={
        head1:"",
        neck1:"",
        back1:"",
        body1:"",
        handedness:"",
        hand1:"",
        finger1:"",
        finger2:"",
        arm1:"",
        hip1:"",
        leg1:"",
        remote:"",
        ammunition:""
      };
      flag.player.item=new Array();
      for(var i=0; i<3; i++){
        var item={
          img:0,
          name:"ポーション",
          weight:0.1,
          func:{
            x:["Examine",["飲むと回復する謎の液体。","体力を50回復する。"]],
            q:["Drink",["StatusPlus",["hp",50]]]
          }
        };
        flag.player.item.push(item);
      }

      flag.player.gold=1000;

      Sys.Gloval.Terumena.Local.Home=LocalFieldCreate(Sys.Gloval.Terumena.Local.Home,2,4);
      Sys.Gloval.Terumena.Local.Home.character.push(flag.player);

      document.body.removeChild(flag.CharacterCreate.Name.inputName);

      Sys.Process.Data.Save(flag.player.savname);

      Sys.StopMin(100);

      var gloval=Sys.Gloval[flag.player.place.gloval];
      gloval.w=100;
      gloval.h=100;
      gloval.map=new Array();
      for(var i=0; i<gloval.w; i++){
        gloval.map[i]=new Array();
        for(var j=0; j<gloval.h; j++){
          for(var k in gloval.Local){
            gloval.map[i][j]=new Object();
            gloval.map[i][j].item=new Array();
            if(gloval.Local[k].x==i&&gloval.Local[k].y==j){
              gloval.map[i][j].img=0;
            }else{
              gloval.map[i][j].img=Math.floor(Math.random()*2);
            }
          }
        }
      }
      gloval.character=new Array();
      gloval.Local.Home.img=0;
      gloval.Local.Home.x=20;
      gloval.Local.Home.y=20;
      gloval.map[gloval.Local.Home.y][gloval.Local.Home.x].img=0;

      for(var i=0; i<10; i++){
        gloval.Local["Dungeon"+i]=new Object();
        gloval.Local["Dungeon"+i]=LocalFieldCreate(gloval.Local["Dungeon"+i],33,36);
        gloval.Local["Dungeon"+i].map[Math.floor(Math.random()*gloval.Local["Dungeon"+i].w)][Math.floor(Math.random()*gloval.Local["Dungeon"+i].h)].img=4;
        gloval.Local["Dungeon"+i].img=1;
        var bool=true;
        do{
          bool=false;
          gloval.Local["Dungeon"+i].x=Math.floor(Math.random()*gloval.w);
          gloval.Local["Dungeon"+i].y=Math.floor(Math.random()*gloval.h);
          for(var j in gloval.Local){
            if(gloval.Local[j]!=gloval.Local["Dungeon"+i]){
              if(gloval.Local[j].x==gloval.Local["Dungeon"+i].x&&gloval.Local[j].y==gloval.Local["Dungeon"+i].y){
                bool=true;
                break;
              }
            }
          }
        }while(bool);
        gloval.map[gloval.Local["Dungeon"+i].y][gloval.Local["Dungeon"+i].x].img=0;
      }

      var local=Sys.Gloval[flag.player.place.gloval].Local[flag.player.place.local];
      renderer.Cvs.s.width=local.w*renderer.Local.px;
      renderer.Cvs.s.height=local.h*renderer.Local.px;
      flag.Output.Renderer.type="Local";
      return Sys.Process.Scene.Local;
    }else{
      return Sys.Process.Scene.CharacterCreate.Name;
    }
  };

  function LocalFieldCreate(local,chip_start,chip_end){
    local.w=50;
    local.h=50;
    local.map=new Array();
    local.character=new Array();
    for(var i=0; i<local.h; i++){
      local.map[i]=new Array();
      for(var j=0; j<local.w; j++){
        local.map[i][j]=new Object();
        local.map[i][j].img=chip_start+Math.floor(Math.random()*(chip_end-chip_start));
        local.map[i][j].item=new Array();
      }
    }

    return local;
  };

  function Rendering(r){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("最後に、名前を教えてください。",96,64);

    return r;
  };

  return Rendering(renderer);

};

Sys.Process.Scene.Local=function(input,flag,renderer){

  if(input.Key.state.length){
    clearTimeout(Sys.Flag.voice);
    Sys.Flag.voice=setTimeout(function(){
      Sys.Process.Data.ReadVoice();
    },3000);
  }

  var field=new Object();
  field.obj=Sys.Gloval[flag.player.place.gloval].Local[flag.player.place.local];

  if(!flag.Menu.bool){
    var playerMoveCheck=Sys.Process.Field.PlayerControl(input,flag,field.obj);
    if(playerMoveCheck){
      Sys.Process.Field.NpcAction(field.obj);
    }
  }else{
    Sys.Process.Menu.Item(input,renderer,flag.Menu.kind,field.obj,flag.player);
  }

  field.Rendering=function(r){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillStyle="#fff";

    for(var i=0; i<field.obj.w; i++){
      for(var j=0; j<field.obj.h; j++){
        r.Cvs.sx.drawImage(r.Image.localMap,(field.obj.map[j][i].img%32)*r.Local.px,Math.floor((field.obj.map[j][i].img)/32)*r.Local.px,r.Local.px,r.Local.px,i*r.Local.px,j*r.Local.px,r.Local.px,r.Local.px);
        if(field.obj.map[i][j].item.length){
          for(var k=0; k<field.obj.map[i][j].item.length; k++){
            r.Cvs.sx.drawImage(r.Image.item,(field.obj.map[i][j].item[k].img%32)*r.Local.px,Math.floor((field.obj.map[i][j].item[k].img%32)/32)*r.Local.px,r.Local.px,r.Local.px,i*r.Local.px,j*r.Local.px-(k*4),r.Local.px,r.Local.px);
          }
        }
      }
    }

    for(var i=0; i<field.obj.character.length; i++){
      r.Cvs.sx.drawImage(r.Image.character,(field.obj.character[i].portrait[0]%32)*r.Local.px,Math.floor((field.obj.character[i].portrait[0])/32)*r.Local.px,r.Local.px,r.Local.px,field.obj.character[i].x*r.Local.px,field.obj.character[i].y*r.Local.px,r.Local.px,r.Local.px);
    }

    return r;
  };

  return field.Rendering(renderer);

};

Sys.Process.Scene.Gloval=function(input,flag,renderer){

  if(input.Key.state.length){
    clearTimeout(Sys.Flag.voice);
    Sys.Flag.voice=setTimeout(function(){
      Sys.Process.Data.ReadVoice();
    },3000);
  }

  var field=new Object();
  field.obj=Sys.Gloval[flag.player.place.gloval];

  if(!flag.Menu.bool){
    var playerMoveCheck=Sys.Process.Field.PlayerControl(input,flag,field.obj);
    if(playerMoveCheck){
      Sys.Process.Field.NpcAction(field.obj);
    }
  }else{
    Sys.Process.Menu.Item(input,renderer,flag.Menu.kind,field.obj,flag.player);
  }

  field.Rendering=function(r){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillStyle="#fff";

    for(var i=0; i<field.obj.w; i++){
      for(var j=0; j<field.obj.h; j++){
        r.Cvs.sx.drawImage(r.Image.glovalMap,(field.obj.map[j][i].img%32)*r.Local.px,Math.floor(field.obj.map[j][i].img/32)*r.Local.px,r.Local.px,r.Local.px,i*r.Gloval.px,j*r.Gloval.px,r.Gloval.px,r.Gloval.px);
        if(field.obj.map[i][j].item.length){
          for(var k=0; k<field.obj.map[i][j].item.length; k++){
            r.Cvs.sx.drawImage(r.Image.item,(field.obj.map[i][j].item[k].img%32)*r.Local.px,Math.floor((field.obj.map[i][j].item[k].img)/32)*r.Local.px,r.Local.px,r.Local.px,i*r.Gloval.px,j*r.Gloval.px-(k*3),r.Gloval.px,r.Gloval.px);
          }
        }
      }
    }

    for(var i in field.obj.Local){
      r.Cvs.sx.drawImage(r.Image.build,(field.obj.Local[i].img%32)*r.Local.px,Math.floor((field.obj.Local[i].img)/32)*r.Local.px,r.Local.px,r.Local.px,field.obj.Local[i].x*r.Gloval.px,field.obj.Local[i].y*r.Gloval.px,r.Gloval.px,r.Gloval.px);
    }

    for(var i=0; i<field.obj.character.length; i++){
      r.Cvs.sx.drawImage(r.Image.character,(field.obj.character[i].portrait[0]%32)*r.Local.px,Math.floor((field.obj.character[i].portrait[0])/32)*r.Local.px,r.Local.px,r.Local.px,field.obj.character[i].x*r.Gloval.px,field.obj.character[i].y*r.Gloval.px,r.Gloval.px,r.Gloval.px);
    }

    return r;
  };

  return field.Rendering(renderer);

};

Sys.Process.Scene.Death=function(input,flag,renderer){

  if(flag.Death.bool){
    flag.Death.bool=false;
    flag.Output.Renderer.type="NotField";
    renderer.Cvs.s.width=renderer.w;
    renderer.Cvs.s.height=renderer.h;
    var inputDeath=document.createElement("input");
    inputDeath.id="inputDeath";
    inputDeath.style.width=512+"px";
    inputDeath.style.height=20+"px";
    inputDeath.style.left=(Sys.Renderer.w/2)-256+"px";
    inputDeath.style.top=(Sys.Renderer.h/2)+"px";
    document.body.appendChild(inputDeath);
    flag.Death.inputDeath=document.getElementById("inputDeath");
    flag.Death.inputDeath.focus();
  }

  if(input.Key.state[13]){
    flag.Scene=CursorEnter(flag.Death.inputDeath.value);
  }

  function CursorEnter(comment){
    if(document.activeElement.id=="inputDeath"){
      flag.player=flag._player;
      Sys.Process.Data.WriteVoice(flag.player.nickname+"『"+flag.player.name+"』",comment);

      flag.player.place.local="Home";
      flag.player.x=10;
      flag.player.y=10;
      flag.player.hp=flag.player.hpMax;
      flag.player.mp=flag.player.mpMax;
      flag.player.hunger=flag.player.hungerMax;
      flag.player.gold=Math.floor(flag.player.gold/2);

      document.body.removeChild(flag.Death.inputDeath);
      Sys.Process.Data.Save(flag.player.savname);
      Sys.StopMin(100);

      var local=Sys.Gloval[flag.player.place.gloval].Local[flag.player.place.local];
      local.character.push(flag.player);

      renderer.Cvs.s.width=local.w*renderer.Local.px;
      renderer.Cvs.s.height=local.h*renderer.Local.px;
      flag.Output.Renderer.type="Local";

      flag.Death.bool=true;
      return Sys.Process.Scene.Local;
    }else{
      return Sys.Process.Scene.Death;
    }
  };

  function Rendering(r){
    r.Cvs.sx.fillStyle="#000";
    r.Cvs.sx.fillRect(0,0,r.w,r.h);

    r.Cvs.sx.fillStyle="#fff";
    r.Cvs.sx.font="16px 'Times New Roman'";
    r.Cvs.sx.textAlign="left";

    r.Cvs.sx.fillText("あなたは死んでしまった。",96,64);
    r.Cvs.sx.fillText("一言どうぞ。",96,96);

    return r;
  };

  return Rendering(renderer);

};
