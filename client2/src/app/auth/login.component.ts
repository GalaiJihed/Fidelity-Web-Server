
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthSocialLink, NbAuthService, NB_AUTH_OPTIONS, getDeepFromObject, NbAuthResult, NbLoginComponent, NbAuthJWTToken } from '@nebular/auth';



@Component({
  selector: 'nb-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent   {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = 'phone';
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  rememberMe = false;

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              private authService: NbAuthService,
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.rememberMe = this.getConfigValue('forms.login.rememberMe');
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    console.log(this.user)


    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
        this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload();
        console.log(this.user.role);


      if (this.user.role=="MANAGER")
      {
        return this.router.navigateByUrl('/manager');
      }
      else
      {
        return this.router.navigateByUrl('/admin');
      }
 /*      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
    
        }, this.redirectDelay);
      }
      this.cd.detectChanges();  */


      }

    });

      } else {
        this.errors = result.getErrors();
      }

    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
