import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfficherProduitRoutingModule } from './afficherproduit-routing.module';
import { AfficherProduitComponent } from './afficherproduit.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AfficherProduitRoutingModule,
    SharedModule
  ],
  declarations: [AfficherProduitComponent]
})
export class AfficherProduitModule { }
