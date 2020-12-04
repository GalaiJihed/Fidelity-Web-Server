import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { ProductService } from '../_product_service/product.service';
import {Store} from '../entities/Store';
import { Product } from '../entities/Product';
import { ManagerService } from '../../manager/_services_users/service_client';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
@Component({
  selector: 'ngx-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  products:any ={}
  private httpOptions;
  token: any;
  daysOfTheWeekList: [{ value: 0, title: 'Monday' }, { value: 1, title: 'Tuesday' }]
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
      Image: {
        title: 'Image',
        type: 'html',
        width:'5%',
        valuePrepareFunction: (data) => { return '<img width="100%" height="100%" src= http://localhost:3000/images/'+ data +'>' }

       // valuePrepareFunction: (value) => { return `<img width="100%" height="100%" src="https://img.lignes-formations.com/wp-content/uploads/sites/45/2019/05/formation-reportage-photo-niveau-1.jpg" />` }
      },
      ProductName: {
        title: 'Product Name',
        type: 'string',
      },
      Reference: {
        title: 'Reference',
        type: 'string',
      },
      Price: {
        title: 'Price',
        type: 'number',
      },
      ProductStore: {
        title: 'Store Name',
        valuePrepareFunction: (data) => {
          if (data==null){
            return "No Store"
          }
          else
          {
            return data.StoreName;
          }

      },
      editor: {
        type: 'list',
        config: {
          list : []
        },valuePrepareFunction: (data)  => {
          return data.StoreName;

        },



      },
      },





      },


  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private service: ProductService,
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
    this.service.list().subscribe(response => {

      //datacolumn : DataTableColumns = new DataTableColumns();
           this.products = response
           console.log(response);
      /*
           this.stores.forEach(element => {
            console.log(element);



           });  */
         this.source.load(this.products);

         this.service.listStore()
         .subscribe(
         data => {
           //console.log(data[0].firstName);
         this.settings.columns.ProductStore.editor.config.list =data && data.map((element)=>{
           return {'value':element.id,'title':element.StoreName}
           });
         this.settings = Object.assign({data}, this.settings);
         },

         )


        });

   };
   onEditConfirm(event): void {


    if (window.confirm('Are you sure you want to update?')) {
      console.log(event.newData.ProductName)

    var data = {"ProductName" : event.newData.ProductName,
    "Reference" : event.newData.Reference,
    "Price" : event.newData.Price,
    "ProductStore" : event.newData.ProductStore,
    "id" : event.newData.id,
    };
    this.http.post<Product>('http://localhost:3000/product/edit/',data,this.httpOptions).subscribe(
      res => {
        console.log(event.newData.id)
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
      console.log(event.data.id)
      this.service.deleteProduct(event.data.id)
      event.confirm.resolve();

    } else {
      event.confirm.reject();
    }
  }



}
