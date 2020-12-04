import { Component, OnInit } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { mimeType } from '../mime-type.validator';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { storeService } from '../../_service_store/store_service';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { Store } from '../../entities/Store';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
@Component({
  template: `
    <form class="form"   >
    <button nbButton fullWidth status="primary" size="large" mat-stroked-button type="button" (click)="filePicker.click()">Pick Image</button>
    <input type="file"input #imageInput
      #filePicker
    accept="image/*"
   >
    <br>
    <br>
    <div class="image-preview"   *ngIf="imagePreview !== '' && imagePreview && registerForm.get('image').valid">
    <img [src]="imagePreview" class="displayed" style="width: 80px;height:80px;align-content: center; display: block;
    margin-left: auto;
    margin-right: auto;" >
  </div>
  <button 
size="large"
>
Confirm

</button>
     
    </form>
  `,
  styleUrls: ['window-form.component.scss'],
})
export class WindowFormComponent implements OnInit  {



  selected:any;
  selectedFile: ImageSnippet;
  imagePreview: string;
  file: File;
  registerForm: FormGroup;
 
  constructor(public windowRef: NbWindowRef,private storeservice:storeService,private  http: HttpClient) {}
 ngOnInit(){
  

  }
  
  

  close() {
    this.windowRef.close();
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

}
class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {}
  
}
