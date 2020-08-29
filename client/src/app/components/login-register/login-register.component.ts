import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms'

import axios from 'axios'
import Swal from 'sweetalert2'

import { Store } from '@ngrx/store'
import { User } from '../../models/user.model'
import * as UserActions from '../../actions/user.actions'

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private store:Store<{user: User}> 
  ) { }

  ngOnInit(): void {
    this.setUpform()
  }

  loginForm: FormGroup 
  login_submit_inValid: boolean = false
  invalid_login: string  


  registerForm: FormGroup 
  register_submit_inValid: boolean = false
  register_success: boolean = false
  register_gender: string = 'Male'
  email_unique_error: string 

  setUpform(){
    this.loginForm = this._fb.group({
      email: ['' , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['' , [Validators.required ]]
    })

    this.registerForm = this._fb.group({
      first_name: ['' , Validators.required],
      last_name: ['', Validators.required],
      email: ['' , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['' , [Validators.required , Validators.minLength(5)]]
    })
  }

  login(){
    this.login_submit_inValid = this.loginForm.status === 'INVALID'
    if(!this.login_submit_inValid){
      axios.post('/api/user/login' , {...this.loginForm.value})
      .then(res => {
        this.invalid_login = res.data.error
        if(res.data.user){
          document.getElementById('closeLoginAndRegisterButton').click()
          this.store.dispatch(new UserActions.UserLogin({...res.data.user}))
          Swal.fire({
            title: 'LOGIN SUCCESSFUL',
            icon: 'success',
            timer: 1000,
          })
        }
      })
    }
  }

  register(){
    this.register_submit_inValid = this.registerForm.status === 'INVALID'
    if(!this.register_submit_inValid){
      axios.post('/api/user/register' , {...this.registerForm.value , addresses: [] , orders: [] , widhlist: [] , gender: this.register_gender})
      .then(res => {
        this.register_success = !!res.data.msg
        this.email_unique_error = res.data.error
        this.register_submit_inValid = !!res.data.error
      })
    }
  }

  resetAllForm():void{
    this.loginForm.reset()
    this.registerForm.reset()
    this.login_submit_inValid = false 
    this.register_submit_inValid = false
    this.register_success = false 
    this.register_gender = "Male"
    this.email_unique_error = null 
    this.invalid_login = null 
  }

  setGender(genderValue):void{
    this.register_gender = genderValue
  }

  displayError(controlName , formName){
    let {touched , invalid } = this.getControl(controlName , formName)
    let submit_invalid = formName === "Login" ? this.login_submit_inValid : this.register_submit_inValid
    return touched && invalid || invalid && submit_invalid
  }

  getControl(controlName , formName){
    return formName === "Login" ? this.loginForm.get(controlName) : this.registerForm.get(controlName)
  } 

  classes(controlName , formName){
    let { touched , valid } = this.getControl(controlName , formName)
    return {
      'is-invalid': this.displayError(controlName , formName),
      'is-valid': touched && valid 
    }
  }

  emailClasses(){
    let emailClass = this.classes('email' , 'Register')
    return{
      'is-invalid': emailClass['is-invalid'] || !!this.email_unique_error ,
      'is-valid': emailClass['is-valid'] && !this.email_unique_error
    }
  }

}
