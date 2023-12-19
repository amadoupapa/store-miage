import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommandeAll } from 'src/app/models/models';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-liste-commandes',
  templateUrl: './liste-commandes.component.html',
  styleUrls: ['./liste-commandes.component.css'],
})
export class ListeCommandesComponent implements OnInit {
  constructor(private adminservice: AdminService) {}
  commandes!: CommandeAll[];
  ngOnInit(): void {
    this.adminservice.getCommandes().subscribe({
      next: (value) => {
        this.commandes = value;
        console.log('commandes charge avec succes');
        console.log(this.commandes);
      },
    });
  }

  deleteCommande(id: number) {
    if (confirm('Confirmer la suppression')) {
      this.adminservice.deleteCommande(id).subscribe({
        next:(v)=>{
          alert('Commande supprimee');
          this.ngOnInit()
        },
        error(err:HttpErrorResponse){
          alert(err.message);
        }
      });
    }
   
   
  }
}
