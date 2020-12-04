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

} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { ClientComponent } from './client/client-component';


import { UsersRoutingModule } from './users-routing.module';
import { ViewUserComponent } from './view-user/view-user.component';


@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    UsersRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    Ng2SmartTableModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,

  ],
  declarations: [
    UsersComponent,
    ClientComponent,
    ViewUserComponent,


  ],
})
export class UsersModule { }
