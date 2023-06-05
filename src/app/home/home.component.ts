import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ApiService } from '../api.service';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token_payload: any;
  user_role: string | undefined;
  LoggedInUser: string | undefined;

  leastQuantitySoldItems: any | undefined;
  highestInventoryItems: any | undefined;

  Salesman: any;

  constructor(private authserv: AuthService, private apiservice: ApiService) { }

  ngOnInit(): void {
    this.token_payload = JSON.parse(atob(this.authserv.token.split('.')[1]));
    this.user_role = this.token_payload.role;
    this.LoggedInUser = this.token_payload.username;

    this.apiservice.displayUsers().subscribe((response: any) => {
      this.Salesman = response.data;
    });

    if (this.user_role === 'salesman') {
      this.fetchItemsWithLeastQuantitySold();
      this.fetchItemsWithHighestInventory();
    }
  }

  fetchItemsWithLeastQuantitySold() {
    this.apiservice.getItemsWithLeastQuantitySold().subscribe((response: any) => {
      console.log(response.data);
      this.leastQuantitySoldItems = response.data;
    });
  }

  fetchItemsWithHighestInventory() {
    this.apiservice.getItemsWithHighestInventory().subscribe((response: any) => {
      this.highestInventoryItems = response.data;
    });
  }

  deleteUser(User: any) {
    this.apiservice.deleteUser(User.id).subscribe(result => {
      
      this.Salesman = this.Salesman.filter((u: any) => u !== User);
    });
  }

  generateExcel() {
    const rows = [];
    for (const user of this.Salesman) {
      rows.push({
        ID: user.id,
        'User Name': user.username,
        'Full Name': user.full_name,
        Password: user.password,
        Role: user.role
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'USERS');
    const filename = 'user.xlsx';
    writeFile(workbook, filename);
  }
}
