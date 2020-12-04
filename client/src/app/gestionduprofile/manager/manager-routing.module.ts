import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagerComponent} from './manager.component';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    data: {
      breadcrumb:'Manager',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
