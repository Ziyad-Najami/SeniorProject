import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-itemslist',
  templateUrl: './itemslist.component.html',
  styleUrls: ['./itemslist.component.css']
})
export class ItemslistComponent implements OnInit {
  ITEMS : any;
  constructor(private apiService : ApiService,) { }

  ngOnInit(): void {
   this.apiService.getItems().subscribe((response : any) =>{
    this.ITEMS = response.data;
   })
  }



  deleteItem(item : any) 
  {
    //console.log(User.id)
    this.apiService.deleteItem(item.id).subscribe(result => {
      this.ITEMS = this.ITEMS.filter((u:any) => u !== item);
    })

    

  }

}
