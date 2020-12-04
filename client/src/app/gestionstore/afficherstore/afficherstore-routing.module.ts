import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AfficherStoreComponent} from './afficherstore.component';

const routes: Routes = [
  {
    path: '',
    component: AfficherStoreComponent,
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
export class AfficherStoreRoutingModule { }
