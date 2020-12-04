import { Component, OnInit, Inject, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Store } from '../../product/entities/Store';
import { Observable } from 'rxjs';
import { mimeType } from './mime-type.validator';
import{ UploadService}from '../upload-service/upload.service'
import * as XLSX from 'xlsx';  
import * as FileSaver from 'file-saver';

@Component({
  selector: 'ngx-form-inputs',
  styleUrls: ['./add-database.component.scss'],
  templateUrl: './add-database.component.html',
})
export class AddDatabaseComponent implements OnInit  {
 
  title = 'read-excel';  
  storeData: any;  
  csvData: any;  
  jsonData: any;  
  textData: any;  
  selectedFile: ImageSnippet;
  htmlData: any;  
  imagePreview: string;
  fileUploaded: File;  
  registerForm: FormGroup;
  worksheet: any;  
  constructor(protected service: NbAuthService,private upload :UploadService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
   
  }
  processFile(imageInput: any) {  
    this.fileUploaded = imageInput.files[0];
    const reader = new FileReader();
    this.fileUploaded = (event.target as HTMLInputElement).files[0];
   // this.registerForm.patchValue({ image: this.fileUploaded });
  //  this.registerForm.get('image').updateValueAndValidity();

  reader.onload = () => {
    this.imagePreview = reader.result as string;
  };
    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, this.fileUploaded);

      this.selectedFile.pending = true;
      this.upload.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(this.fileUploaded);
    console.log(this.fileUploaded.name)
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