import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { FormGroup , FormControl  } from '@angular/forms';
import { Validators } from '@angular/forms';
import { delay } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrls: ['./saleslist.component.css'],
  providers: [DatePipe]
})
export class SaleslistComponent implements OnInit {
  customers: any[];
  items: any[];
  lines: { product_id: number | null, quantity: number | null  , product_price : number | null}[] = [];
  loggedInUser : any;
  today: any;
  Date = new Date();
  lineCounter : number  = 0 ;
  headerID : number = 0;



  form = new FormGroup({
    customer: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
    userid: new FormControl(null, Validators.required),
    date: new FormControl(null, [Validators.required]),
    line: new FormControl(null, [Validators.required]),
  })
  


  constructor(private apiService: ApiService , private AuthService: AuthService, private datePipe: DatePipe , private router : Router) {
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
    // console.log(this.today);
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
   
    
    //customer_id , user_id , posting_date , status

    
    //INSERT THE HEADER FIRST 
    
    const salesOrderHeaderData = {
      customer_id: form.form.controls.customer_id.value,
      user_id: this.loggedInUser.id,
      posting_date: this.today,
      status: form.status
    };

    this.apiService.addSalesOrderHeader(salesOrderHeaderData).subscribe(
      (data:any)=>{
        this.headerID = data.header.id
        console.log(this.headerID);
        
        
      },  
      error => {  
        alert(error);
      });
      
      
      //lineCounter
      
      delay(500000);
    


setTimeout(() => {
  


  for (let i = 0; i < this.lineCounter; i++) { 
  
  const salesOrderLines = this.lines?.map(line => ({
    order_id : this.headerID,
    product_id: line.product_id,
    product_price: line.product_price,
    quantity: line.quantity
  }));
  
  const editItem = 
  {
    unit_price: salesOrderLines[i].product_price,
    quantity: salesOrderLines[i].quantity
  
  
  }
  
  console.log(salesOrderLines[i]);
  this.apiService.addSalesOrderLine(salesOrderLines[i]).subscribe(
  (data:any)=>{
    console.log('Sales order line added successfully:', data);
  },  
  error => {  
    console.error('Error adding sales order line:', error);
  }
  );
  
  
  //ITEM UPDATE
  
  
  }

}, 1000);
    // console.log(salesOrderHeaderData);

    

    this.router.navigate(['/items']);



//CUSTOMER UPDATE

  }  

  


  addLine() {
    const newLine = { product_id: null, quantity: null  , product_price : null};
    // console.log(newLine);
    this.lines?.push(newLine);
    this.lineCounter = this.lineCounter + 1;
  }
  
  removeLine(index: number) {
    this.lines?.splice(index, 1);
    this.lineCounter = this.lineCounter - 1;
  }
}
