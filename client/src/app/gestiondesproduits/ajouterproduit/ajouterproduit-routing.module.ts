import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjouterProduitComponent} from './ajouterproduit.component';

const routes: Routes = [
  {
    path: '',
    component: AjouterProduitComponent,
    data: {
      breadcrumb:'ajout',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AjoutProduitRoutingModule { }
