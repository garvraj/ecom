import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems;
  total;
  option = false;
  addForm: FormGroup;
  totalQuantity;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getCartItems()
    this.getTotal();
    this.getTotalQuantity();
    this.addForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      pinCode: new FormControl(''),
      locality: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl('')

    });
  }

  get address(): any {
    return this.addForm.get('address');
  }
  get pinCode(): any {
    return this.addForm.get('pinCode');
  }
  get locality(): any {
    return this.addForm.get('locality');
  }
  get city(): any {
    return this.addForm.get('city');
  }
  get state(): any {
    return this.addForm.get('state');
  }

  public getTotal() {
    this.total = this.productService.getTotalAmount();
  }

  public getTotalQuantity() {
    this.totalQuantity = this.productService.getTotalQuantity();
  }

  public getCartItems() {
    this.cartItems = this.productService.getCartItems()
  }
  changeRadio() {
    this.option = true;
  }
  changeRadioToFalse() {
    this.option = false
  }


  getLocation() {
    if (navigator.geolocation) {
      var ref = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        ref.showPosition(position);
      })
    }
  }
  showPosition(position) {
    if (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const loaApi = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyBZeMyUp7kqAKOMmyIHrDdOr_JnvgPissI';
      this.productService.getLocation(loaApi).subscribe(res => {
        this.setFormValue(res.results[0]);
      }, (err) => {
      });
    }
  }

  setFormValue(add): void {
    const fullAdd = add.formatted_address;
    this.address.setValue(fullAdd);
    for (let i = 0; i < add.address_components.length; i++) {
      if (add.address_components[i].types[0] === "locality") {
        this.city.setValue(add.address_components[i].long_name);
      }
      if (add.address_components[i].types[0] === "postal_code") {
        this.pinCode.setValue(add.address_components[i].long_name);
      }
      if (add.address_components[i].types[0] === "political") {
        this.locality.setValue(add.address_components[i].long_name);
      }
      if (add.address_components[i].types[0] === "administrative_area_level_1") {
        this.state.setValue(add.address_components[i].long_name);
      }
    }
  }




}
