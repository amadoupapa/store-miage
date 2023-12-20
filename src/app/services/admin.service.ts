import { Injectable, OnInit } from '@angular/core';
import { AppConfig } from '../config/constants';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Categorie, CommandeAll, CreateProdcutDto, ProduitAll } from '../models/models';
import { AuthService } from '../config/Authentification/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService  {


  url = AppConfig.BASE_URL;
  commandes!:CommandeAll[]
  categories!:Categorie[]
  produits!:ProduitAll[]
  estConnecte:boolean=false
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http:HttpClient, private authservice:AuthService) { 
    authservice.checkAuth().subscribe({
      next:(e)=>{
        this.estConnecte = e
      }
    })
  }
 
  getCommandes(){
    
   return this.http.get<CommandeAll[]>(`${this.url}/api/commandes`,{headers:this.headers})
  }

  deleteCommande(id: number) {
    this.authservice.checkAuth()
    return this.http.delete(`${this.url}/api/commandes/${id}`,{headers:this.headers})
   }

   getProducts() {
    
    return this.http.get<ProduitAll[]>(`${this.url}/api/produits`, {
      headers: this.headers,
    });
  }
  deleteProduct(id: number) {
    
    return this.http.delete(`${this.url}/api/produits/${id}`, {
      headers: this.headers,
    });
  }

  getCategories(){
    return this.http.get<Categorie[]>(`${this.url}/api/categories`)
  }

  createProduct(data: CreateProdcutDto) {
    this.authservice.checkAuth()
    return this.http.post(`${this.url}/api/produits`,data, {
      headers: this.headers
    });
  }

  createCategorie(data:{nomCategorie:string}){
    return this.http.post(`${this.url}/api/categories`,data, {
      headers: this.headers
    });
  }
  deleteCategorie(id:number){
    return this.http.delete(`${this.url}/api/categories/${id}`, {
      headers: this.headers
    });
  }
}
