import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
 addproductmessage:string|undefined;
  constructor(private product:ProductService){}
ngOnInit(): void {
  
}
submit(addformdata:product){
  
  this.product.addproduct(addformdata).subscribe((result)=>{
    
    console.log(result)
    if(result){
      this.addproductmessage="product added sucessfully";
    }
  })
  setTimeout(()=>{
    this.addproductmessage= undefined
  },3000);
}
}
