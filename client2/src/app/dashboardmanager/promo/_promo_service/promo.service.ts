import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Product } from '../entities/Product';
import { Store } from '../entities/Store';
import { NbDialogService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
const uploadAPI = 'http://localhost:3000/uploads';
const API_PRODUCT = 'http://localhost:3000/product/';
const API_STORE = 'http://localhost:3000/store/';
const UPLOAD_IMAGE = 'http://localhost:3000/';


@Injectable({
  providedIn: 'root'
})
export class PromoService {



  private index: number = 0;
  token: any;
  private httpOptions;
  user: any ;
  constructor(private http: HttpClient, private router: Router,private dialogService: NbDialogService,private toastrService: NbToastrService,  private authService: NbAuthService) {







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


  // tslint:disable-next-line: ban-types
  addProduct(ProductName: String, Reference: String , Price: number, storeID: number, Image: String) {
    const product  = { id: null, ProductName, Reference, Price, storeID, Image};
    console.log("Product Inside SERVICE")
    console.log(product)


    // tslint:disable-next-line: prefer-const

    let headers_object;
    headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );




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
          }else if(error.status == 201){
            this.showToast("success",5000);
          }

         });

       }

       listStore(): Observable<Store[]> {
        return this.http.get<Store[]>(API_STORE + 'stores');
      }





      list(StoreId:number) {
      return   this.http.post<Product[]>('http://localhost:3000/product/getByStoreId',{StoreId:StoreId},this.httpOptions);
      }




updatereduction( ProductId: number, Reduction: number ){

    const reduction  = {  ProductId, Reduction};
     this.http.post('http://localhost:3000/product/update',reduction);
}





            showToast(status: NbComponentStatus,duration) {
              this.toastrService.show(status, `PROMO ADDED SUCCESSFULLY: ${++this.index}`, { status });
            }



           }








