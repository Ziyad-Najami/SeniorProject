import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Validators , FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  addform : any;

  constructor(
    private FormBuilder:FormBuilder,
    private router: Router,
    private apiservice : ApiService) 
    {
         this.addform = this.FormBuilder.group({
          Description: ['' , Validators.required],
          
         

         })
      

    }

  ngOnInit(): void {
  }




  onSubmit(){
   
    console.log(this.addform.value)

    

   this.apiservice.addItem(this.addform.value).subscribe(
     (data:any)=>{
       console.log(data);
      // this.router.navigate(['/items']);  
     },  
    error => {  
      alert(error);
    });

 }

}

