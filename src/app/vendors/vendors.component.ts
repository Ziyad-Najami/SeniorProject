import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

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

  }
}
