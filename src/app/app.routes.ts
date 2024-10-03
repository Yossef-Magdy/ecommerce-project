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
import { ControlHeaderComponent } from './core/layout/control-header/control-header.component';


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
        path: 'products/:id',
        component: ProductDetailsComponent,
        title: 'products',
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'dashboard',
        children: [
            {
                path: 'test',
                component: ControlHeaderComponent,
                title: 'hamada',
            }
        ]
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent,
        title: 'forbidden',
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: '404 Not Found',
    }
];