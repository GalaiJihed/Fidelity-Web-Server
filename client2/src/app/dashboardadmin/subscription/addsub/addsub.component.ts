import { Component, OnInit, Inject, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import {Manager} from'../entities/Manager';
import {SubService} from '../sub-service/sub.service';
import { Observable } from 'rxjs';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./addsub.component.scss'],
  templateUrl: './addsub.component.html',
})
export class NewSubComponent implements OnInit {
  Price :number;
  storeID:number;
  file:File;
  Managers:Manager[];
  phone: number;
  date: string;
  selectedItemNgModel;
  selectedOption: string;
  printedOption: string;
  client:any = {};
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
  constructor(protected service: NbAuthService,private formBuilder: FormBuilder,private subService:SubService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router){
      this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
      this.showMessages = this.getConfigValue('forms.login.showMessages');
      this.strategy = this.getConfigValue('forms.login.strategy');
      this.rememberMe = this.getConfigValue('forms.login.rememberMe');
      this.service.getToken();
    }
    ngOnInit(){

//this.productService.listStore().subscribe(response => this.stores = response);
this.subService.listManager().subscribe(response=>this.Managers=response);


    }
    getConfigValue(key: string): any {
      return getDeepFromObject(this.options, key, null);
    }
    addSub(){
      // tslint:disable-next-line: no-console
      console.log(this.client.phoneNumber);
      // values from form
      // tslint:disable-next-line: radix
      this.phone = parseInt(this.client.phoneNumber);
      this.date = new Date().toISOString();
      const SubscriptionType = this.client.SubscriptionType;


      // Call Service Add user and put the values in params
      // tslint:disable-next-line: max-line-length
      this.subService.addSubscription( this.phone,SubscriptionType,this.date);
     // window.location.reload();
     console.log(this.client.date);

    }

  }
