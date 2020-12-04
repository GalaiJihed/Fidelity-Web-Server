import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Produits',
      status: false
    },
    children: [
      {
        path: 'ajout',
        loadChildren: () => import('./ajouterproduit/ajouterproduit.module').then(m => m.AjouterProduitModule)
      },
      {
        path: 'afficher',
        loadChildren: () => import('./afficherproduit/afficherproduit.module').then(m => m.AfficherProduitModule)
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./editproduit/editproduit.module').then(m => m.EditProduitModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduitsRoutingModule { }
