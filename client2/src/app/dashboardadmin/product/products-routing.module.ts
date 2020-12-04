import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { NewProductComponent } from './addproduct/newproduct.component';
import { ViewProductComponent } from './view-product/view-product.component';




const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path: 'addproduct',
        component: NewProductComponent,
      },
      {
        path: 'viewproduct',
        component: ViewProductComponent,
      },
    ],

  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ProductRoutingModule {
}

