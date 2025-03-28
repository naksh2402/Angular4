import { Component, computed, OnInit, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/products';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
constructor(private productSer:ProductService){}
Products:any[]=[];
newProductDescription="";
newProductName="";
newProductPrice="";
newProductImage="";
selectedProject:Product|null=null;
//quantity value stored here 
 counter=signal(0);
 finalCounter=computed(()=>this.counter());
//  updatedCounter=signal

increment(){
  this.counter.update((old)=>old+1);
}

decrement(){
  this.counter.update((old)=>old-1);
}

ngOnInit(): void {
  this.loadTasks();
}
 loadTasks(): void {
  this.productSer.getProducts().subscribe((data)=>{
    this.Products=data;
    console.log(data);
    console.log(this.Products);
  },(err:any)=>
 console.log("Error fetching Products ",err));
  }
onSubmit(form:NgForm){
  const tempData={img:this.newProductImage,
    name:this.newProductName,
    description:this.newProductDescription,
    price:this.newProductPrice,
    quantity:this.finalCounter().toString(),
  }
  this.productSer.addProduct(tempData).subscribe((data)=>{
    this.newProductName='';
    this.newProductDescription="";
    this.newProductPrice="";
    this.newProductImage="";
    this.loadTasks();
    console.log(data);
  }
  )
  console.log(form.value);
}
editProject(product:Product){
this.selectedProject={...product};
}
deleteProject(product:string){
 if (confirm('Are you sure you want to delete this product?')) {
 this.productSer.deleteProject(product).subscribe((data)=>
  this.loadTasks(),
  (error:any) => console.error('Error deleting Project:', error)
);
}}
updateTask(product:any){
  console.log("s",product);
  if(product.id && product.product){
  this.productSer.updateTask(product).subscribe((data)=>{
  // console.log(product.id,data);
  this.selectedProject=null;
  this.loadTasks();
},(err:any)=>{
  alert("Error in updating products");
});
  }
}
cancelEdit(){
     this.selectedProject = null;
}
}
