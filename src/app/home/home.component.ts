import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsePhoneNumber } from 'libphonenumber-js';
import { AuthService } from '../config/Authentification/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private authservice:AuthService,private router:Router){}
  ngOnInit(): void {
    /* this.authservice.estConnecte.subscribe((e)=>{
      if(!e){
        alert('Authentification requise');
        this.router.navigate(['login'])
         
          
      }
    }) */ //todo 
  }

  formatPhoneNumber(phone: string) {
    const phoneNumber = parsePhoneNumber(phone);
    const formated = phoneNumber.formatInternational();
    return formated;
  }
 
}
