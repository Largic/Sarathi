import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{
  productdata:undefined|product;
  prodquantity:number=1;
  removecart = false;
  cartdata:product|undefined;
      constructor(private activeroute:ActivatedRoute,private prdct:ProductService,private navroute:Router){}
  ngOnInit(): void {
    let productid = this.activeroute.snapshot.paramMap.get('productid');
    productid && this.prdct.getproduct(productid).subscribe((result)=>{
       this.productdata= result;
       let cartdata = localStorage.getItem('localcart');
       if(productid && cartdata){
        let items = JSON.parse(cartdata);
        items = items.filter((item:product)=>productid === item.id.toString())
        if(items.length)
        {this.removecart= true}
        else{this.removecart=false}
       }
       let user = localStorage.getItem('user');
       if(user){
        let userid = user && JSON.parse(user).id;
        this.prdct.getcartlist(userid);
        this.prdct.cartdata.subscribe((result)=>{
          let item = result.filter((item:product)=>productid?.toString()===item.productid?.toString())
          if(item.length){
            this.cartdata=item[0];
            this.removecart= true;
          }
        })
       }
        
    })

  }
  handleqty(val:string){
  if(this.prodquantity<20 && val == 'max'){
    this.prodquantity+=1;
  }else if(this.prodquantity>1 && val =='min'){
      this.prodquantity-=1;
    }
  }
   addtocart(){
    if(this.productdata){
      this.productdata.quantity=this.prodquantity;
      if(!localStorage.getItem('user')){
        this.prdct.localaddtocart(this.productdata);
        this.removecart=true;
      }else{
        let user = localStorage.getItem('user');
        let userid = user && JSON.parse(user).id;
        let cartdata:cart = {
          ...this.productdata,
          productid:this.productdata.id,
          userid
        }
        delete cartdata.id;
      this.prdct.addToCart(cartdata).subscribe((result)=>{
        if(result){this.prdct.getcartlist(userid);
        this.removecart= true;
        }
      })
      }
      }
   }
   removefromcart(id:number){
    if(!localStorage.getItem('user')){
    this.prdct.removeitemfromcart(id);
   }else{
    this.cartdata && this.prdct.removefromremotecart(this.cartdata.id)
    .subscribe((result)=>{
      let user = localStorage.getItem('user');
        let userid = user && JSON.parse(user).id;
      this.prdct.getcartlist(userid)
    })
   }
   this.removecart= false;
  }
  buynow(){
    this.addtocart();
    this.navroute.navigate(['/checkout'])
  }
}
