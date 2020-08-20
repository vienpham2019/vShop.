import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CatalogsComponent } from './components/catalogs/catalogs.component';
import { ItemComponent } from './components/item/item.component';
import { SizeChartComponent } from './components/size-chart/size-chart.component';
import { WaitingListComponent } from './components/waiting-list/waiting-list.component';
import { OrderMordalComponent } from './components/order-mordal/order-mordal.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { ContactComponent } from './components/contact/contact.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ItemReviewsComponent } from './components/item-reviews/item-reviews.component';

import { PaginationService } from './services/pagination/pagination.service'
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    NavbarComponent,
    CatalogsComponent,
    ItemComponent,
    SizeChartComponent,
    WaitingListComponent,
    OrderMordalComponent,
    PaymentComponent,
    UserProfileComponent,
    LoginRegisterComponent,
    ContactComponent,
    PageNotFoundComponent,
    ItemReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
  ],
  providers: [
    PaginationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
