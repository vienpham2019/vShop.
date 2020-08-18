import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-reviews',
  templateUrl: './item-reviews.component.html',
  styleUrls: ['./item-reviews.component.css']
})
export class ItemReviewsComponent implements OnInit {
  review_star: any[] = new Array(5).fill(0)
  reviews: any = [
    {name: "William Stokes" , date: "14 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 4},
    {name: "Vien Pham" , date: "12 Jul 2019", review_title: "Very good", review: "Made face lights yielding forth created for image behold blessed seas." , rate: 3}
  ]

  total_review: number 

  constructor() { }

  ngOnInit(): void {
    this.total_review = this.getTotalReview()
    console.log(this.total_review)
  }

  rateClass(rate , index){
    return index < rate ? "fas fa-star" : "far fa-star"
  }

  getTotalReview(){
    return Math.ceil(this.reviews.reduce( (sum,value) => sum + value.rate , 0) / this.reviews.length) 
  }

}
