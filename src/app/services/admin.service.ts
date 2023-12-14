import { Injectable } from '@angular/core';
import { AppConfig } from '../config/constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = AppConfig.BASE_URL;
  private headers = new HttpHeaders().set(
    'Authorization',
    `Bearer ${localStorage.getItem('token')}`
  );

  constructor(private http:HttpClient) { }
}
