import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css']
})
export class NotAuthorizedComponent implements OnInit {
 pathloc : string = 'login';
  constructor(private authserv : AuthService) { }

  ngOnInit(): void {
   if (this.authserv.isLoggedIn$){
    console.log(this.authserv.isLoggedIn$)
    this.pathloc = 'home'
   }
  }


}
