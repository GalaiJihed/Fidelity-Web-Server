import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Manager } from '../entities/Manager';
import { NbDialogService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
const uploadAPI = 'http://localhost:3000/uploads';
const API_PRODUCT = 'http://localhost:3000/product/';
const API_STORE = 'http://localhost:3000/store/';
const UPLOAD_IMAGE = 'http://localhost:3000/';
const API_MANAGERS ="http://localhost:3000/user/";


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private index: number = 0;
  token: any;

  private httpOptions;
  constructor(private http: HttpClient,
    private router: Router,private dialogService: NbDialogService
    ,private toastrService: NbToastrService,
    private authService: NbAuthService) {
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
            console.log('success');
          }

         });

       }



       // tslint:disable-next-line: max-line-length
       CreateManager(firstName: string, lastName: string, email: string, password: string, address: string, phoneNumber: number, birthDate: String, postalCode: String, city: String ){
        const authData = { firstName,
          lastName, email, password, address, phoneNumber, birthDate , postalCode, city};
          this.http
          .post('http://localhost:3000/user/managers/new', authData,this.httpOptions  )
          .subscribe(response => {

          }, (error: HttpErrorResponse) => {
            console.log('HTTPERROR');
            console.log(error);
            if (error.status == 400) {

            } else if (error.status == 409) {

          } else if (error.status == 401) {


          }else if(error.status == 201){
            this.showToastAddedSuccssfully("success",5000)
            this.router.navigateByUrl('/admin/manager/view-manager')

          }
          });

      }
      showToastAddedSuccssfully(status: NbComponentStatus,duration) {
        this.toastrService.show(status, `MANAGER ADDED SUCCESSFULLY: ${++this.index}`, { status });
      }


      listManager() {

        return this.http.get<Manager[]>(API_MANAGERS + 'managers',this.httpOptions);
      }




   async deleteManager(id:number){

              this.http.delete(API_MANAGERS+'managers/'+id,this.httpOptions).subscribe(
                res => {
                  console.log(res);
              },
              (err: HttpErrorResponse) => {
                if (err.error instanceof Error) {
                  console.log("Client-side error occured.");
                } else {
                  console.log("Server-side error occured.");
                }
              });

            }






           }








