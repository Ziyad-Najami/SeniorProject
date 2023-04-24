import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
}
