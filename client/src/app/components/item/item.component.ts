import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Store , select } from '@ngrx/store'
import { CatalogItemInit } from '../../models/catalog_item_init.model'
import { CatalogItem } from '../../models/catalog_item.model'
import * as ShoppingItemActions from '../../actions/shopping_items.actions'
import * as UserActions from '../../actions/user.actions'
import { ShoppingItem } from 'src/app/models/shopping_item.model';
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
    private catalog_store: Store<{catalog_item: CatalogItemInit}>,
    private user_store: Store<{user: User}> 
  ) { 
    catalog_store.pipe(select('catalog_item')).subscribe(value => {
      this.item = value.display_catalog_item 
      this.sizes = this.item.sizes.map((value, i) => ({value , selected: i === 0}))
      this.setUpForm()
      this.itemForm.patchValue({
        size: this.sizes[0].value,
        color: this.item.colors[0]
      })
      this.getTotalReview()
    })

    user_store.pipe(select('user')).subscribe(value => {
      this.in_widhlist = !!value.widhlist.find(item => item.id === this.item.id)
    })
  }

  item: CatalogItem 
  in_widhlist: boolean
  select_size: string
  sizes: any = []
  total_review: number 

  amounts: any = Array.from(Array(5), (_, i) => i + 1)
  review_star: number[] = new Array(5).fill(0)

  itemForm: FormGroup

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

  setUpForm(){
    this.itemForm = this._fb.group({
      color: [""],
      size: [""],
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

  filterItem(){
    let {id , title , current_price , sale_price , isSale , isNew, img , category , season , brand} = this.item
    let { size , color , amount } = this.itemForm.value 
    return {id , title , current_price , sale_price , size , isNew , isSale , color , amount: Math.floor(amount) , img , category , season , brand}
  }

  addToShoppingCart(){
    this.catalog_store.dispatch(new ShoppingItemActions.AddItem(this.filterItem()))
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'This item has been add to your cart',
      showConfirmButton: false,
      timer: 1000
    })
  }

  addToWidhlist(){
    if(this.in_widhlist){
      Swal.fire('This item already in your widhlist.')
    }else{
      this.catalog_store.dispatch(new UserActions.AddWidhlist(this.filterItem()))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'This item has been add to your widhlist.',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }

}
