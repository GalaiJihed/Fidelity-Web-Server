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
import { PromoComponent } from './promo.component';
import { PromoRoutingModule } from './promo-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { AddPromoComponent } from './add-promo/add-promo.component';
import { ViewPromoComponent } from './view-promo/view-promo.component';


@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    PromoRoutingModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,

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

    PromoComponent,
    AddPromoComponent,
    ViewPromoComponent,
  ],
})
export class PromoModule { }
