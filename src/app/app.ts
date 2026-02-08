import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  AfterViewChecked,
  ViewChild,
  Renderer2,
  Inject,
  PLATFORM_ID,
  viewChild,
  ɵDeferBlockBehavior,
  QueryList,
  ViewChildren,
  ɵinternalProvideZoneChangeDetection
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { SocketService } from './services/service';
import { ChangeDetectorRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { elementAt, EmptyError, filter, identity, repeat, Subject, windowToggle } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Title } from '@angular/platform-browser';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {validations} from './functions/formvalidation';
import {Cards} from './functions/Cardsfuntions';
import {Functions} from './functions/function';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})

export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
   constructor(
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    private socket: SocketService,
    private elRef: ElementRef,
    private zone: NgZone,
    private http: HttpClient,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: Object  
  ) {}

  userr='';
  passwd='';

  username='';
  password='';
  email='';

  ID='';

  selectedCards: string[] = [];

  val = 'player';
  Turn:any;

  tr1=false;
  tr2=false;
  tr3=true;

  roompass='';

  Made=0;

  turni='';

  numbi=0;
  qeni=0;

  Teammate = '';

  Enemy1='';
  Enemy2='';

  tra1='';
  tra2='';

  players:string[]=[];

  playerss: Record<string, string[]> = {};

 
  Cardss = [
  '6_of_clubs.png',
  '7_of_clubs.png',
  '8_of_clubs.png',
  '9_of_clubs.png',
  '10_of_clubs.png',
  'jack_of_clubs.png',
  'queen_of_clubs.png',
  'king_of_clubs.png',
  'ace_of_clubs.png',

  '6_of_diamonds.png',
  '7_of_diamonds.png',
  '8_of_diamonds.png',
  '9_of_diamonds.png',
  '10_of_diamonds.png',
  'jack_of_diamonds.png',
  'queen_of_diamonds.png',
  'king_of_diamonds.png',
  'ace_of_diamonds.png',

  '6_of_hearts.png',
  '7_of_hearts.png',
  '8_of_hearts.png',
  '9_of_hearts.png',
  '10_of_hearts.png',
  'jack_of_hearts.png',
  'queen_of_hearts.png',
  'king_of_hearts.png',
  'ace_of_hearts.png',

  '6_of_spades.png',
  '7_of_spades.png',
  '8_of_spades.png',
  '9_of_spades.png',
  '10_of_spades.png',
  'jack_of_spades.png',
  'queen_of_spades.png',
  'king_of_spades.png',
  'ace_of_spades.png'
];

Deck:String[] = [];

Moves=[];

Trump='';

Teampoints=0;
Enemypoints=0;

Totalteampoints = 0;
Totalenemypoints = 0;

pid='';
opid='';

lead = '';

yescount=0;

mtqmeli='';

pointX=1;

  //divs

  @ViewChild('signin') signin!: ElementRef<HTMLDivElement>
  @ViewChild('signup') signup!: ElementRef<HTMLDivElement>
  @ViewChild('kutxe1') kutxe1!: ElementRef<HTMLDivElement>
  @ViewChild('kutxe2') kutxe2!: ElementRef<HTMLDivElement>
  @ViewChild('kutxe3') kutxe3!: ElementRef<HTMLDivElement>
  @ViewChild('Opt1') Opt1!: ElementRef<HTMLDivElement>
  @ViewChild('Opt2') Opt2!: ElementRef<HTMLDivElement>
  @ViewChild('Opt3') Opt3!: ElementRef<HTMLDivElement>
  @ViewChild('img1') img1!: ElementRef<HTMLDivElement>
  @ViewChild('img2') img2!: ElementRef<HTMLDivElement>
  @ViewChild('img3') img3!: ElementRef<HTMLDivElement>
  @ViewChild('Createcon') Createcon!: ElementRef<HTMLDivElement>
  @ViewChild('Create') Create!: ElementRef<HTMLDivElement>
  @ViewChild('Room') Room!: ElementRef<HTMLDivElement>
  @ViewChild('Chemikarti') Chemikarti!: ElementRef<HTMLDivElement>
  @ViewChild('Sakartze4') Sakartze4!: ElementRef<HTMLDivElement>
  @ViewChild('Sakartze3') Sakartze3!: ElementRef<HTMLDivElement>
  @ViewChild('Sakartze2') Sakartze2!: ElementRef<HTMLDivElement>
  @ViewChild('Sakartze1') Sakartze1!: ElementRef<HTMLDivElement>
  @ViewChild('Header') Header!: ElementRef<HTMLDivElement>
  @ViewChild('Options') Options!: ElementRef<HTMLDivElement>
  @ViewChild('container') container!: ElementRef<HTMLDivElement>
  @ViewChild('Detail3') Detail3!: ElementRef<HTMLDivElement>
  @ViewChild('Detail4') Detail4!: ElementRef<HTMLDivElement>
  @ViewChild('Pairid') Pairid!: ElementRef<HTMLDivElement>
  @ViewChild('Opponentsid') Opponentsid!: ElementRef<HTMLDivElement>
  @ViewChild('Link1') Link1!: ElementRef<HTMLDivElement>
  @ViewChild('Link2') Link2!: ElementRef<HTMLDivElement>
  @ViewChild('Player11') Player11!: ElementRef<HTMLDivElement>
  @ViewChild('Player22') Player22!: ElementRef<HTMLDivElement>
  @ViewChild('Player33') Player33!: ElementRef<HTMLDivElement>
  @ViewChild('Player44') Player44!: ElementRef<HTMLDivElement>
  @ViewChild('Playground') Playground!: ElementRef<HTMLDivElement>
  @ViewChild('krk3') krk3!: ElementRef<HTMLDivElement>
  @ViewChild('kartdeck') kartdeck!: ElementRef<HTMLDivElement>
  @ViewChild('yesno') yesno!: ElementRef<HTMLDivElement>
  @ViewChild('butiks') butiks!: ElementRef<HTMLDivElement>
  @ViewChild('wintable') wintable!: ElementRef<HTMLDivElement>
  @ViewChild('devi1') devi1!: ElementRef<HTMLDivElement>
  @ViewChild('devi3') devi3!: ElementRef<HTMLDivElement>
  @ViewChild('div5') div5!: ElementRef<HTMLDivElement>


  //validations

  @ViewChild('valid1') valid1!: ElementRef<HTMLParagraphElement>
  @ViewChild('valid2') valid2!: ElementRef<HTMLParagraphElement>
  @ViewChild('valid3') valid3!: ElementRef<HTMLParagraphElement>
  @ViewChild('valid4') valid4!: ElementRef<HTMLParagraphElement>
  @ViewChild('valid5') valid5!: ElementRef<HTMLParagraphElement>
  @ViewChild('valid6') valid6!: ElementRef<HTMLParagraphElement>
  
 //inputs

  @ViewChild('Username') Username!: ElementRef<HTMLInputElement>
  @ViewChild('Password') Password!: ElementRef<HTMLInputElement>
  @ViewChild('Email') Email!: ElementRef<HTMLInputElement>
  @ViewChild('User') User!: ElementRef<HTMLInputElement>
  @ViewChild('Pass') Pass!: ElementRef<HTMLInputElement>

  //buttons

  @ViewChild('joinbt') joinbt!:ElementRef<HTMLButtonElement>
  @ViewChild('crtroom') crtroom!:ElementRef<HTMLButtonElement>
  @ViewChild('button1') button1!:ElementRef<HTMLButtonElement>
  @ViewChild('button11') button11!:ElementRef<HTMLButtonElement>
  @ViewChild('button2') button2!:ElementRef<HTMLButtonElement>
  @ViewChild('button3') button3!:ElementRef<HTMLButtonElement>
  @ViewChild('showpass') showpass!:ElementRef<HTMLButtonElement>
  @ViewChild('showpas') showpas!:ElementRef<HTMLButtonElement>

  //pharags

  @ViewChild('name1') name1!: ElementRef<HTMLParagraphElement>
  @ViewChild('name2') name2!: ElementRef<HTMLParagraphElement>
  @ViewChild('name3') name3!: ElementRef<HTMLParagraphElement>
  @ViewChild('name4') name4!: ElementRef<HTMLParagraphElement>
  @ViewChild('Name1') Name1!: ElementRef<HTMLParagraphElement>
  @ViewChild('Name2') Name2!: ElementRef<HTMLParagraphElement>
  @ViewChild('Name3') Name3!: ElementRef<HTMLParagraphElement>
  @ViewChild('Name4') Name4!: ElementRef<HTMLParagraphElement>
  @ViewChild('Usname') Usname!: ElementRef<HTMLParagraphElement>
  @ViewChild('point1') point1!: ElementRef<HTMLParagraphElement>
  @ViewChild('point2') point2!: ElementRef<HTMLParagraphElement>
  @ViewChild('sadav') sadav!: ElementRef<HTMLParagraphElement>
  @ViewChild('sadava') sadava!: ElementRef<HTMLParagraphElement>
  @ViewChild('p11') p11!: ElementRef<HTMLParagraphElement>
  @ViewChild('p22') p22!: ElementRef<HTMLParagraphElement>
  @ViewChild('sadeve1') sadeve1!: ElementRef<HTMLParagraphElement>
  @ViewChild('sadeve2') sadeve2!: ElementRef<HTMLParagraphElement>
  @ViewChild('udri') udri!: ElementRef<HTMLParagraphElement>

  ngOnInit() {

    this.socket.onregister((resp)=>{

      if(resp.includes('a')){
        this.valid3.nativeElement.textContent='* Username is taken!';
      }
      if(resp.includes('b')){
        this.valid4.nativeElement.textContent='* Email is taken!';
      }
      if(resp===''){
        this.valid5.nativeElement.style.color='rgb(2, 51, 2)';
        this.valid5.nativeElement.textContent='* Successfully registered!'
        setTimeout(() => {
          this.valid5.nativeElement.style.color='red';
          this.signup.nativeElement.style.display='none';
          this.signin.nativeElement.style.display='flex';
        }, 2000);
      }

      setTimeout(() => {
        this.valid3.nativeElement.textContent='';
        this.valid4.nativeElement.textContent='';
        this.valid5.nativeElement.textContent='';
      }, 2500);

    });

    this.socket.onsignin((resp)=>{

      if(resp==='ab'){
        this.valid1.nativeElement.textContent='* Wrong username!';
        this.valid2.nativeElement.textContent='* Wrong password!';
      }
      if(resp==='a'){
        this.valid1.nativeElement.textContent='* Wrong username!';
      }
      if(resp==='b'){
        this.valid2.nativeElement.textContent='* Wrong user password!';
      }
      if(resp===''){
        setTimeout(() => {
        this.signin.nativeElement.style.display='none';
        this.Header.nativeElement.style.display='flex';
        this.Options.nativeElement.style.display='flex';
        this.Create.nativeElement.style.display='flex';
        this.Createcon.nativeElement.style.display='flex';
        this.renderer.removeClass(this.container.nativeElement,'align');
        this.Usname.nativeElement.textContent=this.userr;
        }, 1000);
      }

      setTimeout(() => {
        this.valid1.nativeElement.textContent='';
        this.valid2.nativeElement.textContent='';
      }, 2500);

    });

    this.socket.onCreateroom((ha)=>{

    this.Createcon.nativeElement.style.alignItems='stretch';
    this.Create.nativeElement.style.display='none';
    this.Room.nativeElement.style.display='flex';

    this.crtroom.nativeElement.disabled=false;

    this.Loadroom(ha.Pairid);

    this.ID=ha.Pairid;

    });

    this.socket.onJoinroom((resp)=>{
      if(resp==='full'){
        this.valid6.nativeElement.textContent='* Room is full!';
      }
      if(resp==='none'){
        this.valid6.nativeElement.textContent='* Wrong room id!';
      }
      if(resp!=='none' && resp!=='full'){
        this.Loadroom(resp);
        this.ID=resp;
        this.pid = resp;
    this.Createcon.nativeElement.style.alignItems='stretch';
    this.Create.nativeElement.style.display='none';
    this.Room.nativeElement.style.display='flex';
      }
      setTimeout(() => {
        this.valid6.nativeElement.textContent='';
        this.joinbt.nativeElement.disabled=false;
      }, 2500);
    });

    this.socket.onLoadroom((info)=>{

      if(info.Player1){
        this.Player11.nativeElement.style.backgroundImage = `url('assets/images/account.png')`;
        this.Player11.nativeElement.style.border = '2px solid black';
        this.Player11.nativeElement.style.backgroundSize = 'cover';
        this.name1.nativeElement.textContent=info.Player1;
        this.name1.nativeElement.style.display='flex';
      }
      else{
        this.Player11.nativeElement.style.backgroundImage = `url('assets/images/B.png')`;
        this.Player11.nativeElement.style.border = '2px solid rgb(1, 72, 1)';
        this.Player11.nativeElement.style.backgroundSize = '190% auto';
        this.name1.nativeElement.textContent='';
        this.name1.nativeElement.style.display='none';
        
      }
      if(info.Player2){
        this.Player22.nativeElement.style.backgroundImage = `url('assets/images/account.png')`;
        this.Player22.nativeElement.style.border = '2px solid black';
        this.Player22.nativeElement.style.backgroundSize = 'cover';
        this.name2.nativeElement.textContent=info.Player2;
        this.name2.nativeElement.style.display='flex';
      }
      else{
        this.Player22.nativeElement.style.backgroundImage = `url('assets/images/B.png')`;
        this.Player22.nativeElement.style.border = '2px solid rgb(1, 72, 1)';
        this.Player22.nativeElement.style.backgroundSize = '190% auto';
        this.name2.nativeElement.textContent='';
        this.name2.nativeElement.style.display='flex';
      }
      if(info.Player3){
        this.Player33.nativeElement.style.backgroundImage = `url('assets/images/account.png')`;
        this.Player33.nativeElement.style.border = '2px solid black';
        this.Player33.nativeElement.style.backgroundSize = 'cover';
        this.name3.nativeElement.textContent=info.Player3;
        this.name3.nativeElement.style.display='flex';
      }
      else{
        this.Player33.nativeElement.style.backgroundImage = `url('assets/images/B.png')`;
        this.Player33.nativeElement.style.border = '2px solid rgb(1, 72, 1)';
        this.Player33.nativeElement.style.backgroundSize = '190% auto';
        this.name3.nativeElement.textContent='';
        this.name3.nativeElement.style.display='flex';
      }
      if(info.Player4){
        this.Player44.nativeElement.style.backgroundImage = `url('assets/images/account.png')`;
        this.Player44.nativeElement.style.border = '2px solid black';
        this.Player44.nativeElement.style.backgroundSize = 'cover';
        this.name4.nativeElement.textContent=info.Player4;
        this.name4.nativeElement.style.display='flex';
      }
      else{
        this.Player44.nativeElement.style.backgroundImage = `url('assets/images/B.png')`;
        this.Player44.nativeElement.style.border = '2px solid rgb(1, 72, 1)';
        this.Player44.nativeElement.style.backgroundSize = '190% auto';
        this.name4.nativeElement.textContent='';
        this.name4.nativeElement.style.display='flex';
      }

      this.Pairid.nativeElement.textContent=info.Pairid;

      if(info.Player1===this.userr){
        this.Detail3.nativeElement.style.display='flex';
        this.Detail4.nativeElement.style.display='flex';
        this.Opponentsid.nativeElement.textContent=info.Opponentid;
      }

    });

    this.socket.onStargame((data)=>{

      this.Createcon.nativeElement.style.display='none';
      this.Header.nativeElement.style.display='none';
      this.Options.nativeElement.style.display='none';
      this.Playground.nativeElement.style.display='flex';

      this.Name1.nativeElement.style.display='flex';
      this.Name2.nativeElement.style.display='flex';
      this.Name3.nativeElement.style.display='flex';
      this.Name4.nativeElement.style.display='flex';


      if(data.Player1===this.userr){
        
        this.Name3.nativeElement.textContent=data.Player1;
        this.Name1.nativeElement.textContent=data.Player2;
        this.Name2.nativeElement.textContent=data.Player3;
        this.Name4.nativeElement.textContent=data.Player4;

        this.Teammate = data.Player3;

        this.Enemy1 = data.Player4;
        this.Enemy2 = data.Player2;
      }

      if(data.Player2===this.userr){
        this.Name3.nativeElement.textContent=data.Player2;
        this.Name1.nativeElement.textContent=data.Player3;
        this.Name2.nativeElement.textContent=data.Player4;
        this.Name4.nativeElement.textContent=data.Player1;

        this.Teammate = data.Player4;

        this.Enemy1 = data.Player1;
        this.Enemy2 = data.Player3;
      }
      if(data.Player3===this.userr){
        this.Name3.nativeElement.textContent=data.Player3;
        this.Name1.nativeElement.textContent=data.Player4;
        this.Name2.nativeElement.textContent=data.Player1;
        this.Name4.nativeElement.textContent=data.Player2;

        this.Teammate = data.Player1;

        this.Enemy1 = data.Player2;
        this.Enemy2 = data.Player4;
      }
      if(data.Player4===this.userr){
        this.Name3.nativeElement.textContent=data.Player4;
        this.Name1.nativeElement.textContent=data.Player1;
        this.Name2.nativeElement.textContent=data.Player2;
        this.Name4.nativeElement.textContent=data.Player3;

        this.Teammate = data.Player2;

        this.Enemy1 = data.Player3;
        this.Enemy2 = data.Player1;
      }

      this.players[0]=data.Player1;
      this.players[1]=data.Player2;
      this.players[2]=data.Player3;
      this.players[3]=data.Player4;

      this.playerss[data.Player1]=[];
      this.playerss[data.Player2]=[];
      this.playerss[data.Player3]=[];
      this.playerss[data.Player4]=[];

      const turn = Cards.Getturn(this.Turn??"",this.players);
      setTimeout(() => {
        this.socket.getdeck(data.Pairid,this.userr,turn);
      }, 100);
      
      this.ID=data.Pairid;

    });

    this.socket.noStart((id)=>{
      if(id){ 
        this.Setdeck(id ?? this.ID);
      this.ID=id;}
this.socket.Start(this.ID ?? id);
    });
    
    this.socket.onwashale(()=>{

      setTimeout(() => {
              this.kartdeck.nativeElement.style.display='none';
      }, 1500);

    });

    this.socket.onsetdeck((player,turn,val)=>{  
      
      this.krk3.nativeElement.style.backgroundImage=`url(assets/images/${val})`;

      const a = String(val).split('_');
      const b = a[2].split('.');

      this.Trump = b[0];

      this.kartdeck.nativeElement.style.display='flex';

    this.Shufflecards(player,turn,0,0,5,true);
    });

    this.socket.onqeni((id)=>{
      const arr=[];
      const kids = this.Chemikarti.nativeElement.children;
      if(kids.length!=0){    
        for(let j=0;j<kids.length;j++){
          const kid = kids[j] as HTMLElement;
          arr.push(kid.style.backgroundImage);
        }
      }   
      this.socket.chasvi(id,this.userr,arr);
      this.Chemikarti.nativeElement.innerHTML='';
    });

    this.socket.onchasvi((id,user,kids)=>{

           for(let j=0;j<kids.length;j++){

      const car : HTMLDivElement = document.createElement('div');

      const move = kids[j];
      const useri=user;
   
      car.style.backgroundImage=`${move}`;console.log(move);

       if(useri===this.Name3.nativeElement.textContent){
              this.renderer.addClass(car,'cards');
        this.Sakartze3.nativeElement.appendChild(car);
       }
       if(useri===this.Name1.nativeElement.textContent){ 
              this.renderer.addClass(car,'cardss'); 
        car.style.rotate='90deg';
        this.Sakartze1.nativeElement.appendChild(car);
       }
       if(useri===this.Name2.nativeElement.textContent){
              this.renderer.addClass(car,'cards');
        this.Sakartze2.nativeElement.appendChild(car);
       }
       if(useri===this.Name4.nativeElement.textContent){
              this.renderer.addClass(car,'cardss');
        car.style.rotate='-90deg';
        this.Sakartze4.nativeElement.appendChild(car);
       }
     }

    });

    this.socket.onMakemove((id,useri,user,move,next,num)=>{

      this.Made=num;

      const audio = new Audio('assets/images/tore-the-map.mp3');
      audio.currentTime=0.05;
      audio.play();

      if(move.length==5 && this.numbi!=5 && this.qeni==0){
        this.lead=useri;
        this.numbi=5;
        this.qeni++;
      }
      
        for(let j=0;j<move.length;j++){

      const car : HTMLDivElement = document.createElement('div');
   
      car.style.backgroundImage=`${move[j]}`;console.log(move[j]);

       if(useri===this.Name3.nativeElement.textContent){
              this.renderer.addClass(car,'cards');
        this.Sakartze3.nativeElement.appendChild(car);
       }
       if(useri===this.Name1.nativeElement.textContent){ 
              this.renderer.addClass(car,'cardss'); 
        car.style.rotate='90deg';
        this.Sakartze1.nativeElement.appendChild(car);
       }
       if(useri===this.Name2.nativeElement.textContent){
              this.renderer.addClass(car,'cards');
        this.Sakartze2.nativeElement.appendChild(car);
       }
       if(useri===this.Name4.nativeElement.textContent){
              this.renderer.addClass(car,'cardss');
        car.style.rotate='-90deg';
        this.Sakartze4.nativeElement.appendChild(car);
       }
     }console.log(this.Made,"amdenia");
     if(this.Made==4){

      this.button11.nativeElement.disabled=false;
    

      if(useri===this.userr){
        const a = this.Sakartze1.nativeElement.children;
        for(let j=0;j<a.length;j++){
          const child = a[j] as HTMLElement;
          this.playerss[this.Name1.nativeElement.textContent!].push(child.style.backgroundImage);
        }
        const b = this.Sakartze2.nativeElement.children;
        for(let j=0;j<b.length;j++){
          const child = b[j] as HTMLElement;
          this.playerss[this.Name2.nativeElement.textContent!].push(child.style.backgroundImage);
        }
        const c = this.Sakartze3.nativeElement.children;
        for(let j=0;j<c.length;j++){
          const child = c[j] as HTMLElement;
          this.playerss[this.Name3.nativeElement.textContent!].push(child.style.backgroundImage);
        }
        const d = this.Sakartze4.nativeElement.children;
        for(let j=0;j<d.length;j++){
          const child = d[j] as HTMLElement;
          this.playerss[this.Name4.nativeElement.textContent!].push(child.style.backgroundImage);
        }

       const result = Cards.Checkcards(
  this.playerss,
  this.players.map(p => p.toString()),
  this.lead.toString(),
  this.Trump
);

this.socket.Moigo(this.ID,result.winner,Number(result.totalPoints),this.pointX);

Object.keys(this.playerss).forEach(key => {
  this.playerss[key] = [];
});

let io='';
const randomi = Math.random() < 0.5 ? 1 : 2;

if(result.winner===this.Teammate || result.winner===this.userr){

  if(randomi==1){
    io=result.winner;
  }
  else{
    io=result.winner;
  }
}
else{

  if(randomi==1){
    io=result.winner;
  }
  else{
    io=result.winner;
  }

}
      this.socket.setnewdecks(this.ID,this.numbi,io);
      this.Made=0;
      this.numbi=0;
      this.qeni=0;
}
     }   
     else{ 
      this.numbi=move.length;
     this.Shufflecards('',next+"2",0,move.length,0,false);
     }

    });
    this.socket.onsetnewdecks((id,arr,user)=>{console.log('haai');
      setTimeout(() => {
      this.Sakartze1.nativeElement.innerHTML='';
      this.Sakartze2.nativeElement.innerHTML='';
      this.Sakartze3.nativeElement.innerHTML='';
      this.Sakartze4.nativeElement.innerHTML='';
      }, 1200);

      this.socket.setnewdeck(id,arr,this.userr,user);
      this.numbi=0;
      this.Made=0;
    });
    this.socket.onsetnewdeck((id,player,num,nu)=>{
      player.forEach((element:any) => {
        console.log(element);
      });

      this.Shufflecards(player,nu+'1',0,0,num,true);
      this.div5.nativeElement.textContent=nu+" "+"turn!";
      if(nu===this.userr){
        this.div5.nativeElement.style.color='rgb(0, 149, 0)';
      }
      else{
        this.div5.nativeElement.style.color='wheat';
      }
    });

    this.socket.onMoigo((winner,points,point)=>{console.log(winner,points,'meee')


      if(winner===this.Teammate || winner===this.userr){
        this.Totalteampoints+=points;
      }
      else{
        this.Totalenemypoints+=points;
      }

      console.log(this.Totalteampoints,this.Totalenemypoints);

   if(this.Chemikarti.nativeElement.innerHTML==='' && this.kartdeck.nativeElement.style.display==='none'){
        if(winner===this.userr){
          console.log(this.Totalteampoints,this.Totalenemypoints,'asd');
          this.socket.winner(this.ID,this.Totalteampoints,this.Totalenemypoints,winner,this.pointX);
        }
      }
      
    
    });

    this.socket.onwini((win,te,en)=>{

      setTimeout(() => {

      this.wintable.nativeElement.style.display='flex';

                const elements = document.getElementsByClassName('Divs'); 

for (let i = 0; i < elements.length; i++) {
  const el = elements[i] as HTMLElement; 
  el.style.opacity='0.6';
  el.style.pointerEvents='none';
}

      }, 1600);


      if(this.userr===win || this.Teammate===win){

        this.devi1.nativeElement.textContent=String(en);
        this.devi3.nativeElement.textContent=String(te);

        this.sadeve1.nativeElement.textContent=this.userr;
        this.sadeve2.nativeElement.textContent=this.Teammate;
        this.sadeve1.nativeElement.style.color='rgb(105, 173, 3)';
        this.sadeve2.nativeElement.style.color='rgb(105, 173, 3)';


      }
      else{

        this.devi1.nativeElement.textContent=String(en);
        this.devi3.nativeElement.textContent=String(te);

        this.sadeve1.nativeElement.textContent=this.Enemy1;
        this.sadeve2.nativeElement.textContent=this.Enemy2;
        this.sadeve1.nativeElement.style.color='red';
        this.sadeve2.nativeElement.style.color='red';

      }

    });

    this.socket.onwinner((team,enemy,usi,po)=>{

      let ti=0;
      let en=0;

      if(this.userr===usi || usi===this.Teammate){
        ti=team;
        en=enemy;
      }
      else{
        ti=enemy;
        en=team;
      }

      if(ti>en){
        this.Teampoints+=po;

        if(this.Teampoints>=11){

if(this.userr===usi){
  this.socket.wini(this.ID,usi,this.Teampoints,this.Enemypoints);
}
        }

      }
      else{
        this.Enemypoints+=po;
        if(this.Enemypoints>=11){
if(this.userr===usi){
  this.socket.wini(this.ID,usi,this.Teampoints,this.Enemypoints);
}
        }
      }

      setTimeout(() => {
        this.Setdeck(this.ID);
      }, 100);
      
      setTimeout(() => {
      this.point1.nativeElement.textContent=String(this.Enemypoints);
      this.point2.nativeElement.textContent=String(this.Teampoints);
      this.pointX=1;
      this.socket.getdeck(this.ID,this.userr,usi);
      this.Totalenemypoints=0;
      this.Totalteampoints=0;
                  this.yescount=0;

                  const elements = document.getElementsByClassName('Divs'); 

for (let i = 0; i < elements.length; i++) {
  const el = elements[i] as HTMLElement; 
  el.style.opacity='1';
  el.style.pointerEvents='auto';
}
      }, 1200);

this.button11.nativeElement.style.pointerEvents='auto';
this.button11.nativeElement.style.opacity='1';
this.button11.nativeElement.textContent='2x';
    });

    this.socket.onwinni((winner,point)=>{

      if(winner===this.userr || winner===this.Teammate){
        this.Teampoints+=point;

        if(this.Teampoints>=11){

          if(this.userr===winner){
  this.socket.wini(this.ID,winner,this.Teampoints,this.Enemypoints);
}
      }
      }
      else{
        this.Enemypoints+=point;

                if(this.Enemypoints>=11){

if(this.userr===winner){
  this.socket.wini(this.ID,winner,this.Teampoints,this.Enemypoints);
}
                }
      }

      this.Setdeck(this.ID);

      setTimeout(() => {
      this.point1.nativeElement.textContent=String(this.Enemypoints);
      this.point2.nativeElement.textContent=String(this.Teampoints);
      this.pointX=1;
      this.socket.getdeck(this.ID,this.userr,winner);
      this.Totalenemypoints=0;
      this.Totalteampoints=0;
      this.yesno.nativeElement.style.display='none';
      this.p11.nativeElement.textContent='';
this.p22.nativeElement.textContent='';
      const elements = document.getElementsByClassName('Divs'); 

for (let i = 0; i < elements.length; i++) {
  const el = elements[i] as HTMLElement; 
  el.style.opacity='1';
  el.style.pointerEvents='auto';
}
this.button11.nativeElement.style.opacity='1';
this.button11.nativeElement.style.pointerEvents='auto';
      }, 1200);

      this.button11.nativeElement.style.pointerEvents='auto';
      this.button11.nativeElement.style.opacity='1';
      this.button11.nativeElement.textContent='2x';

    });

    this.socket.ongaadava((user,enemy1,enemy2,x)=>{

      this.yesno.nativeElement.style.display='flex';

      this.tra1=enemy1;
      this.tra2=enemy2;

      this.mtqmeli=user;

      if(this.userr!==enemy1 && this.userr!==enemy2){
        this.button2.nativeElement.style.opacity='0';
        this.button3.nativeElement.style.opacity='0';
        this.butiks.nativeElement.style.pointerEvents='none';
      }
      else{
        this.button2.nativeElement.style.opacity='1';
        this.button3.nativeElement.style.opacity='1';        
        this.butiks.nativeElement.style.pointerEvents='auto';
      }

      this.sadav.nativeElement.textContent=user;
      this.sadava.nativeElement.textContent=x+'?';

      const elements = document.getElementsByClassName('Divs'); 
console.log(elements.length);

for (let i = 0; i < elements.length; i++) {
  const el = elements[i] as HTMLElement; 
  el.style.opacity='0.6';
  el.style.pointerEvents='none';
}

    });
    
    this.socket.ontanxmoba((user,ans,cnt)=>{

      this.yescount=cnt;

      if(ans==='yes'){
        if(!this.p11.nativeElement.textContent){
          this.p11.nativeElement.textContent=user;
          this.p11.nativeElement.style.color='green';
        }
        else{
          this.p22.nativeElement.textContent=user;
          this.p22.nativeElement.style.color='green';
        }
        this.yescount++;
      }
      else{
          if(!this.p11.nativeElement.textContent){
          this.p11.nativeElement.textContent=user;
          this.p11.nativeElement.style.color='red';
        }
        else{
          this.p22.nativeElement.textContent=user;
          this.p22.nativeElement.style.color='red';
        }
      }

      if(this.p11.nativeElement.textContent && this.p22.nativeElement.textContent){
        if(this.yescount==2){
          setTimeout(() => {
            const val = this.button11.nativeElement.textContent;
            if(val==='2x'){
              this.button11.nativeElement.textContent='3x';
              this.pointX=2;
            }
            if(val==='3x'){
              this.button11.nativeElement.textContent='4x';
              this.pointX=3;
            }
            if(val==='4x'){
              this.button11.nativeElement.textContent='5x';
              this.pointX=4;
            }
            if(val==='5x'){
              this.button11.nativeElement.textContent='6x';
              this.pointX=5;
            }
            if(val==='6x'){
              this.button11.nativeElement.textContent='Max';
              this.pointX=6;
              this.button11.nativeElement.style.pointerEvents='none';
              this.button11.nativeElement.style.opacity='0.55';
            }

            this.yescount=0;

                  const elements = document.getElementsByClassName('Divs'); 

for (let i = 0; i < elements.length; i++) {
  const el = elements[i] as HTMLElement; 
  el.style.opacity='1';
  el.style.pointerEvents='auto';
}
this.yesno.nativeElement.style.display='none';
this.p11.nativeElement.textContent='';
this.p22.nativeElement.textContent='';
            
          }, 1200);
        }
        else{

          this.yescount=0;

          this.Chemikarti.nativeElement.innerHTML='';

          if(this.userr===this.mtqmeli){

          this.socket.winni(this.ID,this.userr,this.pointX);

          this.button11.nativeElement.textContent='2x';

          this.pointX=1;

          }

        }

        if(this.userr===this.tra1 || this.userr===this.tra2){
          this.button11.nativeElement.style.opacity='1';
        this.button11.nativeElement.style.pointerEvents='auto';
        }
        else{
        this.button11.nativeElement.style.opacity='0.5';
        this.button11.nativeElement.style.pointerEvents='none';
      }


      }

    });

    this.socket.onnumbi((user)=>{
      this.lead=user;
      this.turni=user;
      this.div5.nativeElement.textContent=user+" "+"turn";
    });

}
yes(){

  this.socket.tanxmoba(this.ID,this.userr,'yes',this.yescount);
  
  this.button2.nativeElement.style.opacity='0';
  this.button3.nativeElement.style.opacity='0';
  this.butiks.nativeElement.style.pointerEvents='none';

}
no(){

  this.socket.tanxmoba(this.ID,this.userr,'no',this.yescount);

  this.button2.nativeElement.style.opacity='0';
  this.button3.nativeElement.style.opacity='0';
  this.butiks.nativeElement.style.pointerEvents='none';

}
ngAfterViewInit() {
  this.checkOrientation();
  window.addEventListener('resize', () => this.checkOrientation());
  if (screen.orientation) {
    screen.orientation.addEventListener('change', () => this.checkOrientation());
  }
}

checkOrientation() {
  if (window.innerHeight <= window.innerWidth) {
this.container.nativeElement.style.display='flex';
    document.body.style.backgroundColor='transparent';
  } else {
    this.container.nativeElement.style.display = 'none';
    document.body.style.backgroundColor='black';
    this.udri.nativeElement.textContent='Please rotate your device!';
    this.udri.nativeElement.style.display='flex';
    this.udri.nativeElement.style.color='white';

  }
}

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
 
  registervalidate(){

    let results = validations.Emptyvalid(this.username,this.password,this.email);

    if(results.includes('a')){
      this.valid3.nativeElement.textContent='* Empty username field!';
    }
    
    if(results.includes('b')){
      this.valid5.nativeElement.textContent='* Empty password field!';
    }else if(results.includes('d')){
      this.valid5.nativeElement.textContent='* Password must be at least 8 characters!';
    }
    if(results.includes('c')){
      this.valid4.nativeElement.textContent='* Empty email field!';
    }else if(results.includes('e')){
      this.valid4.nativeElement.textContent='* Wrong email format!';
    }

     setTimeout(() => {
        this.valid3.nativeElement.textContent='';
        this.valid4.nativeElement.textContent='';
        this.valid5.nativeElement.textContent='';
      }, 2500);

      if(results===''){
        this.socket.register(this.username,this.email,this.password);
      }
  }

  signinvalidate(){

    let result = validations.emptyvalid(this.userr,this.passwd);

    if(result.includes('a')){
      this.valid1.nativeElement.textContent='* Empty username field!';
    }
    if(result.includes('b')){
      this.valid2.nativeElement.textContent='* Empty password field!';
    }

    setTimeout(() => {
      this.valid1.nativeElement.textContent='';
      this.valid2.nativeElement.textContent='';
    }, 2500);

    if(result===''){
      this.socket.signin(this.userr,this.passwd);
    }
  }

  choose(e:Event){

    const target = e.target as HTMLElement;

    if(target.textContent==='Closed1'){
      this.kutxe1.nativeElement.style.display='flex';
      this.kutxe2.nativeElement.style.display='none';
      this.kutxe3.nativeElement.style.display='none';
      this.Opt1.nativeElement.style.backgroundColor='black';
      this.Opt1.nativeElement.style.color='white';
      this.Opt2.nativeElement.style.backgroundColor='rgb(98, 97, 97)';
      this.Opt2.nativeElement.style.color='black';
      this.Opt3.nativeElement.style.backgroundColor='rgb(98, 97, 97)';
      this.Opt3.nativeElement.style.color='black';
      this.img3.nativeElement.style.backgroundImage = `url('assets/images/padlock.png')`;
    }
    if(target.textContent==='Closed2'){
      this.kutxe2.nativeElement.style.display='flex';
      this.kutxe1.nativeElement.style.display='none';
      this.kutxe3.nativeElement.style.display='none';
      this.Opt2.nativeElement.style.backgroundColor='black';
      this.Opt2.nativeElement.style.color='white';
      this.Opt3.nativeElement.style.backgroundColor='rgb(98, 97, 97)';
      this.Opt3.nativeElement.style.color='black';
      this.Opt1.nativeElement.style.backgroundColor='rgb(98, 97, 97)';
      this.Opt1.nativeElement.style.color='black';
      this.img3.nativeElement.style.backgroundImage = `url('assets/images/padlock.png')`;
    }
    if(target.textContent==='Room'){
      this.kutxe3.nativeElement.style.display='flex';
      this.kutxe2.nativeElement.style.display='none';
      this.kutxe1.nativeElement.style.display='none';
      this.Opt3.nativeElement.style.backgroundColor='black';
      this.Opt3.nativeElement.style.color='white';
      this.Opt2.nativeElement.style.backgroundColor='rgb(98, 97, 97)';
      this.Opt2.nativeElement.style.color='black';
      this.Opt1.nativeElement.style.backgroundColor='rgb(98, 97, 97)';
      this.Opt1.nativeElement.style.color='black';
this.img3.nativeElement.style.backgroundImage = `url('assets/images/padlockk.png')`;
    }
  }

  Singup(){
    this.signin.nativeElement.style.display='none';
    this.signup.nativeElement.style.display='flex';
  }


  Createroom(){

    const ids = Functions.generateid();

    const pairid = ids[0];
    const opponentid = ids[1]; 

    this.pid=pairid;
    this.opid=opponentid;

    this.socket.Createroom(pairid,opponentid,this.userr);
    this.crtroom.nativeElement.disabled=true;

  }

  copy(){
      navigator.clipboard.writeText(this.pid)
    .then(() => console.log('coppied'))
    .catch(err => console.error(err));
  }
  copyy(){
      navigator.clipboard.writeText(this.opid)
    .then(() => console.log('coppied'))
    .catch(err => console.error(err));
  }

  Leaveroom(){
    this.Createcon.nativeElement.style.alignItems='center';
    this.Create.nativeElement.style.display='flex';
    this.Room.nativeElement.style.display='none';
    this.socket.Leaveroom(this.userr,this.ID);
  }

  Joinroom(){
    if(this.roompass===''){
      this.valid6.nativeElement.textContent='* Empty field';
      setTimeout(() => {
        this.valid6.nativeElement.textContent='';
      }, 2500);
    }
    else{
      this.socket.Joinroom(String(this.roompass),this.userr);
      this.joinbt.nativeElement.disabled=true;
    }
  }

  Loadroom(id:string){
    this.socket.Loadroom(id);
  }

  //---------------------------------//

  Setdeck(id:string){
    this.Deck = Cards.shuffle(this.Cardss);
    const turn = '';
    this.socket.Setdeck(id,this.Deck,turn,this.userr);
  }

  makenewmove(){

  }

  Shufflecards(player:any,turn:string,move:number,numb:number,numbcards:number,doit:boolean){ 

    console.log(turn);

    let turni='';

    for(let j=0;j<turn.length-1;j++){
      turni+=turn[j];
    }

   
              this.div5.nativeElement.textContent=turni+" "+"turn!";
              this.div5.nativeElement.style.fontWeight='bold';
          if(turni===this.userr){
        this.div5.nativeElement.style.color='rgb(0, 149, 0)';
        if("vibration" in navigator){
          navigator.vibrate(200);
      }
    }
      else{
        this.div5.nativeElement.style.color='wheat';
      }
      if(turni!==this.userr){
        this.button11.nativeElement.disabled=true;
      }
      else{
        this.button11.nativeElement.disabled=false;
      }    
      
      this.turni=turni;
    if(this.Made==0){
      this.lead=turni;
    }

if(doit){
    for(let j=0;j<numbcards;j++){
      const car : HTMLDivElement = document.createElement('div');

      this.renderer.addClass(car,'cards');

      car.addEventListener('click',()=>{    
        if(car.hasAttribute('id')){
          const idi = car.getAttribute('id');
          this.selectedCards = this.selectedCards.filter(a => a!==idi);
          car.removeAttribute('id');
          car.style.transform='';
          car.style.scale='';
        }
        else{
          if(this.turni===this.userr){
            let u,y,a,b,d,ur;
            if(this.selectedCards[0]){
            let arr:string[]=[String(player[j])];
             a = arr[0].split('_');
             b = a[2].split('.');

             d = document.getElementById(this.selectedCards[0]);
             ur = String(d?.style.backgroundImage);

             y = ur?.split('_');
             u = y![2].split('.');
             console.log(u[0],b[0]);

            }
            if(!u && !b){u='a';b='b'}
            if(u![0]===b![0] && this.selectedCards[0] || !this.selectedCards[0] || this.numbi!=0 && this.selectedCards.length<this.numbi){
            const id = Cards.Random();
            console.log(this.selectedCards.length,this.numbi)
            car.id=id;
            car.style.transform = 'translateY(-10px) scale(1.05)';
            console.log(car.id);
            this.selectedCards.push(id);
        }
      }
      }
    
      });

      car.style.backgroundImage=`url('assets/images/${player[j]}')`;
      this.Chemikarti.nativeElement.appendChild(car);
      }  
    }  
     if(this.selectedCards.length==5){
      this.lead=turni;
     }
  }
  Makemove(){
    if(this.selectedCards.length===this.numbi && this.numbi!=0 || this.numbi==0 || this.selectedCards.length==5){

    let arr=[];
    this.Made++;
    for(let j=0;j<this.selectedCards.length;j++){
      const a = this.selectedCards[j];
      const b = document.getElementById(a);
      arr.push(b?.style.backgroundImage);
      b?.remove();
    }
let next:string='';
    if(this.userr===this.Name3.nativeElement.textContent){
      next = this.Name1.nativeElement.textContent!;
    }
    if(this.userr===this.Name1.nativeElement.textContent){
      next = this.Name2.nativeElement.textContent!;
    }
    if(this.userr===this.Name2.nativeElement.textContent){
      next = this.Name4.nativeElement.textContent!;
    }
    if(this.userr===this.Name4.nativeElement.textContent){
      next = this.Name3.nativeElement.textContent!;
    }
    if(this.Made==4 && this.selectedCards.length==5){
      this.socket.qeni(this.ID);
    }
setTimeout(() => {
      this.socket.Makemove(this.ID,this.userr,next,arr,this.Made);  
      this.selectedCards=[];
}, 300);
  
  }
  }

gadaveba(){
  this.socket.gaadava(this.ID,this.userr,this.Enemy1,this.Enemy2,this.button11.nativeElement.textContent!);
}

showpass1(){
  if(this.Password.nativeElement.type==='password'){
  this.Password.nativeElement.type='text';
  }
  else{
    this.Password.nativeElement.type='password';
  }
}
showpass2(){
  if(this.Pass.nativeElement.type==='password'){
  this.Pass.nativeElement.type='text';
  }
  else{
    this.Pass.nativeElement.type='password';
  }
}
showlog(){
  this.signup.nativeElement.style.display='none';
  this.signin.nativeElement.style.display='flex';
}

  allowOnlyNumberss(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
  if (allowedKeys.indexOf(event.key) !== -1) {
    return; 
  }
  if (!/^[0-9]$/.test(event.key)) {
    event.preventDefault(); 
  }
}

}




