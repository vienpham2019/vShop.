import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute , ParamMap } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private _fb: FormBuilder , private _route: ActivatedRoute ) { }
  selectContentValue: string = "Orders"
  address: boolean 
  personal_info: boolean
  widhlist: boolean  
  order: boolean 

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

}
