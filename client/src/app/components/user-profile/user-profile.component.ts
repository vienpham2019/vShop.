import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }
  selectContentValue: string = "Orders"
  address: boolean 
  personal_info: boolean
  widhlist: boolean  
  order: boolean 

  ngOnInit(): void {
    window.scrollTo(0,0)
    this.setContent()
  }

  setContent(){
    this.address = 'Addresses' === this.selectContentValue
    this.personal_info = 'Personal Info' === this.selectContentValue
    this.widhlist = 'Widhlist' === this.selectContentValue 
    this.order = 'Orders' === this.selectContentValue
  }

  selectContent(value):void{
    this.selectContentValue = value
    this.setContent()
  }

}
