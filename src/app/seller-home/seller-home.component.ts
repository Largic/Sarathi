import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import{faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{
  productlist:undefined|product[];
  productstatusmessag:undefined|string;
  icon = faTrash;
  updateicon = faEdit;
constructor(private products:ProductService){}
ngOnInit(): void {
  this.list();
}
deleteproduct(id:number){
  this.products.deleteproduct(id).subscribe((result)=>{
    if(result){
      this.productstatusmessag = "Product is Deleted";
      this.list();
    }
  })
  setTimeout(() => {
    this.productstatusmessag = undefined;
  },3000);
}
list(){
  this.products.productlist().subscribe((result)=>{
    if(result){
      this.productlist = result;
    }
      })
}
}
