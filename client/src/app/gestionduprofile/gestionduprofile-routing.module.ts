import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Inscription',
      status: false
    },
    children: [
      {
        path: 'client',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule)
      }, {
        path: 'manager',
        loadChildren: () => import('./manager/manager.module').then(m => m.ManagerModule)
      },
   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
