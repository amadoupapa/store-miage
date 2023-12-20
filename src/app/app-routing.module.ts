import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommandeComponent } from './commande/commande.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ListeCommandesComponent } from './admin/liste-commandes/liste-commandes.component';
import { ListeProduitsComponent } from './admin/liste-produits/liste-produits.component';
import { ListeCategoriesComponent } from './admin/liste-categories/liste-categories.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: DashboardComponent,children:[
    {path:'liste-commandes',component:ListeCommandesComponent},
    {path:'liste-produits',component:ListeProduitsComponent},
    {path:'liste-categories',component:ListeCategoriesComponent}
  ] },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  {
    path: 'liste-produits/categorie/:categorie_id',
    component: ProductsListComponent,
  },
  {
    path: 'details-produit/:id',
    component: ProductDetailsComponent,
  },
  {
    path: 'mes-commandes',
    component: CommandeComponent,
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
