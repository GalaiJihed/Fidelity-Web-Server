import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { storeService } from '../_service_store/store_service';
import { Store } from '../entities/Store';
import { AuthService } from 'src/app/auth/login/_services/auth.service';
import { Manager } from 'src/app/gestionduprofile/Entities/Manager';
import { HttpErrorResponse } from '@angular/common/http';
import { StoreType } from 'src/app/gestiondesProduits/entities/StoreType';
import { ManagerName } from '../entities/ManagerName';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-store',
  templateUrl: './afficherstore.component.html',
  styleUrls: ['./afficherstore.component.scss']
})
export class AfficherStoreComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  stores:Store[]

  constructor(private formBuilder: FormBuilder,private servicestore: storeService, private authService : AuthService) { }



  ngOnInit() {
    this.registerForm = this.formBuilder.group({

      storeName: ['', Validators.required],
      storeAdress: ['', Validators.required],
      storeReference: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
  }, {

  });
    this.servicestore.listStore().subscribe(response => {
      //    console.log(this.getAuthData().token)
      console.log(response);

           this.stores = response
           console.log(this.stores);

        });


   /* this.authService.getAdmin().subscribe(response => {
    //    console.log(this.getAuthData().token)
        console.log(response);


      });*/
  }
  get f() { return this.registerForm.controls; }

  onSubmit(event) {
    event.preventDefault();
    this.submitted = true;

      // stop here if form is invalid
    if (this.registerForm.invalid) {

      }

    console.log(this.registerForm.controls['storeType'].value);
      // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
