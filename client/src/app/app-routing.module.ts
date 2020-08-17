import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';


const routes: Routes = [
  {path: '' , component: HomeComponent}, 
  {path: 'catalog', component: CatalogsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
