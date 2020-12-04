import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { NbDialogService, NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { WindowFormComponent } from './window-form/window-form.component';


@Component({
  template: `
   <i width="100%" height="100%" (click)="example()" class="nb-compose"></i>
  `,
})
export class ButtonRenderComponent implements OnInit {

  public renderValue;

  @Input() value;

  constructor(private router:Router,private windowService: NbWindowService ) { }

  ngOnInit() {
    this.renderValue = this.value;
  }

  example() {
    this.windowService.open(WindowFormComponent, { title: `Update Image` });
  }


}