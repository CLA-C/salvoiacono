import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private cartlist = [];
  private baseurl = environment.baseurl;

  constructor(
    private cartService: CartService,
    public db: AngularFireDatabase,
  ) { }

  ngOnInit() {
    let cart = this.cartService.get();
    cart.forEach(id => {
      let product = this.db.object('/work/'+id, { preserveSnapshot: true });
      product.subscribe(snapshot => {
        this.cartlist.push(snapshot.val());
      });
    });
  }
  removeCart(product){
    let index: number = this.cartlist.indexOf(product);
    if (index !== -1) {this.cartlist.splice(index, 1);}
    this.cartService.remove(product.id);
  }

}
