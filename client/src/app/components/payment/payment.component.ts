import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators , FormGroup } from '@angular/forms'
import { ShoppingItemService } from '../../services/shopping-item/shopping-item.service'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

import { Store , select } from '@ngrx/store'
import { ShoppingItem } from '../../models/shopping_item.model'
import * as ShoppingItemActions from '../../actions/shopping_items.actions'
import * as UserActions from '../../actions/user.actions'

import { UUID } from 'angular2-uuid'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private _fb: FormBuilder , 
    private router: Router , 
    private shopping_item_s: ShoppingItemService, 
    private store: Store<{shopping_items: ShoppingItem[]}> 
  ) {
    store.pipe(select('shopping_items')).subscribe(values => {
      this.shopping_items = values
      this.getTotal()
    })
   }

  shipping_details: any[] = [
    {type: "Free Shipping" , detail: "Delivery in 8 - 10 working days" , price: 0},
    {type: "Standard Shipping" , detail: "Delivery in 5 - 7 working days" , price: 8},
    {type: "Express Shipping" , detail: "Delivery in 3 - 5 working days" , price: 12},
    {type: "1 - 2 Shipping" , detail: "Delivery in 1 - 2 working days" , price: 18}
  ]

  shipping_date: any = {
    "Free Shipping": [8,10],
    "Standard Shipping": [5,7],
    "Express Shipping": [3,5],
    "1 - 2 Shipping": [1,2]
  }

  shopping_items: ShoppingItem[]

  payment_form: FormGroup
  submit_invalid: boolean = false 
  total: number
  subtotal: number
  tax: number
  amounts: any[] = Array.from(Array(5) , (_, i) => i + 1)
  payment_complete: boolean = false 
  shipping_price: number = 0 

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.payment_form = this._fb.group({
      first_name: ['vien', Validators.required],
      last_name: ['pham', Validators.required],
      email: ['vienpham2019@gmial.com' , [Validators.required , Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      company_name: [''],
      country: ['USA' , Validators.required],
      address1: ['new' , Validators.required],
      address2: [''] , 
      city: ['conroe' , Validators.required],
      state: ['Tx' , Validators.required],
      zip: ['77301', Validators.required],
      phone: ['5022960606' , [Validators.required , Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]],
      shipping_details: this._fb.group({
        type: [''],
        detail: [''],
        price: ['']
      }),
      order_notes: ['GUYS GO VOTE FOR Red Velvet  AT THE VMA SO THEY CAN WIN FOR THeir latest  SONG PSYCHO. PLEASE ANY ONE GO DO IT .I REALLY REALLY WANT THEM TO WIN. THAt  SONG DESERVE IT. PLEASE I HOPE PEOPLE SEE THIS'],
      total: ['']
    })

    this.select_shipping(0)
  }

  select_shipping(index){
    let {type , detail , price} = this.shipping_details[index]
    this.shipping_price = price
    this.payment_form.patchValue({
      shipping_details: {
        type, detail, price
      }
    })
    this.getTotal()
  }

  displayError(controlName){
    let {invalid , touched} = this.formControl(controlName)
    let controlError = invalid && touched
    return controlError || invalid && this.submit_invalid
  }

  formControl(controlName) {
    return this.payment_form.get(controlName)
  }

  classes(controlName){
    let {valid , touched} = this.formControl(controlName)
    return {
      'is-invalid': this.displayError(controlName),
      'is-valid': valid && touched
    }
  }

  getTotal():void {
    this.subtotal = this.shopping_items.reduce( (sum,item) => sum + (item.price * item.amount) , 0)
    this.tax = this.subtotal * (8.25 / 100)
    this.total = this.subtotal + this.tax + this.shipping_price
  }

  checkout() {
    this.payment_form.patchValue({
      total: this.total
    })
    this.submit_invalid = this.payment_form.status === "INVALID"
    if(!this.submit_invalid){
      this.payment_complete = true
      let { type , detail } = this.payment_form.value.shipping_details
      let order_id = UUID.UUID()
      let order_date = this.shopping_item_s.currentDate(new Date())
      let shipping_date = [
        this.shopping_item_s.currentDate(new Date(new Date().setDate(new Date().getDate() + this.shipping_date[type][0]))),
        this.shopping_item_s.currentDate(new Date(new Date().setDate(new Date().getDate() + this.shipping_date[type][1])))
      ]
      let {first_name, last_name , address1 , address2 , city , state, zip , country , phone , order_notes } = this.payment_form.value 
      let shipping_feed = this.shipping_price
      let {total , subtotal , tax , shopping_items } = this
      let shipping_method = [type,detail]
      let shipping_address = {first_name, last_name , address1 , address2 , city , state, zip , country , phone }
      this.store.dispatch(new UserActions.AddOrder({
        order_id, order_date , shipping_date, subtotal , tax , shipping_feed , total , shipping_address , shipping_method , order_notes , shopping_items 
      }))
      this.store.dispatch(new ShoppingItemActions.ResetItem())
    }
  }

  removeItem(item , index) {
    Swal.fire({
      html: 
      `
        <div class="card mb-2">
          <img src=${item.img} class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
          </div>
        </div>
        <h4> Are you sure to remove this items? </h4> 
      `, 
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new ShoppingItemActions.RemoveItem(index))
        Swal.fire(
          'Remove!',
          `' ${item.title} ' has been remove form your shopping cart.`,
          'success'
        )
      }
    })
  }

  changeAmount(item: ShoppingItem, index: number , type: string ):void {
    let { amount } = item
    amount += type === 'plus' ? 1 : -1
    if(amount < 6 && amount > 0){
      this.store.dispatch(new ShoppingItemActions.ChangeItem({...item , amount} , index))
    }
  }

}
