import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { SmartTableService } from '../../../@core/mock/smart-table.service';
import { SubService } from '../sub-service/sub.service';
import { Manager } from '../entities/Manager';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'ngx-view-sub',
  templateUrl: './view-sub.component.html',
  styleUrls: ['./view-sub.component.scss'],
})
export class ViewSubComponent implements OnInit {
  managers:any={}

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

      SubscriptionType:{
        title: 'SubscriptionType',
        type: 'string',
      },
      SubscriptionEndDate: {
        title: 'SubscriptionEndDate',
        type: 'Date',
      },

    },
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private service: SubService, private router:Router,private http: HttpClient) {}
  ngOnInit(): void {
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


  }


  onDeleteConfirm(event): void {

  }
}
