import { Routes } from '@angular/router';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { CollectionComponent } from './features/collection/collection.component';
import { ContactComponent } from './features/contact/contact.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './core/auth/pages/login/login.component';
import { RegisterComponent } from './core/auth/pages/register/register.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AccountOverviewComponent } from './features/account-overview/account-overview.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ForbiddenComponent } from './features/forbidden/forbidden.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { dashboardGuard } from './features/dashboard/guards/dashboard.guard';
import { AddCategoryComponent } from './features/dashboard/pages/add-category/add-category.component';
import { AddCouponComponent } from './features/dashboard/pages/add-coupon/add-coupon.component';
import { AddProductComponent } from './features/dashboard/pages/add-product/add-product.component';
import { AddUserComponent } from './features/dashboard/pages/add-user/add-user.component';
import { AddSubcategoryComponent } from './features/dashboard/pages/add-subcategory/add-subcategory.component';
import { AddGovernorateComponent } from './features/dashboard/pages/add-governorate/add-governorate.component';
import { ManageUsersComponent } from './features/dashboard/pages/manage-users/manage-users.component';
import { ManageRolesComponent } from './features/dashboard/pages/manage-roles/manage-roles.component';
import { AddRolesComponent } from './features/dashboard/pages/add-roles/add-roles.component';
import { ManageCouponsComponent } from './features/dashboard/pages/manage-coupons/manage-coupons.component';
import { ManageCategoriesComponent } from './features/dashboard/pages/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './features/dashboard/pages/manage-products/manage-products.component';
import { ManageGovernorateComponent } from './features/dashboard/pages/manage-governorate/manage-governorate.component';
import { ManageOrdersComponent } from './features/dashboard/pages/manage-orders/manage-orders.component';
import { ManageSubcategoriesComponent } from './features/dashboard/pages/manage-subcategories/manage-subcategories.component';
import { ProductReviewsComponent } from './features/product-details/product-reviews/product-reviews.component';
import { SubCategoriesComponent } from './features/sub-categories/sub-categories.component';
import { ShippingComponent } from './features/shipping/shipping.component';
import { EditAddressComponent } from './features/edit-address/edit-address.component';
import { SearchComponent } from './features/search/search.component';
import { ProductDetailsComponent as DashboardProductDetails } from './features/dashboard/pages/product-details/product-details.component';
import { AddressBookComponent } from './features/address-book/address-book.component';
import { DashboarLoginComponent } from './core/auth/pages/dashboar-login/dashboar-login.component';
import { CreateReviewComponent } from './features/create-review/create-review.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        title: 'Checkout',
    },
    {
        path: 'collections',
        component: CollectionComponent,
        title: 'Collections',
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact',
    },
    {
        path: 'auth/login',
        component: LoginComponent,
        title: 'Login',
    },
    {
        path: 'auth/register',
        component: RegisterComponent,
        title: 'Register',
    },
    {

        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',
        canActivate: [authGuard],
    },
    {
        path: 'edit-address/:id',
        component: EditAddressComponent,
        title: 'Edit Address',
    },
    // {
    //     path: 'address-book',
    //     component: AddressBookComponent,
    //     title: 'Address Book',
    // },
    {
        path: 'products/:slug',
        component: ProductDetailsComponent,
        title: 'Products',
    },
    {
        path: 'collections/:category_name',
        component: CollectionComponent,
        title: 'Collections',
    },
    {
        path: 'collections/:subcategory_name',
        component: CollectionComponent,
        title: 'Collections',
    },
    {
        path: 'reviews/:id',
        component: ProductReviewsComponent,
        title: 'Reviews',
    },
    {
        path: 'create-review/:slug',
        component: CreateReviewComponent,
        title: 'Create Review'
    },
    {
        path: 'subcategories',
        component: SubCategoriesComponent,
        title: 'SubCategories',
    },
    {
        path: 'search',
        component: SearchComponent,
        title: 'Search Products',
    },
    {
        path: 'policies',
        children: [
            {
                path: 'shipping-policy',
                component: ShippingComponent,
                title: 'Shipping',
            }
        ]
    }
    , {
        path: 'dashboard',
        canActivate: [dashboardGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
                title: 'Dashboard',
            },
            {
                path: 'new-user',
                component: AddUserComponent,
                title: 'Add New User'
            },
            {
                path: 'manage-users',
                component: ManageUsersComponent,
                title: 'Manage Users'
            },
            {
                path: 'new-role',
                component: AddRolesComponent,
                title: 'Add New Role'
            },
            {
                path: 'manage-roles',
                component: ManageRolesComponent,
                title: 'Manage Roles'
            },
            {
                path: 'new-coupon',
                component: AddCouponComponent,
                title: 'Add New Coupon'
            },
            {
                path: 'manage-coupons',
                component: ManageCouponsComponent,
                title: 'Manage Coupons'
            },
            {
                path: 'new-category',
                component: AddCategoryComponent,
                title: 'Add New Category'
            },
            {
                path: 'new-subcategory',
                component: AddSubcategoryComponent,
                title: 'Add New Subcategory'
            },
            {
                path: 'manage-categories',
                component: ManageCategoriesComponent,
                title: 'Manage Categories'
            },
            {
                path: 'manage-subcategories',
                component: ManageSubcategoriesComponent,
                title: 'Manage Subcategories'
            },
            {
                path: 'new-product',
                component: AddProductComponent,
                title: 'Add New Product'
            },
            {
                path: 'manage-products',
                component: ManageProductsComponent,
                title: 'Manage Products'
            },
            {
                path: 'new-location',
                component: AddGovernorateComponent,
                title: 'Add New Location'
            },
            {
                path: 'manage-locations',
                component: ManageGovernorateComponent,
                title: 'Manage Locations'
            },
            {
                path: 'manage-orders',
                component: ManageOrdersComponent,
                title: 'Manage Orders'
            },
            {
                path: 'product-details/:id',
                component: DashboardProductDetails,
                title: 'Product Details'
            },
        ]
    },
    {
        path: 'dashboard-login',
        component: DashboarLoginComponent,
        title: 'Dashboard Login',
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent,
        title: 'Forbidden',
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: '404 Not Found',
    }
];