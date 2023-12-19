import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommandeComponent } from './commande/commande.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ListeProduitsComponent } from './admin/liste-produits/liste-produits.component';
import { SousMenuComponent } from './admin/sous-menu/sous-menu.component';
import { ListeCommandesComponent } from './admin/liste-commandes/liste-commandes.component';
import { AjouterProduitComponent } from './admin/liste-produits/ajouter-produit/ajouter-produit.component';


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
    RegisterComponent,
    NotFoundComponent,
    CommandeComponent,
    DashboardComponent,
    ListeProduitsComponent,
    SousMenuComponent,
    ListeCommandesComponent,
    AjouterProduitComponent

  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule,HttpClientModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
