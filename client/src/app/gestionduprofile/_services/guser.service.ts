import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Router } from '@angular/router';
import { Client } from '../Entities/Client';
const API_Client = 'http://localhost:3000/user/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class GestionUsers {

  constructor(private http: HttpClient, private router: Router) { }




}
