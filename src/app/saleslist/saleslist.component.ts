import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { FormGroup , FormControl  } from '@angular/forms';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrls: ['./saleslist.component.css'],
  providers: [DatePipe]
})
export class SaleslistComponent implements OnInit {
  customers: any[];
  items: any[];
  lines: { product_id: number | null, quantity: number | null }[] = [];
  loggedInUser : any;
  today: any;
  Date = new Date();

  form = new FormGroup({
    customer: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
    userid: new FormControl(null, Validators.required),
    date: new FormControl(null, [Validators.required]),
  })
  


  constructor(private apiService: ApiService , private AuthService: AuthService, private datePipe: DatePipe) {
    this.customers = [];
    this.items = [];
    this.lines = [];





  }

  ngOnInit(): void {
    // Retrieve the customers and items when the component initializes
    this.getCustomers();
    this.getItems();
    this.today = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
    this.loggedInUser = this.AuthService.user;
    console.log(this.today);
  }

  getCustomers() {
    this.apiService.getCustomers().subscribe((response : any) => {
      this.customers = response.data;

    },
      error => {
        console.log(error);
      }
    );
  }

  getItems() {
    this.apiService.getItems().subscribe((response : any) =>{
      this.items = response.data;
     },
      error => {
        console.log(error);
      }
    );
  }

  // addSalesOrder(salesOrderForm : any) {
  //   // You can retrieve the form data from the argument and send it to the API service
  //   this.apiService.addSalesOrder(salesOrderForm.value).subscribe(
  //     data => {
  //       console.log(data);
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }


  onSubmit(form: any) {
    console.log(form.form.controls.vendor);
    
    // const salesOrderData = {
    //   customer_id: form.customer_id,
    //   user_id: this.AuthService.user..id,
    //   posting_date: this.today,
    //   status: form.status
    // };
    // const salesOrderLines = this.lines?.map(line => ({
    //   product_id: line.product_id,
    //   quantity: line.quantity
    // }));
    // const salesOrder = { sales_order: salesOrderData, sales_order_lines: salesOrderLines };
    // console.log(salesOrder);
  }
  


  addLine() {
    const newLine = { product_id: null, quantity: null };
    // console.log(newLine);
    this.lines?.push(newLine);
  }
  
  removeLine(index: number) {
    this.lines?.splice(index, 1);
  }
}
