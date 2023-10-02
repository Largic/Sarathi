import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype:string='default';
  sellername:string ="";
  searchresult:undefined|product[];
  username:string="";
  cartitems = 0;
constructor(private route:Router,private prod: ProductService){}
ngOnInit(): void {
  this.route.events.subscribe((val:any)=>{
    if (val.url){
      if(localStorage.getItem('seller')&&val.url.includes('seller')){
        let sellerstore = localStorage.getItem('seller');
        let sellerdata = sellerstore && JSON.parse(sellerstore)[0];
        this.sellername = sellerdata.name;
        this.menutype ="seller"
      }
      else if(localStorage.getItem('user')){
        let userstore = localStorage.getItem('user');
        let userdata = userstore && JSON.parse(userstore);
        this.username  = userdata.name;
        this.menutype = 'user';
        this.prod.getcartlist(userdata.id);
            }
      else{
        this.menutype="default"
       }
    }
    });
    let cartdata = localStorage.getItem('localcart');
    if(cartdata){
      this.cartitems = JSON.parse(cartdata).length
    }
    this.prod.cartdata.subscribe((items)=>{
      this.cartitems=items.length
    })
}
logout(){
  localStorage.removeItem('seller');
  this.route.navigate(['/'])
}
userlogout(){
  localStorage.removeItem('user');
  this.route.navigate(['/user-auth']);
  this.prod.cartdata.emit([]);
}
searchproduct(query:KeyboardEvent){
if(query){
  const element = query.target as HTMLInputElement;
  this.prod.searchproduct(element.value).subscribe((result)=>{
    if(result.length>5){
      result.length= length
    }
  this.searchresult = result;
  })
  
}
}
hidesearch(){
  this.searchresult = undefined;
}
redirectTo(id:number){
  this.route.navigate([`/details/`+id])
}
submitsearch(val:string){
  this.route.navigate([`search/${val}`])
}

}
