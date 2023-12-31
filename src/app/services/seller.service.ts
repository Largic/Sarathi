import { EventEmitter, Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { login, signup } from '../data-type';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
    issellerloggedin = new BehaviorSubject<boolean>(false);
    isloginerror = new EventEmitter<boolean>(false)
    constructor(private http:HttpClient,private router:Router) { }
  userSignup(data:signup){
     this.http.post('http://localhost:3000/seller',
    data,
    {observe:'response'}).subscribe((result)=>{
     if(result){
     
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
     }
    });
    
  }
  reloadseller(){
    if(localStorage.getItem('seller')){
      this.issellerloggedin.next(true)
      this.router.navigate(['seller-home'])
    }
  }
  userLogin(data:login){
    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((result:any)=>{
    if(result && result.body && result.body.length == 1)
    {
      this.isloginerror.emit(false)
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['seller-home'])
    }else{
      console.warn("login failed");
      this.isloginerror.emit(true)
    }
    })
    console.warn(data)
  }
  changepin(data:any){
    return this.http.put(`http://localhost:3000/seller/${data.id}`,data)
  }
}
