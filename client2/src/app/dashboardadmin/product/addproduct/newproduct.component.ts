import { Component, OnInit, Inject, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';
import { ProductService } from '../_product_service/product.service';
import { FormControl } from '@angular/forms';
import { Store } from '../../product/entities/Store';
import { Observable } from 'rxjs';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./newproduct.component.scss'],
  templateUrl: './newproduct.component.html',
})
export class NewProductComponent implements OnInit {
  Price :number;
  storeID:number;
  file:File;
  stores:Store[];
  selectedItemNgModel;
  selectedOption: string;
  printedOption: string;
  selectedFile: ImageSnippet;
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
  constructor(protected service: NbAuthService,private productService :ProductService,private formBuilder: FormBuilder,
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
      this.registerForm = this.formBuilder.group({


        image: new FormControl(null, {
          validators: [Validators.required],
          asyncValidators: [mimeType]
        }),
        acceptTerms: [false, Validators.requiredTrue]
      }, {

      });
this.productService.listStore().subscribe(response => this.stores = response);


    }
    getConfigValue(key: string): any {
      return getDeepFromObject(this.options, key, null);
    }
    addProduct(){
 
const ProductName =this.product.ProductName;
const Reference =this.product.Reference;
this.Price = parseInt(this.product.Price);
this.storeID = parseInt(this.product.storeID);


this.productService.addProduct(ProductName,Reference,this.Price,this.storeID,this.file.name);

console.log("Product Inside component.Ts")
console.log(this.product)
    }
    Reset() {
      this.submitted = false;
        this.product.reset();
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
 
       this.selectedFile = new ImageSnippet(event.target.result, this.file);
 
       this.selectedFile.pending = true;
       this.productService.uploadImage(this.selectedFile.file).subscribe(
         (res) => {
           this.onSuccess();
         },
         (err) => {
           this.onError();
         })
     });
 
     reader.readAsDataURL(this.file);
     console.log(this.file.name)
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
  
  }
  
  class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';
  
    constructor(public src: string, public file: File) {}
  }