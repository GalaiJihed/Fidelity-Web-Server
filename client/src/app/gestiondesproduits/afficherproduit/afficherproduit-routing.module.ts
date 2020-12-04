import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AfficherProduitComponent} from './afficherproduit.component';

const routes: Routes = [
  {
    path: '',
    component: AfficherProduitComponent,
    data: {
      breadcrumb:'afficher',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AfficherProduitRoutingModule { }
