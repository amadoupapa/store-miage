import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.image_src = 'data:' + this.image_type + ';base64,' + this.image_url;
   
   
   
  }
  @Input()
  id!: number;
  @Input()
  prix!: number;
  @Input()
  image_url!: string;
  @Input()
  image_type!: string;
  @Input()
  titre!: string;
  image_src!: string;
 
}
