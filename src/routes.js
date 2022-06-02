import React from 'react'

const Toaster = React.lazy(() => import('./views/notifications/toaster/Toaster'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))

const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const BasicForms = React.lazy(() => import('./views/base/forms/BasicForms'))

const Jumbotrons = React.lazy(() => import('./views/base/jumbotrons/Jumbotrons'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navbars = React.lazy(() => import('./views/base/navbars/Navbars'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Pagnations'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const ProgressBar = React.lazy(() => import('./views/base/progress-bar/ProgressBar'))
const Switches = React.lazy(() => import('./views/base/switches/Switches'))

const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))
const BrandButtons = React.lazy(() => import('./views/buttons/brand-buttons/BrandButtons'))
const ButtonDropdowns = React.lazy(() => import('./views/buttons/button-dropdowns/ButtonDropdowns'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const Users = React.lazy(() => import('./views/users/Users'))
const User = React.lazy(() => import('./views/users/User'))


const Categories = React.lazy(() => import('./views/categories/Categories'))
const Subcategories = React.lazy(()=> import('./views/subcategories/Subcategories'))
const Prizes = React.lazy(() => import('./views/prizes/Prizes'))
const ProductsR = React.lazy(() => import('./views/productRedeemable/Products')) 
const ProductDiscussions = React.lazy(() => import('./views/productDiscussions/ProductDiscussions'))
const EditProductsD = React.lazy(() => import('./views/productDiscussions/EditProducts'))

const Products = React.lazy(() => import('./views/products/Products'))
const AddProducts = React.lazy(() => import('./views/products/AddProducts'))
const EditProducts = React.lazy(() => import('./views/products/EditProducts'))
const Samples = React.lazy(()=> import('./views/samples/Samples'))
const AddSamples = React.lazy(()=> import('./views/samples/AddSample'))
const EditSamples = React.lazy(()=> import('./views/samples/EditSample'))

const AddProductsR = React.lazy(() => import('./views/productRedeemable/AddProducts'))
const EditProductsR = React.lazy(() => import('./views/productRedeemable/EditProducts'))
const Suppliers = React.lazy(() => import('./views/suppliers/Suppliers'))
const Shops = React.lazy(() => import('./views/shops/Shops'))
const Employees = React.lazy(() => import('./views/employees/Employees'))
const GR = React.lazy(() => import('./views/goodsreceipts/Goodsreceipts'))
const Deliveries = React.lazy(() => import('./views/deliveries/Deliveries'))
const Sales = React.lazy(() => import('./views/sales/Sales'))
const Balances = React.lazy(() => import('./views/balances/Balances'))
const Incomes = React.lazy(() => import('./views/incomes/Incomes'))
const Expenses = React.lazy(() => import('./views/expenses/Expenses'))
const Help = React.lazy(() => import('./views/help/Help'))
const Payments = React.lazy(() => import('./views/payments/Payments'))
const Settings = React.lazy(() => import('./views/settings/Settings'))
const CustomOrders = React.lazy(() => import('./views/customOrders/CustomOrders'))
const DetailOrders = React.lazy(() => import('./views/customOrders/DetailOrders'))
const ImageSlider = React.lazy(() => import('./views/imageSlider/ImageSlider'))

const StockChanges = React.lazy(() => import('./views/stockChanges/StockChanges'))
const EditStocks = React.lazy(() => import('./views/stockChanges/EditStocks'))
const Grossprofit = React.lazy(() => import('./views/grossprofit/Grossprofit'))
const Nettprofit = React.lazy(() => import('./views/nettprofit/Nettprofit'))
const Orders = React.lazy(() => import('./views/orders/Orders'))
const Tracking = React.lazy(() => import('./views/orders/Tracking'))
const CustomerDetails = React.lazy(() => import('./views/customers/CustomerDetails'))
const CustomDeliveries = React.lazy(() => import('./views/customdeliveries/CustomDeliveries'))

const routes = [
  { path: '/', exact: true, name: 'Beranda', auth: 1 },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, auth: 1 },
  { path: '/theme', name: 'Theme', component: Colors, exact: true, auth: 1 },
  { path: '/theme/colors', name: 'Colors', component: Colors, auth: 1 },
  { path: '/theme/typography', name: 'Typography', component: Typography, auth: 1 },
  { path: '/base', name: 'Base', component: Cards, exact: true, auth: 1 },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs, auth: 1 },
  { path: '/base/cards', name: 'Cards', component: Cards, auth: 1 },
  { path: '/base/carousels', name: 'Carousel', component: Carousels, auth: 1 },
  { path: '/base/collapses', name: 'Collapse', component: Collapses, auth: 1 },
  { path: '/base/forms', name: 'Forms', component: BasicForms, auth: 1 },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons, auth: 1 },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups, auth: 1 },
  { path: '/base/navbars', name: 'Navbars', component: Navbars, auth: 1 },
  { path: '/base/navs', name: 'Navs', component: Navs, auth: 1 },
  { path: '/base/paginations', name: 'Paginations', component: Paginations, auth: 1 },
  { path: '/base/popovers', name: 'Popovers', component: Popovers, auth: 1 },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar, auth: 1 },
  { path: '/base/switches', name: 'Switches', component: Switches, auth: 1 },
  { path: '/base/tables', name: 'Tables', component: Tables, auth: 1 },
  { path: '/base/tabs', name: 'Tabs', component: Tabs, auth: 1 },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips, auth: 1 },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true, auth: 1 },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons, auth: 1 },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns, auth: 1 },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups, auth: 1 },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons, auth: 1 },
  { path: '/charts', name: 'Charts', component: Charts, auth: 1 },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons, auth: 1 },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons, auth: 1 },
  { path: '/icons/flags', name: 'Flags', component: Flags, auth: 1 },
  { path: '/icons/brands', name: 'Brands', component: Brands, auth: 1 },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true, auth: 1 },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts, auth: 1 },
  { path: '/notifications/badges', name: 'Badges', component: Badges, auth: 1 },
  { path: '/notifications/modals', name: 'Modals', component: Modals, auth: 1 },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster, auth: 1 },
  { path: '/widgets', name: 'Widgets', component: Widgets, auth: 1 },
  { path: '/users', exact: true, name: 'Users', component: Users, auth: 1 },
  { path: '/users/:id', exact: true, name: 'User Details', component: User, auth: 1 },
  { path: '/categories', name: 'Kategori', component: Categories, auth: 1 },
  { path: '/subcategories', name: 'Subkategori', component: Subcategories, auth: 1 },
  { path: '/image-slider', name: 'Gambar Slider', component: ImageSlider, auth: 1 },
  { path: '/products', name: 'Produk', component: Products, auth: 1 },
  { path: '/add-product', name: 'Tambah Produk', component: AddProducts, auth: 1 },
  { path: '/edit-product/:id', name: 'Ubah Produk', component: EditProducts, auth: 1 },
  { path: '/samples', name: 'Sample', component: Samples, auth: 1 },
  { path: '/add-sample', name: 'Tambah Sample', component: AddSamples, auth: 1 },
  { path: '/edit-sample/:id', name: 'Ubah Sample', component: EditSamples, auth: 1 },
  { path: '/products-redeemable', name: 'Produk Redeemable', component: ProductsR, auth: 1 },
  { path: '/add-product-redeemable', name: 'Tambah Produk Redeemable', component: AddProductsR, auth: 1 },
  { path: '/edit-product-redeemable/:id', name: 'Ubah Produk Redeemable', component: EditProductsR, auth: 1 },

  { path: '/prizes', name: 'Hadiah Ulang Tahun', component: Prizes, auth: 1 },
  { path: '/suppliers', name: 'Supplier', component: Suppliers, auth: 1 },
  { path: '/shops', name: 'Toko', component: Shops, auth: 1 },
  { path: '/employees', name: 'Karyawan', component: Employees, auth: 1 },
  { path: '/goods-receipt', name: 'Barang Masuk', component: GR, auth: 1 },
  { path: '/deliveries', name: 'Barang Keluar', component: Deliveries, auth: 1 },
  { path: '/sales', name: 'Penjualan', component: Sales, auth: 1 },
  { path: '/balance', name: 'Keuangan', component: Balances, auth: 1 },
  { path: '/incomes', name: 'Pemasukan', component: Incomes, auth: 1 },
  { path: '/expenses', name: 'Pengeluaran', component: Expenses, auth: 1 },
  { path: '/custom-orders', name: 'Pesanan Custom', component: CustomOrders, auth: 1 },
  { path: '/detail-orders/:id', name: 'Detail Pesanan Custom', component: DetailOrders, auth: 1 },
  { path: '/help', name: 'Bantuan', component: Help, auth: 1 },
  { path: '/payments', name: 'Pembayaran', component: Payments, auth: 1 },
  { path: '/gross-profit', name: 'Laba Kotor', component: Grossprofit, auth: 1 },
  { path: '/nett-profit', name: 'Laba Bersih', component: Nettprofit, auth: 1 },
  { path: '/settings', name: 'Pengaturan Akun', component: Settings, auth: 1 },
  { path: '/orders', name: 'Pesanan', component: Orders, auth: 1 },
  { path: '/tracking/:id', name: 'Pesanan', component: Tracking, auth: 1 },
  { path: '/customer-details/:id', name: 'Detail Pelanggan', component: CustomerDetails, auth: 1 },
  { path: '/custom-deliveries', name: 'Pengiriman Custom', component: CustomDeliveries, auth: 1 },
  { path: '/product-discussions', name: 'Diskusi Produk', component: ProductDiscussions, auth: 1 },
  { path: '/reply-product-discussions/:id', name: 'Balas Diskusi Produk', component: EditProductsD, auth: 1 },
  { path: '/stock-changes', name: 'Perubahan Stock', component: StockChanges, auth: 1 },
  { path: '/edit-stocks/:id', name: 'Perubahan Stock', component: EditStocks, auth: 1 },
]

export default routes;
