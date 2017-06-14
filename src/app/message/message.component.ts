import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages: FirebaseListObservable<any>;
  login:boolean;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) { 

    afAuth.authState.subscribe(log => {
      if(log) {
        this.login=true;
      } else {
        this.login=false;
      }
    });
    
    this.messages = db.list('/message').map((array) => array.reverse()) as FirebaseListObservable<any[]>;

  }

  ngOnInit() {


  }

}
