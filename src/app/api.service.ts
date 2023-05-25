import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  User_sent : any;
  role : BigInteger | undefined;

  constructor(private http : HttpClient) { }

  url : string = 'http://localhost:8080/SPtest2/SPTEST/src/app/php/';

  logincheck(username: string, password: string) {
    
   // console.log(this.http.post(this.url+'login.php', { username, password }));
    return this.http.post(this.url+'login.php', { username, password });
  }
  /////////////////////////////////////////////////////////////////////////////////////
  //////                            Users API                                     /////
  /////////////////////////////////////////////////////////////////////////////////////
  displayUsers()
  {
    return this.http.get(this.url+'selectsalesman.php');
  }

  deleteUser(SalesmanID : any)
  {console.log(SalesmanID);

    return this.http.delete(this.url+'terminateSalesman.php?id=' + SalesmanID);
  }

  addUser(User : any)
  { console.log(User.value);
  //role = User.value.roleField.

    return this.http.post(this.url+'adduser.php' , User);
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  /////                           Items API                                           /////
  /////////////////////////////////////////////////////////////////////////////////////////
  getItems()
  {
    return this.http.get(this.url+'itemslist.php');

  }

  deleteItem(ItemId : any)
  {
    return this.http.delete(this.url+'deleteitem.php?id=' + ItemId);
  }


  addItem(ITEM : any)
  { console.log(ITEM.value);
  //role = User.value.roleField.

    return this.http.post(this.url+'addItem.php' ,ITEM);
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  /////                             Customer API                                     /////
  ////////////////////////////////////////////////////////////////////////////////////////
  getCustomers()
  {
    return this.http.get(this.url+'customerslist.php');

  }

  deleteCustomer(ItemId : any)
  {
    return this.http.delete(this.url+'deletecustomer.php?id=' + ItemId);
  }

  addCustomer(Customer : any)
  {
    return this.http.post(this.url+'addcustomer.php', Customer);
  }
  ////////////////////////////////////////////////////////////////////////////////////////
  /////                               Vendor API                                     /////
  ////////////////////////////////////////////////////////////////////////////////////////
  getVendors()
  {
    return this.http.get(this.url+'vendorlist.php');

  }


  deleteVendor(vendorID : any)
  {
    return this.http.delete(this.url+'deletevendor.php?id=' + vendorID);
  }


  addVendor(Vendor : any)
  {
    return this.http.post(this.url+'addvendor.php', Vendor);
  }


  ////////////////////////////////////////////////////////////////////////////////////////
  /////                          Sales Order API                                     /////
  ////////////////////////////////////////////////////////////////////////////////////////

  addSalesOrderHeader(salesHeader : any)
  {
    return this.http.post(this.url+'addSalesHeader.php', salesHeader);

  }

  addSalesOrderLine(salesLine : any)
  {

  return this.http.post(this.url+'addSalesLine.php', salesLine);

  }

  ////////////////////////////////////////////////////////////////////////////////////////
  /////                          Purch Order API                                     /////
  ////////////////////////////////////////////////////////////////////////////////////////


  addPurchOrderHeader(PurchHeader : any)
  {
    console.log(PurchHeader);
    return this.http.post(this.url+'addPurchOrderHeader.php', PurchHeader);

  }

  addPurchOrderLine(PurchLine : any)
  {
    console.log(PurchLine);
  return this.http.post(this.url+'addPurchOrderLine.php', PurchLine);

  }




  //////////////////////////////testing ////////////////////////////////////////////////////////////
  displayCustomers() {
    return this.http.get(this.url+'customerslist.php').pipe(
      map((data: any) => Object.values(data))
    );
  }
  

  getItemstest(): Observable<any> {
    return this.http.get(this.url+'itemslist.php').pipe(
      map((data: any) => Object.values(data))
    );
  }
  

  addSalesOrder(salesOrder: any): Observable<any> {
    return this.http.post(this.url+'addSalesOrder.php', salesOrder);
  }

  ////////////////////////////////////////////SalesMan Insights //////////////////////////////////////////

  getItemsWithLeastQuantitySold() 
  {
    return this.http.get(this.url+'LeastItemSold.php');


  }

  getItemsWithHighestInventory()
  {
    return this.http.get(this.url+'HighestItemQty.php');

  }
}
