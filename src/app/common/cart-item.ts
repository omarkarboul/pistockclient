import { Product } from "./product";

export class CartItem {

    idProduit: number;
    code: number  ;
    libelle: string ;
    prixUnitaire: number ;
    image:string;
    quantite:number;

    constructor(product : Product){
        this.idProduit=product.idProduit;
        this.code=product.code;
        this.libelle=product.libelle;
        this.prixUnitaire=product.prixUnitaire;
        this.image=product.image;

        this.quantite = 1 ;
    }
}
