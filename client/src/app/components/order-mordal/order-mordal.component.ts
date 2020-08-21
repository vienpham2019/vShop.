import { Component, OnInit } from '@angular/core';
import { ShoppingItem } from '../../models/shopping_item.model'
import { Store , select } from '@ngrx/store'
import * as ShoppingItemActions from '../../actions/shopping_items.actions'

@Component({
  selector: 'app-order-mordal',
  templateUrl: './order-mordal.component.html',
  styleUrls: ['./order-mordal.component.css']
})
export class OrderMordalComponent implements OnInit {

  amounts: any[] = Array.from(Array(5) , (_,i) => i + 1 )
  subtotal: number 
  shopping_items: ShoppingItem[]

  constructor(
    private store: Store<{shopping_items: ShoppingItem[]}>
  ) {
    store.pipe(select('shopping_items')).subscribe(values => {
      this.shopping_items = values
      this.getSubtotal()
    })
  }

  ngOnInit(): void {
    this.getSubtotal()
  }

  getSubtotal():void{
    this.subtotal = this.shopping_items.reduce( (sum,item) => sum + (item.price * item.amount) , 0)
  }

  removeItem(index){
    this.store.dispatch(new ShoppingItemActions.RemoveItem(index))
  }

  changeAmount(item , index: number , type):void {
    let {title, price , size , color , amount, img} = item
    amount += type === 'plus' ? 1 : -1
    if(amount < 6 && amount > 0){
      this.store.dispatch(new ShoppingItemActions.ChangeItem({title, price , size , color , amount , img} , index))
    }
  }

}
