import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/config/Authentification/auth.service';
import { UserDataStorage } from 'src/app/config/Authentification/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit{
  constructor(private authservice: AuthService, private router: Router) {}
  authSub!: Subscription;
  estConnecte: boolean = false;
  estAdmin: boolean = false;
  loginPage: boolean = false;
  userData!: UserDataStorage | null;
  private data = localStorage.getItem('userData');
  ngOnInit(): void {
    this.checkRouteLogin();
    this.authservice.checkAuth();
    this.authSub = this.authservice.estConnecte.subscribe((v) => {
      this.estConnecte = v;

      this.userData = this.authservice.parseUserData(this.data);

      console.log('donnee user depuis local', this.userData);
      if (this.userData?.estAdmin) this.estAdmin = true;
    });
  }
  //verification route login
  checkRouteLogin() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.loginPage = this.router.url === '/login';
      }
    });
  }

  logout() {
    this.authservice.logout();
    this.ngOnInit();
    this.authSub.unsubscribe();
  }
}
