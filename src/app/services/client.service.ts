import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientAll, CreateClientDto } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url = Constant.BASE_URL

  constructor(private http:HttpClient) { }

  createClient(data:CreateClientDto){
    this.http.post<ClientAll>(`${this.url}/clients`,data).subscribe({
      next(value) {
        alert('creation reussie');
      },
      error(err:HttpErrorResponse) {
        alert(err.message);
      },
    })
  }
}


