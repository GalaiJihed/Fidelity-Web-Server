import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Manager } from '../entities/Manager';
import { NbDialogService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
const uploadAPI = 'http://localhost:3000/uploads';
const API_PRODUCT = 'http://localhost:3000/product/';
const API_STORE = 'http://localhost:3000/store/';
const UPLOAD_IMAGE = 'http://localhost:3000/';
const API_MANAGERS ="http://localhost:3000/user/";
const API_SUBSCRIPTION="http://localhost:3000/managers/";


@Injectable({
  providedIn: 'root'
})
export class SubService {
  private index: number = 0;
  token: any;
  private httpOptions;
  constructor(private http: HttpClient,
     private router: Router,
     private dialogService: NbDialogService,
     private toastrService: NbToastrService,
     private authService: NbAuthService)
     {

      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.token = token.getValue();
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'auth': this.token
            })
          };
        }
      });

      }







      listManager() {

        return this.http.get<Manager[]>(API_MANAGERS + 'managers');
      }




  addSubscription(phoneNumber: number,SubscriptionType:String,SubscriptionEndDate: String) {
    const manager  = {phoneNumber, SubscriptionType,SubscriptionEndDate};



    this.http
     .post('http://localhost:3000/user/managers/subscription', manager,this.httpOptions )
     .subscribe(response => {
       //    console.log(this.getAuthData().token)
           console.log(response);
          },
           (error: HttpErrorResponse) => {
           console.log('HTTPERROR');
           console.log(error);
           // tslint:disable-next-line: triple-equals
           if (error.status == 404) {
            this.showToastAddedSuccssfully("danger",5000);
           // tslint:disable-next-line: triple-equals
           } else if (error.status == 409) {
            this.showToastAddedSuccssfully("danger",5000);
          // tslint:disable-next-line: triple-equals

          } else if (error.status == 400) {
            this.showToastAddedSuccssfully("danger",5000);
           // tslint:disable-next-line: triple-equals
          }else if(error.status == 200){
      this.showToastAddedSuccssfully("success",5000);
          }

         });

       }



       showToastAddedSuccssfully(status: NbComponentStatus,duration) {
        this.toastrService.show(status, `SUBSCRIPTION ADDED SUCCESSFULLY: ${++this.index}`, { status });
      }




           }








