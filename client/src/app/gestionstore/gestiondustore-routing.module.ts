import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Store',
      status: true
    },
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajouterstore/ajouterstore.module').then(m => m.AjouterStoreModule)
      },
      {
        path: 'afficher',
        loadChildren: () => import('./afficherstore/afficherstore.module').then(m => m.AfficherStoreModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
