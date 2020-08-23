import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms'
import { Store , select } from '@ngrx/store'
import { User } from '../../../models/user.model'
import * as UserActions from '../../../actions/user.actions'

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private store:Store<{user: User}> 
  ) { 
    store.pipe(select('user')).subscribe(value => {
      this.setUserInfo()
      this.patchUserInfo(value.user_info)
    })
  }

  user_info_form: FormGroup
  submit_invalid: boolean = false

  ngOnInit(): void {
    
  }

  setUserInfo(){
    this.user_info_form = this._fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['' , [Validators.required , Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      change_pass: [false],
      new_password: [''],
      gender: ['']
    })

    this.user_info_form.get('change_pass').valueChanges
      .subscribe(checkedValue => {
        let new_password = this.user_info_form.get('new_password')
        if(checkedValue){
          new_password.setValidators([Validators.required , Validators.minLength(5)])
        }else{
          new_password.clearValidators()
        }
        new_password.updateValueAndValidity()
      })
  }

  patchUserInfo(value){
    let {first_name, last_name , email , gender} = value 
    this.user_info_form.patchValue({
      first_name , last_name , email , gender
    })
  }

  formControl(controlName) {
    return this.user_info_form.get(controlName)
  }

  displayError(controlName){
    let {invalid , touched} = this.formControl(controlName)
    let controlError = invalid && touched
    return controlError || invalid && this.submit_invalid
  }

  classes(controlName){
    let {valid , touched} = this.formControl(controlName)
    return {
      'is-invalid': this.displayError(controlName),
      'is-valid': valid && touched
    }
  }

  changeUserGender(value):void {
    this.user_info_form.patchValue({
      gender: value 
    })
  }

  onSubmit() {
    this.submit_invalid = this.user_info_form.status === "INVALID"
    if(!this.submit_invalid){
      let {first_name, last_name , email , gender} = this.user_info_form.value
      this.store.dispatch(new UserActions.UpdateUserInfo({first_name, last_name , email , gender}))
    }
  }
}
