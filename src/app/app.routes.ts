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
import { ProductReviewsComponent } from './features/product-details/product-reviews/product-reviews.component';

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
    },
    {
        path: 'products/:slug',
        component: ProductDetailsComponent,
        title: 'Products',
    },
    {
        path: 'reviews/:id',
        component: ProductReviewsComponent,
        title: 'Reviews',
    },
    {
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
                path: 'new-coupon',
                component: AddCouponComponent,
                title: 'Add New Coupon'
            },
            {
                path: 'new-category',
                component: AddCategoryComponent,
                title: 'Add New Category'
            },
            {
                path: 'new-product',
                component: AddProductComponent,
                title: 'Add New Product'
            },
        ]
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