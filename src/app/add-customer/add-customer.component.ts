import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Validators , FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  addform : any;
  form = new FormGroup({
   full_name: new FormControl(null, Validators.required),
   address: new FormControl (null , Validators.required) ,
   phone_number:new FormControl (null , Validators.required ),
   email:new FormControl (null ,[Validators.required , Validators.email]),
  

  })


  constructor(
    private FormBuilder:FormBuilder,
    private router: Router,
    private apiservice : ApiService) 
    {
      

    }

  ngOnInit(): void {
  }



  onSubmit(myForm :any)
  {

    this.apiservice.addCustomer(myForm.value).subscribe(
      (data:any)=>{
       // console.log(data);
        this.router.navigate(['/customers']);  
      },  
     error => {  
       alert(error);
     });

  }
}
