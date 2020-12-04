import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbAlertModule,
  NbTreeGridModule,

} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';


import { FormsModule as ngFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ManagerComponent } from './manager.component';
import { ManagersRoutingModule } from './manager-routing.module';
import { AddManagerComponent } from './add-manger/add-manager-component';
import { ViewManagerComponent } from './view-manager/view-manager.component';



@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    ngFormsModule,
    ManagersRoutingModule,
    NbActionsModule,
    NbButtonModule,
    NbIconModule,
    NbRadioModule,
    NbSelectModule,
    NbUserModule,
    NbAlertModule,
    NbInputModule,
    NbInputModule,
  ],
  declarations: [
   
    ManagerComponent,
    AddManagerComponent,
    ViewManagerComponent,
    

  ],
})
export class ManagerModule { }
