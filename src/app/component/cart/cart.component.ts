import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
constructor(private cartService:CartService){}
cartData:any[]=[];
total=0;
finalAmount:number=0;
ngOnInit(): void {
    this.fetchCart();
}
totalData(){
  
  this.cartData.forEach(element => {
    this.total=this.total+element.cart.totalValue;
  })
  this.finalAmount=this.total;
  console.log(this.finalAmount);
  return this.finalAmount;
}

fetchCart(){
  this.cartService.getCart().subscribe((data)=>{
    this.cartData=data;
    console.log(this.cartData);
  })
}
placeOrder(){
  
}
}
