import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store , select } from '@ngrx/store'
import { CatalogItemInit } from '../../models/catalog_item_init.model'
import { CatalogItem } from '../../models/catalog_item.model'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private store: Store<{catalog_item: CatalogItemInit}> 
  ) { 
    store.pipe(select('catalog_item')).subscribe(value => {
      this.item = value.display_catalog_item 
      this.sizes = this.item.sizes.map((value, i) => ({value , selected: i === 0}))
      this.getTotalReview()
    })
  }

  item: CatalogItem 
  select_size: string
  sizes: any = []
  total_review: number 

  amounts: any = Array.from(Array(5), (_, i) => i + 1)
  review_star: number[] = new Array(5).fill(0)

  itemForm: FormGroup

  ngOnInit(): void {
    window.scrollTo(0,0)
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

  rateClass(index){
    return (index + 1) <= this.total_review ? "fas fa-star" : "far fa-star"
  }

  getTotalReview():void{
    this.total_review = Math.floor(this.item.reviews.reduce( (sum,value) => sum + value.rate , 0) / this.item.reviews.length) 
  }

}
