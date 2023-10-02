import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
  productdata:undefined|product;
  productmessage:undefined|string;
constructor(private route : ActivatedRoute, private product:ProductService){}
ngOnInit(): void {
  let productid = this.route.snapshot.paramMap.get('id');
  productid && this.product.getproduct(productid).subscribe((data)=>{
    this.productdata = data;
  })
}
submit(data:any){
  if(this.productdata){
    data.id = this.productdata.id;
  }
  this.product.updateproduct(data).subscribe((result)=>{
    if(result){
     this.productmessage="Product Updated Succesfully"
    }
  })
  setTimeout(() => {
    this.productmessage = undefined;
  },3000);
}

}
