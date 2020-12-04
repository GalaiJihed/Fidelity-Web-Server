import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { SmartTableService } from '../../../@core/mock/smart-table.service';

import {Store} from '../entities/Store';
import { Product } from '../entities/Product';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { PromoService } from '../_promo_service/promo.service';
@Component({
  selector: 'ngx-view-promo',
  templateUrl: './view-promo.component.html',
  styleUrls: ['./view-promo.component.scss'],
})
export class ViewPromoComponent implements OnInit {
  products:Product[]
  StoreId:number;

  user:any;
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
      ReductionPerc: {
        title: 'ReductionPerc',
        type: 'number',
      },
      FP: {
        title: 'FP',
        type: 'number',
      },
      PromoPrice: {
        title: 'PromoPrice',
        type: 'number',
      },
  
    
        
      },
     
    
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private service: PromoService, private router:Router,private http: HttpClient,private authService: NbAuthService) {   this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

   

    });} 
  ngOnInit(): void {
    
 

   };
   onEditConfirm(event): void {



   




  }
  onDeleteConfirm(event): void {
 
    
  }

 
 
}
