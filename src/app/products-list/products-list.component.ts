import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit{
  constructor(private route:ActivatedRoute){}
  categorie!:string | null;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.categorie = params.get('categorie');
      // Vous pouvez maintenant utiliser "this.categorie" dans votre composant
    });

  
  }


}
