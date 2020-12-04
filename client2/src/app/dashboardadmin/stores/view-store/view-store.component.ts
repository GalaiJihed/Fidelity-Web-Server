import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import {storeService} from  '../_service_store/store_service';
import {Store} from '../entities/Store';
import { Manager } from '../entities/Manager';
import { ListKeyManager } from '@angular/cdk/a11y';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { ButtonRenderComponent } from './button.render.component';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';


@Component({
  selector: 'ngx-view-store',
  templateUrl: './view-store.component.html',
  styleUrls: ['./view-store.component.scss'],
})
export class ViewStoreComponent implements OnInit {
  stores:any = {}
  managers: Manager[]
  token: any;
  private httpOptions;

  settings = {


    actions:{
      add:false,

   // custom: [{ name: 'ourCustomAction', title: '<i class="nb-compose"></i>' }],


    },

    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>'


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
      Image: {
        title: 'Image',
        type: 'html',
        width:'5%',
        height:'5%',
        valuePrepareFunction: (data) => { return '<img width="100%" height="100% " src= http://localhost:3000/images/'+ data +'>' }


      },
      StoreName: {
        title: 'Store Name',
        type: 'string',
      },
      StoreAdress: {
        title: 'Store Adress',
        type: 'string',
      },
      StoreType: {
        title: 'Store Type',
        type: 'string',
      },

      StoreRef: {
        title: 'Store Reference',
        type: 'string',
      },

      button: {
        title: 'Update Image',
        type: 'custom',
        filter:false,
        renderComponent: ButtonRenderComponent,
        defaultValue: 'TEST TEST',
        editor: {
          type: 'custom',
          component: ButtonRenderComponent,
        },
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private service: storeService,
     private router:Router,
    private  http: HttpClient,
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
  ngOnInit(): void {
    this.service.listStore().subscribe(response => {

      //datacolumn : DataTableColumns = new DataTableColumns();
           this.stores = response
           console.log(response);
      /*
           this.stores.forEach(element => {
            console.log(element);



           });  */
         this.source.load(this.stores);


      //   this.service.listManager().subscribe(response => {this.managers = response;  console.log(this.managers)});

        });

   };
   onEditConfirm(event): void {
   if (window.confirm('Are you sure you want to update?')) {
    console.log(event.newData.ProductName)

  var data = {"StoreName" : event.newData.StoreName,
  "StoreAdress" : event.newData.StoreAdress,
  "StoreType" : event.newData.StoreType,
  "StoreManager" : event.newData.StoreManager,
  "StoreRef" : event.newData.StoreRef,
  "id" : event.newData.id,
  };
  console.log(this.httpOptions)
  this.http.post<Store>('http://localhost:3000/store/edit/',data,this.httpOptions).subscribe(
    res => {

      console.log(event.newData.StoreManager)
      event.confirm.resolve(event.newData);
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

  onDeleteConfirm(event): void {
    console.log(event.data.id)
    if (window.confirm('Are you sure you want to delete?')) {
   this.service.deleteStore(event.data.id);

      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
