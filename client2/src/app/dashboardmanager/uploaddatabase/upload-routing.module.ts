import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload.component';
import { AddDatabaseComponent } from './add-database/add-database.component';





const routes: Routes = [
  {
    path: '',
    component: UploadComponent,
    children: [
   {
     path:'add-database',
     component:AddDatabaseComponent,
    }
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
export class UploadRoutingModule {
}

