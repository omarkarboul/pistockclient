import { Component, ViewChild } from '@angular/core';
import { Product } from './common/product';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';

  
  constructor(private productService: ProductService) { }

  cat:String;
  ls: Product[];

  @ViewChild(ProductListComponent , { static: false })
  private prodcomponent : ProductListComponent ;

  // listelectro(){
  //   this.cat="Electromenager"
  //   this.prodcomponent.listelectromenage();
    
  // }

  // listalimentaire(){
  //   this.cat="Alimentaire"
  //   this.prodcomponent.listalimen();
  // }

  // listquincaillerie(){
  //   this.cat="Quincaillerie"
  //   this.prodcomponent.listquincaill();
  // }

  liste(){
    this.prodcomponent.listProducts();
  }
}
