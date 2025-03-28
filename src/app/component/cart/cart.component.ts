import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { CartService, CartItem } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: (CartItem & { id: string })[] = [];

  constructor(private cartService: CartService,private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchCart();
  }

  get finalAmount(): number {
    return this.cartData.reduce((sum, item) => sum + Number(item.totalValue), 0);
  }

  fetchCart(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cartData = data;
        console.log('Cart data:', this.cartData);
      },
      error => {
        console.error('Error fetching cart data', error);
      }
    );
  }

  placeOrder(): void {
    if (this.cartData.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const authId=localStorage.getItem('userId');
      if (!authId){
      alert("User is not logged in!");
      return;
    }
     const order: Order= {
      userId: authId,
      items: this.cartData, // using the flat cart items
      totalAmount: this.finalAmount,
      status: 'Placed',
      createdAt: new Date().toISOString()
    };

    this.orderService.addOrder(order).subscribe(
      () => {
        alert(`Order placed successfully! Final amount: $${this.finalAmount}`);
        console.log('Order placed successfully'); 
        this.cartData=[];
        this.cartService.deleteCart().subscribe(()=>{
          console.log('Cart deleted successfully');
        },(err)=>{
          console.error('Error deleting cart', err);
          alert('Error deleting cart');
        })
      },
      (err:any)=>{
        console.error('Error adding order', err);
        alert('Error adding order');
      }
    )
  }
}
