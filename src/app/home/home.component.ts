import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserModel } from '../user.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token_payload : any;
  user_role : string | undefined;

  Salesman: any;
  constructor(private authserv : AuthService,private apiservice : ApiService) { }

  ngOnInit(): void {
    this.token_payload= JSON.parse(atob(this.authserv.token.split('.')[1]));
    this.user_role = this.token_payload.role;

    this.apiservice.displayUsers().subscribe((repsonse : any) => {
    this.Salesman = repsonse.data;
      }
    
    )
  }

 
  deleteUser(User : any) 
  {
    //console.log(User.id)
    this.apiservice.deleteUser(User.id).subscribe(result => {
      this.Salesman = this.Salesman.filter((u:any) => u !== User);
    })

  }

}
