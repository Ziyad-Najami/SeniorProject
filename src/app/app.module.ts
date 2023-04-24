import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
//import { InsightComponent } from './insight/insight.component';

import { ReactiveFormsModule  ,FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
//import { ListSalesmanComponent } from './list-salesman/list-salesman.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { HomeComponent } from './home/home.component';
import { PurchaselistComponent } from './purchaselist/purchaselist.component';
import { SaleslistComponent } from './saleslist/saleslist.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ItemslistComponent } from './itemslist/itemslist.component';
import { AdditemComponent } from './additem/additem.component';
import { VendorsComponent } from './vendors/vendors.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //InsightComponent,
    NavigationComponent,
    //ListSalesmanComponent,
    NotAuthorizedComponent,
    HomeComponent,
    PurchaselistComponent,
    SaleslistComponent,
    AddUserComponent,
    ItemslistComponent,
    AdditemComponent,
    VendorsComponent,
    CustomersComponent,
    AddCustomerComponent,
    AddVendorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
