import { Component, OnInit } from '@angular/core';
import { ProduitAll } from 'src/app/models/models';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.css'],
})
export class FeaturedProductsComponent implements OnInit {
  produits!: ProduitAll[];
  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getFeaturedProducts().subscribe({
      next: (p) => {
        this.produits = p;
      },
    });
  }
}
