import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseModalComponent } from './components/choose-modal/choose-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header/header.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductCardComponent } from './components/featured-products/product-card/product-card.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    ChooseModalComponent,
    NavbarComponent,
    HeaderComponent,
    FeaturedProductsComponent,
    ProductCardComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule,HttpClientModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
