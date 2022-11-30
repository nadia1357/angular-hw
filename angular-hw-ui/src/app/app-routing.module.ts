import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { BoardComponent } from './modules/board/board.component';
import { TaskComponent } from './modules/task/task.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
  { path: 'task/:id', component: TaskComponent },
  { path: 'board/:id', component: BoardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
