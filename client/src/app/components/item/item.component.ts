import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators, FormGroup , FormArray } from '@angular/forms'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  select_size: string
  sizes: any = [
    {value: "6" , selected: true},
    {value: "6.5" , selected: false},
    {value: "7" , selected: false},
    {value: "8" , selected: false},
    {value: "8.5" , selected: false},
    {value: "9" , selected: false},
    {value: "10" , selected: false},
    {value: "11" , selected: false},
    {value: "12" , selected: false},
    {value: "13" , selected: false}
  ]

  colors: any = ["Red" , "Pink"]
  amounts: any = Array.from(Array(5), (_, i) => i + 1)

  itemForm: FormGroup

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.itemForm = this._fb.group({
      color: ["Red"],
      size: ["6"],
      amount: ["1"]
    })
  }

  setSize(size , i ){
    this.itemForm.patchValue({
      size: [size.value]
    })

    this.sizes.forEach((size , index) => {
        size.selected = index === i
    });
  }

  size_class(size){
    let default_class = "list-group-item m-2 p-4 text-center border cursor"
    return `${default_class} ${size.selected ? " border-success" : ""}`
  }

}
