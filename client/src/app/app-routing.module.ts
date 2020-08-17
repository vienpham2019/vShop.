import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';
import { ItemComponent } from './components/item/item.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


const routes: Routes = [
  {path: '' , component: HomeComponent}, 
  {path: 'catalog', component: CatalogsComponent},
  {path: 'item' , component: ItemComponent},
  {path: 'payment' , component: PaymentComponent},
  {path: 'user-profile' , component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
