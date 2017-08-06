import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MdSidenav, MdDialog, MdDialogConfig, MdSnackBar } from "@angular/material";

import { FormLoginComponent } from './form/form-login/form-login.component';
import { FormEventComponent } from './form/form-event/form-event.component';
import { FormWorkComponent } from './form/form-work/form-work.component';

import { CartService } from './cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ CartService ]
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') public sidenav: MdSidenav;
  
  private imlogin: boolean;
  private cartnumber;
  private cart = [];
  private cartone = ['aaa'];
  private message: FirebaseListObservable<any>;
  private notread:number;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public dialog: MdDialog,
    public snackBar: MdSnackBar,
    public cartService: CartService
  ) { 

    afAuth.authState.subscribe(log => {
      if(log) {
        this.imlogin=true;
      } else {
        this.imlogin=false;
      }
    });

      
    // this.db.list('/message', { 
    //   query: {
    //     orderByChild: 'read',
    //     equalTo: 'false' 
    //   }
    // }).subscribe(snapshots => {
    //     this.notread=snapshots.length;
    // })

      db.list('/message', {
        query: {
          orderByChild: 'read',
          equalTo: false
        }
      }).subscribe(snapshots => {
        this.notread=snapshots.length;
      });


  }

  ngOnInit() {
    this.cart = this.cartService.get();
    this.cartnumber = this.cart.length;
  }

  goLogin() {
    const config = new MdDialogConfig();
    this.dialog.open(FormLoginComponent, config);
  }
  goLogout() {
    this.afAuth.auth.signOut();
    this.snackBar.open('SEE YOU LATER', '', {
      duration: 2000,
    });
  }
  goProd() {
    let config: MdDialogConfig = {
      disableClose: true,
      data: {
      }
    };
    this.dialog.open(FormWorkComponent, config);
  }
  goEven() {
    let config: MdDialogConfig = {
      disableClose: true,
      data: {
      }
    };
    this.dialog.open(FormEventComponent, config);
  }

}