import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,

];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  user: any = {};
  static themecolor:string;

  constructor(private authService: NbAuthService) {

    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload();
      


      if (this.user.role=="MANAGER")
      {
        ThemeModule.themecolor = 'cosmic'
        console.log(ThemeModule.themecolor);
      }
      else
      {
        ThemeModule.themecolor = 'cosmic'
        console.log(ThemeModule.themecolor);
      }

    }
  });
}
 static  forRoot(): ModuleWithProviders<ThemeModule> {

    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            
            name: 'cosmic',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
        ).providers,
      ],
    };
  }
}

  


  


