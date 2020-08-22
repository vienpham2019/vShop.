import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder , Validators , FormGroup } from '@angular/forms'

@Component({
  selector: 'app-edit-address-modal',
  templateUrl: './edit-address-modal.component.html',
  styleUrls: ['./edit-address-modal.component.css']
})
export class EditAddressModalComponent implements OnInit {
  @Input() form_detail: any

  @Output() update_add_shipping = new EventEmitter()
  constructor(
    private _fb: FormBuilder 
  ) { }

  editAddressForm: FormGroup
  submit_invalid: boolean = false 
  form_title: string = "Add Shipping"

  ngOnInit(): void {
    this.editAddressForm = this._fb.group({
      first_name: ["", Validators.required],
      last_name: ['', Validators.required],
      company_name: [''],
      country: ['' , Validators.required],
      address1: ['' , Validators.required],
      address2: [''] , 
      city: ['' , Validators.required],
      state: ['' , Validators.required],
      zip: ['', Validators.required],
      phone: ['' , [Validators.required , Validators.pattern(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)]]
    })

    this.setUpForm()
  }

  setUpForm(){
    let {first_name , last_name , country , address1, address2 , city , state , zip , phone} = this.form_detail
    if(!!this.form_detail){
      this.form_title = "Edit Shipping"
      this.editAddressForm.patchValue(
        {first_name , last_name , country , address1, address2 , city , state , zip , phone}
      )
    }else{
      this.editAddressForm.reset()
      this.form_title = "Add Shipping"
    }
  }

  checkout() {
    this.submit_invalid = this.editAddressForm.status === "INVALID"
    if(!this.submit_invalid){
      this.update_add_shipping.emit(this.editAddressForm.value)
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
