import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { max } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket!: Socket;
  isBrowser: boolean = false;
constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(this.platformId);

  const savedName = this.isBrowser ? localStorage.getItem('name') : '';
  const savedPassword = this.isBrowser ? localStorage.getItem('password') : '';

this.socket = io('https://card-renl.onrender.com', {
    transports: ['websocket', 'polling'],
  withCredentials: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  timeout: 1800000,
  auth: {
    name: savedName || '',
    pass: savedPassword || ''
  }
});
    this.socket.io.on('reconnect_attempt', () => {
      console.log('[Debug] Attempting to reconnect...');
    });

    this.socket.io.on('reconnect', (attempt: any) => {
      console.log(`[Debug] Reconnected after ${attempt} attempts, new socket id: ${this.socket.id}`);
    });

    this.socket.on('connect', () => {
      console.log('[Debug] Connected to Socket.IO server:', this.socket.id);
    });

    this.socket.on('connect_error', (err: { message: any }) => {
      console.error('[Debug] Socket connection error:', err.message);
    });
  }


register(username:string,email:string,password:string){
this.socket.emit('register',username,email,password);
}
onregister(callback:(resp:any)=>void){
  this.socket.on('response',(resp:any)=>{
    callback(resp);
  });
}

signin(username:string,password:string){
  this.socket.emit('signin',username,password);
}
onsignin(callback:(resp:any)=>void){
  this.socket.on('signed',(resp:any)=>{
    callback(resp);
  });
}

Createroom(pairid:string,oppid:string,user:string){
  this.socket.emit('createroom',pairid,oppid,user,'stopped');
}

onCreateroom(callback:(ha:any)=>void){
  this.socket.on('roomadded',(ha:any)=>{
callback(ha);
  });
}

Leaveroom(user:string,id:string){
  this.socket.emit('leave',user,id);
}

Joinroom(id:string,user:string){
this.socket.emit('joinroom',id,user);
}
onJoinroom(callback:(resp:any)=>void){
  this.socket.on('respi',(resp:any)=>{
    callback(resp);
  });
}

Loadroom( id:string){
this.socket.emit('loadroom',id);
}
onLoadroom(callback:(info:any)=>void){
  this.socket.on('loadedroom',(info:any)=>{
    callback(info);
  });
}
noStart(callback:(id:string)=>void){
  this.socket.on('starts',(id:string)=>{
callback(id);
  });
}
onStargame(callback:(data:any)=>void){
  this.socket.on('start',(data:any)=>{
callback(data);
  });
  }

  Start(id:string){
    this.socket.emit('starti',id);
  }

  Setdeck(id:string,deck:any,turn:string,user:string){
    this.socket.emit('setdeck',id,deck,turn,user);
  }

  onsetdeck(callback:(player:any,turn:string,val:any)=>void){
    this.socket.on('seted',(player:any,turn:string,val:any)=>{
      callback(player,turn,val);
    });
  }

  getdeck(id:string,user:string,turn:string){
    setTimeout(() => {
          this.socket.emit('getd',id,user,turn);
    this.socket.emit('turni',id,turn);
    }, 2000);
  }

  setturn(id:string,turn:string){
    this.socket.emit('turni',id,turn);
  }

  Makemove(id:string,user:string,next:string,moved:any,num:number){
this.socket.emit('mademove',id,user,next,moved,num);
  }
  onMakemove(callback:(id:string,useri:string,user:any,moves:any,next:string,num:number)=>void){
    this.socket.on('mademv',(id:string,useri:string,user:any,moves:any,next:string,num:number)=>{
      callback(id,useri,user,moves,next,num);
    });
  }

  setnewdeck(id:string,arr:number,user:string,us:string){
this.socket.emit('setnewd',id,arr,user,us);
  }
  setnewdecks(id:string,arr:number,user:string){
this.socket.emit('setneww',id,arr,user);
  }
  onsetnewdeck(callback:(id:string,play:any,num:number,us:string)=>void){
    this.socket.on('setnew',(id:string,play:any,num:number,us:string)=>{
      callback(id,play,num,us);
    });
  }
  onsetnewdecks(callback:(id:string,arr:number,user:string)=>void){
    this.socket.on('setebi',(id:string,arr:number,user:string)=>{
      callback(id,arr,user);
    });
  }

  onwashale(callback:()=>void){
    this.socket.on('washale',()=>{
      callback();
    });
  }

  Moigo(id:string,winner:string,points:number,point:number){
    this.socket.emit('mogeba',id,winner,points,point);
  }
  onMoigo(callback:(winner:string,points:number,point:number)=>void){
    this.socket.on('moige',(winner:string,points:number,point:number)=>{
      callback(winner,points,point);
    });
  }

  gaadava(id:string,user:string,enemy1:string,enemy2:string,x:string){console.log('wavida1');
    this.socket.emit('gadaveba',id,user,enemy1,enemy2,x);
  }
  ongaadava(callback:(user:string,enemy1:string,enemy2:string,x:string)=>void){
    this.socket.on('gaadava',(user:string,enemy1:string,enemy2:string,x:string)=>{console.log('movida2');
      callback(user,enemy1,enemy2,x);
    });
  }
  tanxmoba(id:string,user:string,ans:string,count:number){
    this.socket.emit('tanxmoba',id,user,ans,count);
  }
  ontanxmoba(callback:(user:string,ans:string,count:number)=>void){
    this.socket.on('datanxmda',(user:string,ans:string,count:number)=>{
      callback(user,ans,count);
    });
  }

  winner(id:string,team:number,enemy:number,user:string,po:number){
    this.socket.emit('won',id,team,enemy,user,po);
  }

  onwinner(callback:(team:number,enemy:number,user:string,po:number)=>void){
    this.socket.on('woni',(team:number,enemy:number,user:string,po:number)=>{
      callback(team,enemy,user,po);
    });
  }

  winni(id:string,winner:string,points:number){
    this.socket.emit('winni',id,winner,points);
  }
  onwinni(callback:(win:string,po:number)=>void){
    this.socket.on('winns',(win:string,po:number)=>{
      callback(win,po);
    });
  }

  wini(id:string,winner:string,teampoint:number,enemypoint:number){
    this.socket.emit('wiwio',id,winner,teampoint,enemypoint);
  }
  onwini(callback:(winner:string,team:number,enemy:number)=>void){
    this.socket.on('wiwi1',(winner:string,team:number,enemy:number)=>{
      callback(winner,team,enemy);
    });
  }
  numbi(id:string,user:string){
    this.socket.emit('setnu',id,user);
  }
  onnumbi(callback:(user:string)=>void){
    this.socket.on('ss',(user:string)=>{
      callback(user);
    });
  }

  qeni(id:string){
    this.socket.emit('qeni',id);console.log('qna');
  }
  onqeni(callback:(id:string)=>void){
    this.socket.on('qna',(id:string)=>{console.log('moqna');
      callback(id);
    });
  }
  chasvi(id:string,user:string,kids:any){console.log('chasva');
    this.socket.emit('sds',id,user,kids);
  }
  onchasvi(callback:(id:string,user:string,kids:any)=>void){
    this.socket.on('dsd',(id:string,user:string,kids:any)=>{console.log('chaisva');
      callback(id,user,kids);
    });
  }
}