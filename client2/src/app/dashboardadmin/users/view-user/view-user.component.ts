import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { ServiceClient } from '../_services_users/service_client';
import { User } from '../entities/User';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';



@Component({
  selector: 'ngx-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  users:any ={}

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

      firstName: {
        title: 'firstName',
        type: 'string',
      },
      lastName: {
        title: 'lastName',
        type: 'string',
      },
      email: {
        title: 'email',
        type: 'string',
      },
      phoneNumber: {
        title: 'phoneNumber',
        type: 'number',
      },
      address: {
        title: 'Address',
        type: 'string',
      },
      birthDate: {
        title: 'BirthDate',
        type: 'date',
      },
      city: {
        title: 'City',
        type: 'string',
      },
      postalCode: {
        title: 'PostalCode',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  token: any;
  private httpOptions;

  constructor(private service: ServiceClient,
     private router:Router,
     private http: HttpClient,
     private authService: NbAuthService) {}
  ngOnInit(): void {


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
    this.service.listUsers().subscribe(response => {

      //datacolumn : DataTableColumns = new DataTableColumns();
           this.users = response
           console.log(response);
      /*
           this.stores.forEach(element => {
            console.log(element);



           });  */
         this.source.load(this.users);




        });

   };
   onEditConfirm(event): void {

    var data = {"firstName" : event.newData.firstName,
    "lastName" : event.newData.lastName,
    "email" : event.newData.email,
    "phoneNumber" : event.newData.phoneNumber,
    "address" : event.newData.address,
    "birthDate" : event.newData.birthDate,
    "city" : event.newData.city,
    "postalCode" : event.newData.postalCode,
    };
    this.http.post<User>('http://localhost:3000/user/clients/edit',data,this.httpOptions).subscribe(
      res => {
       console.log(event.newData.firstName)
        event.confirm.resolve(event.newData);
    },
    (err: HttpErrorResponse) => {
      if (window.confirm('Are you sure you want to update?')) {
     //   console.log(event.newData.firstName)


      } else {
        event.confirm.reject();
      }
    });
  }



  onDeleteConfirm(event): void {
    console.log(event.data.id)
    if (window.confirm('Are you sure you want to delete?')) {
      console.log(event.data.id)
      this.service.deleteUser(event.data.id)
      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }
}
