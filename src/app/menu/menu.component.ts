import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

  animations: [
    trigger('loading', [
      state('start', style({
        backgroundColor: 'black',
        height: '100vh',
      })),
      state('finish', style({
        height: '150px'
      })),
      transition('start => finish', animate('1000ms ease-in')),
      transition('finish => start', animate('100ms ease-out')),
    ]),
  ]
})
export class MenuComponent implements OnInit {

  state: string = 'finish';
  ready: boolean = false;
  imlogin: boolean;

  constructor(
    afAuth: AngularFireAuth,
  ) {

    afAuth.authState.subscribe(log => {if(log) {this.imlogin=true;} else {this.imlogin=false;}});
   
  }

  ngOnInit() {
  }

  goFinish(){
      this.state = 'finish';
  }

}
