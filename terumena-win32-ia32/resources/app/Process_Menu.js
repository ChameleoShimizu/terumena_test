Sys.Process.Menu.Item=function(input,renderer,kind,field,player){
  var selection=SelectionSet(kind);

  if(input.Key.state[13]){
    CursorEnter(Sys.Flag.Menu.cursor,kind);
  }else if(input.Key.state[40]){
    Sys.Flag.Menu.cursor=CursorMove(Sys.Flag.Menu.cursor,true);
  }else if(input.Key.state[38]){
    Sys.Flag.Menu.cursor=CursorMove(Sys.Flag.Menu.cursor,false);
  }else if(input.Key.state[39]){
    Sys.Flag.Menu.page=PageMove(Sys.Flag.Menu.page,true);
  }else if(input.Key.state[37]){
    Sys.Flag.Menu.page=PageMove(Sys.Flag.Menu.page,false);
  }else if(input.Key.state[16]){
    CursorShift(Sys.Flag.Menu.cursor);
  }

  function CursorEnter(cursor,kind){
    if(Sys.Flag.Menu.flag=="Normal"){
      if(selection.own.length+selection.field.length){
        ChoiceSelection(cursor,kind);
      }
    }
  };

  function CursorShift(cursor){
    if(Sys.Flag.Menu.flag=="Normal"){
      Sys.Flag.Menu.cursor=0;
      Sys.Flag.Menu.bool=false;
      Sys.Flag.Menu.page=0;
    }else if(Sys.Flag.Menu.flag=="Examine"){
      Sys.Flag.Menu.flag="Normal";
      Sys.Flag.Menu.page=Sys.Flag.Menu._page;
    }
  };

  function CursorMove(cursor,bool){
    if(Sys.Flag.Menu.flag=="Normal"){
      if(bool){
        cursor++;
        if(selection.own.length+selection.field.length<=cursor) cursor=0;
        Sys.Flag.Menu.page=Math.floor(cursor/10);
      }else{
        cursor--;
        if(cursor<0) cursor=selection.own.length+selection.field.length-1;
        Sys.Flag.Menu.page=Math.floor(cursor/10);
      }
      return cursor;
    }else{
      return cursor;
    }
  };

  function PageMove(page,bool){
    if(Sys.Flag.Menu.flag=="Normal"){
      var len=Sys.Flag.Menu.pageMax;
      if(bool){
        page++;
        if(len<page) page=0;
        Sys.Flag.Menu.cursor=page*10;
        return page;
      }else{
        page--;
        if(page<0) page=len;
        Sys.Flag.Menu.cursor=page*10;
        return page;
      }
    }else if(Sys.Flag.Menu.flag=="Examine"){
      if(bool){
        page++;
        if(Sys.Flag.Menu.choice.length<=page) page=0;
        return page;
      }else{
        page--;
        if(page<0) page=Sys.Flag.Menu.choice.length-1;
        return page;
      }
    }else{
      return page;
    }
  };

  function SelectionSet(kind){
    var list=Sys.Flag.player.item;
    switch(kind){
      case "Examine":
      return Examine();
      break;

      case "GetItem":
      return GetItem();
      break;

      case "PutItem":
      return PutItem();
      break;

      case "Drink":
      return Drink();
      break;
    }

    function Examine(){
      var _list=new Array();
      var stack=GetFieldStack();
      var _stack=new Array();
      for(var i=0; i<list.length; i++){
        if(list[i].func.x){
          _list.push(list[i]);
        }
      }
      for(var i=0; i<stack.length; i++){
        if(stack[i].func.x){
          _stack.push(stack[i]);
        }
      }
      Sys.Flag.Menu.pageMax=SetPageMax(_list,_stack);
      Sys.Flag.Menu.menuName="調べる";
      return {
        own:_list,
        field:_stack
      };
    };

    function GetItem(){
      var stack=GetFieldStack();
      Sys.Flag.Menu.pageMax=SetPageMax(new Array(),stack);
      Sys.Flag.Menu.menuName="拾う";
      return {
        own:new Array(),
        field:stack
      };
    };

    function PutItem(){
      Sys.Flag.Menu.pageMax=SetPageMax(list,new Array());
      Sys.Flag.Menu.menuName="置く";
      return {
        own:list,
        field:new Array()
      };
    };

    function Drink(){
      var _list=new Array();
      var stack=GetFieldStack();
      var _stack=new Array();
      for(var i=0; i<list.length; i++){
        if(list[i].func.q){
          _list.push(list[i]);
        }
      }
      for(var i=0; i<stack.length; i++){
        if(stack[i].func.q){
          _stack.push(stack[i]);
        }
      }
      Sys.Flag.Menu.pageMax=SetPageMax(_list,_stack);
      Sys.Flag.Menu.menuName="飲む";
      return {
        own:_list,
        field:_stack
      };
    };

  };

  function SetPageMax(own,stack){
    var len=own.length+stack.length;
    if(len&&len%10==0) len--;
    return Math.floor((len)/10);
  };

  function GetFieldStack(){
    return field.map[player.x][player.y].item;
  };

  function ChoiceSelection(cursor,kind){
    var func=new Object();
    var StatusFunc=new Object();

    func.Examine=function(choice){
      Sys.Flag.Menu.choice=choice.func.x[1];
      Sys.Flag.Menu.flag=kind;
      Sys.Flag.Menu._page=Sys.Flag.Menu.page;
      Sys.Flag.Menu.page=0;
    };

    func.GetItem=function(choice){
      player.item.push(choice);
      for(var i=0; i<selection.field.length; i++){
        if(selection.field[i]==choice){
          selection.field.splice(i,1);
        }
      }
      if(selection.field.length){
        if(selection.field.length<=cursor){
          Sys.Flag.Menu.cursor=CursorMove(cursor,false);
        }
      }
    };

    func.PutItem=function(choice){
      var stack=GetFieldStack();
      stack.push(choice);
      for(var i=0; i<selection.own.length; i++){
        if(selection.own[i]==choice){
          selection.own.splice(i,1);
        }
      }
      if(selection.own.length){
        if(selection.own.length<=cursor){
          Sys.Flag.Menu.cursor=CursorMove(cursor,false);
        }
      }
    };

    func.Drink=function(choice){
      StatusFunc[choice.func.q[1][0]](choice.func.q[1][1][0],choice.func.q[1][1][1]);
      var len=selection.field.length+selection.own.length;
      var f_len=selection.field.length;
      for(var i=0; i<len; i++){
        if(i<selection.field.length&&selection.field[i]==choice){
          selection.field.splice(i,1);
        }else if(selection.own[i-f_len]==choice){
          selection.own.splice(i-f_len,1);
        }
      }
      len=selection.field.length+selection.own.length;
      if(len){
        if(len<=cursor){
          Sys.Flag.Menu.cursor=CursorMove(cursor,false);
        }
      }
      var list=Sys.Flag.player.item;
      var stack=GetFieldStack();
      f_len=stack.length;
      len=f_len+list.length;
      for(var i=0; i<len; i++){
        if(i<f_len&&stack[i]==choice){
          stack.splice(i,1);
        }else if(list[i-f_len]==choice){
          list.splice(i-f_len,1);
        }
      }

    };

    StatusFunc.StatusPlus=function(par,num){
      player[par]+=num;
      if(typeof(player[par+"Max"])!="undefined"){
        if(player[par+"Max"]<player[par]) player[par]=player[par+"Max"];
      }
    };

    if(cursor<selection.field.length){
      func[kind](selection.field[cursor]);
    }else{
      func[kind](selection.own[selection.field.length+cursor]);
    }

  };

  function Rendering(r,cursor){
    r.Cvs.ix.fillStyle="rgb(25,50,25)";
    r.Cvs.ix.fillRect(Sys.Flag.Menu.x,Sys.Flag.Menu.y,Sys.Flag.Menu.w,Sys.Flag.Menu.h);

    r.Cvs.ix.fillStyle="#fff";
    r.Cvs.ix.font="16px 'Courier New'";
    r.Cvs.ix.textAlign="left";
    r.Cvs.ix.textBaseline="top";

    r.Cvs.ix.fillText(Sys.Flag.Menu.menuName,192,128);

    r.Cvs.ix.fillRect(190,160,630,1);

    if(Sys.Flag.Menu.flag=="Normal"){
      var len=selection.own.length;
      var start=Sys.Flag.Menu.page*10;
      var count=0;
      var f_len=selection.field.length;
      len+=f_len;
      for(var i=0; i<len; i++){
        if(start<=i&&count<10){
          if(cursor==i){
            r.Cvs.ix.fillStyle="rgba(255,255,255,.1)";
            r.Cvs.ix.fillRect(210,192+(32*(i-start))-10,578,32);
          }
          r.Cvs.ix.fillStyle="#fff";
          if(i<selection.field.length){
            r.Cvs.ix.drawImage(r.Image.item,(selection.field[i].img%32)*r.Local.px,Math.floor((selection.field[i].img%32)/32)*r.Local.px,r.Local.px,r.Local.px,212,192+(32*(i-start))-10,r.Gloval.px,r.Gloval.px);
            r.Cvs.ix.fillText(selection.field[i].name+" "+selection.field[i].weight+"kg",256,192+(32*(i-start)));
          }else{
            r.Cvs.ix.drawImage(r.Image.item,(selection.own[i-f_len].img%32)*r.Local.px,Math.floor((selection.own[i-f_len].img%32)/32)*r.Local.px,r.Local.px,r.Local.px,212,192+(32*(i-start))-10,r.Gloval.px,r.Gloval.px);
            r.Cvs.ix.fillText(selection.own[i-f_len].name+" "+selection.own[i-f_len].weight+"kg",256,192+(32*(i-start)));
          }
          count++;
        }
      }
      r.Cvs.ix.fillText(Sys.Flag.Menu.page+"/"+(Sys.Flag.Menu.pageMax),768,520);
    }else if(Sys.Flag.Menu.flag=="Examine"){
      r.Cvs.ix.fillText(Sys.Flag.Menu.choice[Sys.Flag.Menu.page],224,192);
      r.Cvs.ix.fillText(Sys.Flag.Menu.page+"/"+(Sys.Flag.Menu.choice.length-1),768,520);
    }

    r.Cvs.ix.fillText("[shift] 戻る",192,520);
  };

  return Rendering(renderer,Sys.Flag.Menu.cursor);

};
