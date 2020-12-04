import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    label: 'Navigation',
    main: [
      {
        state: 'dashboard',
        name: 'Dashboard',
        type: 'link',
        icon: 'ti-home'
      }
    ],
  },

  {
    label: 'Gestion des profiles',
    main: [
      {
        state: 'profile',
        name: 'Inscription',
        type: 'sub',
        icon: 'ti-id-badge',
        children: [
          {
            state: 'client',
            name: 'Client'
          },
          {
            state: 'manager',
            name: 'Manager'
          },

        ]
      },

    ]
  },
  {
    label: 'Gestion des produits',
    main: [
      {
        state: 'produit',
        name: 'Produit',
        type: 'sub',
        icon: 'ti-layers',
        children: [
          {
            state: 'ajout',
            name: 'Ajout Produit'
          },
          {
            state: 'afficher',
            name: 'Afficher les Produits'
          },

        ]
      },

    ]
  },
  {
    label: 'Gestion du store',
    main: [
      {
        state: 'Store',
        name: 'Store',
        type: 'sub',
        icon: 'ti-receipt',
        children: [
          {
            state: 'ajout',
            name: 'Ajout Store'
          },
          {
            state: 'afficher',
            name: 'Afficher les Stores'
          },

        ]
      },

    ]
  },








];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  /*add(menu: Menu) {
    MENUITEMS.push(menu);
  }*/
}
