import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduitsRoutingModule } from './gestiondesproduits-routing.module';
import { GestiondesProduitsComponent } from './gestiondesproduits.component';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProduitsRoutingModule
  ],
  declarations: [
    GestiondesProduitsComponent,


  ]
})
export class ProduitModule { }
