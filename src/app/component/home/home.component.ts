import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  UserProducts: any[] = [];
  qty: { [id: string]: number } = {};

  constructor(
    private homeService: HomeService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.homeService.getProducts().subscribe(
      (data) => {
        this.UserProducts = data;
        this.UserProducts.forEach(product => {
          //setting def to 1
          this.qty[product.id] = 1;
        });
      },
      (error) => console.error("Error fetching products", error)
    );
  }

  addToCart(product: any) {
    const selectedQty = this.qty[product.id] || 1;
    // Validatinge quantity
    if (selectedQty < 1 || selectedQty > parseInt(product.quantity)) {
      alert("Invalid product quantity");
      return;
    }
    const cartValue = {
      name: product.name,
      price: product.price,
      img: product.img,
      qty: selectedQty,
      totalValue: selectedQty * parseFloat(product.price)
    };
    this.cartService.addToCart( cartValue).subscribe(
      (data) => {
        console.log("Added to cart", data);
        alert("Product added to cart!");
      },
      (error) => console.error("Error adding to cart", error)
    );
  }
}
