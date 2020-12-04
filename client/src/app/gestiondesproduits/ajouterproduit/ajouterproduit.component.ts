

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../_product_service/product.service';
import { StoreType } from '../entities/StoreType';
import { mimeType } from './mime-type.validator';

// better use a service class
@Component({
  selector: 'app-ajout',
  templateUrl: './ajouterproduit.component.html',
  styleUrls: ['./ajouterproduit.component.scss']
})
export class AjouterProduitComponent implements OnInit {

  selectedFile: ImageSnippet;
  registerForm: FormGroup;
  submitted = false;
  stores:StoreType[];
  NStore:number;
  Nprice:number;
  imagePreview: string;
  file:File;

  corporation:any;

  constructor(private formBuilder: FormBuilder,private productService:ProductService) { }




  ngOnInit() {

console.log(this.corporation);


    this.registerForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),


    });

    this.registerForm = this.formBuilder.group({
      nameProduct: ['', Validators.required],
      referance: ['', Validators.required],
      price: ['', Validators.required],
      StoreName: ['', [Validators.required]],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      acceptTerms: [false, Validators.requiredTrue]
  }, {

  });
  this.productService.listStore().subscribe(response => this.stores = response);
}
  get f() { return this.registerForm.controls; }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
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




  onSubmit() {
      this.submitted = true;

      //get values from html for product
      let productName=this.registerForm.controls['nameProduct'].value;
      let reference=this.registerForm.controls['referance'].value;
      let price=this.registerForm.controls['price'].value;
      let StoreName=this.registerForm.controls['StoreName'].value;
      this.Nprice =parseInt(price);
      this.NStore =parseInt(StoreName)


      console.log(productName,reference,this.Nprice,this.NStore);
      this.productService.addProduct(productName,reference,this.Nprice,this.NStore,this.file.name);

  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}














