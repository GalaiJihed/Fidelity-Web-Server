import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { EventService } from '../_event_service/event.service';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NumberValueAccessor } from '@angular/forms';
import {Event} from '../entities/event';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
@Component({
  selector: 'ngx-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.scss'],
})
export class ViewEventComponent implements OnInit {

events:any ={};
StoreId:number;
user : any;
private httpOptions;
  settings = {


    actions:{
      add:false
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'

      ,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave:true,


    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },

    columns: {

      eventName: {
        title: 'Event Name',
        type: 'string',
      },
      eventType: {
        title: 'Event Type',
        type: 'string',
        editor: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              {value: '2', title:'Sponsorship'},
              {value: '1', title:'Brand Mudic'},
              {value: '0', title:'Happy Hour'}
            ]
          }
        }

      },
      eventDate: {
        title: 'Event Date',
        type: 'date',
      },






      },


  };

  source: LocalDataSource = new LocalDataSource();
  token: any;

  constructor(private service: EventService, private router:Router,private http: HttpClient,private authService: NbAuthService) {
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
    this.authService.onTokenChange()

    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload();

       console.log(this.user.storeid);
this.StoreId=this.user.storeid;
        console.log(token.getValue()) // here we receive a payload from the token and assigns it to our `user` variable
      }

    });}
  ngOnInit(): void {

  //  console.log(this.StoreId);
    this.service.listEvent(this.user.storeid).subscribe(response => {

      //datacolumn : DataTableColumns = new DataTableColumns();
           this.events = response
           console.log(response);
      /*
           this.stores.forEach(element => {
            console.log(element);



           });  */
         this.source.load(this.events);


        });




   };


  onDeleteConfirm(event): void {

    if (window.confirm('Are you sure you want to delete?')) {
      console.log(event.data.id);
      this.service.deleteEvent(event.data.id);

      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }


  onEditConfirm(event): void {


    if (window.confirm('Are you sure you want to update?')) {
      var data = {
        "eventName" : event.newData.eventName,
        "eventType" : event.newData.eventType,
        "eventDate" : event.newData.eventDate,
        "id" : event.newData.id,
        };


    this.http.post<Event>('http://localhost:3000/event/edit/',data,this.httpOptions).subscribe(
      res => {
        console.log(event.newData.id)
        event.confirm.resolve(event.newData.eventName);
    },
    (err: HttpErrorResponse) => {
      if (window.confirm('Are you sure you want to update?')) {
        console.log(event.newData.id)

      } else {
        event.confirm.reject();
      }


    });
    event.confirm.resolve(event.newData);


    } else {
      event.confirm.reject();
    }
  }
}
