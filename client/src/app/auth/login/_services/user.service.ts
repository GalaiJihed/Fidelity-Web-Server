import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + '/admins/me', { responseType: 'text' });
  }

  getManager(): Observable<any> {
    return this.http.get(API_URL + '/managers/me', { responseType: 'text' });
  }

  getClient(): Observable<any> {
    return this.http.get(API_URL + '/clients/me', { responseType: 'text' });
  }

}
