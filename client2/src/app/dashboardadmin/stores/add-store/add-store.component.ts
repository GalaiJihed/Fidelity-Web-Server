import { Component, OnInit, Inject, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder, NgForm, FormControl } from '@angular/forms';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';

import { NbDialogService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { storeService } from '../_service_store/store_service';

import { mimeType } from './mime-type.validator';
import { Manager } from '../entities/Manager';
import { MapService } from '../_service_store/map.service';

@Component({
  selector: 'ngx-add-store',
  styleUrls: ['./add-store.component.scss'],
  templateUrl: './add-strore.component.html',
})
export class NewStoreComponent implements OnInit {

  date: string;
  phone: number;
  starRate = 2;
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = 'phone';
  errors: string[] = [];
  messages: string[] = [];
  store: any ={};
  submitted: boolean = false;
  rememberMe = false;
  heartRate = 4;
  managers: Manager[];
  radioGroupValue = 'This is value 2';
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  selected:any;
  selectedFile: ImageSnippet;
  imagePreview: string;
  file: File;
  registerForm: FormGroup;
  constructor(protected service: NbAuthService,private formBuilder: FormBuilder,private map: MapService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,private storeservice:storeService,
    protected router: Router){
      this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
      this.showMessages = this.getConfigValue('forms.login.showMessages');
      this.strategy = this.getConfigValue('forms.login.strategy');
      this.rememberMe = this.getConfigValue('forms.login.rememberMe');

    }
    ngOnInit(){


      this.registerForm = this.formBuilder.group({


        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        }),
        acceptTerms: [false, Validators.requiredTrue]
      }, {

      });

      this.storeservice.listManager().subscribe(response => {this.managers = response;  console.log(this.managers)});
      this.map.buildMap()
    }
    getConfigValue(key: string): any {
      return getDeepFromObject(this.options, key, null);
    }
    addStore(form:NgForm){
      this.storeservice.addStore(this.store.StoreName,this.store.StoreAddress,this.store.StoreRef,this.store.StoreType,this.store.StoreOwner,this.file.name)
     //form.reset()
     this.errors = [];
     this.messages = [];
      console.log(this.file.name)
    }
    processFile(imageInput: any) {
      this.file = imageInput.files[0];
      const reader = new FileReader();
      this.file = (event.target as HTMLInputElement).files[0];
      this.registerForm.patchValue({ image: this.file });
      this.registerForm.get('image').updateValueAndValidity();

      reader.onload = () => {
     this.imagePreview = reader.result as string;
   };
      reader.addEventListener('load', (event: any) => {

       // tslint:disable-next-line: no-use-before-declare
       this.selectedFile = new ImageSnippet(event.target.result, this.file);

       this.selectedFile.pending = true;
       this.storeservice.uploadImage(this.selectedFile.file).subscribe(
         (res) => {
           this.onSuccess();
         },
         (err) => {
           this.onError();
         });
     });

      reader.readAsDataURL(this.file);
      console.log(this.file.name);
   }

   private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }
  filter(itemList: Manager[]): Manager[] {
    let result: Manager[] = [];
    //your filter logic here
    itemList.forEach(element => {
      if (element.store==null)
      result.push(element);

    });

    return result;
  }

  }
  class ImageSnippet {
    pending = false;
    status = 'init';

    constructor(public src: string, public file: File) {}
  }
