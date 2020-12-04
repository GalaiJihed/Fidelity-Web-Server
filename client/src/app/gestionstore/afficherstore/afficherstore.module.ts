import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AfficherStoreRoutingModule } from './afficherstore-routing.module';
import { AfficherStoreComponent } from './afficherstore.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AfficherStoreRoutingModule,
    SharedModule
  ],
  declarations: [AfficherStoreComponent]
})
export class AfficherStoreModule { }
