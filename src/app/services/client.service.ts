import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ClientAll,
  CreateClientDto,
  CreateCommandeDto,
  ProduitAll,
} from '../models/models';
import { AppConfig } from '../config/constants';
import { User } from '../config/Authentification/models';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = AppConfig.BASE_URL;
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http: HttpClient) {}

  createClient(data: CreateClientDto, user:User) {
    data.user = user
    console.log('nous somme a la creation client et voici les ',data.user);
    this.http
      .post<ClientAll>(`${this.url}/api/clients`, data, {
        headers: this.headers,
      })
      .subscribe({
        next(value) {
          alert('creation reussie');
        },
        error(err: HttpErrorResponse) {
          alert(err.message);
        },
      });
  }
  getProducts() {
    return this.http.get<ProduitAll[]>(`${this.url}/api/produits`, {
      headers: this.headers,
    });
  }
  getFeaturedProducts() {
    return this.http.get<ProduitAll[]>(`${this.url}/api/produits/featured`);
  }
  getProduct(id: string) {
    return this.http.get<ProduitAll>(`${this.url}/api/produits/${id}`, {
      headers: this.headers,
    });
  }

  commander(data: CreateCommandeDto) {
    return this.http.post<CreateCommandeDto>(
      `${this.url}/api/commandes`,
      data,
      { headers: this.headers }
    );
  }
}
