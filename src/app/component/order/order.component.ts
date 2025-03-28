import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  userId: string | null = localStorage.getItem('userId');

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.fetchOrders();
    } else {
      console.error("User is not logged in.");
    }
  }

  fetchOrders(): void {
    if (this.userId) {
      this.orderService.getOrdersByUser(this.userId).subscribe(
        data => {
          this.orders = data;
          console.log("User orders:", this.orders);
        },
        error => console.error("Error fetching orders", error)
      );
    }
  }
}
