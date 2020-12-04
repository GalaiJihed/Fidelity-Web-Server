import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';

import { NbDialogService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
const uploadAPI = 'http://localhost:3000/uploads';



@Injectable({
  providedIn: 'root'
})
export class UploadService {


  
  private index: number = 0;
  token: any;
  user: any ;
  constructor(private http: HttpClient, private router: Router,private dialogService: NbDialogService,private toastrService: NbToastrService,  private authService: NbAuthService) {


    let headers_object;
    headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload();

        console.log(this.user.storeid);

        console.log(token.getValue()) // here we receive a payload from the token and assigns it to our `user` variable 
      }

    });


   }

  // tslint:disable-next-line: ban-types
  

      public uploadImage(image: File) {
        const formData = new FormData();

        formData.append('image', image);

        return this.http.post(uploadAPI, formData);
      }




           }








