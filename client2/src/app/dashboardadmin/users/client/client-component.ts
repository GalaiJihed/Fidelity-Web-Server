import { Component, OnInit, Inject, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';
import { ServiceClient } from '../_services_users/service_client';
import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./client-component.scss'],
  templateUrl: './client-component.html',
})
export class ClientComponent implements OnInit {
  date: string;
  phone: number;
  starRate = 2;
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = 'phone';
  errors: string[] = [];
  messages: string[] = [];
  client: any = {};
  submitted: boolean = false;
  rememberMe = false;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(protected service: NbAuthService, private serviceClient: ServiceClient,
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
this.service.getToken();
    }
    getConfigValue(key: string): any {
      return getDeepFromObject(this.options, key, null);
    }
    addClient(){
      // tslint:disable-next-line: no-console
      console.log(this.client.phoneNumber);
      // values from form
      // tslint:disable-next-line: radix
      this.phone = parseInt(this.client.phoneNumber);
      this.date = new Date().toISOString();
      const firstname = this.client.firstName;
      const lastName = this.client.lastName;
      const email = this.client.email;
      const password = this.client.password;
      const address = this.client.address;
      const postalCode = this.client.postalCode;
      const city = this.client.city;

      // Call Service Add user and put the values in params
      // tslint:disable-next-line: max-line-length
      this.serviceClient.CreateUser(firstname , lastName , email, password, address, this.phone, this.date, postalCode, city);
     // window.location.reload();

    }
    Reset() {
      this.submitted = false;
        this.client.reset();
    }

}
