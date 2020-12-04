import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { ManagerService } from '../_services_users/service_client';
import { Manager } from '../entities/Manager';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';


@Component({
  selector: 'ngx-view-manager',
  templateUrl: './view-manager.component.html',
  styleUrls: ['./view-manager.component.scss'],
})
export class ViewManagerComponent implements OnInit {
  managers:any ={}
  token: any;
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


  constructor(private service: ManagerService,
    private authService: NbAuthService,
     private router:Router,
     private http: HttpClient) {}
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
    this.service.listManager().subscribe(response => {

      //datacolumn : DataTableColumns = new DataTableColumns();
           this.managers = response
           console.log(response);
      /*
           this.stores.forEach(element => {
            console.log(element);



           });  */
         this.source.load(this.managers);




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
    this.http.post<Manager>('http://localhost:3000/user/managers/edit',data,this.httpOptions).subscribe(
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
      this.service.deleteManager(event.data.id)
      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }
}
