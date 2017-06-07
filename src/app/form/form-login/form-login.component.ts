import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdDialog, MdSnackBar } from "@angular/material";

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.scss']
})
export class FormLoginComponent implements OnInit {

  submitted:boolean;
  error_email:boolean;
  error_password:boolean;

  constructor(
    public fb: FormBuilder,
    public dialog: MdDialog,
    public snackBar: MdSnackBar,
    public afAuth: AngularFireAuth
  ) {

  }

  public loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required]
  });
  
  doLogin(event) {
    this.submitted=true;
    this.error_email=false;
    this.error_password=false;
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    if(this.loginForm.valid){
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        
        if(error.message=="There is no user record corresponding to this identifier. The user may have been deleted."){
          this.error_email=true;
        }
        if(error.message=="The password is invalid or the user does not have a password."){
          this.error_password=true;
        }
      })
      .then(risp => {
        
        if(risp){
          this.dialog.closeAll();
          this.snackBar.open('WELCOME BACK', '', {
            duration: 2000,
          });
        }
      });
    }
  }

  ngOnInit() {

  }


}
