import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[] = [];
  statusOptions: ('Placed' | 'Processing' | 'On the way' | 'Delivered')[] = [
    "Placed",
    "Processing",
    "On the way",
    "Delivered"
  ];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      data => {
        this.orders = data;
        console.log("All orders:", this.orders);
      },
      error => console.error("Error fetching orders", error)
    );
  }

  updateStatus(order: Order, newStatus: 'Placed' | 'Processing' | 'On the way' | 'Delivered'): void {
    if (order.id) {
      this.orderService.updateOrderStatus(order.id, newStatus).subscribe(
        () => {
          order.status = newStatus;
          alert(`Order ${order.id} status updated to ${newStatus}`);
        },
        error => {
          console.error("Error updating order status", error);
          alert("Error updating order status");
        }
      );
    }
  }
}
