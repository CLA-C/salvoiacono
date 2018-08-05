import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent implements OnInit {

  photo:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.photo = data.photo;
  }

  ngOnInit() {
  }

}
