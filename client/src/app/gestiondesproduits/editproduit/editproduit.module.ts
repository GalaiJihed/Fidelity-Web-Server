import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditProduitRoutingModule } from './editproduit-routing.module';
import { EditproduitComponent } from './editproduit.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    EditProduitRoutingModule,
    SharedModule
  ],
  declarations: [EditproduitComponent]
})
export class EditProduitModule { }
