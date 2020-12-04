import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Event } from '../entities/event';
import { NbDialogService, NbToastrService, NbComponentStatus } from '@nebular/theme';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
const API_STORE = 'http://localhost:3000/store/';
const API_EVENT = 'http://localhost:3000/event/';

@Injectable({
    providedIn: 'root'
  })
 export class EventService {

    private index: number = 0;
    token: any;
    private httpOptions;

    user: any ;
    constructor(private http: HttpClient,
       private router: Router,private dialogService: NbDialogService,
       private toastrService: NbToastrService,
         private authService: NbAuthService
         ) {


        this.authService.onTokenChange()
        .subscribe((token: NbAuthJWTToken) => {

          if (token.isValid()) {
            this.user = token.getPayload();

            console.log(this.user.storeid);

            console.log(token.getValue()) // here we receive a payload from the token and assigns it to our `user` variable
          }

        });
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



    listEvent(StoreId:number) {
      let headers_object;
      headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );
        return this.http.post('http://localhost:3000/store/getEvents',{StoreId:StoreId},this.httpOptions);


      }
      addEvent(EventName: String, EventType: String , EventDate: String,NumberOfClients:number,NotifyWay:number) {
        const event  = { id: null, EventName, EventType,"StoreId":this.user.storeid,  EventDate,NumberOfClients,NotifyWay};
        console.log("Event Inside SERVICE")
        console.log(event)


        // tslint:disable-next-line: prefer-const

        let headers_object;
        headers_object = new  HttpHeaders().set('Content-Type', 'text/plain' );


        this.http
         .post(API_STORE + 'createEvent', event,this.httpOptions )
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
              }else if(error.status == 200){
                this.showToast("success",5000);
              }

             });

           }
           showToast(status: NbComponentStatus,duration) {
            this.toastrService.show(status, `EVENT ADDED SUCCESSFULLY: ${++this.index}`, { status });
          }

          async deleteEvent(id:number){

            this.http.delete(API_EVENT+'delete/'+id,this.httpOptions).subscribe(
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
