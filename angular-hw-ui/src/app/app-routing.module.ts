import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { BoardComponent } from './modules/board/board.component';

const routes: Routes = [
  { path: '',  component: DashboardComponent  },
  //{ path: '/board',  component: BoardComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
