import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MdDialog, MdDialogRef, MdDialogConfig, MD_DIALOG_DATA} from '@angular/material';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-form-work',
  templateUrl: './form-work.component.html',
  styleUrls: ['./form-work.component.scss']
})
export class FormWorkComponent implements OnInit {

  baseurl = environment.baseurl;
  submitted = false;
  dragging: boolean = false;
  files: any = [];
  filen: number = 0;
  filetoload: number = 0;
  loading: boolean = false;
  workid: string = '';
  work: FormGroup;
  cover: number=0;
  content;
  newProduct: FirebaseListObservable<any>;
  photos: FirebaseListObservable<any>;
  idid:boolean = false;

  constructor(
    public db: AngularFireDatabase,
    private router: Router,
    private route:ActivatedRoute,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MdDialog
  ) {

    this.work = fb.group({
      url: [data.url, [ ]],
      title: [data.title, [ ]],
      price: [data.price, [ ]],
      discount: [data.title, [ ]],
      description: [data.desk, []],
      event: [data.event, []],
      active: [data.active, []],
      cover: [data.cover, []],
    });

    if(data.id){
      this.workid=data.id;
      db.list('/work/'+this.workid).subscribe(items => {
          items.forEach(item => { 
            if(this.work.controls[item.$key]){
              this.work.controls[item.$key].setValue(item.$value);
            }
          })
      });
      this.cover=this.work.controls['cover'].value;
      this.photos = this.db.list('/work/'+this.workid+'/photo');
      this.photos.subscribe(items => {
          this.filen=0;
          items.forEach(item => { 
            this.filen+=1;
          })
      });
    }else{
      db.list('/work').push({ 
        active: false,
      }).then((item) => {
        this.workid=item.key;
      });
    }

    dialog.afterAllClosed.subscribe(() => {
      if(this.work.valid && this.idid==false){
        this.db.list('work').update(this.workid, { 
          id:this.workid,
          url:this.work.controls['url'].value,
          title:this.work.controls['title'].value,
          price:this.work.controls['price'].value,
          discount:this.work.controls['discount'].value,
          description:this.work.controls['description'].value,
          event:this.work.controls['event'].value,
          active:this.work.controls['active'].value,
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
      for (let selectedFile of filez) {
        var rdn = Math.random().toString(36).slice(-10);
        var storageRef = firebase.storage().ref('/work/'+rdn);
        storageRef.put(selectedFile).then((photo) => {
          this.db.list('/work/'+this.workid+'/photo').push({ id: rdn });
          this.filetoload-=1;
          this.filen+=1;
          if(this.filetoload==0){
            this.loading=false;
            this.photos = this.db.list('/work/'+this.workid+'/photo');
          }
        });
      }
    }
  }
  
  workDelete(){
    if(confirm("Delete this product?")){
      this.idid = true;
      this.db.list('/work/'+this.workid+'/photo').subscribe(items => {
          items.forEach(item => { 
            firebase.storage().ref('/event/'+item.id).delete();
          });
      });
      this.db.object('/work/'+this.workid).remove();
      this.dialog.closeAll();
    }
  }

  myCover(photo){
    this.db.list('/work').update(this.workid, { cover: photo.id});
  }
  
  imgDelete(photo){
    if(confirm("Delete this photo?")){
      firebase.storage().ref('/work/'+photo.id).delete().then((risp) => {
        this.db.list('/work/'+this.workid+'/photo').remove(photo.$key);
      })
    }
  }

}