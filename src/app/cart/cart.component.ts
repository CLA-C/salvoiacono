import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { environment } from '../../environments/environment';
import { CartService } from '../cart/cart.service';

declare let paypal: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public cartlist = [];
  public baseurl = environment.baseurl;
  public totalprice: number = 0;
  public paypalprice: string = '0.00';
  public products = [];

  constructor(
    private cartService: CartService,
    public db: AngularFireDatabase,
  ) {}

  ngOnInit() {

    let cart = this.cartService.get();
    cart.forEach(id => {
      let product = this.db.object('/work/' + id).valueChanges();
      product.subscribe((item: any) => {
        this.cartlist.push(item);
        this.totalprice += this.calculatePrice(item.price, item.discount);
        this.products.push(item.name);

        this.paypalprice = parseFloat(this.totalprice.toString()).toFixed(2)

      });
    });

    setTimeout(() => {
      const paypalprice = this.paypalprice;
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

        validate: function(actions) {
          return paypalprice ? actions.enable() : actions.disable();
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

  calculatePrice(price, discount) {
    if (!discount) {
      return price
    }

    return price * (1 - (discount/100))
  }

  removeCart(product) {
    let index: number = this.cartlist.indexOf(product);
    if (index !== -1) { this.cartlist.splice(index, 1); }
    this.cartService.remove(product.id);
    this.totalprice = this.totalprice - this.calculatePrice(product.price, product.discount);
    this.paypalprice = parseFloat(this.totalprice.toString()).toFixed(2);
  }


}
