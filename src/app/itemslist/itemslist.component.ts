import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { writeFile } from 'xlsx';
import * as XLSX from 'xlsx';


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

  generateExcel()
  {

    const rows = [];
    for (const item of this.ITEMS) {
      rows.push({
        ID: item.id,
        'Description': item.description,
        'Unit Cost': item.unit_cost,
        'Unit Price': item.unit_price,
        'Total Sales': item.total_sales,
        'Total Quantity': item.total_qty_sold,
        Inventory : item.inventory
      });
    }
  
    
    const worksheet = XLSX.utils.json_to_sheet(rows);
  
   
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ITEMS');
  
    
    const filename = 'items.xlsx';
    writeFile(workbook, filename);
    


  }
}
