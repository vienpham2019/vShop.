import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators , FormGroup } from '@angular/forms'
import { Store , select } from '@ngrx/store'
import * as UserActions from '../../../actions/user.actions'
import { ShippingDetail } from '../../../models/shipping_detail.model'
import { User } from '../../../models/user.model'

import axios from 'axios'


@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrls: ['./edit-address-modal.component.css']
})
export class EditAddressModalComponent implements OnInit {

  constructor(
    private _fb: FormBuilder ,
    private store: Store<{user: User}> 
  ) {
    store.pipe(select('user')).subscribe(value => {
      this.edit_shipping_detail = value.edit_shipping_detail
      this.shipping_details = value.addresses
      this.token = value.token
      this.edit_shipping_index = value.edit_shipping_index
      this.setUpForm()
    })
   }

  editAddressForm: FormGroup = this._fb.group({
    first_name: ["", Validators.required],
    last_name: ['', Validators.required],
    email: ['' , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    company_name: [''],
    country: ['' , Validators.required],
    address1: ['' , Validators.required],
    address2: [''] , 
    city: ['' , Validators.required],
    state: ['' , Validators.required],
    zip: ['', Validators.required],
    phone: ['' , [Validators.required , Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]]
  })

  submit_invalid: boolean = false 
  edit_shipping_detail: ShippingDetail
  shipping_details: ShippingDetail[]
  form_title: string = "Add Shipping"
  token: string 
  edit_shipping_index: number 

  ngOnInit(): void {
  }

  setUpForm(){
    if(this.edit_shipping_detail){
      this.form_title = "Edit Shipping"
      this.editAddressForm.patchValue(
        {...this.edit_shipping_detail}
      )
    }else{
      this.editAddressForm.reset()
      this.submit_invalid = false 
      this.form_title = "Add Shipping"
    }
  }

  checkout() {
    this.submit_invalid = this.editAddressForm.status === "INVALID"
    if(!this.submit_invalid){
      let default_address =  this.edit_shipping_detail ? this.edit_shipping_detail.default_address : this.shipping_details.length === 0 
      let { token , edit_shipping_index } = this

      if(this.edit_shipping_detail){
        axios.post('/api/user/edit_address' , {token, address: {...this.editAddressForm.value, default_address } , index: edit_shipping_index })
        .then(res => {
          if(res.data.msg) this.store.dispatch(new UserActions.EditShipping({...this.editAddressForm.value, default_address}))
        })
      }else{
        axios.post('/api/user/add_address' , {token, address: {...this.editAddressForm.value, default_address}})
        .then(res => {
          if(res.data.msg) this.store.dispatch(new UserActions.AddShipping({...this.editAddressForm.value, default_address}))
        })
      }
      document.getElementById('editUserAddressCloseBtn').click()
    }
  }

  displayError(controlName){
    let {invalid , touched} = this.formControl(controlName)
    let controlError = invalid && touched
    return controlError || invalid && this.submit_invalid
  }

  formControl(controlName) {
    return this.editAddressForm.get(controlName)
  }

  classes(controlName){
    let {valid , touched} = this.formControl(controlName)
    return {
      'is-invalid': this.displayError(controlName),
      'is-valid': valid && touched
    }
  }

}
