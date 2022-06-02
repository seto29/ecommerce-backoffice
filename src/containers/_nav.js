import React from 'react'
import CIcon from '@coreui/icons-react'
import { SettingsOutlined, StoreOutlined } from '@material-ui/icons';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Master Data']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Master Data',
    route: '/base',
    icon: <StoreOutlined color="error" className="c-sidebar-nav-icon" />,
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Kategori',
        to: '/categories',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Subkategori',
        to: '/subcategories',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Produk',
        to: '/products',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sample',
        to: '/samples',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Produk Redeemable',
        to: '/products-redeemable',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pelanggan',
        to: '/customers',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Pengiriman Custom',
        to: '/custom-deliveries',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Gambar Slider',
        to: '/image-slider',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Karyawan',
        to: '/employees',
      },
    ],
  },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Transaksi',
  //   route: '/base',
  //   icon: <BarChartOutlinedIcon color="error" className="c-sidebar-nav-icon" />,
  //   _children: [
  //     // {
  //     //   _tag: 'CSidebarNavItem',
  //     //   name: 'Pemasukan',
  //     //   to: '/incomes',
  //     // },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Pengeluaran',
  //       to: '/expenses',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Penjualan',
  //       to: '/sales',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Pembayaran',
  //       to: '/payments',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Laporan',
  //   route: '/base',
  //   icon: <BarChartOutlinedIcon color="error" className="c-sidebar-nav-icon" />,
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Keuangan',
  //       to: '/balance',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Laba Kotor',
  //       to: '/gross-profit',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Laba Bersih',
  //       to: '/nett-profit',
  //     },
  //     // {
  //     //   _tag: 'CSidebarNavItem',
  //     //   name: 'Daftar Transaksi',
  //     //   to: '/base/carousels',
  //     // },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Barang Masuk',
  //   to: '/goods-receipt',
  //   icon: 'cil-chevron-right',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Barang Keluar',
  //   to: '/deliveries',
  //   icon: 'cil-chevron-right',
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Laporan Keuangan',
    to: '/balance',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Daftar Pesanan',
    to: '/orders',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Pesanan Custom',
    to: '/custom-orders',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Diskusi Produk',
    to: '/product-discussions',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Barang Masuk',
    to: '/goods-receipt',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Perubahan Stok',
    to: '/stock-changes',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Hadiah Ulang Tahun',
    to: '/prizes',
  },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Analisis & Laporan']
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Penjualan',
  //   to: '/help',
  //   icon: <HelpOutlineOutlinedIcon color="error" className="c-sidebar-nav-icon" />,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Pelanggan',
  //   to: '/customers',
  //   icon: <HelpOutlineOutlinedIcon color="error" className="c-sidebar-nav-icon" />,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Ulasan',
  //   to: '/help',
  //   icon: <HelpOutlineOutlinedIcon color="error" className="c-sidebar-nav-icon" />,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Wishlist',
  //   to: '/help',
  //   icon: <HelpOutlineOutlinedIcon color="error" className="c-sidebar-nav-icon" />,
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Pengaturan']
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Pengaturan Akun',
  //   to: '/help',
  //   icon: <SettingsOutlined color="error" className="c-sidebar-nav-icon" />,
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Bantuan',
  //   to: '/help',
  //   icon: <HelpOutlineOutlinedIcon color="error" className="c-sidebar-nav-icon" />,
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Theme']
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Colors',
  //   to: '/theme/colors',
  //   icon: 'cil-drop',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Typography',
  //   to: '/theme/typography',
  //   icon: 'cil-pencil',
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Components']
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Base',
  //   route: '/base',
  //   icon: 'cil-puzzle',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Breadcrumb',
  //       to: '/base/breadcrumbs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Cards',
  //       to: '/base/cards',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Carousel',
  //       to: '/base/carousels',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Collapse',
  //       to: '/base/collapses',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Forms',
  //       to: '/base/forms',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Jumbotron',
  //       to: '/base/jumbotrons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'List group',
  //       to: '/base/list-groups',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Navs',
  //       to: '/base/navs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Navbars',
  //       to: '/base/navbars',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Pagination',
  //       to: '/base/paginations',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Popovers',
  //       to: '/base/popovers',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Progress',
  //       to: '/base/progress-bar',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Switches',
  //       to: '/base/switches',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tables',
  //       to: '/base/tables',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tabs',
  //       to: '/base/tabs',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Tooltips',
  //       to: '/base/tooltips',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Buttons',
  //   route: '/buttons',
  //   icon: 'cil-cursor',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Buttons',
  //       to: '/buttons/buttons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Brand buttons',
  //       to: '/buttons/brand-buttons',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Buttons groups',
  //       to: '/buttons/button-groups',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Dropdowns',
  //       to: '/buttons/button-dropdowns',
  //     }
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: 'cil-chart-pie'
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Icons',
  //   route: '/icons',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Notifications',
  //   route: '/notifications',
  //   icon: 'cil-bell',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Toaster',
  //       to: '/notifications/toaster'
  //     }
  //   ]
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: 'cil-calculator',
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   _tag: 'CSidebarNavDivider'
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Extras'],
  // },
  // {
  //   _tag: 'CSidebarNavDropdown',
  //   name: 'Pages',
  //   route: '/pages',
  //   icon: 'cil-star',
  //   _children: [
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       _tag: 'CSidebarNavItem',
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Disabled',
  //   icon: 'cil-ban',
  //   badge: {
  //     color: 'secondary',
  //     text: 'NEW',
  //   },
  //   addLinkClass: 'c-disabled',
  //   'disabled': true
  // },
  // {
  //   _tag: 'CSidebarNavDivider',
  //   className: 'm-2'
  // },
  // {
  //   _tag: 'CSidebarNavTitle',
  //   _children: ['Labels']
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label danger',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-danger'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label info',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-info'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Label error',
  //   to: '',
  //   icon: {
  //     name: 'cil-star',
  //     className: 'text-error'
  //   },
  //   label: true
  // },
  // {
  //   _tag: 'CSidebarNavDivider',
  //   className: 'm-2'
  // }
]

export default _nav
