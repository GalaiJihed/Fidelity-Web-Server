import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule
  ],
  declarations: [ManagerComponent]
})
export class ManagerModule { }
