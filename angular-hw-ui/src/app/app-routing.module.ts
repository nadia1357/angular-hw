import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SignUpComponent } from './modules/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'sign_up', component: SignUpComponent },

  { path: 'password/new', component: ForgotPasswordComponent },

  { path: '', component: SignInComponent },
  
  {
    path: 'task/:id',
    loadChildren: () => import('./modules/task/task.module')
      .then((m) => m.TaskModule)
  },

  {
    path: 'board/:id',
    loadChildren: () => import('./modules/board/board.module')
      .then((m) => m.BoardModule)
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module')
      .then((m) => m.DashboardModule)
  },

  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
