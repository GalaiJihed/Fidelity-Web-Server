import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjouterStoreComponent} from './ajouterstore.component';

const routes: Routes = [
  {
    path: '',
    component: AjouterStoreComponent,
    data: {
      breadcrumb:'Store',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjouterStoreRoutingModule { }
