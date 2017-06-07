import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent implements OnInit {

  myinfo: FormGroup;

  constructor(
    public db: AngularFireDatabase,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MdDialog
  ) {

    this.myinfo = fb.group({
      phone: [data.phone, [ ]],
      email: [data.email, [ ]],
      address: [data.address, [ ]],
      map: [data.map, [ ]],
      facebook: [data.facebook, [ ]],
      twitter: [data.twitter, []],
      instagram: [data.instagram, []],
      social: [data.social, []],
    });
    
  }

  ngOnInit() {
    
  }

  upWork(){    
    if(this.myinfo.valid){
      this.db.object('info').update({ 
        phone: this.myinfo.controls['phone'].value,
        email: this.myinfo.controls['email'].value,
        address: this.myinfo.controls['address'].value,
        map: this.myinfo.controls['map'].value,
        facebook: this.myinfo.controls['facebook'].value,
        twitter: this.myinfo.controls['twitter'].value,
        instagram: this.myinfo.controls['instagram'].value,
        social: this.myinfo.controls['social'].value,
      })
    }
  }
  


}