import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  VENDORS : any;
  constructor(private apiService : ApiService) { }

  ngOnInit(): void {
    this.apiService.getVendors().subscribe((result : any) => {
      this.VENDORS = result.data;
    });
  }




  deleteVendor(VENDORS1: any)
  {
    this.apiService.deleteVendor(VENDORS1.id).subscribe((response : any) => {
      this.VENDORS =  this.VENDORS.filter((u:any) => u !== VENDORS1);
    });
    console.log(VENDORS1.id)

  }
  generateExcel()
  {

    const rows = [];
  for (const vendor of this.VENDORS) {
    rows.push({
      ID: vendor.id,
      'Full Name': vendor.full_name,
      Address: vendor.address,
      'Total Purchase': vendor.total_purchase,
      'Phone Number': vendor.phone_number,
      Email: vendor.email
    });
  }

  
  const worksheet = XLSX.utils.json_to_sheet(rows);

 
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'VENDORS');

  
  const filename = 'vendor.xlsx';
  writeFile(workbook, filename);
  
  }
}
