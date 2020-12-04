import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
/*   {
    title: 'Manager-Dashboard',
    icon: 'home-outline',
    link: '/manager/dashboard',
    home: true,
  },
  
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/manager/iot-dashboard',
  }, */
  
 
  {
    title: 'PRODUCTS',
    group: true,
  },
  {
    title: 'Products',
    icon: 'layout-outline',
    children: [

  {
    title: 'Add Product',
    icon: 'plus-square-outline',
    link: '/manager/product/addproduct',
  },


  {
    title: 'View Product',
    icon: 'edit-2-outline',
    link: '/manager/product/viewproduct',
  },

],

},


  
  {
    title: 'EVENTS',
    group: true,
  },
  
  {
    title: 'Event',
    icon: 'attach-2-outline',
    children: [
      {
        title: 'Add Event',
        icon: 'plus-square-outline',
        link: '/manager/event/add-event',
      },
      {
        title: 'View Event',
        icon: 'edit-2-outline',
        link: '/manager/event/view-event',
      },

     
    ],
  },

  /*{
    title: 'Promo',
    icon: 'trending-down-outline',
    children: [
      {
        title: 'Add Promo',
        icon: 'plus-square-outline',
        link: '/manager/promo/add-promo',
      },
     
      {
        title: 'View Promo',
        icon: 'edit-2-outline',
        link: '/manager/promo/view-promo',
      },
     
    ],
  },
  */
  {
    title: 'CHAT',
    group: true,
  },
  {
    title: 'Chat Bot',
    icon: 'message-circle-outline',
    link: '/manager/extra-components/chat',
  },
  {
    title: 'UPLOAD DATABASE',
    group: true,
  },
  {
    title: 'Upload Database',
    icon: 'upload-outline',
    link: '/manager/upload/add-database',
  },
  /*
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
