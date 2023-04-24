import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Validators , FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  addform : any;
  constructor(
    private FormBuilder:FormBuilder,
    private router: Router,
    private apiservice : ApiService) 
    {
         this.addform = this.FormBuilder.group({
          full_name: ['' , Validators.required],
          address: ['' , Validators.required ] ,
          phone_number: ['' , [Validators.required , Validators.maxLength(20)]],
          email: ['' , [Validators.required , Validators.email]],
         

         })
      

    }

  ngOnInit(): void {
  }



  onSubmit()
  {

    this.apiservice.addVendor(this.addform.value).subscribe(
      (data:any)=>{
       // console.log(data);
        this.router.navigate(['/vendors']);  
      },  
     error => {  
       alert(error);
     });

  }
}
