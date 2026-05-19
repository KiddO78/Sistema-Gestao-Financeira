import { Routes } from '@angular/router';

import { AuthHomeComponent } from './pages/auth-home/auth-home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { TransactionsComponent } from './pages/transactions/transactions';
import { CategoriesComponent } from './pages/categories/categories';
import { GoalsComponent } from './pages/goals/goals';
import { ReportsComponent } from './pages/reports/reports';
import { SettingsComponent } from './pages/settings/settings';

export const routes: Routes = [
  { path: '', component: AuthHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'goals', component: GoalsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { 
    path: 'goals', 
    loadComponent: (): => 
      import('./pages/goals/goals')
      .then(m => m.GoalsComponent) 
  }
];