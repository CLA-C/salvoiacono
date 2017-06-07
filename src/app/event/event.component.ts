import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdSidenav, MdDialogRef, MdDialog, MdDialogConfig, MD_DIALOG_DATA } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { DomSanitizer } from '@angular/platform-browser';

import { FormEventComponent } from '../form/form-event/form-event.component';
import { FormWorkComponent } from '../form/form-work/form-work.component';

@Component({
  selector: 'app-work',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  
  item = {
    img: 'back1.jpg'
  };
  baseurl = environment.baseurl;
  eventid;
  events: FirebaseListObservable<any>;
  works: FirebaseListObservable<any>;
  imlogin: boolean;
  dialogRef: MdDialogRef<FormWorkComponent>;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public dialog: MdDialog, 
    private router: Router,
    private route:ActivatedRoute,
    private sanitized: DomSanitizer
  ) {

    afAuth.authState.subscribe(log => {
      if(log) {
        this.imlogin=true;
      } else {
        this.imlogin=false;
      }
    });

    this.eventid = this.route.snapshot.params['event'];
    this.events = db.list('/event', {
      query: {
        orderByChild: 'url',
        equalTo: this.eventid
      }
    });

    this.works = db.list('/work', {
      query: {
        orderByChild: 'event',
        equalTo: this.eventid,
      }
    });
    
  }

  ngOnInit() {
  }

  eventSett(id){
    console.log(id)
    let config: MdDialogConfig = {
      disableClose: false,
      data: {
        id: id
      }
    };
    this.dialog.open(FormEventComponent, config);
  }

  workSett(id){
    let config: MdDialogConfig = {
      disableClose: false,
      data: {
        id: id
      }
    };
    this.dialog.open(FormWorkComponent, config);
  }

  goSLide(val){
  }


}
