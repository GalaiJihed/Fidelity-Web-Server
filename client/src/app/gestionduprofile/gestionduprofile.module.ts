import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './gestionduprofile-routing.module';
import { GestionduProfileComponent } from './gestionduprofile.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [GestionduProfileComponent]
})
export class ProfileModule { }
