import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { AppComponent } from './app.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { TitleComponent } from './layouts/admin/title/title.component';
import { BreadcrumbsComponent } from './layouts/admin/breadcrumbs/breadcrumbs.component';
import { AuthComponent } from './layouts/auth/auth.component';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AcceuilComponent } from './pageAcceuil/acceuil.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwPaginationComponent } from 'jw-angular-pagination';
import {  AuthInterceptor } from './auth/login/_helpers/auth.interceptor';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';



import { FileSelectDirective } from 'ng2-file-upload'

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    TitleComponent,
    BreadcrumbsComponent,
    AcceuilComponent,
    RegisterComponent,
    LoginComponent,
    JwPaginationComponent,
    AuthComponent,
    FileSelectDirective
  ],
  exports:[

  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,




    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('token');},
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    }),
    SharedModule
  ],
  providers: [

   

    {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    },
],

  bootstrap: [AppComponent]
})
export class AppModule { }
