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


import { FormsModule as ngFormsModule } from '@angular/forms';

import { UploadComponent } from './upload.component';
import {AddDatabaseComponent} from './add-database/add-database.component'
import { UploadRoutingModule } from './upload-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { from } from 'rxjs';

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
    UploadRoutingModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,

  ],
  declarations: [

    UploadComponent,
    AddDatabaseComponent,
  ],
})
export class UploadModule { }
