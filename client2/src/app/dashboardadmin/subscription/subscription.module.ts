import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbAlertModule, NbUserModule, NbSelectModule, NbRadioModule, NbButtonModule, NbActionsModule, NbDatepickerModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule as ngFormsModule, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './subscription-routing.module';

//import { FsIconComponent } from './tree-grid/tree-grid.component';

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbIconModule,
    FormsModule,
   ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    ngFormsModule,
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
    ...routedComponents,
  
   // FsIconComponent,
  ],
 
})
export class SubModule { }
