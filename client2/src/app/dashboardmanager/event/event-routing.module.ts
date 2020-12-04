import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { NewEventComponent } from './add-event/new-event.component';





const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
     {
        path: 'add-event',
        component: NewEventComponent,
      },
      
      {
        path: 'view-event',
        component: ViewEventComponent,
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
export class EventRoutingModule {
}

