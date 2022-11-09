import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { BoardComponent } from './modules/board/board.component';

const routes: Routes = [
  { path: 'board',  component: BoardComponent  },
  { path: '',  component: DashboardComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
