import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeProviderComponent } from './components/dashboards/provider/home-provider/home-provider.component';

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

  import { AuthGuard } from './guards';

const routes: Routes = [

  // Auth routing
  { path: 'auth/sign-in', component: LoginComponent },
  { path: 'auth/register-user', component: RegisterComponent },

  // Provider Dashboard
  { path: 'provider-dashboard/workspace', component: HomeProviderComponent, canActivate: [AuthGuard],
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

      // redirect to workspace home by default
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },

  //  Default redirect
  { path: '', redirectTo: 'provider-dashboard/workspace', pathMatch: 'full' },

  // otherwise NOT FOUND
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
