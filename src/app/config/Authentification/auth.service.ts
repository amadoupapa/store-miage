import { Injectable } from '@angular/core';
import { LoginResponse, RegisterDTO, User } from './models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ClientService } from 'src/app/services/client.service';
import { CreateClientDto } from 'src/app/models/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = Constant.BASE_URL;
  public token = '';

  constructor(private http: HttpClient, private clientService: ClientService) {}
  register(registerDto: RegisterDTO, clientDto: CreateClientDto) {
    //CREE D'ABORD UN USER
    this.http.post<User>(`${this.baseUrl}/register`, registerDto).subscribe({
      next: (r) => {
        var credential = {
          username: registerDto.login,
          password: registerDto.password,
          rememberMe: true,
        };
        //CONNECTER DIRECTEMENT USER ET OBTENIR UN TOKEN
        this.login(credential);
        //ENSUITE CREER LE CLIENT AVEC INFO SUPPLEMENTAIRES
        this.clientService.createClient(clientDto);
      },
      error(err: HttpErrorResponse) {
        alert(err.message);
      },
    });
  }

  login(credentials: {
    username: string;
    password: string;
    rememberMe: boolean;
  }) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/authenticate`, credentials)
      .subscribe({
        next: (r) => {
          localStorage.setItem('token', r.id_token);
          this.token = r.id_token;
          alert('Token' + r.id_token);
        },
        error(err: HttpErrorResponse) {
          alert(err.message);
        },
      });
  }
}
