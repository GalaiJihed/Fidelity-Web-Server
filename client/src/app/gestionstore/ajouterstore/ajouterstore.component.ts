import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { storeService } from '../_service_store/store_service';
import { ManagerName } from '../entities/ManagerName';
import { mimeType } from 'src/app/gestiondesProduits/ajouterproduit/mime-type.validator';

@Component({
  selector: 'app-store',
  templateUrl: './ajouterstore.component.html',
  styleUrls: ['./ajouterstore.component.scss']
})
export class AjouterStoreComponent implements OnInit {


  registerForm: FormGroup;
  submitted = false;
  managers: ManagerName[];
  selectedFile: ImageSnippet;
  imagePreview: string;
  file: File;

  constructor(private formBuilder: FormBuilder, private storeservice: storeService ) { }



  ngOnInit() {
    this.registerForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),


    });
    this.registerForm = this.formBuilder.group({

      storeName: ['', Validators.required],
      storeAdress: ['', Validators.required],
      storeReference: ['', Validators.required],
      StoreOwner: ['', Validators.required],
      storeType: ['', Validators.required],
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      }),
      acceptTerms: [false, Validators.requiredTrue]
    }, {

    });
    // get Manager
    this.storeservice.listManager().subscribe(response => this.managers = response);
  }
  get f() { return this.registerForm.controls; }
  Logout(){
  //  this.authService.logout();

  }
  onSubmit(event) {
    event.preventDefault();
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {

    }

    // get values from html for store
    const storeName = this.registerForm.controls.storeName.value;
    const storeAdress = this.registerForm.controls.storeAdress.value;
    const storeReference = this.registerForm.controls.storeReference.value;
    const StoreOwner = this.registerForm.controls.StoreOwner.value;
    const storeType = this.registerForm.controls.storeType.value;
    this.storeservice.addStore(storeName, storeAdress, storeReference, storeType, StoreOwner,this.file.name);
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
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
