import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DefaultComponent } from './components/default/default.component';
import { HomeProviderComponent } from './components/dashboards/provider/home-provider/home-provider.component';
import { HomeAdminComponent } from './components/dashboards/admin/home-admin/home-admin.component';

import {
  HomeAdminWorkspaceComponent
} from './components/dashboards/admin/views';

import {
   HomeWorkspaceComponent,
   ProviderWorkspaceComponent,
   EditProviderWorkspaceComponent,
   ProductWorkspaceComponent,
   EditProductWorkspaceComponent,
   CategoryWorkspaceComponent,
   EditCategoryWorkspaceComponent,
   CashierWorkspaceComponent,
   EditCashierWorkspaceComponent,
   OrderWorkspaceComponent,
   ProviderDetailsWorkspaceComponent,
   CategoryDetailsWorkspaceComponent,
   ProductDetailsWorkspaceComponent
} from './components/dashboards/provider/views';

import { AuthGuard, RoleGuard } from './guards';

const routes: Routes = [
  // Auth routing
  { path: 'auth/sign-in', component: LoginComponent },
  { path: 'auth/register-user', component: RegisterComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'redirecting', component: DefaultComponent },

  // Admin Dashboard
  { path: 'admin-dashboard/workspace', component: HomeAdminComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'admin' },
    children: [
      { path: 'home', component: HomeAdminWorkspaceComponent },

      // redirect to workspace home by default
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  // Provider Dashboard
  { path: 'provider-dashboard/workspace', component: HomeProviderComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'provider' },
    children: [
      { path: 'home', component: HomeWorkspaceComponent },
      { path: 'providers', component: ProviderWorkspaceComponent },
      { path: 'providers/create', component: EditProviderWorkspaceComponent, data: { mode: 'create' }},
      { path: 'providers/:id/edit', component: EditProviderWorkspaceComponent, data: { mode: 'edit' }},
      { path: 'providers/:id/details', component: ProviderDetailsWorkspaceComponent },
      { path: 'providers/:id/categories', component: CategoryWorkspaceComponent },
      { path: 'providers/:id/categories/create', component: EditCategoryWorkspaceComponent, data: { mode: 'create' }},
      { path: 'providers/:id/categories/:catId/edit', component: EditCategoryWorkspaceComponent, data: { mode: 'edit' }},
      { path: 'providers/:id/categories/:catId/details', component: CategoryDetailsWorkspaceComponent },
      { path: 'providers/:id/cashiers', component: CashierWorkspaceComponent },
      { path: 'providers/:id/cashiers/create', component: EditCashierWorkspaceComponent, data: { mode: 'create' }},
      { path: 'providers/:id/cashiers/:cashierId/edit', component: EditCashierWorkspaceComponent, data: { mode: 'edit' }},
      { path: 'providers/:id/categories/:catId/products', component: ProductWorkspaceComponent },
      { path: 'providers/:id/categories/:catId/products/create', component: EditProductWorkspaceComponent, data: { mode: 'create' }},
      { path: 'providers/:id/categories/:catId/products/:prodId/edit', component: EditProductWorkspaceComponent, data: { mode: 'edit' }},
      { path: 'providers/:id/categories/:catId/products/:prodId/details', component: ProductDetailsWorkspaceComponent },
      // { path: 'orders', component: OrderWorkspaceComponent },

      // redirect to login by default
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  //  Default redirect
  { path: '', redirectTo: 'redirecting', pathMatch: 'full' },

  // otherwise NOT FOUND
  { path: '**', redirectTo: 'not-found' }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
