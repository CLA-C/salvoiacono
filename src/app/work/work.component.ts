import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { MatSidenav, MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription }   from 'rxjs';
import { ZoomComponent } from '../zoom/zoom.component';
import { FormEventComponent } from '../form/form-event/form-event.component';
import { FormWorkComponent } from '../form/form-work/form-work.component';
import { CartService } from '../cart/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
})
export class WorkComponent implements OnInit {

  public imlogin: boolean;
  public workid;
  public keyid;
  public cover;
  public work;
  public event: AngularFireObject<any>;
  public photos;
  public photo;
  public sizes = ['large', 'medium', 'small']
  public baseurl = environment.baseurl;
  public photonumb;
  public homeslide=0;
  public event_cover;
  public event_key;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog, 
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
    db.list('/work', ref => ref.orderByChild('url').equalTo(this.workid))
    .snapshotChanges()
    .pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))))
    .subscribe( (items: any[]) => {
      // this.photonumb=items[0];
      this.keyid = items[0].key;
      this.photo = items[0].cover;
      let eventname = items[0].event;
      this.work = db.object('/work/'+items[0].id).valueChanges();
      this.photos = db.list('/work/'+items[0].id+'/photo').valueChanges();
      // this.photos.valueChanges()
      // .subscribe(snapshot => {
      //   console.log('snapsht', snapshot)
      //   this.photonumb=snapshot
      // });
      db.list('/event', ref => ref.orderByChild('url').equalTo(eventname))
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => ({ key: a.key, ...a.payload.val() }))))
      .subscribe(items => {
        db.object('/event/'+items[0].key).valueChanges().subscribe((items: any) => {
          this.event_cover = items.cover;
        });
      });
    });

  }

  ngOnInit() {
  }

  workSett(){
    let config: MatDialogConfig = {
      disableClose: true,
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
    this.router.navigateByUrl('/cart');
  }

  zoomWork(photo){
    let config: MatDialogConfig = {data: {photo: photo}};
    this.dialog.open(ZoomComponent, config);
  }

}
