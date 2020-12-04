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
export class ProductService {



  private index: number = 0;
  token: any;
  private httpOptions;

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
    console.log(product);

    this.http
     .post(API_PRODUCT + 'new', product,this.httpOptions )
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

      public uploadImage(image: File) {
        const formData = new FormData();

        formData.append('image', image);

        return this.http.post(uploadAPI, formData);
      }




      list(){
        return this.http.get<Product[]>('http://localhost:3000/product/all',this.httpOptions);


      }


      updateProduct() {




        // tslint:disable-next-line: prefer-const






        this.http
         .post(API_PRODUCT + 'edit',this.httpOptions )
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
                console.log('token');
               //}
              }
             });

           }









            Created() {
              this.dialogService.open(ShowcaseDialogComponent, {
                context: {
                  title: 'SUCCESS',
                  message: 'PRODUCT ADDED SUCCESSFULLY'
                },
              });
            }
            showToast(status: NbComponentStatus,duration) {
              this.toastrService.show(status, `PRODUCT ADDED SUCCESSFULLY: ${++this.index}`, { status });
            }

            async deleteProduct(id:number){
              console.log("service")
              console.log(id)


              this.http.delete(API_PRODUCT+'delete/'+id,this.httpOptions).subscribe(
                res => {
                  console.log(res);
              },
              (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side .");
                }
              });

            }

           }








