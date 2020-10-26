import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesViewComponent } from './movies-view/movies-view.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: MoviesViewComponent,
  },
  {
    path: 'showDetails/:id/:tip',
    component: DetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
