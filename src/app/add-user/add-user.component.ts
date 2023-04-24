import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addform : any;
  
  constructor(
              private FormBuilder:FormBuilder,
              private router: Router,
              private apiservice : ApiService) 
              {
                   this.addform = new FormGroup({
                    user_name : new FormControl(null, Validators.required),
                    full_name: new FormControl(null, Validators.required),
                    password: new FormControl(null, Validators.required),
                    role: new FormControl(null, Validators.required),
                   

                   })
                

              }
   

  ngOnInit(): void {

   //this.setAuthorized(this.data);
  
  
  }

  // get AuthorizedArray()
  // {
  //   return this.addform.get("role") as FormArray;
  // }

  // setAuthorized(data:string[])
  // {
  //   console.log(data)
  //   this.roleArray = this.roleList.map((x:any) =>({
  //     name: x,
  //     value: data.indexOf(x) >= 0
  //   }));

  // }

  // parse(){
  //   const result = this.roleList.map((x:any , index:any) => (this.roleArray[index].value?x:null)).filter((x:any) => x);
  //   return result.length > 0 ? result:null;
  //}


  onSubmit(){
   
     console.log(this.addform.value)

     if(this.addform.value.role == 'manager')
     {
      this.addform.value.role = 1;

     }
     else
     {
      this.addform.value.role = 0;

     }
     console.log(this.addform.value)

    this.apiservice.addUser(this.addform.value).subscribe(
      (data:any)=>{
       // console.log(data);
        this.router.navigate(['/home']);  
      },  
     error => {  
       alert(error);
     });

  }

}
