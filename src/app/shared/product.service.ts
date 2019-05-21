import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  itemsInCartSubject: BehaviorSubject<any[]> = new BehaviorSubject([]);
  itemsInCart: any = []
  cartItem = [];
  totalAmount = 0;
  totalQuantity = 0;

  constructor(private httpclient: HttpClient) { }

  getProductList(): Observable<any> {
    return this.httpclient
      .get<any[]>('../../assets/data-json/productList.json')
      .pipe(catchError(err => throwError(err)));
  }


  getProductDetail(id): Observable<any> {
    return this.httpclient
      .get<any[]>('../../assets/data-json/productList.json')
      .pipe(catchError(err => throwError(err)));
  }

  public getItems(): Observable<any[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getCartItems(): any {
    return this.cartItem;
  }


  public addToCart(itemsInCart) {
    this.cartItem.push(itemsInCart);
  }

  public getTotalAmount(): any {
    this.totalAmount = 0;
    this.cartItem.map(el => {
      this.totalAmount = this.totalAmount + el.discountPrice;
    });
    return this.totalAmount;
  }
  public getTotalQuantity(): any {
    this.totalQuantity = 0;
    this.cartItem.map(el => {
      this.totalQuantity = this.totalQuantity + el.quantity;
    });
    return this.totalQuantity;
  }

  public getLocation(loaApi): Observable<any> {
    return this.httpclient
      .get(loaApi)
      .pipe(catchError(err => throwError(err)));
  }


}
