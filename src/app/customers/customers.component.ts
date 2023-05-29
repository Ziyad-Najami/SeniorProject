import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';


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


  deleteCustomer(customer: any) {
    const confirmDelete = confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      this.apiService.deleteCustomer(customer.id).subscribe((response: any) => {
        this.Customers = this.Customers.filter((c: any) => c !== customer);
      });
    }
  }
  



  generateExcel()
  {

    const rows = [];
  for (const customer of this.Customers) {
    rows.push({
      ID: customer.id,
      'Full Name': customer.full_name,
      Address: customer.address,
      'Total Sales': customer.total_sales,
      'Phone Number': customer.phone_number,
      Email: customer.email
    });
  }

  
  const worksheet = XLSX.utils.json_to_sheet(rows);

  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');


  const filename = 'customers.xlsx';
  writeFile(workbook, filename);
  
  }
}
