import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

   bricks = [
     {img: '/assets/model/01.jpg'},
     {img: '/assets/model/02.jpg'},
     {img: '/assets/model/03.jpg'},
     {img: '/assets/model/04.jpg'},
     {img: '/assets/model/05.jpg'},
     {img: '/assets/model/06.jpg'},
     {img: '/assets/model/07.jpg'},
     {img: '/assets/model/08.jpg'},
     {img: '/assets/model/09.jpg'},
     {img: '/assets/model/01.jpg'},
   ]

  constructor() { }

  ngOnInit() {
  }

}
