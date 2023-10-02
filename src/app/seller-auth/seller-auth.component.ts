import { Component, OnInit } from '@angular/core';
import { signup } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
  showlogin = true;
  authError:string = '';
  constructor(private seller: SellerService) { }
  ngOnInit(): void {
   this.seller.reloadseller()
  }
  signUp(data: signup): void {
    console.warn(data)
    this.seller.userSignup(data)
  }
  login(data: signup): void {
    console.warn(data)
    this.seller.userLogin(data)
    this.seller.isloginerror.subscribe((isError)=>{
      if(isError){
        this.authError = "Email or password is incorrect"
      }
      console.warn(isError)
    })
  }
  openlogin(){
    this.showlogin= true;
  }
  opensignup(){
    this.showlogin = false;
  }
}
