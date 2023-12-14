import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientAll, CreateClientDto, CreateCommandeDto, ProduitAll } from '../models/models';
import { AppConfig } from '../config/constants';






@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = AppConfig.BASE_URL;
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http:HttpClient) { }

  createClient(data:CreateClientDto){
    this.http.post<ClientAll>(`${this.url}/api/clients`,data).subscribe({
      next(value) {
        alert('creation reussie');
      },
      error(err:HttpErrorResponse) {
        alert(err.message);
      },
    })
  }
  getProducts(){
    return this.http.get<ProduitAll[]>(`${this.url}/api/produits`,{headers:this.headers})
  }
  getFeaturedProducts(){
    return this.http.get<ProduitAll[]>(`${this.url}/api/produits/featured`,{headers:this.headers})
  }
  getProduct(id:string){
    return this.http.get<ProduitAll>(`${this.url}/api/produits/${id}`,{headers:this.headers})
  }

  commander(data:CreateCommandeDto){
    return this.http.post<CreateCommandeDto>(`${this.url}/api/commandes`,data,{headers:this.headers})
  }

}


