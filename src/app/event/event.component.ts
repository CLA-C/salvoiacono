import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { MatSidenav, MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform } from '@angular/core';

import { FormEventComponent } from '../form/form-event/form-event.component';
import { FormWorkComponent } from '../form/form-work/form-work.component';
import { ZoomComponent } from '../zoom/zoom.component';
import { AppPipe } from '../app.pipe';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

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
  events: Observable<any[]>;
  works: Observable<any[]>;
  imlogin;
  dialogRef: MatDialogRef<FormWorkComponent>;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog, 
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) {

    this.afAuth.authState.subscribe(islog => {      
      if (islog) { this.imlogin = true } else { this.imlogin =  false }
    });

  }

  ngOnInit() {
    this.eventid = this.route.snapshot.params['event'];
    if(this.eventid == 'allworks'){
      this.events = this.db.list('/event').snapshotChanges().pipe(
        map(actions => 
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        ),
        map((items: any[]) => items.filter(item => this.imlogin ? true : item.active))
      );
      this.works = this.db.list('/work').snapshotChanges().pipe(
        map(actions => 
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        ),
        map((items: any[]) => items.filter(item => this.imlogin ? true : item.active))
      );
    }else{
      this.events = this.db.list('/event', ref => ref.orderByChild('url').equalTo(this.eventid)).snapshotChanges().pipe(
        map(actions => 
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        ),
        map((items: any[]) => items.filter(item => this.imlogin ? true : item.active))
      );
      
      this.works = this.db.list('/work', ref => ref.orderByChild('event').equalTo(this.eventid)).snapshotChanges().pipe(
        map(actions => 
          actions.map(a => ({ key: a.key, ...a.payload.val() }))
        ),
        map((items: any[]) => items.filter(item => this.imlogin ? true : item.active))
      );
      this.works.subscribe()
    }
    
  }

  sortItem(a, b) {
    if (a.key < b.key) //sort string ascending
      return -1;
    if (a.key >  b.key)
      return 1;
    return 0
  }

  eventSett(id){
    let config: MatDialogConfig = {
      disableClose: false,
      data: {
        id: id
      }
    };
    this.dialog.open(FormEventComponent, config);
  }

  workSett(id){
    let config: MatDialogConfig = {
      disableClose: true,
      data: {
        id: id
      }
    };
    this.dialog.open(FormWorkComponent, config);
  }
  
  calculatePrice(price, discount) {
    if (!discount) {
      return price
    }
    return price * (1 - (discount/100))
  }

  goWork(event,work,photo){
    if(work){
      this.router.navigateByUrl(event+'/'+work);
    }else{
      let config: MatDialogConfig = {data: {photo: photo}};
      this.dialog.open(ZoomComponent, config);
    }
  }

}
