import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from './client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: {
      breadcrumb: 'Client',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
