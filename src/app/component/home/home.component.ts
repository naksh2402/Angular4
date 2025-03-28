import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from 'src/app/models/products';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { HomeService } from 'src/app/services/home.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  UserProducts:any[]=[];
  up="";
  down="";
  qty=1;
  private availabeQty:number=0;
   currentUser: any;
  constructor(private homeSer:HomeService,private cartService:CartService,private authServ:AuthService){}

  ngOnInit(): void {
  console.log(localStorage.getItem('userId'));
      this.fetchProducts();
  }


//   //signalss
//    prodCounter=signal(0);
//    finalCounter=computed(()=>this.prodCounter());
//   //  updatedCounter=signal
  
//   increment(){
//     this.prodCounter.update((old:any)=>{
//      return old=old+1;
//   });
// }
  
//   decrement(){
//      this.prodCounter.update((old:any)=>{
//      return old=old-1;
//   })
// }
  
fetchProducts(){
  this.homeSer.getProducts().subscribe((data)=>{
    this.UserProducts=data;
    this.availabeQty=data.product;
    console.log(data);
  })
}
fetchQuantity(){

}
// data:NgForm
onSubmit(data:any,id:string){
  if(this.qty<1 || this.qty>10){
    alert("Invalid product selection");
    return;
  }
  const cartValue={
    name:data.name,
    price:data.price,
    img:data.img,
    qty:this.qty,
    totalValue:this.qty*data.price,
  }
  this.cartService.addToCart(id,cartValue).subscribe((data)=>{
    console.log(data);
  })
}
}
