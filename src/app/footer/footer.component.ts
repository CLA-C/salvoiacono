import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { MdDialog, MdDialogConfig } from "@angular/material";
import { FormFooterComponent } from '../form/form-footer/form-footer.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  
  myinfo: FirebaseObjectObservable<any>;
  imlogin: boolean;
  infodata:any;
  html;
  messForm: FormGroup;

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public dialog: MdDialog,
    private sanitized: DomSanitizer,
    private fb: FormBuilder,
  ) { 

    afAuth.authState.subscribe(log => {
      if(log) {
        this.imlogin=true;
      } else {
        this.imlogin=false;
      }
    });

    this.messForm = fb.group({
      message: ["", [Validators.required, Validators.minLength(10)]]
    });
    
  }

  ngOnInit() {
    this.myinfo = this.db.object('/info')
    this.myinfo.subscribe(jsonData => {
      this.infodata=jsonData;
      this.html = this.sanitized.bypassSecurityTrustHtml(jsonData.social);
    });
  }

  goFooter() {
    let config: MdDialogConfig = {
      disableClose: false,
      data: this.infodata
    };
    this.dialog.open(FormFooterComponent, config);
  }

  goMess(event){
    if(this.messForm.valid){
      this.db.list('/message').push({ 
        message: this.messForm.controls['message'].value,
        datetime : Date.now()
      }).then((item) => {
        this.messForm.reset();
      });
    }
  }


}
