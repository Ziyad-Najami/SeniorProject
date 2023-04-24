import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginError = false;
  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });




  constructor( private router : Router , private authService :  AuthService) { }

  ngOnInit(): void {


    // if (this.authService.isLoggedIn$) {
    //     this.router.navigate(['home']);
    // }
  }
  
  
  
  onSubmit(myForm : any)
  {
    //console.log(myForm.form.controls.password?.value );
    if(myForm.invalid){
      return;
    }
  
    this.authService.logincheckAuth(myForm.form.controls.username?.value ?? '', myForm.form.controls.password?.value ?? '')
    .subscribe((response: any) => {
      if(response.success === 1){ 
       console.log(response);

          //console.log(response);
          this.router.navigate(['home']);
        
    }
    else{
  
      
      this.loginError = true;
     
    }
  
  
  });
  }



  
  }


