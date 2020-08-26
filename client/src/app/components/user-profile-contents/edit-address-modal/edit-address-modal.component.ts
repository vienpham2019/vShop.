import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators , FormGroup } from '@angular/forms'
import { Store , select } from '@ngrx/store'
import * as UserActions from '../../../actions/user.actions'
import { ShippingDetail } from '../../../models/shipping_detail.model'
import { User } from '../../../models/user.model'


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
  form_title: string = "Add Shipping"

  ngOnInit(): void {
  }

  setUpForm(){
    if(this.edit_shipping_detail){
      let {first_name , last_name , email, country , address1, address2 , city , state , zip , phone} = this.edit_shipping_detail
      this.form_title = "Edit Shipping"
      this.editAddressForm.patchValue(
        {first_name , last_name, email , country , address1, address2 , city , state , zip , phone}
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
      if(this.edit_shipping_detail){
        this.store.dispatch(new UserActions.EditShipping(this.editAddressForm.value))
      }else{
        this.store.dispatch(new UserActions.AddShipping(this.editAddressForm.value))
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
