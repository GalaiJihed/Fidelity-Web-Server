import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { ManagerComponent } from './manager.component';
import { AddManagerComponent } from './add-manger/add-manager-component';
import { ViewManagerComponent } from './view-manager/view-manager.component';



const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    children: [
      {
        path: 'add-manager',
        component: AddManagerComponent,
      },
      
      {
        path: 'view-manager',
        component: ViewManagerComponent,
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
export class ManagersRoutingModule {
}

