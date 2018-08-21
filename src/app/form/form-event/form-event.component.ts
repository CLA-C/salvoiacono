import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements OnInit {

  public submitted = false;
  public dragging: boolean = false;
  public files: any = [];
  public filen: number = 0;
  public filetoload: number = 0;
  public loading: boolean = false;
  public newProduct: AngularFireList<any>;
  public eventid: string = '';
  public event: FormGroup;
  public cover;
  public baseurl = environment.baseurl;
  public result: any;

  constructor(
    public db: AngularFireDatabase,
    private router: Router,
    private route:ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public dialog: MatDialog
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
      this.newProduct.snapshotChanges().pipe(
        map(actions => 
          actions.map(a => ({ key: a.key, value: a.payload.val()}))
        )
      ).subscribe(items => {
          items.forEach(item => {
            if(this.event.controls[item.key]){
              this.event.controls[item.key].setValue(item.value);
            }
          })
        this.cover=this.event.controls['cover'].value;
      });
    }else{
      db.list('/event').push({
        active: false,
        cover: 'placeholder.gif',
        gridc: 1,
        gridr: 1
      }).then((item) => {
        this.eventid=item.key;
      });
    }
  }
    
  ngOnInit() {
    
  }

  goSave(){
    this.db.list('event').update(this.eventid, { 
      url: this.event.controls['url'].value,
      title: this.event.controls['title'].value,
      description: this.event.controls['description'].value,
      gridr: this.event.controls['gridr'].value,
      gridc: this.event.controls['gridc'].value,
      active: this.event.controls['active'].value,
    })
    this.dialog.closeAll();
  }


  goPhoto(event) {
    var filez = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    var totfile = this.filen+filez.length;
    if(totfile>0){
      this.loading=true;
      this.filetoload = filez.length;
      firebase.storage().ref('/event/'+this.cover).delete();
      for (let selectedFile of filez) {
        var rdn = Math.random().toString(36).slice(-10)+'.jpg';
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
    if(confirm("Delete this item?")){
      this.db.object('/event/'+this.eventid).remove();
      if(this.cover!='placeholder.gif'){firebase.storage().ref('/event/'+this.cover).delete()}
      this.dialog.closeAll();
      this.router.navigateByUrl("/");
    }
  }

}