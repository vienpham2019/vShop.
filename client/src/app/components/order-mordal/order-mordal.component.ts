import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-mordal',
  templateUrl: './order-mordal.component.html',
  styleUrls: ['./order-mordal.component.css']
})
export class OrderMordalComponent implements OnInit {

  constructor() { }

  amounts: any[] = Array.from(Array(5) , (_,i) => i + 1 )
  subtotal: number 
  shopping_items: any[] = [
    {title: "Cotton floral print Dress" , price: 40.00 , size: "M" , color: "Red" , amount: 1 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg"},
    {title: "Cotton floral print Dress" , price: 40.00 , size: "" , color: "Red" , amount: 1 , img: "https://images-na.ssl-images-amazon.com/images/I/61%2BevQdfX%2BL._UL1000_.jpg"},
  ]

  ngOnInit(): void {
    this.getSubtotal()
  }

  getSubtotal():void{
    this.subtotal = this.shopping_items.reduce( (sum,item) => sum + (item.price * item.amount) , 0)
  }

  removeItem(index){
    this.shopping_items.splice(index , 1)
    this.getSubtotal()
  }

  changeAmount(e , index):void {
    this.shopping_items[index].amount = Math.floor(e.target.value)
    this.getSubtotal()
  }

}
