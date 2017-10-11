import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { MdSidenav, MdDialogRef, MdDialog, MdDialogConfig, MD_DIALOG_DATA } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

import { FormEventComponent } from '../form/form-event/form-event.component';
import { FormWorkComponent } from '../form/form-work/form-work.component';
import { ZoomComponent } from '../zoom/zoom.component';
import { AppPipe } from '../app.pipe';

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
  imlogin;
  dialogRef: MdDialogRef<FormWorkComponent>;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public dialog: MdDialog, 
    private router: Router,
    private route:ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {

    this.afAuth.authState.subscribe(islog => {      
      if (islog) { this.imlogin = true } else { this.imlogin =  false }
    });

  }

  ngOnInit() {

    this.eventid = this.route.snapshot.params['event'];
    if(this.eventid == 'allworks'){
      this.events = this.db.list('/event');
      this.works = this.db.list('/work');
    }else{
      this.events = this.db.list('/event', {
        query: {
          orderByChild: 'url',
          equalTo: this.eventid
        }
      });
      this.works = this.db.list('/work', {
        query: {
          orderByChild: 'event',
          equalTo: this.eventid,
        }
      });
    }
    
  }

  eventSett(id){
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
      disableClose: true,
      data: {
        id: id
      }
    };
    this.dialog.open(FormWorkComponent, config);
  }

  goWork(event,work,photo){
    if(work){
      this.router.navigateByUrl(event+'/'+work);
    }else{
      let config: MdDialogConfig = {data: {photo: photo}};
      this.dialog.open(ZoomComponent, config);
    }
  }


}
