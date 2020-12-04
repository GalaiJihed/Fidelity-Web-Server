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

import { EventComponent } from './event.component';
import { EventRoutingModule } from './event-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ViewEventComponent } from './view-event/view-event.component';
import { NewEventComponent } from './add-event/new-event.component';

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
    EventRoutingModule,
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

    EventComponent,
    ViewEventComponent,
    NewEventComponent,
  ],
})
export class EventModule { }
