import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
@Component({
     templateUrl: './register.component.html'

})
export class RegisterComponent {


     isLaoding = false;
     onRegister(form: NgForm) {
          console.log(form.value);

     }
}