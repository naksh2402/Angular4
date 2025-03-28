import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/products';

import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  Products: Product[] = [];
  newProductName: string = "";
  newProductDescription: string = "";
  newProductPrice: string = "";
  newProductImage: string = "";
  counter: number = 0;
  selectedProject: Product | null = null;

  constructor(private productSer: ProductService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  increment() {
    this.counter++;
  }

  decrement() {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  loadTasks(): void {
    this.productSer.getProducts().subscribe(
      (data) => {
        this.Products = data;
        // console.log(data);
      },
      (err: any) => console.error("Error fetching Products", err)
    );
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    const tempData: Product = {
      img: this.newProductImage,
      name: this.newProductName,
      description: this.newProductDescription,
      price: this.newProductPrice,
      quantity: this.counter.toString()
    };
    this.productSer.addProduct(tempData).subscribe(
      (data) => {
        this.newProductName = '';
        this.newProductDescription = "";
        this.newProductPrice = "";
        this.newProductImage = "";
        this.counter = 0;
        this.loadTasks();
        console.log(data);
      },
      (err) => console.error('Error adding product:', err)
    );
  }

  editProject(product: Product) {
    this.selectedProject = { ...product };
  }

  deleteProject(productId: string | undefined) {
    if (!productId) return;
    if (confirm('Are you sure you want to delete this product?')) {
      this.productSer.deleteProject(productId).subscribe(
        () => this.loadTasks(),
        (error: any) => console.error('Error deleting Product:', error)
      );
    }
  }

  updateTask(product: Product) {
    if (!product.id) {
      alert("Product ID missing.");
      return;
    }
    this.productSer.updateTask(product).subscribe(
      (data) => {
        this.selectedProject = null;
        this.loadTasks();
      },
      (err: any) => {
        alert("Error in updating product");
        console.error(err);
      }
    );
  }

  cancelEdit() {
    this.selectedProject = null;
  }
}
