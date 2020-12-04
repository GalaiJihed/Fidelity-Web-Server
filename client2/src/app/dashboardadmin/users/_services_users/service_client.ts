import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbDialogService } from '@nebular/theme';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { User } from '../entities/User';

const API_CLIENT = 'http://localhost:3000/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceClient {
  token: any;
  private httpOptions;
  constructor(private http: HttpClient,
    private authService: NbAuthService,
    private dialogService: NbDialogService) {

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

  Created() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
  ErrorWithPhoneNumber() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Check PhoneNumber',
        message:'Phone number already exists',

      },
    });
  }
  open() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title:'Success',
        message: 'Your Client added Successfully'

      },
    });
  }
  ErrorWithColumn() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Verify',
        message: 'Verify Your Column'
      },
    });
  }
  ErrorToken() {
    this.dialogService.open(ShowcaseDialogComponent, {
      context: {
        title: 'Access expired',
        message:'Your acces is expired try to connect again'
      },
    });
  }

  CreateUser(firstName: string, lastName: string, email: string, password: string, address: string, phoneNumber: number, birthDate: String, postalCode: String, city: String ){
    const authData = { firstName,
      lastName, email, password, address, phoneNumber, birthDate , postalCode, city};
      this.http
      .post('http://localhost:3000/user/clients/new', authData ,this.httpOptions )
      .subscribe(response => {

      }, (error: HttpErrorResponse) => {
        console.log('HTTPERROR');
        console.log(error);
        if (error.status == 400) {
         this.ErrorWithColumn()
        } else if (error.status == 409) {
        this.ErrorWithPhoneNumber();
      } else if (error.status == 401) {
       this.ErrorToken();

      }else if(error.status == 201){
        this.open()
      }
      });

}
listUsers() {


  return this.http.get<User[]>(API_CLIENT + 'clients',this.httpOptions);
}


async deleteUser(id:number){

  this.http.delete(API_CLIENT+'clients/'+id,this.httpOptions).subscribe(
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
