import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PromoComponent } from './promo.component';
import { AddPromoComponent } from './add-promo/add-promo.component';
import { ViewPromoComponent } from './view-promo/view-promo.component';



const routes: Routes = [
  {
    path: '',
    component: PromoComponent,
    children: [
{

  path:'add-promo',
  component:AddPromoComponent,
},
{

  path:'view-promo',
  component:ViewPromoComponent,
}
      
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
export class PromoRoutingModule {
}

