import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators , FormGroup } from '@angular/forms'
import { Router } from '@angular/router'
import Swal from 'sweetalert2';

import { Store , select } from '@ngrx/store'
import { ShoppingItem } from '../../models/shopping_item.model'
import * as ShoppingItemActions from '../../actions/shopping_items.actions'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private _fb: FormBuilder , 
    private router: Router , 
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
      first_name: ["", Validators.required],
      last_name: ['', Validators.required],
      email: ['' , [Validators.required , Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      company_name: [''],
      country: ['' , Validators.required],
      address1: ['' , Validators.required],
      address2: [''] , 
      city: ['' , Validators.required],
      state: ['' , Validators.required],
      zip: ['', Validators.required],
      phone: ['' , [Validators.required , Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]],
      shipping_details: this._fb.group({
        type: [''],
        detail: [''],
        price: ['']
      }),
      order_notes: ['']
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
    this.submit_invalid = this.payment_form.status === "INVALID"
    if(!this.submit_invalid){
      this.payment_complete = true
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
    let {title, price , size , color , amount, img} = item
    amount += type === 'plus' ? 1 : -1
    if(amount < 6 && amount > 0){
      this.store.dispatch(new ShoppingItemActions.ChangeItem({title, price , size , color , amount , img} , index))
    }
  }

}
