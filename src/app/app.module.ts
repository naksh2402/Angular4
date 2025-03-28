import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './component/auth/auth.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    CartComponent,
    OrderComponent,
    InventoryComponent,
    OrderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
