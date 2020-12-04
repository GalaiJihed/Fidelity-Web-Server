import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ClientComponent } from './client/client-component';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './view-user/view-user.component';



const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'client',
        component: ClientComponent,
      },
   
      {
        path: 'view-user',
        component: ViewUserComponent,
      },
    ],

  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UsersRoutingModule {
}

