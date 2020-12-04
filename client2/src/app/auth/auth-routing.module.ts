import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NbAuthComponent } from '@nebular/auth';
import { NgxLoginComponent } from './login.component';

export const routes: Routes = [
    {
      path: '',
      component: NbAuthComponent,
      children: [
        {
          path: 'login',
          component: NgxLoginComponent, 
        },
        {
          path: '',
          redirectTo: 'login',
          pathMatch: 'full',
        },
      ],    
    },

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgxAuthRoutingModule {
}