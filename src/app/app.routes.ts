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

const appName = 'Temp';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: `Home - ${appName}`,
    },
    {
        path: 'cart',
        component: CartComponent,
        title: `Cart - ${appName}`,
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
        title: `Checkout - ${appName}`,
    },
    {
        path: 'collections',
        component: CollectionComponent,
        title: `Collections - ${appName}`,
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: `Contact - ${appName}`,
    },
    {
        path: 'auth/login',
        component: LoginComponent,
        title: `Login - ${appName}`,
    },
    {
        path: 'auth/register',
        component: RegisterComponent,
        title: `Register - ${appName}`,
    },
    {

        path: 'profile',
        component: ProfileComponent,
        title: `Profile - ${appName}`,
    },
    {
        path: 'products/:id',
        component: ProductDetailsComponent,
        title: `Products - ${appName}`,
    },
    {
        path: 'dashboard',
        children: [
            {
                path: '',
                component: DashboardComponent,
                title: `Dashboard - ${appName}`,
            },
        ]
    },
    {
        path: 'forbidden',
        component: ForbiddenComponent,
        title: `Forbidden - ${appName}`,
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: `404 Not Found - ${appName}`,
    }
];