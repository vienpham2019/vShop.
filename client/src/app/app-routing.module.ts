import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';
import { ItemComponent } from './components/item/item.component';


const routes: Routes = [
  {path: '' , component: HomeComponent}, 
  {path: 'catalog', component: CatalogsComponent},
  {path: 'item' , component: ItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
