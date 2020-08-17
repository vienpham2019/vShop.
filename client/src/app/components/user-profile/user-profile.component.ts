import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
