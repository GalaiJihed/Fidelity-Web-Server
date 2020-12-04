import { Component, OnInit } from '@angular/core';
import { StoreType } from '../entities/StoreType';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductService } from '../_product_service/product.service';
import { mimeType } from '../ajouterproduit/mime-type.validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editproduit',
  templateUrl: './editproduit.component.html',
  styleUrls: ['./editproduit.component.css']
})
export class EditproduitComponent implements OnInit {

  selectedFile: ImageSnippet;
  registerForm: FormGroup;
  submitted = false;
  stores: StoreType[];
  NStore: number;
  Nprice: number;
  imagePreview: string;
  file: File;
  id: number;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private route: ActivatedRoute) {

    this.
route.
params.
subscribe(params => {
console.log(params);
this.id = params.id;
});
  }




  ngOnInit() {




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
        });
    });

     reader.readAsDataURL(this.file);
     console.log(this.file.name);
  }




  onSubmit() {
      this.submitted = true;

      // get values from html for product
      const productName = this.registerForm.controls.nameProduct.value;
      const reference = this.registerForm.controls.referance.value;
      const price = this.registerForm.controls.price.value;
      const StoreName = this.registerForm.controls.StoreName.value;
      this.Nprice = parseInt(price);
      this.NStore = parseInt(StoreName);

      if(this.file == null){
        alert("image null ");
      }
      console.log(this.id,productName, reference, this.Nprice, this.NStore);
      this.productService.updateProduct(this.id,productName, reference, this.Nprice, this.NStore, this.file.name,this.NStore);

  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
}














