import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthGuard } from './guards';

import { HomeProviderComponent } from './components/dashboards/provider/home-provider/home-provider.component';
import {
   HomeWorkspaceComponent,
   ProviderWorkspaceComponent,
   ProductWorkspaceComponent,
   CategoryWorkspaceComponent,
   CashierWorkspaceComponent,
   OrderWorkspaceComponent
  } from './components/dashboards/provider/views';

const routes: Routes = [

  // Auth routing
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },

  // Provider Dashboard
  { path: 'provider-dashboard/workspace', component: HomeProviderComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeWorkspaceComponent },
      { path: 'providers', component: ProviderWorkspaceComponent },
      { path: 'products', component: ProductWorkspaceComponent },
      { path: 'categories', component: CategoryWorkspaceComponent },
      { path: 'cashiers', component: CashierWorkspaceComponent},
      { path: 'orders', component: OrderWorkspaceComponent },

      // redirect to workspace home by default
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

   // Default redirect
  { path: '', redirectTo: 'provider-dashboard/workspace', pathMatch: 'full' },

  // otherwise NOT FOUND
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
