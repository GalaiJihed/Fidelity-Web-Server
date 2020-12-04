import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoresComponent } from './stores.component';
import { ViewStoreComponent } from './view-store/view-store.component';
import {NewStoreComponent} from './add-store/add-store.component';


const routes: Routes = [{
  path: '',
  component: StoresComponent,
  children: [
    {
      path: 'add-store',
      component: NewStoreComponent,
    },
    {
      path: 'view-store',
      component: ViewStoreComponent,
    },
    
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TablesRoutingModule { }

export const routedComponents = [
  StoresComponent,
  ViewStoreComponent,
  NewStoreComponent,

];
