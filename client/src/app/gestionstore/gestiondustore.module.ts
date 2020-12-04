import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './gestiondustore-routing.module';
import { GestionduStoreComponent } from './gestiondustore.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    StoreRoutingModule,
    SharedModule
  ],
  declarations: [GestionduStoreComponent]
})
export class StoreModule { }
