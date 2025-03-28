import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { InventoryComponent } from './component/inventory/inventory.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { UserAuthGuard } from './gaurds/user.gaurd';
import { AdminGaurd } from './gaurds/admin.gaurd';

const routes: Routes = [
  {path:"auth",component:AuthComponent },
  {path:"home",component:HomeComponent ,canActivate:[UserAuthGuard]},
  {path:"cart",component:CartComponent  ,canActivate:[UserAuthGuard]},
  {path:"order",component:OrderComponent ,canActivate:[UserAuthGuard]},
  {path:"admin",component:InventoryComponent ,canActivate:[AdminGaurd]},
  {path:"orderDetails",component:OrderDetailsComponent ,canActivate:[AdminGaurd]},
  {path:"**",redirectTo:'/auth',},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
