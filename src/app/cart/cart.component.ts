import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public shoppingCartItems$: Observable<any[]> = of([]);
  shoppingCartItems;
  cartItems;

  productList;
  cartItem;
  total;
  totalQuantity;

  constructor(public route: ActivatedRoute,
    private productService: ProductService) {
     }

  ngOnInit() {
    this.getCartItems()
    this.getTotal();
    this.getTotalQuantity();
  }


  public getTotal() {
    this.total = this.productService.getTotalAmount();
  }
  public getTotalQuantity() {
    this.totalQuantity = this.productService.getTotalQuantity();
  }
  public getCartItems() {
   this.cartItems =  this.productService.getCartItems()
  }
}
