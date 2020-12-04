import { Component, OnInit, Inject, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { Product } from '../entities/Product';

import { Store } from '../../product/entities/Store';
import { LocalDataSource } from 'ng2-smart-table';
import { PromoService } from '../_promo_service/promo.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./add-promo.component.scss'],
  templateUrl: './add-promo.component.html',
})
export class AddPromoComponent implements OnInit {
  Price :number;
  PromoPrice:number;
  newproductprice:number;
  Reduction:number;
  storeID:number;
  file:File;
  stores:Store[];
  user:any;
  token:any;
  private httpOptions;
  products:any = {};
  selectedItemNgModel;
  selectedOption: string;
  printedOption: string;
  imagePreview: string;
  starRate = 2;
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = 'phone';
  errors: string[] = [];
  messages: string[] = [];
  product: any = {};
  submitted: boolean = false;
  rememberMe = false;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  isSuccessful = false;
  isSignUpFailed = false;
  registerForm: FormGroup;
  errorMessage = '';
  selectedItemFormControl = new FormControl();

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: NbAuthService,private formBuilder: FormBuilder,private Service: PromoService,private authService: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router){
      this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
      this.showMessages = this.getConfigValue('forms.login.showMessages');
      this.strategy = this.getConfigValue('forms.login.strategy');
      this.rememberMe = this.getConfigValue('forms.login.rememberMe');
      this.service.getToken();
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.getValue();
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'auth': this.token
            })
          };
        }
      });
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();

        //  this.StoreId=parseInt(this.user.storeid);
        }
      });
    }
    ngOnInit(){
      this.Service.list(this.user.storeid).subscribe(response => this.products = response);



  

    }
    getConfigValue(key: string): any {
      return getDeepFromObject(this.options, key, null);
    }

addPromotion(){

  this.newproductprice=Math.round(this.product.Price-(this.product.Price*this.product.Reduction/100));
  this.PromoPrice = parseInt(this.product.newproductprice);
  console.log("Price"+this.product.Price);

}



  }

