import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
/*   {
    title: 'Admin-Dashboard',
    icon: 'home-outline',
    link: '/admin/dashboard',
    home: true,
  },
  
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/admin/iot-dashboard',
  }, */
  
  {
    title: 'REGISTRATION USER',
    group: true,
  },
  {
    title: 'Users',
    icon: 'person-add-outline',
    children: [
      {
        title: 'Add User',
        icon: 'smiling-face-outline',
        link: '/admin/users/client',
      },
   
      {
        title: 'View User',
        link: '/admin/users/view-user',
        icon:'person-done-outline',
       


      },
    ],
  },
  {
    title: 'REGISTRATION MANAGER',
    group: true,
  },
  {
    title: 'Managers',
    icon: 'person-add-outline',
    children: [
      {
        title: 'Add Manager',
        icon: 'smiling-face-outline',
        link: '/admin/manager/add-manager',
      },
   
      {
        title: 'View Manager',
        link: '/admin/manager/view-manager',
        icon:'person-done-outline',


      },
    ],
  },
  {
    title: 'PRODUCTS',
    group: true,
    home: true,
  },
  {
    title: 'Products',
    icon: 'layout-outline',
    children: [

  {
    title: 'Add Product',
    icon: 'plus-square-outline',
    link: '/admin/product/addproduct',
  },


  {
    title: 'View Product',
    icon: 'edit-2-outline',
    link: '/admin/product/viewproduct',
  },
],
},
  {
    title: 'STORE',
    group: true,
  },
  {
    title: 'Store',
    icon: 'award-outline',
    children: [
      {
        title: 'Add Store',
        icon: 'plus-outline',
        link: '/admin/stores/add-store',
      },
      {
        title: 'View Store',
        icon: 'edit-outline',
        link: '/admin/stores/view-store',
      },
    ],
  },
  
  /*{
    title: 'SUBSCRIPTION',
    group: true,
  },
  {
    title: 'Subscription',
    icon: 'flag-outline',
    children: [
      {
        title: 'Add Subscription',
        icon: 'plus-outline',
        link: '/admin/sub/add-sub',
      },
      {
        title: 'View Subscription',
        icon: 'edit-outline',
        link: '/admin/sub/view-sub',
      },
    ],
  },
*/
  /*
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Layout',
    icon: 'layout-outline',
    children: [
      {
        title: 'Stepper',
        link: '/admin/layout/stepper',
      },
      {
        title: 'List',
        link: '/admin/layout/list',
      },
      {
        title: 'Infinite List',
        link: '/admin/layout/infinite-list',
      },
      {
        title: 'Accordion',
        link: '/admin/layout/accordion',
      },
      {
        title: 'Tabs',
        pathMatch: 'prefix',
        link: '/admin/layout/tabs',
      },
    ],
  },
  {
    title: 'Forms',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Form Inputs',
        link: '/admin/forms/inputs',
      },
      {
        title: 'Form Layouts',
        link: '/admin/forms/layouts',
      },
      {
        title: 'Buttons',
        link: '/admin/forms/buttons',
      },
      {
        title: 'Datepicker',
        link: '/admin/forms/datepicker',
      },
    ],
  },
  {
    title: 'UI Features',
    icon: 'keypad-outline',
    link: '/admin/ui-features',
    children: [
      {
        title: 'Grid',
        link: '/admin/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/admin/ui-features/icons',
      },
      {
        title: 'Typography',
        link: '/admin/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/admin/ui-features/search-fields',
      },
    ],
  },
  {
    title: 'Modal & Overlays',
    icon: 'browser-outline',
    children: [
      {
        title: 'Dialog',
        link: '/admin/modal-overlays/dialog',
      },
      {
        title: 'Window',
        link: '/admin/modal-overlays/window',
      },
      {
        title: 'Popover',
        link: '/admin/modal-overlays/popover',
      },
      {
        title: 'Toastr',
        link: '/admin/modal-overlays/toastr',
      },
      {
        title: 'Tooltip',
        link: '/admin/modal-overlays/tooltip',
      },
    ],
  },
  {
    title: 'Extra Components',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Calendar',
        link: '/admin/extra-components/calendar',
      },
      {
        title: 'Progress Bar',
        link: '/admin/extra-components/progress-bar',
      },
      {
        title: 'Spinner',
        link: '/admin/extra-components/spinner',
      },
      {
        title: 'Alert',
        link: '/admin/extra-components/alert',
      },
      {
        title: 'Calendar Kit',
        link: '/admin/extra-components/calendar-kit',
      },
      {
        title: 'Chat',
        link: '/admin/extra-components/chat',
      },
    ],
  },
  {
    title: 'Maps',
    icon: 'map-outline',
    children: [
      {
        title: 'Google Maps',
        link: '/admin/maps/gmaps',
      },
      {
        title: 'Leaflet Maps',
        link: '/admin/maps/leaflet',
      },
      {
        title: 'Bubble Maps',
        link: '/admin/maps/bubble',
      },
      {
        title: 'Search Maps',
        link: '/admin/maps/searchmap',
      },
    ],
  },
  {
    title: 'Charts',
    icon: 'pie-chart-outline',
    children: [
      {
        title: 'Echarts',
        link: '/admin/charts/echarts',
      },
      {
        title: 'Charts.js',
        link: '/admin/charts/chartjs',
      },
      {
        title: 'D3',
        link: '/admin/charts/d3',
      },
    ],
  },
  {
    title: 'Editors',
    icon: 'text-outline',
    children: [
      {
        title: 'TinyMCE',
        link: '/admin/editors/tinymce',
      },
      {
        title: 'CKEditor',
        link: '/admin/editors/ckeditor',
      },
    ],
  },
  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Smart Table',
        link: '/admin/tables/smart-table',
      },
      {
        title: 'Tree Grid',
        link: '/admin/tables/tree-grid',
      },
    ],
  },
  {
    title: 'Miscellaneous',
    icon: 'shuffle-2-outline',
    children: [
      {
        title: '404',
        link: '/admin/miscellaneous/404',
      },
    ],
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
  */
];
