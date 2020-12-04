import { Component, OnInit, Inject, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';
import { EventService } from '../_event_service/event.service';
import { FormControl } from '@angular/forms';
import {Event} from '../entities/event';
import { Observable } from 'rxjs';
import {Store} from '../entities/Store'

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./new-event.component.scss'],
  templateUrl: './new-event.component.html',
})
export class NewEventComponent implements OnInit {
  Price :number;
  StoreId:number;
  date: string;
  NumberOfClients:number;
  NotifyWay:number;
  stores:Store[];
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
  event: any ={};
  submitted: boolean = false;
  rememberMe = false;
  heartRate = 4;
  radioGroupValue = 'This is value 2';
  isSuccessful = false;
  isSignUpFailed = false;
  registerForm: FormGroup;
  errorMessage = '';
  selectedItemFormControl = new FormControl();
  constructor(protected service: NbAuthService,private eventService :EventService,private formBuilder: FormBuilder,
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
 



    }
    getConfigValue(key: string): any {
      return getDeepFromObject(this.options, key, null);
    }
    addEvent(){
      const EventName =this.event.EventName;
      this.date = new Date().toISOString();
      const EventType =this.event.EventType;
      this.StoreId = parseInt(this.event.StoreId);
      this.NumberOfClients = parseInt(this.event.NumberOfClients);
      this.NotifyWay = parseInt(this.event.NotifyWay);
      
      this.eventService.addEvent(EventName,EventType,this.date,this.NumberOfClients,this.NotifyWay);
      
      console.log("Event Inside component.Ts")
      console.log(this.event)
     
    }
    Reset() {
      this.submitted = false;
        this.event.reset();
    }
   
  }