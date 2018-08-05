import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MatSidenav, MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";

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

  @ViewChild('sidenav') public sidenav: MatSidenav;
  
  public imlogin: boolean;
  public cartnumber;
  public cart = [];
  private cartone = ['aaa'];
  public message: AngularFireList<any>;
  public notread:number;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
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

      db.list('/message',  ref => ref.orderByChild('read').equalTo(false))
        .valueChanges()
        .subscribe(snapshots => {
        this.notread=snapshots.length;
      });


  }

  ngOnInit() {
    this.cart = this.cartService.get();
    this.cartnumber = this.cart.length;
  }

  goLogin() {
    const config = new MatDialogConfig();
    this.dialog.open(FormLoginComponent, config);
  }
  goLogout() {
    this.afAuth.auth.signOut();
    this.snackBar.open('SEE YOU LATER', '', {
      duration: 2000,
    });
  }
  goProd() {
    let config: MatDialogConfig = {
      disableClose: true,
      data: {
      }
    };
    this.dialog.open(FormWorkComponent, config);
  }
  goEven() {
    let config: MatDialogConfig = {
      disableClose: true,
      data: {
      }
    };
    this.dialog.open(FormEventComponent, config);
  }

}