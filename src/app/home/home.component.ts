import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { parsePhoneNumber } from 'libphonenumber-js';
import { BusinessCard } from '../business-card.model';
import { BusinessCardService } from '../business-card.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  businessCard: BusinessCard;
  constructor(
    private router: Router,
    private businessCardService: BusinessCardService
  ) {
    this.businessCard = this.businessCardService.getBusinessCard();
  }
  showEditComponent(id: string) {
    //parametres de routes, des segments
    // this.router.navigate(['/edit'], { queryParams: { id: id, flag: flag.toString() } });
    this.router.navigate(['/edit', id]);
  }

  formatPhoneNumber(phone: string) {
    const phoneNumber = parsePhoneNumber(phone);
    const formated = phoneNumber.formatInternational();
    return formated;
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }
}
