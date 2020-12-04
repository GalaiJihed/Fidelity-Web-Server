import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditproduitComponent} from './editproduit.component';

const routes: Routes = [
  {
    path: '',
    component: EditproduitComponent,
    data: {
      breadcrumb:'edit',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProduitRoutingModule { }
