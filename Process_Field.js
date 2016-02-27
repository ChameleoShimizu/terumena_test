Sys.Process.Field.CharacterCreate=function(field,index,mode){
  var name;
  switch(index){
    case 0:
    name="エヌ";
    break;
    case 1:
    name="テルメナ神";
    break;
    case 2:
    name="テルメナ神";
    break;
    case 3:
    name="たまウサ";
    break;
    case 4:
    name="聖女";
    break;
    case 5:
    name="紫の聖女";
    break;
    case 6:
    name="蒼の聖女";
    break;
    case 7:
    name="ダークシスター";
    break;
    case 8:
    name="ブラッドシスター";
    break;
    case 9:
    name="マフラー少女";
    break;
    case 10:
    name="マフラー少女";
    break;
    case 11:
    name="ゾンビ少女";
    break;
    case 12:
    name="ドワーフ";
    break;
    case 13:
    name="フレアエヌ";
    break;
    case 14:
    name="フェアリーエヌ";
    break;
    case 15:
    name="ゴーストエヌ";
    break;
    case 16:
    name="ブリザードエヌ";
    break;
    case 17:
    name="ホーリーエヌ";
    break;
    case 18:
    name="ダークエヌ";
    break;
    case 19:
    name="サンダーエヌ";
    break;
    case 20:
    name="ミラーエヌ";
    break;
    case 21:
    name="プリンエヌ";
    break;
  }

  var obj={
    Equipment:new Object(),
    item:new Object(),
    Flag:new Object(),
    player: true,
    _x: 0,
    _y: 0,
    ability:new Array(),
    age: 4,
    gender: "男性",
    muscle: 5,
    endurance: 5,
    magical: 55,
    name: name,
    nickname: "ラルクアンシエル",
    occupation: "戦士",
    place:{
      gloval:"Terumena",
      local:"Home",
    },
    portrait:[index],
    race: "ヤディン",
    stature: 50,
    weight: 13,
    hpMax:16,
    hp:16,
    mpMax:48,
    mp:48,
    hungerMax:50,
    hunger:50,
    speed:100,
    equipment:{
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
    },
    gold:10,
    x:0,
    y:0
  };

  if(typeof(mode)!="undefined"){
    obj.Flag[mode]=true;
  }

  var bool=true;
  var local=Sys.Gloval[Sys.Flag.player.place.gloval].Local[Sys.Flag.player.place.local];

  do{
    bool=false;
    obj.x=Math.floor(Math.random()*local.w);
    obj.y=Math.floor(Math.random()*local.h);
    for(var i=0; i<field.character.length; i++){
      if(obj.x==field.character[i].x&&obj.y==field.character[i].y){
        bool=true;
      }
    }
  }while(bool);

  field.character.push(obj);

  return field.character;
};

Sys.Process.Field.PlayerControl=function(input,flag,field){
  var bool=false;
  var player=flag.player;

  if(player.hp<0){
    flag._player=player;
    for(var i=0; i<field.character.length; i++){
      if(player==field.character[i]){
        Sys.Process.Log.Input(player.name+"はミンチになった。");
        field.character.splice(i,1);
      }
    }
    flag.Scene=Sys.Process.Scene.Death;
    return;
  }

  player._x=player.x;
  player._y=player.y;

  if(input.Key.state[37]||input.Key.state[38]||input.Key.state[39]||input.Key.state[40]){
    if(input.Key.state[37]) player.x--;
    if(input.Key.state[39]) player.x++;
    if(input.Key.state[38]) player.y--;
    if(input.Key.state[40]) player.y++;
    bool=true;
    var borderBool=Sys.Process.Field.FieldBorderCheck(player,field);
    if(!borderBool){
      player.x=player._x;
      player.y=player._y;
    }
  }

  if(input.Key.state[13]){
    if(player.place.local=="Gloval"){
      Sys.StopMin(100);
      var gloval=Sys.Gloval[player.place.gloval];
      for(var i in gloval.Local){
        if(player.x==gloval.Local[i].x&&player.y==gloval.Local[i].y){
          player.place.local=i;
        }
      }
      var local=gloval.Local[player.place.local];
      if(player.place.local=="Gloval"){
        player.place.local="RandomField";
        gloval.Local[player.place.local]=new Object();
        local=LocalFieldCreate(gloval.Local[player.place.local],player.x,player.y);
      }
      local.character.push(player);
      for(var i=0; i<gloval.character.length; i++){
        if(player==gloval.character[i]){
          gloval.character.splice(i,1);
        }
      }
      player.x=Math.floor(local.w/2);
      player.y=Math.floor(local.h/2);

      var ram=Math.floor(Math.random()*16);
      for(var i=0; i<ram; i++){
        var imgList=[0,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
        var img=Math.floor(Math.random()*imgList.length);
        while(imgList[img]==player.img) img=Math.floor(Math.random()*imgList.length);
        local.character=Sys.Process.Field.CharacterCreate(local,imgList[img],"enemy");
      }

      Sys.Renderer.Cvs.s.width=local.w*Sys.Renderer.Local.px;
      Sys.Renderer.Cvs.s.height=local.h*Sys.Renderer.Local.px;
      Sys.Flag.Output.Renderer.type="Local";
      Sys.Flag.Scene=Sys.Process.Scene.Local;
    }else{
      Sys.StopMin(100);
      var local=Sys.Gloval[player.place.gloval].Local[player.place.local];
      if(local.map[player.x][player.y].img==4){
        //気づいた。ローカルマップを配列で持っておかないと階層分けできない。
      }
    }
  }
  if(input.Key.state[68]){
    flag.Menu.kind="PutItem";
    flag.Menu.bool=true;
  }
  if(input.Key.state[69]){
    field.character=Sys.Process.Field.CharacterCreate(field,0,"enemy");
    Sys.Process.Log.Input("[Debug]Character Create & Random Placement.");
  }
  if(input.Key.state[71]){
    flag.Menu.kind="GetItem";
    flag.Menu.bool=true;
  }
  if(input.Key.state[81]){
    flag.Menu.kind="Drink";
    flag.Menu.bool=true;
  }
  if(input.Key.state[83]){
    Sys.Process.Data.Save(player.savname);
    Sys.Process.Log.Input("保存しました。");
  }
  if(input.Key.state[88]){
    flag.Menu.kind="Examine";
    flag.Menu.bool=true;
  }

  var target=Sys.Process.Field.collision(player,field);

  if(target){
    if(target.Flag.enemy){
      target=Sys.Process.Field.Attack(player,target);
    }
    if(target.hp<0){
      for(var i=0; i<field.character.length; i++){
        if(target==field.character[i]){
          Sys.Process.Log.Input(target.name+"はミンチになった。");
          field.character.splice(i,1);
          break;
        }
      }
    }
  }
  return bool;

  function LocalFieldCreate(local,x,y){
    local.w=50;
    local.h=50;

    var item={
      img:0,
      name:"ポーション",
      weight:0.1,
      func:{
        x:["Examine",["飲むと回復する謎の液体。","体力を50回復する。"]],
        q:["Drink",["StatusPlus",["hp",50]]]
      }
    };

    local.map=new Array();
    for(var i=0; i<local.h; i++){
      local.map[i]=new Array();
      for(var j=0; j<local.w; j++){
        local.map[i][j]=new Object();
        local.map[i][j].img=Math.floor(Math.random()*2);
        local.map[i][j].item=new Array();
        if(Math.floor(Math.random()*1024)<1){
          local.map[i][j].item.push(item);
        }
      }
    }
    local.character=new Array();

    if(typeof(x)!="undefined"){
      local.x=x;
    }
    if(typeof(y)!="undefined"){
      local.y=y;
    }

    return local;
  };

};

Sys.Process.Field.NpcAction=function(field){
  var death=0;
  for(var i=0; i<field.character.length+death; i++){
    var c=field.character[i];
    if(c.Flag.player) continue;
    c._x=c.x;
    c._y=c.y;
    if(c.Flag.target){
      MoveToTarget(c,SearchTarget(c));
    }else{
      c.Flag.target=IndexTarget(c,field.character);
      if(c.Flag.target){
        MoveToTarget(c,SearchTarget(c));
      }else{
        RandomMove(c);
      }
    }
    var target=Sys.Process.Field.collision(c,field);
    if(target){
      if(c.Flag.enemy){
        if(!target.Flag.enemy){
          target=Sys.Process.Field.Attack(c,target);
        }
        if(target.hp<0){
          for(var i=0; i<field.character.length; i++){
            if(target==field.character[i]){
              Sys.Process.Log.Input(target.name+"はミンチになった。");
              if(target==Sys.Flag.player){
                Sys.Flag._player=Sys.Flag.player;
                field.character.splice(i,1);
                Sys.Flag.Scene=Sys.Process.Scene.Death;
                return;
              }
              field.character.splice(i,1);
              death++;
              break;
            }
          }
        }
      }
    }
    var borderBool=Sys.Process.Field.FieldBorderCheck(c,field);
  }

  function IndexTarget(obj,c_objects){
    var list=new Array();
    if(obj.Flag.enemy){
      for(var i=0; i<c_objects.length; i++){
        if(!c_objects[i].Flag.enemy){
          list.push(c_objects[i]);
        }
      }
    }else if(obj.Flag.neutral){
      for(var i=0; i<c_objects.length; i++){
        if(c_objects[i].Flag.enemy){
          list.push(c_objects[i]);
        }
      }
    }else if(obj.Flag.ally){
      for(var i=0; i<c_objects.length; i++){
        if(c_objects[i].Flag.enemy){
          list.push(c_objects[i]);
        }
      }
    }
    var _list=new Array();
    for(var i=0; i<list.length; i++){
      var flag=SearchTarget(obj,list[i]);
      if(flag.bool){
        _list.push(list[i]);
      }
    }
    if(_list.length){
      return _list[Math.floor(Math.random()*_list.length)];
    }else{
      return false;
    }
  };

  function SearchTarget(obj,tgt){
    var target;
    if(!tgt){
      target=obj.Flag.target;
    }else{
      target=tgt;
    }
    var flag={
      bool:false,
      x:0,
      y:0
    };
    var x=(obj.x-target.x);
    var y=(obj.y-target.y);
    var rx=x;
    var ry=y;
    if(x<0) rx=x*(-1);
    if(y<0) ry=y*(-1);
    if(rx<=5&&ry<=5){
      flag.bool=true;
      if(x<0){
        flag.x=1;
      }else if(0<x){
        flag.x=(-1);
      }
      if(y<0){
        flag.y=1;
      }else if(0<y){
        flag.y=(-1);
      }
      return flag;
    }else{
      flag.bool=false;
      return flag;
    }
  };

  function MoveToTarget(obj,flag){
    if(flag.bool){
      obj.x+=flag.x;
      obj.y+=flag.y;
    }else{
      obj.Flag.target=false;
    }
  };

  function RandomMove(obj){
    var seed_x=Math.floor(Math.random()*1024);
    var seed_y=Math.floor(Math.random()*1024);
    var x=0;
    var y=0;
    if(seed_x<128){
      x=(-1);
    }else if(896<=seed_x){
      x=1;
    }
    if(seed_y<128){
      y=(-1);
    }else if(896<=seed_y){
      y=1;
    }
    obj.x+=x;
    obj.y+=y;
  };

};

Sys.Process.Field.FieldBorderCheck=function(obj,field){
  if(obj.x<0||obj.y<0||field.w<=obj.x||field.h<=obj.y){
    Sys.StopMin(100);
    if(obj.Flag.player){
      if(obj.place.local!="Gloval"){
        var gloval=Sys.Gloval[obj.place.gloval];
        gloval.character.push(obj);
        var local=gloval.Local[obj.place.local];
        for(var i=0; i<local.character.length; i++){
          if(obj==local.character[i]){
            local.character.splice(i,1);
          }
        }
        obj.x=local.x;
        obj.y=local.y;
        Sys.Renderer.Cvs.s.width=gloval.w*Sys.Renderer.Gloval.px;
        Sys.Renderer.Cvs.s.height=gloval.h*Sys.Renderer.Gloval.px;
        obj.place.local="Gloval";
        Sys.Flag.Output.Renderer.type="Gloval";
        Sys.Flag.Scene=Sys.Process.Scene.Gloval;
        return true;
      }else{
        return false;
      }
    }else{
      obj.x=obj._x;
      obj.y=obj._y;
      return false;
    }
  }else{
    return true;
  }
};

Sys.Process.Field.collision=function(obj,field){
  for(var i=0; i<field.character.length; i++){
    if(obj!=field.character[i]&&obj.x==field.character[i].x&&obj.y==field.character[i].y){
      obj.x=obj._x;
      obj.y=obj._y;
      return field.character[i];
    }
  }
  return false;
};

Sys.Process.Field.Attack=function(obj,target){
  var damage=obj.muscle-target.endurance;
  if(damage<=0) damage=Math.floor(Math.random()*2);
  target.hp-=damage;
  if(obj.Flag.player){
    Sys.Process.Log.Input(target.name+"を攻撃した。("+damage+")");
  }else if(obj.Flag.neutral){
    Sys.Process.Log.Input(obj.name+"は"+target.name+"を攻撃した。("+damage+")");
  }else if(obj.Flag.enemy&&target.Flag.player){
    Sys.Process.Log.Input(obj.name+"に攻撃された。("+damage+")");
  }else if(obj.Flag.enemy&&target.Flag.neutral){
    Sys.Process.Log.Input(target.name+"は"+obj.name+"に攻撃された。("+damage+")");
  }
  return target;
};
