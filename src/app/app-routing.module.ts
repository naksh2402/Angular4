import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';

const routes: Routes = [
  {path:"auth",component:AuthComponent},
  {path:"home",component:HomeComponent},
  {path:"cart",component:CartComponent  },
  {path:"order",component:OrderComponent},
  {path:"admin",component:InventoryComponent},
  {path:"orderDetails",component:OrderDetailsComponent},
  {path:"**",redirectTo:'/auth',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
