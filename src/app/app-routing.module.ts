import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AuthguardGuard } from './authguard.guard';
import { NavigationComponent } from './navigation/navigation.component';


import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { HomeComponent } from './home/home.component';
import { PurchaselistComponent } from './purchaselist/purchaselist.component';
import { SaleslistComponent } from './saleslist/saleslist.component';
import { HasRoleGuard } from './has-role.guard';
import { AlreadyAuthGuard } from './already-auth.guard';
import { AddUserComponent } from './add-user/add-user.component';
import { ItemslistComponent } from './itemslist/itemslist.component';
import { AdditemComponent } from './additem/additem.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
//import { AddStudentComponent } from './add-student/add-student.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent , canActivate : [AlreadyAuthGuard] },
  
  
  {path: 'navigateion' , component:NavigationComponent , canActivate : [AuthguardGuard]},
  
  {path : 'notAuthorized' , component:NotAuthorizedComponent, canActivate : [AuthguardGuard]},
  {path : 'home' , component:HomeComponent , canActivate : [AuthguardGuard]},
  {path  : 'purchaseorder' , component : PurchaselistComponent , canActivate : [AuthguardGuard, HasRoleGuard] , data : {role : 'manager'} },
  {path : 'salesorder' , component : SaleslistComponent ,  canActivate : [AuthguardGuard]  },
  {path : 'addUser' , component:AddUserComponent, canActivate : [AuthguardGuard, HasRoleGuard] , data : {role : 'manager'} },
  {path: 'items' , component:ItemslistComponent, canActivate : [AuthguardGuard]},
  {path: 'addItem' , component:AdditemComponent, canActivate : [AuthguardGuard]},
  {path : 'vendors', component:VendorsComponent, canActivate : [AuthguardGuard, HasRoleGuard] , data : {role : 'manager'} },
  {path : 'customers', component:CustomersComponent, canActivate : [AuthguardGuard]},
  {path : 'addCustomer', component:AddCustomerComponent, canActivate : [AuthguardGuard]},
  {path: 'addVendor', component:AddVendorComponent, canActivate :[AuthguardGuard, HasRoleGuard] , data : {role : 'manager'}  }
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
