import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { parsePhoneNumber } from 'libphonenumber-js';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
 

  formatPhoneNumber(phone: string) {
    const phoneNumber = parsePhoneNumber(phone);
    const formated = phoneNumber.formatInternational();
    return formated;
  }
 
}
