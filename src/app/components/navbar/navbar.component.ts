import { Component } from '@angular/core';
import { BusinessCard } from 'src/app/business-card.model';
import { BusinessCardService } from 'src/app/business-card.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  businessCard: BusinessCard;
  constructor(private businessCardService: BusinessCardService) {
    this.businessCard = this.businessCardService.getBusinessCard();
  }
}
