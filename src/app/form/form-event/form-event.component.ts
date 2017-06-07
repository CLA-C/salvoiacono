import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements OnInit {

  private submitted = false;
  private dragging: boolean = false;
  private files: any = [];
  private filen: number = 0;
  private filetoload: number = 0;
  private loading: boolean = false;
  private newProduct: FirebaseListObservable<any>;
  private eventid: string = '';
  private event: FormGroup;
  private cover;
  private baseurl = environment.baseurl;
  private result: any;
  private iwantdelete:boolean = false;

  constructor(
    public db: AngularFireDatabase,
    private router: Router,
    private route:ActivatedRoute,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MdDialog
  ) {

    this.event = fb.group({
      title: [data.title, [ ]],
      url: [data.url, [ ]],
      description: [data.description, []],
      // what: ['grid', []],
      // slide: [1, []],
      gridr: [1, []],
      gridc: [1, []],
      active: [data.active, []],
      cover: [data.cover, []],
    });

    if(data.id){
      this.eventid=data.id;
      this.newProduct = db.list('/event/'+this.eventid);
      this.newProduct.subscribe(items => {
          items.forEach(item => {
            if(this.event.controls[item.$key]){
              this.event.controls[item.$key].setValue(item.$value);
            }
          })
        this.cover=this.event.controls['cover'].value;
      });
    }else{
      db.list('/event').push({ 'active': false }).then((item) => {
        this.eventid=item.key;
      });
    }

    dialog.afterAllClosed.subscribe(() => {
      console.log(this.iwantdelete)
      if(this.iwantdelete==false){
        this.db.list('event').update(this.eventid, { 
          url: this.event.controls['url'].value,
          title: this.event.controls['title'].value,
          description: this.event.controls['description'].value,
          // what: this.event.controls['what'].value,
          // slide: this.event.controls['slide'].value,
          gridr: this.event.controls['gridr'].value,
          gridc: this.event.controls['gridc'].value,
          active: this.event.controls['active'].value,
        })
      }
    });
    
  }

  ngOnInit() {
    
  }

  goPhoto(event) {
    var filez = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    var totfile = this.filen+filez.length;
    if(totfile>0){
      this.loading=true;
      this.filetoload = filez.length;
      firebase.storage().ref('/event/'+this.cover).delete();
      for (let selectedFile of filez) {
        var rdn = Math.random().toString(36).slice(-10);
        var storageRef = firebase.storage().ref('/event/'+rdn);
        storageRef.put(selectedFile).then((photo) => {
          this.db.list('event').update(this.eventid, { cover: rdn});
          this.cover=rdn;
          this.filetoload-=1;
          this.filen+=1;
          if(this.filetoload==0){this.loading=false;}
        });
      }
    }
  }
  
  okDelete(){
    this.iwantdelete=true;
    if(confirm("Delete this item?")){
      console.log(this.eventid)
      this.db.object('/event/'+this.eventid).remove();
      firebase.storage().ref('/event/'+this.cover).delete();
      this.dialog.closeAll();
      this.router.navigateByUrl("/");
    }
  }

}