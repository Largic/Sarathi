import { Component, OnInit } from '@angular/core';
import { cart, login, product, signup } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showlogin:boolean=true;
  userautherror:string='';
constructor(private user :UserService,private product:ProductService){}
ngOnInit(): void {
  this.user.userauthreload();
}
signup(data:signup){
  
  this.user.usersignup(data)
}
login(data:login){
   this.user.userlogin(data)
   this.user.invaliduser.subscribe((result)=>{
    if(result){
      this.userautherror="user not found"
    }else{
      this.localcarttoremotecart();
    }
   })
   setTimeout(() => {
    this.userautherror="";
   }, 3000);
}
openlogin(){ this.showlogin = true}
opensignup(){ this.showlogin= false}
localcarttoremotecart(){
let data = localStorage.getItem('localcart');
let user = localStorage.getItem('user');
let userid = user && JSON.parse(user).id;
if(data){
  let cartdatalist:product[] = JSON.parse(data);
  cartdatalist.forEach((product:product,index)=>{
    let cartdata:cart = {
       ...product,productid:product.id,userid
    }
    delete cartdata.id;
    setTimeout(()=>{
      this.product.addToCart(cartdata).subscribe((result)=>{
      if(result){console.log("data is stored in db")}
    })
    },500);
    if(cartdatalist.length===index+1){
      localStorage.removeItem('localcart')
    }
  })
}
  setTimeout(() => {
    this.product.getcartlist(userid)
  },2000);
}
}
