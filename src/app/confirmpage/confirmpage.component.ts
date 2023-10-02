import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-confirmpage',
  templateUrl: './confirmpage.component.html',
  styleUrls: ['./confirmpage.component.css']
})
export class ConfirmpageComponent implements OnInit {
  orderdata:order[]|undefined
  constructor(private product:ProductService){}
  ngOnInit(): void {
    this.product.orderlist().subscribe((result)=>{
      this.orderdata=result
    })
  }
}
