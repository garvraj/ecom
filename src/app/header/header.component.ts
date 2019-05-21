import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
cartLength = 0;

  constructor(private productService: ProductService,
    public router: Router) {
  }

  ngOnInit() {
    this.getCartItems()

  }

  public getCartItems() {
   const cartItems =  this.productService.getCartItems()
   this.cartLength = cartItems.length;
   }

}
