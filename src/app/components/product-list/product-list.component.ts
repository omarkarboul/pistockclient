import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  @Input() categorie ;
  @Input() list ;
  currentCategory: String = "";
  constructor(private productService: ProductService,
    private cartservice : CartService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.listProducts();
    this.route.paramMap.subscribe(() => {
      this.listProductsParCategorie();
    });
  }
  listProductsParCategorie() {
    this.currentCategory = this.route.snapshot.paramMap.get('cat');
    this.productService.getProductByCat(this.currentCategory).subscribe(
      data => {
        this.products = data;
        console.log(data);
      }
    )
  }

  listProducts() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

  // listelectromenage(){
  //   this.productService.getProductByCat("Electromenager").subscribe(
  //     data => {
  //       this.products = data;
  //       console.log(data);
  //     }
  //   )
  // }

  // listalimen(){
  //   this.productService.getProductByCat("Alimentaire").subscribe(
  //     data => {
  //       this.products = data;
  //       console.log(data);
  //     }
  //   )
  // }

  // listquincaill(){
  //   this.productService.getProductByCat("Quincaillerie").subscribe(
  //     data => {
  //       this.products = data;
  //       console.log(data);
  //     }
  //   )
  // }

  addToCart(prod : Product){
    // console.log(prod.code)
    // console.log(prod.prixUnitaire)
    const theCartItem = new CartItem(prod);
    this.cartservice.addToCart(theCartItem);
  }

}
