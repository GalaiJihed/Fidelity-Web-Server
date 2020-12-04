import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { AuthService } from 'src/app/auth/login/_services/auth.service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Store } from '../entities/Store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ManagerName } from '../entities/ManagerName';


const uploadAPI = 'http://localhost:3000/uploads';
const API_STORE = 'http://localhost:3000/store/';
const API_MANAGERS = 'http://localhost:3000/user/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class storeService {

  constructor(private http: HttpClient, private router: Router , private authService: AuthService) { }

  // tslint:disable-next-line: ban-types
  addStore(storeName: String, storeAddress: String , storeRef: String, storeType: String, storeManager: ManagerName,Image:string) {
    // tslint:disable-next-line: max-line-length
    const store: Store = { StoreName: storeName , StoreAdress: storeAddress, StoreRef: storeRef, StoreType: storeType , StoreManager: storeManager,Image:Image};

    // tslint:disable-next-line: prefer-const
    let  tokenheader = this.authService.getAuthData().token;
    let headers_object;
    headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
    headers_object = new HttpHeaders().set('auth', tokenheader);
    console.log(store)
    console.log(tokenheader);

    this.http
     .post(API_STORE+'new', store )
     .subscribe(response => {
       //    console.log(this.getAuthData().token)
           console.log(response);
          },
           (error: HttpErrorResponse) => {
           console.log('HTTPERROR');
           console.log(error);
           // tslint:disable-next-line: triple-equals
           if (error.status == 404) {
            console.log('Please Verify manager');
           // tslint:disable-next-line: triple-equals
           } else if (error.status == 409) {
           console.log('reference is already exist');
          // tslint:disable-next-line: triple-equals

          } else if (error.status == 400) {
            console.log('missing data');
           // tslint:disable-next-line: triple-equals
          }

         });

       }

       listManager() {
        let  tokenheader = this.authService.getAuthData().token;
        let headers_object;
        headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
        headers_object = new HttpHeaders().set('auth', tokenheader);

        console.log(tokenheader);
        return this.http.get<ManagerName[]>(API_MANAGERS + 'managers');
      }
      public uploadImage(image: File){
        const formData = new FormData();

        formData.append('image', image);

        return this.http.post(uploadAPI, formData);
      }

      listStore() {
        let  tokenheader = this.authService.getAuthData().token;
        let headers_object;
        headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
        headers_object = new HttpHeaders().set('auth', tokenheader);

        console.log(tokenheader);
        return this.http.get<Store[]>(API_STORE + 'stores');
      }

}
