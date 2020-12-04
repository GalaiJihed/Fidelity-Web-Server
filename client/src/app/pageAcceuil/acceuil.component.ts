import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';

//import { User } from 'app/user-profile/users.model';



@Component({
     templateUrl: './acceuil.component.html'

})
export class AcceuilComponent  {
     isLoading=false;
    // users: User[];
     constructor( public router: Router) { }
    

    

     }

