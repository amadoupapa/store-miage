import { User } from '../config/Authentification/models';

export interface Produit {
  id: number;
  nomProduit: string;
  descriptionProduit: string;
  prix: number;
  featured: boolean;
  imageProduit: Blob;
  idCategorie: number;
}
export interface ProduitAll {
  id: number;
  nomProduit: string;
  descriptionProduit: string;
  prix: number;
  imageProduit: string;
  imageProduitContentType: string;
  featured: boolean;
  categorie: Categorie | null;
}
export interface Client {
  id: number;
  adresse: string;
  telephone: string;
  idUser: number;
}
export interface ClientAll {
  id: number;
  adresse: string;
  telephone: string;
  user: User;
}
export interface CreateClientDto {
  adresse: string;
  telephone: string;
  user: User;
}

export interface Commande {
  id: number;
  idClient: number;
  idProduit: number;
  dateCommande: Date;
}
export interface CommandeAll {
  id: number;
  client: ClientAll;
  produit: Produit;
  dateCommande: Date;
}
export interface CreateCommandeDto {
  client: { id: number  };
  produit: { id: number  };
  dateCommande: string;
}

export interface Categorie {
  id: number;
  nomCategorie: string ;
}

export class CreateProdcutDto{
  nomProduit?: string | null;
  descriptionProduit?: string | null;
  prix?: number | null;
  imageProduit?: string | null;
  imageProduitContentType?: string | null;
  featured?: boolean | null;
  categorie!:{id:number |null}
}
