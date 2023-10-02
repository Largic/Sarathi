import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    cartdata = new EventEmitter<product[]|[]>()
  constructor(private http:HttpClient) { }
  addproduct(data:product){
    return this.http.post(`http://localhost:3000/products`,data)
    }
    productlist(){
      return this.http.get<product[]>(`http://localhost:3000/products`)
    }
    deleteproduct(id:number){
      return this.http.delete(`http://localhost:3000/products/${id}`)
    }
    getproduct(id:string){
      return this.http.get<product>(`http://localhost:3000/products/${id}`);
    }
    updateproduct(product:product){
      return this.http.put<product>(`http://localhost:3000/products/${product.id}`,product)
    }
    popularproducts(){
      return this.http.get<product[]>("http://localhost:3000/products?_limit=3")
    }
    trendyproducts(){
      return this.http.get<product[]>("http://localhost:3000/products?_limit=8")
    }
    searchproduct(query:string){
      return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
    }
    localaddtocart(data:product){
      let cartdata= [];
      let localcart = localStorage.getItem('localcart')
      if(!localcart){
        localStorage.setItem('localcart',JSON.stringify([data]));
        this.cartdata.emit([data])
      }else{
        cartdata = JSON.parse(localcart);
        cartdata.push(data);
        localStorage.setItem('localcart',JSON.stringify(cartdata));
        this.cartdata.emit(cartdata)
      }
    }
    removeitemfromcart(productid:number){
      let cartdata = localStorage.getItem('localcart');
      if(cartdata){
        let items:product[]= JSON.parse(cartdata);
        items = items.filter((item:product)=>productid!==item.id)
        localStorage.setItem('localcart',JSON.stringify(items));
        this.cartdata.emit(items)
      }
    }
    addToCart(cartdata:cart){
      return this.http.post(`http://localhost:3000/cart`,cartdata)
    }
    getcartlist(userid:number){
      return this.http.get<product[]>(`http://localhost:3000/cart?userid=`+userid,
      {observe:'response'}).subscribe((result)=>{
        if(result && result.body){
          this.cartdata.emit(result.body);
        }
      })
    }
    removefromremotecart(cartid:number){
      return this.http.delete(`http://localhost:3000/cart/`+cartid)
    }
    currentcart(){
      let userstore = localStorage.getItem('user');
      let userdata = userstore && JSON.parse(userstore);
      return this.http.get<cart[]>(`http://localhost:3000/cart?userid=`+userdata.id)
    }
    ordernow(data:order){
      return this.http.post(`http://localhost:3000/orders`,data);
    }
    orderlist(){
      let userstore = localStorage.getItem('user');
      let userdata = userstore && JSON.parse(userstore);
      return this.http.get<order[]>(`http://localhost:3000/orders?usereid=`+userdata.id)
    }
}
