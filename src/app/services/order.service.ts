import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private dbUrl = environment.firebaseConfig.dbUrl;

  constructor(private http: HttpClient) {}

  addOrder(order: Order): Observable<any> {
    return this.http.post(`${this.dbUrl}/orders.json`, order);
  }

  getOrdersByUser(userId: string): Observable<Order[]> {
    return this.http.get<{ [key: string]: Order }>(`${this.dbUrl}/orders.json`)
      .pipe(
        map(data =>
          data
            ? Object.keys(data)
                .map(key => ({ id: key, ...data[key] }))
                .filter(order => order.userId === userId)
            : []
        )
      );
  }


  getAllOrders(): Observable<Order[]> {
    return this.http.get<{ [key: string]: Order }>(`${this.dbUrl}/orders.json`)
      .pipe(
        map(data =>
          data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : []
        )
      );
  }

  // Update order status
  updateOrderStatus(orderId: string, newStatus: 'Placed' | 'Processing' | 'On the way' | 'Delivered'): Observable<any> {
    return this.http.patch(`${this.dbUrl}/orders/${orderId}.json`, { status: newStatus });
  }
}
