import { Component, ErrorHandler, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import { FormGroup , FormControl  } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-purchaselist',
  templateUrl: './purchaselist.component.html',
  styleUrls: ['./purchaselist.component.css'],
  providers: [DatePipe]

})
export class PurchaselistComponent implements OnInit {
  
  vendors: any[];
  items: any[];
  lines: { product_id: number | null, quantity: number | null  , product_cost : number | null}[] = [];
  loggedInUser : any;
  today: any;
  Date = new Date();
  lineCounter : number  = 0 ;
  headerID : number = 0;

  form = new FormGroup({
    vendor: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
    userid: new FormControl(null, Validators.required),
    date: new FormControl(null, [Validators.required]),
    lines: new FormControl(null, [Validators.required]),
  })
  


  constructor(private apiService: ApiService , private AuthService: AuthService, private datePipe: DatePipe , private router : Router) {
    this.vendors = [];
    this.items = [];
    this.lines = [];





  }

  ngOnInit(): void {
    // Retrieve the customers and items when the component initializes
    this.getVendors();
    this.getItems();
    this.today = this.datePipe.transform(this.Date, 'yyyy-MM-dd');
    this.loggedInUser = this.AuthService.user;
    // console.log(this.today);
  }


  getVendors() {
    this.apiService.getVendors().subscribe((response : any) => {
      // console.log(response);
      this.vendors = response.data;

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


  onSubmit(form: any){
   
    //console.log(form.form.controls);
    //customer_id , user_id , posting_date , status
    
    if (this.lineCounter == 0){
      console.log(this.lineCounter);

      alert("You are Posting a Purchase Invoice without having Purchase Lines");
      
    }
    else{
      
    //INSERT THE HEADER FIRST 
    
          const purchOrderHeaderData = {
            vendor: form.form.controls.vendor.value,
            user_id: this.loggedInUser.id,
            posting_date: this.today,
            status: form.status
          };
    // console.log(purchOrderHeaderData);

    this.apiService.addPurchOrderHeader(purchOrderHeaderData).subscribe(
      (data:any)=>{
        this.headerID = data.header.id
        console.log(this.headerID);
        
          
      },  
     error => {  
       alert(error);
     });

    
    //lineCounter
    
    



    setTimeout(() => {
      
      for (let i = 0; i < this.lineCounter; i++) { 
  
      const purchOrderLines = this.lines?.map(line => ({
        order_id : this.headerID,
        product_id: line.product_id,
        product_cost: line.product_cost,
        quantity: line.quantity
      }));
  
      // const editItem = 
      // {
      //   unit_cost: purchOrderLines[i].product_cost,
      //   quantity: purchOrderLines[i].quantity
  
  
      // }
      
      console.log(purchOrderLines[i]);
    this.apiService.addPurchOrderLine(purchOrderLines[i]).subscribe(
      (data:any)=>{
        console.log('Sales order line added successfully:', data);
      },  
      error => {  
        console.error('Error adding sales order line:', error);
      }
    );
  
    
    ///ITEM UPDATE
  
    
  }
  
  
}, 1000);

this.router.navigate(['/items']);
    





//CUSTOMER UPDATE

}

  }  



  addLine() {
    const newLine = { product_id: null, quantity: null  , product_cost : null};
    // console.log(newLine);
    this.lines?.push(newLine);
    this.lineCounter = this.lineCounter + 1;
    // console.log(this.lineCounter);
  }
  
  removeLine(index: number) {
    this.lines?.splice(index, 1);
    this.lineCounter = this.lineCounter - 1;
    // console.log(this.lineCounter);
  }

}
