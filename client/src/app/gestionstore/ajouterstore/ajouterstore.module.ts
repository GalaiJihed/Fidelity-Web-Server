import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AjouterStoreRoutingModule } from './ajouterstore-routing.module';
import { AjouterStoreComponent } from './ajouterstore.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AjouterStoreRoutingModule,
    SharedModule
  ],
  declarations: [AjouterStoreComponent]
})
export class AjouterStoreModule { }
