import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators , FormGroup } from '@angular/forms'
import { PaginationService } from '../../services/pagination/pagination.service' 

import { Store } from '@ngrx/store'
import { ShoppingItem } from '../../models/shopping_item.model'
import * as ShoppingItemActions from '../../actions/shopping_items.actions'

@Component({
  selector: 'app-item-reviews',
  templateUrl: './item-reviews.component.html',
  styleUrls: ['./item-reviews.component.css']
})
export class ItemReviewsComponent implements OnInit {
  constructor(
    private _fb: FormBuilder , 
    private _pagination_s: PaginationService,
    private store: Store<{shopping_items: ShoppingItem[]}>
  ) { }
  review_star: any[] = new Array(5).fill(0)
  reviews: any = [
    {name: "William Stokes" , date: "14 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 4},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3}
  ]

  new_review: FormGroup

  total_review: number 
  score: number = 5

  submit_invalid: boolean = false

  start_index: number = 0 
  display_review_amount: number = 10
  end_index: number = this.display_review_amount

  display_reviews: any[] 
  reviews_length: any[] = new Array(Math.ceil(this.reviews.length / this.display_review_amount)).fill(0)

  ngOnInit(): void {
    this.getTotalReview()
    this.slice_reviews()
    this.new_review = this._fb.group({
      rate: [''],
      date: [''],
      name: ['', Validators.required], 
      email: ['', [Validators.required , Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      review_title: ['', [Validators.required , Validators.minLength(4)]],
      review: ['', [Validators.required , Validators.minLength(10)]]
    })
  }

  resetForm(){
    this.score = 5
    this.new_review.reset()
    this.submit_invalid = false 
  }

  setScore(index){
    this.score = index + 1 <= this.score ? index : index + 1
  }

  rateClass(rate , index){
    return (index + 1) <= rate ? "fas fa-star" : "far fa-star"
  }

  getTotalReview(){
    this.total_review = Math.floor(this.reviews.reduce( (sum,value) => sum + value.rate , 0) / this.reviews.length) 
  }

  displayError(controlName){
    let {invalid , touched} = this.formControl(controlName)
    let controlError = invalid && touched
    return controlError || invalid && this.submit_invalid
  }

  formControl(controlName) {
    return this.new_review.get(controlName)
  }

  classes(controlName){
    let {valid , touched} = this.formControl(controlName)
    return {
      'is-invalid': this.displayError(controlName),
      'is-valid': valid && touched
    }
  }

  currentDate(){
    let today = new Date()
    let months = ["Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul", "Aug" , "Sep" , "Oct", "Nov" , "Dec"]
    let dd = today.getDate()
    let mm = today.getMonth()
    let yy = today.getFullYear()
    return `${dd} ${months[mm]} ${yy}`
  }

  onSubmit(){
    this.submit_invalid = this.new_review.status === "INVALID"
    if(!this.submit_invalid){
      let date = this.currentDate()
      let rate = this.score
      let {name , review_title , review} = this.new_review.value
      this.reviews.unshift({date, rate , name , review_title , review})
      this.resetForm()
      this.getTotalReview()
    }
  }

  slice_reviews(){
    this.display_reviews = this._pagination_s.slice_arrays(this.reviews , this.start_index , this.end_index)
  }

  change_page(value):void{

    let { start_index , end_index } = this._pagination_s.change_page(value , this.start_index , this.end_index , this.reviews , this.display_review_amount)

    this.start_index = start_index 
    this.end_index = end_index

    this.slice_reviews()
  }

  change_page_number(i):void {
    let {start_index , end_index} = this._pagination_s.change_page_number(i , this.start_index , this.end_index , this.display_review_amount)

    this.start_index = start_index 
    this.end_index = end_index
    this.slice_reviews()
  }

  pagination_class(current_index){
    return this._pagination_s.pagination_class(current_index , this.start_index , this.display_review_amount)
  }

  displayPagination(){
    return this.reviews.length > this.display_review_amount
  }

}
