import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbAuthJWTToken, NbAuthService, NB_AUTH_OPTIONS, NbTokenService, NbLogoutComponent } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent extends NbLogoutComponent implements OnInit, OnDestroy {
  [x: string]: any;

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any={};

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'corporate';

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
  tag = 'ngx-header';
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private authService: NbAuthService,
              private layoutService: LayoutService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected tokenService: NbTokenService,
              protected router:Router,
              private breakpointService: NbMediaBreakpointsService) {
                super(authService, options, router);

  }


async logout() {
  this.router.navigateByUrl('/auth/login')
    this.tokenService.clear();
  }

  ngOnInit() {
    this.menuService.onItemClick()
    .pipe(filter(({ tag }) => tag === this.tag))
    .subscribe(bag =>{ console.log(bag.item.title)
              if(bag.item.title == 'Log out'){

                  this.logout();
              }

    });
    this.currentTheme = this.themeService.currentTheme;

    this.authService.onTokenChange()
    .subscribe((token: NbAuthJWTToken) => {

      if (token.isValid()) {
        this.user = token.getPayload();

        console.log(this.user.storeid);

        console.log(token.getValue()) // here we receive a payload from the token and assigns it to our user variable
      }

    });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}