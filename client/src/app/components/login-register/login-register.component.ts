import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators } from '@angular/forms'

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setUpform()
  }

  loginForm: FormGroup 
  login_submit_inValid: boolean = false

  registerForm: FormGroup 
  register_submit_inValid: boolean = false

  setUpform(){
    this.loginForm = this._fb.group({
      email: ['' , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['' , [Validators.required ]]
    })

    this.registerForm = this._fb.group({
      first_name: ['' , Validators.required],
      last_name: ['', Validators.required],
      email: ['' , [Validators.required , Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['' , [Validators.required , Validators.minLength(5)]],
      gender: ['Male']
    })
  }

  login(){
    this.login_submit_inValid = this.loginForm.status === 'INVALID'
  }

  register(){
    this.register_submit_inValid = this.registerForm.status === 'INVALID'
  }

  resetAllForm():void{
    this.loginForm.reset()
    this.registerForm.reset()
    this.login_submit_inValid = false 
    this.register_submit_inValid = false
  }

  setGender(genderValue):void{
    this.registerForm.patchValue({
      gender: genderValue
    })
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

}
