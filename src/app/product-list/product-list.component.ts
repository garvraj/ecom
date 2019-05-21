import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList;

  constructor(private productService: ProductService,
    public router: Router) { }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList().subscribe(res => {
      this.productList = res;
    });
  }
  addToCart(item) {
    this.productService.addToCart(item);
  }

}
