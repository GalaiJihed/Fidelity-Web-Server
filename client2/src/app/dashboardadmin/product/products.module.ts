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

import { ProductComponent } from './product.component';
import { NewProductComponent } from './addproduct/newproduct.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ProductRoutingModule } from './products-routing.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

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
    ProductRoutingModule,
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

    ProductComponent,
    NewProductComponent,
    ViewProductComponent,

  ],
})
export class ProductModule { }
