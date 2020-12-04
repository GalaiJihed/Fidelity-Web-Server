import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { TokenStorageService } from './_services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  templateUrl: './login.component.html'
  , styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLoading = false;
  token: string;
  constructor(public authService: AuthService, private router: Router) { }
  ngOnInit() {
    if(this.authService.getIsAuth()){
      this.router.navigate(['/dashboard'])
    }
  }

  onLogin(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    console.log(form.value.phoneNumber, form.value.password,"token:"+this.authService.getToken());

      this.authService.login(form.value.phoneNumber, form.value.password)





      this.authService.login(form.value.phoneNumber,form.value.password);
      this.router.navigate(['/admin']);



  }
  reloadPage() {
    window.location.reload();
  }
    }


