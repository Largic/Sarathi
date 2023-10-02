export interface signup{
    name:string,
    email:string,
    password:string
}
export interface login{
    email:string,
    password:string
}
export interface product {
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    desc:string,
    id:number,
    quantity:undefined|number,
    productid:undefined|number
}
export interface cart{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    desc:string,
    id:number|undefined,
    quantity:undefined|number,
    productid:number,
    userid:number
}
export interface pricesummary{
    price:number,
    dicount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalprice:number,
    userid:number,
    id:number|undefined
}