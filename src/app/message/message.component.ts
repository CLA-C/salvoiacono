import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messages: AngularFireList<any>;
  login:boolean;

  constructor(
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
  ) { 


  }

  ngOnInit() {


    this.afAuth.authState.subscribe(log => {
      if(log) {
        this.login=true;
      } else {
        this.login=false;
      }
    });

    this.messages = this.db.list('/message');

    // OLD: why reverse array???
    // this.messages.map((array) => array.reverse()) as FirebaseListObservable<any[]>;

    this.messages.snapshotChanges()
      .subscribe(snapshots => {
        snapshots.forEach(item => {
          this.messages.update(item.key, { read: true });
        });
      })


  }

}
