import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjoutProduitRoutingModule } from './ajouterproduit-routing.module';
import { AjouterProduitComponent } from './ajouterproduit.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AjoutProduitRoutingModule,
    SharedModule
  ],
  declarations: [AjouterProduitComponent]
})
export class AjouterProduitModule { }
