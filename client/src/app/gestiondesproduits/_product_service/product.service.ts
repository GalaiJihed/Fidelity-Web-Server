import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Product } from '../entities/Product';
import { AuthService } from 'src/app/auth/login/_services/auth.service';
import { StoreType } from '../entities/StoreType';
const uploadAPI = 'http://localhost:3000/uploads';
const API_PRODUCT = 'http://localhost:3000/product/';
const API_STORE = 'http://localhost:3000/store/';
const UPLOAD_IMAGE = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private router: Router , private authService: AuthService) {

    let  tokenheader = this.authService.getAuthData().token;
    let headers_object;
    headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
    headers_object = new HttpHeaders().set('auth', tokenheader);

    console.log(tokenheader);
   }

  // tslint:disable-next-line: ban-types
  addProduct(ProductName: String, Reference: String , Price: number, storeID: number, Image: String) {
    const product: Product = { id: null, ProductName, Reference, Price, storeID, Image, ProductStore: null };



    // tslint:disable-next-line: prefer-const
    let  tokenheader = this.authService.getAuthData().token;
    let headers_object;
    headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
    headers_object = new HttpHeaders().set('auth', tokenheader);
    console.log(product);
    console.log(tokenheader);

    this.http
     .post(API_PRODUCT + 'new', product,headers_object )
     .subscribe(response => {
       //    console.log(this.getAuthData().token)
           console.log(response);
          },
           (error: HttpErrorResponse) => {
           console.log('HTTPERROR');
           console.log(error);
           // tslint:disable-next-line: triple-equals
           if (error.status == 404) {
            console.log('Please Verify storeID');
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

       listStore(): Observable<StoreType[]> {
        return this.http.get<StoreType[]>(API_STORE + 'stores');
      }

      public uploadImage(image: File) {
        const formData = new FormData();

        formData.append('image', image);

        return this.http.post(uploadAPI, formData);
      }




      list(): Observable<Product[]> {
        return this.http.get<Product[]>('http://localhost:3000/product/all');


      }


      updateProduct(id ,ProductName: String, Reference: String , Price: number, storeID: number, Image: String,ProductStore:any) {
        const product = { id, ProductName, Reference, Price, storeID, Image,ProductStore };



        // tslint:disable-next-line: prefer-const
        let  tokenheader = this.authService.getToken();
        let headers_object;
        headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
        headers_object = new HttpHeaders().set('auth', tokenheader);
        console.log(product+"//");
        console.log(tokenheader);

        this.http
         .post(API_PRODUCT + 'editwithimage', product,headers_object )
         .subscribe(response => {
           //    console.log(this.getAuthData().token)
               console.log("Success");
              },
               (error: HttpErrorResponse) => {
               console.log('HTTPERROR');
               console.log(error);
               // tslint:disable-next-line: triple-equals
               if (error.status == 404) {
                console.log('Please Verify storeID');
               // tslint:disable-next-line: triple-equals
               } else if (error.status == 409) {
               console.log('reference is already exist');
              // tslint:disable-next-line: triple-equals
            } else if (error.status == 402) {
              console.log('Product Not Found');
             // tslint:disable-next-line: triple-equals
              } else if (error.status == 400) {
                console.log('missing data');
               // tslint:disable-next-line: triple-equals
              } else if (error.status == 401) {
                console.log('Unauthorized');
               //}
              }
             });

           }



            deleteProduct(id:number): Observable<any>{
              let  tokenheader = this.authService.getAuthData().token;
              let headers_object;
              headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
              headers_object = new HttpHeaders().set('auth', tokenheader);

              console.log(tokenheader);
            return  this.http.delete(API_PRODUCT+'delete/'+id,headers_object);
            }





           }








