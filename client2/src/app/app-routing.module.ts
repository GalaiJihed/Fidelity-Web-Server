import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./dashboardadmin/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'manager',
    loadChildren: () => import('./dashboardmanager/pages.module')
      .then(m => m.PagesModule),
  },
 
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.NgxAuthModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'admin' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
