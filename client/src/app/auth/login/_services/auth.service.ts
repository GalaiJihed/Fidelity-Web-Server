import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AuthData } from '../models/AuthData';
import { Router } from '@angular/router';
import { Client } from 'src/app/gestionduprofile/Entities/Client';
import 'rxjs/add/operator/map';
import { Manager } from 'src/app/gestionduprofile/Entities/Manager';
import { TokenStorageService } from './token-storage.service';
import { ManagerName } from 'src/app/gestionstore/entities/ManagerName';
const AUTH_API = 'http://localhost:3000/auth/';
const API_REGISTER = 'http://localhost:3000/user/clients/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const httpOptions2 = {

  headers: new HttpHeaders({

   'Content-Type':  'application/json',

   auth:  'token'

  })};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  private token: string;
  private role: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router,private tokenStorageService:TokenStorageService) {

  }

  login(phoneNumber: string, password: string) {
    const authData: AuthData = { phoneNumber, password, typeAccount: 'ADMIN' };
    this.http.post(AUTH_API + 'login', JSON.stringify(authData), httpOptions
    )
      .subscribe((response: any) => {
        const token = response.token;
        const role = response.role;
        this.role = role;
        this.token = token;
        if (token) {

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          console.log('token:' + token);
          this.saveAuthData(token, role);
          this.router.navigate(['/dashboard']);
          this.tokenStorageService.saveToken(this.token)

        }
      });
  }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  public getRole() {

    const role = localStorage.getItem('role');

    if (!role) {
      return;
    }
    return {
      role

    };

  }

  public getAuthData() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token && role) {
      return;
    }
    return {
      token,
      role

    };

  }


  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');

  }
  // tslint:disable-next-line: max-line-length
  createUser(firstName: string, lastName: string, email: string, password: string, address: string, phoneNumber: number, birthDate: String, postalCode: String, city: String) {
    const authData: Client = { firstName,
       lastName, email, password, address, phoneNumber, birthDate , postalCode, city};

    const  tokenheader = this.getAuthData().token;
    let headers_object;
    headers_object = new  HttpHeaders().set( 'Content-Type', 'text/plain' );
    headers_object = new HttpHeaders().set('auth', tokenheader);

    console.log(tokenheader);

    this.http
      .post('http://localhost:3000/user/clients/new', authData , headers_object)
      .subscribe(response => {
        //    console.log(this.getAuthData().token)
            console.log(response);
          });
      }

      // tslint:disable-next-line: max-line-length
      createManager(firstName: string, lastName: string, email: string, password: string, address: string, phoneNumber: number, birthDate: String, postalCode: String) {
        const authData: Manager = { firstName,
           lastName, email, password, address, phoneNumber, birthDate , postalCode};

        const  tokenheader = this.getAuthData().token;
        let headers_object;
        headers_object = new  HttpHeaders().set( 'Content-Type', 'text/plain' );
        headers_object = new HttpHeaders().set('auth', tokenheader);

        console.log(tokenheader);

        this.http
          .post('http://localhost:3000/user/managers/new', authData )
          .subscribe(response => {
            //    console.log(this.getAuthData().token)
                console.log(response);
              }, (error: HttpErrorResponse) => {
                console.log('HTTPERROR');
                console.log(error);
                if (error.status == 400) {
                 console.log('bad request');
                } else if (error.status == 409) {
                console.log('phone already exist');
 } else if (error.status == 401) {
                alert('phone already exist');
 }

              });




            }

getAdmin(){
  const  tokenheader = this.getAuthData().token;
  let headers_object;
  headers_object = new  HttpHeaders().set( 'Content-Type', 'text/plain' );
  headers_object = new HttpHeaders().set('auth', tokenheader);

  console.log(tokenheader);

  return this.http
    .post('http://localhost:3000/user/admins/me', headers_object );

}

}
