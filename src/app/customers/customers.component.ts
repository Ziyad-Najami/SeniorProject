import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  Customers : any;
  constructor(private apiService : ApiService, private router : Router) { }

  ngOnInit(): void {
    this.apiService.getCustomers().subscribe((response : any) => {
      this.Customers = response.data;

    });
  }


  deleteCustomer(Customer : any) 
  {
    this.apiService.deleteCustomer(Customer.id).subscribe((response : any) => {
      this.Customers =  this.Customers.filter((u:any) => u !== Customer);
    });
  }
}
