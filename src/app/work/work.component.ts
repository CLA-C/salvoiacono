import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { MdSidenav, MdDialogRef, MdDialog, MdDialogConfig, MD_DIALOG_DATA } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription }   from 'rxjs/Subscription';

import { FormEventComponent } from '../form/form-event/form-event.component';
import { FormWorkComponent } from '../form/form-work/form-work.component';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {

  private imlogin: boolean;
  private workid;
  private keyid;
  private cover;
  private work: FirebaseObjectObservable<any>;
  private event: FirebaseObjectObservable<any>;
  private photos: FirebaseListObservable<any>;
  private photo;
  private sizes = ['large', 'medium', 'small']
  private baseurl = environment.baseurl;
  private photonumb;
  private homeslide=0;
  private event_cover;
  private event_key;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router,
    private route:ActivatedRoute,
    public dialog: MdDialog, 
    public cartService: CartService, 
  ) {

    afAuth.authState.subscribe(log => {
      if(log) {
        this.imlogin=true;
      } else {
        this.imlogin=false;
      }
    });

    this.workid = this.route.snapshot.params['work'];
    db.list('/work', {
      query: {
        orderByChild: 'url',
        equalTo: this.workid
      }
    }).subscribe(items => {
      // this.photonumb=items[0];
      this.keyid = items[0].$key;
      this.photo = items[0].cover;
      let eventname = items[0].event;
      this.work = db.object('/work/'+items[0].id);
      this.photos = db.list('/work/'+items[0].id+'/photo');
      this.photos.subscribe(snapshot => { this.photonumb=snapshot});
      db.list('/event', {
        query: {
          orderByChild: 'url',
          equalTo: eventname
        }
      }).subscribe(items => {
        db.object('/event/'+items[0].$key).subscribe(items => {
          this.event_cover = items.cover;
        });
      });
    });

  }

  ngOnInit() {
  }

  workSett(){
    let config: MdDialogConfig = {
      disableClose: false,
      data: {
        id: this.keyid
      }
    };
    this.dialog.open(FormWorkComponent, config);
  }

  myCover(photo){
    this.photo=photo;
  }
  
  stupidPhoto(val){
  }

  goCart(){
    this.cartService.add(this.keyid);
  }

  goSLide(val){
  }


}
