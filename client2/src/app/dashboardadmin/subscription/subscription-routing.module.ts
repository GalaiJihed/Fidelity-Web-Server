import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubComponent } from './subscription.component';
import { NewSubComponent } from './addsub/addsub.component';
import { ViewSubComponent } from './view-sub/view-sub.component';



const routes: Routes = [{
  path: '',
  component: SubComponent,
  children: [
    {
      path: 'add-sub',
      component: NewSubComponent,
    },
    {
      path: 'view-sub',
     component: ViewSubComponent,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TablesRoutingModule { }

export const routedComponents = [
  SubComponent,
  NewSubComponent,
  ViewSubComponent,
];
