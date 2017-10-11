import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { CartService } from '../cart/cart.service';

declare let paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  private cartlist = [];
  private baseurl = environment.baseurl;
  private totalprice: number = 0;
  private paypalprice: string = '0.00';
  private products = [];



  constructor(
    private cartService: CartService,
    public db: AngularFireDatabase,
  ) {


  }

  ngOnInit() {

    let cart = this.cartService.get();
    cart.forEach(id => {
      let product = this.db.object('/work/' + id, { preserveSnapshot: true });
      product.subscribe(snapshot => {
        this.cartlist.push(snapshot.val());
        this.totalprice += snapshot.val().price;
        this.products.push(snapshot.val().name);

        this.paypalprice = parseFloat(this.totalprice.toString()).toFixed(2)

      });
    });

    console.log(this.paypalprice)


    setTimeout(function () {

      let payhtml = document.getElementById('totalprice')
      let paytoto = payhtml.innerHTML;

      paypal.Button.render({
        env: 'production',

        client: {
          sandbox: 'salvoiacono@hotmail.com',
          production: 'AU8bS5xhi4QoMNyZ8-k77V1q6Hf_Ceozhtqx2s8OPty4o33mDX61aGBvaesYHQJzr3iU-rSXBnThgS4y'
        },

        commit: true, // Show a 'Pay Now' button

        payment: function (data, actions) {
          return actions.payment.create({
            payment: {
              transactions: [
                {
                  amount: { total: paytoto, currency: 'EUR' }
                }
              ]
            }
          });
        },

        onAuthorize: function (data, actions) {
          return actions.payment.execute().then(function (payment) {

            // The payment is complete!
            // You can now show a confirmation message to the customer
          });
        }

      }, '#paypal-button');


    }, 3000);




  }

  removeCart(product) {
    let index: number = this.cartlist.indexOf(product);
    if (index !== -1) { this.cartlist.splice(index, 1); }
    this.cartService.remove(product.id);
  }


}
