import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent {
   constructor(private sell:SellerService,private route:Router){}
  changepass(data:any){
    console.log(data)
    let passdata =  {
      "name": "darwin",
      "password": data,
      "email": "admin@gmail.com",
      "id": 1
    }
    this.sell.changepin(passdata).subscribe((result)=>{
      if(result){
       this.route.navigate(['/'])
      }
     })
    
  }
}
