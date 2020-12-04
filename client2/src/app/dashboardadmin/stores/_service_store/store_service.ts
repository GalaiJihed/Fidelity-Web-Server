import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Store } from '../entities/Store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manager } from '../entities/Manager';
import { NbDialogService, NbComponentStatus, NbToastrService } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
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
  token: any;
  private httpOptions;
  private index: number = 0;
  constructor(private http: HttpClient,
    private router: Router,
    private dialogService: NbDialogService,
    private toastrService:NbToastrService ,
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
  addStore(storeName: String, storeAddress: String , storeRef: String, storeType: String, storeManager: Manager,Image:string) {
    // tslint:disable-next-line: max-line-length
    const store: Store = { StoreName: storeName , StoreAdress: storeAddress, StoreRef: storeRef, StoreType: storeType , StoreManager: storeManager,Image:Image};

    this.http
     .post(API_STORE+'new', store ,this.httpOptions )
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
          }else if(error.status == 201){
            this.showToast("success",5000);
            this.router.navigateByUrl('/admin/stores/view-store')
          }

         });

       }

       listManager(): Observable<Manager[]> {

        return this.http.get<Manager[]>(API_MANAGERS + 'managers');
      }
      public uploadImage(image: File){
        const formData = new FormData();

        formData.append('image', image);

        return this.http.post(uploadAPI, formData);
      }

      listStore() {



        return this.http.get<Store[]>(API_STORE + 'stores',this.httpOptions);
      }


      async deleteStore(id:number){

        this.http.delete(API_STORE+'delete/'+id,this.httpOptions).subscribe(
          res => {
            console.log(res);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Store Deleted Successfully.");
          } else {
            console.log("Problem.");
          }
        });

      }
      showToast(status: NbComponentStatus,duration) {
        this.toastrService.show(status, `STORE ADDED SUCCESSFULLY: ${++this.index}`, { status });
      }

}
