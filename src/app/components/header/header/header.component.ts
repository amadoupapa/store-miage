import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/config/Authentification/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private authservice:AuthService, private router:Router){}
  estConnecte!:boolean
  login!:string | null
  loginPage:boolean = false;
ngOnInit(): void {
  this.authservice.estConnecte.subscribe(v=>{
    this.estConnecte = v;
    this.login = localStorage.getItem('login')
    this.router.events.subscribe((e)=>{
      if(e instanceof NavigationEnd){
        this.loginPage = this.router.url==='/login';
      }
    })
  })
}
}
