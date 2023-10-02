import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalprice:number|undefined
    constructor( private product:ProductService,private roter:Router){}
  ngOnInit(): void {
    this.product.currentcart().subscribe((result)=>{
    
      let price=0;
      result.forEach((item)=>{
       if(item.quantity){price = price+(+item.price* +item.quantity)}
      })
     
      this.totalprice=price+(price/10)+100-(price/10);
     console.log(this.totalprice)
    })
  }
  ordernow(data:{email:string,address:string,contact:string}){
    let user = localStorage.getItem('user');
    let userid = user && JSON.parse(user).id;
    if(this.totalprice){
      let orderdata:order = {
        ...data,
        totalprice:this.totalprice,
        userid,id:undefined
      }
      this.product.ordernow(orderdata).subscribe((result)=>{
        if(result){alert("Order Is Placed")
        this.roter.navigate(['/cp'])
      }
      })
    }
  }
}
