import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  constructor() { }

  form_detail: any 

  shipping_details: any[] = [
    {first_name: 'Daniel' , last_name: 'Robinson' , address: '3997 Raccoon Run',city: 'New', state: 'Kingston', zip: '45644', country: 'United States', phone: '6146389574' },
    {first_name: 'Daniel' , last_name: 'Robinsonsasa' , address: '3997 Raccoon Run',city: 'New', state: 'Kingston', zip: '45644', country: 'United States', phone: '6146389574' }
  ]

  ngOnInit(): void {
  }

  editForm(shipping: any | null ){
    this.form_detail = shipping 
  }

}
