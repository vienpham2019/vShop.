import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute , ParamMap , Router } from '@angular/router'
import { Store , select } from '@ngrx/store'
import * as UserActions from '../../actions/user.actions'
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(
    private _fb: FormBuilder , 
    private router: Router, 
    private _route: ActivatedRoute ,
    private store: Store<{user: User}> 
  ) { 
    store.pipe(select('user')).subscribe(value => {
      this.current_user = value.current_user
      if(!this.current_user){
        router.navigate(['/'])
      }
    })
  }
  selectContentValue: string = "Orders"
  address: boolean 
  personal_info: boolean
  widhlist: boolean  
  order: boolean 
  current_user: boolean

  navTitle: any[]

  ngOnInit(): void {
    window.scrollTo(0,0)
    this._route.paramMap.subscribe((params: ParamMap) => {
      let title = params.get('title')
      this.selectContentValue = title ? title : "Orders"
      this.setContent()
    })
  }

  setContent(){
    this.address = 'Addresses' === this.selectContentValue
    this.personal_info = 'Personal Info' === this.selectContentValue
    this.widhlist = 'Widhlist' === this.selectContentValue 
    this.order = 'Orders' === this.selectContentValue
    this.navTitle = [
      {value: "Orders" , active: this.order} , 
      {value: "Widhlist" , active: this.widhlist }, 
      {value: "Personal Info" , active: this.personal_info},
      {value: "Addresses", active: this.address}
    ]
  }

  selectContent(value):void{
    this.selectContentValue = value
    this.setContent()
  }

  logOut(){
    // this.store.dispatch(new UserActions.UserLogout(false) )
  }

}
