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
  // addform : any;
  loginError = false;

  form = new FormGroup({
   user_name : new FormControl(null, Validators.required),
   full_name: new FormControl(null, Validators.required),
   password: new FormControl(null, Validators.required),
   role: new FormControl(null, Validators.required),
  

  })

  constructor(
              private FormBuilder:FormBuilder,
              private router: Router,
              private apiservice : ApiService) 
              {
                

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


  onSubmit(myForm : any){
   
     if(myForm.invalid){
      return;
    }
    

     if(myForm.value.role == 'manager')
     {
      myForm.value.role = 1;

     }
     else
     {
      myForm.value.role = 0;

     }
     

    this.apiservice.addUser(myForm.value).subscribe(
      (data:any)=>{
       // console.log(data);
        this.router.navigate(['/home']);  
      },  
     error => {  
       alert(error);
     });

  }


  preventWhiteSpace(event: KeyboardEvent) {
    if (event.key === ' ' ) {
        event.preventDefault();
    }
}

}
