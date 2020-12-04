import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layouts/admin/admin.component';
import {AuthComponent} from './layouts/auth/auth.component';
import { AcceuilComponent } from './pageAcceuil/acceuil.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './auth/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: AcceuilComponent,

  },
  {
    path: '',
    component: AdminComponent,

    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      }, {
        path: 'profile',
        loadChildren: () => import('./gestionduprofile/gestionduprofile.module').then(m => m.ProfileModule)
      },
      {
        path: 'produit',
        loadChildren: () => import('./gestiondesProduits/gestiondesProduits.module').then(m => m.ProduitModule)
      },
      {
        path: 'store',
        loadChildren: () => import('./gestionstore/gestiondustore.module').then(m => m.StoreModule)
      },
     
      {
        path: 'basic',
        loadChildren: () => import('./components/basic/basic.module').then(m => m.BasicModule)
      }, {
        path: 'notifications',
        loadChildren: () => import('./components/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      }, {
        path: 'forms',
        loadChildren: () => import('./components/forms/basic-elements/basic-elements.module').then(m => m.BasicElementsModule)
      }, {
        path: 'bootstrap-table',
        loadChildren: () => import('./components/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        loadChildren: () => import('./map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'simple-page',
        loadChildren: () => import('./simple-page/simple-page.module').then(m => m.SimplePageModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,

  },
  {
    path: 'acceuil',
    component: AcceuilComponent,

  },

  {
    path: 'login',
    component: LoginComponent,

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false
 })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
