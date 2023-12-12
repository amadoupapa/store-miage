import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { parsePhoneNumber } from 'libphonenumber-js';
import { BusinessCard } from '../business-card.model';
import { BusinessCardService } from '../business-card.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  businessCard: BusinessCard;
  countryCodes;

  constructor(
    private route: ActivatedRoute,
    private businessCardService: BusinessCardService
  ) {
    this.businessCard = this.businessCardService.getBusinessCard();
    this.countryCodes = this.businessCardService.countryCode;
  }
  ngOnInit() {
    //route.paramMap [parametres de routes]
    //route.queryParamMap [parametres de requetes]
  }
  processPhoneNumber() {
    const phoneNumber = parsePhoneNumber(this.businessCard.phone);
  }
  saveChanges() {
    this.businessCard.phone =
      this.businessCard.countryCode + this.businessCard.phoneNumber;
    alert(this.businessCard.phone);
  }
}
