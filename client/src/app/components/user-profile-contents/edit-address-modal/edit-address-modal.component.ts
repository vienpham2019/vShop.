import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators , FormGroup } from '@angular/forms'

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrls: ['./edit-address-modal.component.css']
})
export class EditAddressModalComponent implements OnInit {

  constructor(
    private _fb: FormBuilder 
  ) { }

  editAddressForm: FormGroup
  submit_invalid: boolean = false 

  ngOnInit(): void {
    this.editAddressForm = this._fb.group({
      first_name: ["", Validators.required],
      last_name: ['', Validators.required],
      email: ['' , [Validators.required , Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      company_name: [''],
      country: ['' , Validators.required],
      address1: ['' , Validators.required],
      address2: [''] , 
      town_city: ['' , Validators.required],
      state: ['' , Validators.required],
      zip: ['', Validators.required],
      mobile_phone: ['' , [Validators.required , Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]]
    })
  }

  checkout() {
    this.submit_invalid = this.editAddressForm.status === "INVALID"
    // if(!this.submit_invalid){
    //   this.payment_complete = true
    //   this.store.dispatch(new ShoppingItemActions.ResetItem())
    // }
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
