import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store , select } from '@ngrx/store'

import { ShoppingItem } from '../../models/shopping_item.model'
import { AppInitState } from '../../models/app_initState.model'
import { CatalogItem } from '../../models/catalog_item.model'
import * as ShoppingItemActions from '../../actions/shopping_items.actions'
import * as UserActions from '../../actions/user.actions'
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private store: Store<{main_reducer: AppInitState}>,
    private user_store: Store<{user: User}> ,
    private shopping_item_store: Store<{shopping_items: ShoppingItem[]}>
  ) { 
    store.pipe(select('main_reducer')).subscribe(value => {
      this.item = value.display_catalog_item
      this.sizes = this.item.sizes.map((value, i) => ({value , selected: i === 0}))
      this.setUpForm()
      if(this.sizes[0]){
        this.itemForm.patchValue({
          size: this.sizes[0].value,
        })
      }
      this.color = this.item.colors[0]
      this.getTotalReview()
    })

    user_store.pipe(select('user')).subscribe(value => {
      this.in_widhlist = !!value.widhlist.find(item => item._id === this.item._id)
      this.current_user = value.current_user
    })
  }

  item: CatalogItem 
  in_widhlist: boolean
  select_size: string
  sizes: any[] = []
  total_review: number 
  current_user: boolean

  amounts: any = Array.from(Array(5), (_, i) => i + 1)
  review_star: number[] = new Array(5).fill(0)

  itemForm: FormGroup

  color: {color: string, img: string}

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

  setUpForm(){
    this.itemForm = this._fb.group({
      size: [""],
      amount: ["1"]
    })
  }

  selectColor(color):void{
    this.color = color 
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

  filterItem(){
    let {_id , title , current_price , sale_price , isSale , is_New , category , season , brand} = this.item
    let { size , amount } = this.itemForm.value 
    let { color , img } = this.color
    return {_id , title , current_price , sale_price , size , is_New , isSale , color , amount: Math.floor(amount) , img , category , season , brand}
  }

  addToShoppingCart(){
    this.shopping_item_store.dispatch(new ShoppingItemActions.AddItem(this.filterItem()))
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'This item has been add to your cart',
      showConfirmButton: false,
      timer: 1000
    })
  }

  addToWidhlist(){
    if(this.current_user){
      if(this.in_widhlist){
        Swal.fire('This item already in your widhlist.')
      }else{
        this.user_store.dispatch(new UserActions.AddWidhlist(this.item))
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'This item has been add to your widhlist.',
          showConfirmButton: false,
          timer: 1000
        })
      }
    }else{
      document.getElementById('loginModalButton').click()
    }
  }

}
