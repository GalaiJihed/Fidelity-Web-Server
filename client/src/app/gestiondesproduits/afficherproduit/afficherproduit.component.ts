import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../_product_service/product.service';
import { StoreType } from '../entities/StoreType';
import {Product} from '../entities/Product';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/login/_services/auth.service';

@Component({
  selector: 'app-afficher',
  templateUrl: './afficherproduit.component.html',
  styleUrls: ['./afficherproduit.component.scss']
})
export class AfficherProduitComponent implements OnInit {

  base64Image: any;
  products: Product[];
  stores:StoreType[];
  constructor(private formBuilder: FormBuilder,private productService:ProductService,private authService:AuthService,private router:Router ) { }
  ngOnInit(): void {


    this.productService.listStore().subscribe(response =>{ this.stores = response

     } );

    this.productService.list().subscribe(response =>{
      this.products = response
      console.log(this.products)
    }
      )};
      Delete(id){
        this.productService.deleteProduct(id).subscribe(response => {
          console.log(response)
        });
      }
      Modify(){

    //    this.router.navigate(['/produit/edit']);
      }
}