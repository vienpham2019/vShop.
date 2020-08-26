import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store'
import { PaginationService } from '../../services/pagination/pagination.service'
import { AppInitState } from '../../models/app_initState.model'
import { CatalogItem } from '../../models/catalog_item.model'
import { CatalogItemInit } from '../../models/catalog_item_init.model'
import * as CatagoryItemActions from '../../actions/catalogItem.action'

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {
  constructor(
    private pagination_s: PaginationService,
    private store: Store<{main_reducer: AppInitState}> ,
    private catagory_item_store: Store<{catalog_item: CatalogItemInit}>,
    ) {
      store.pipe(select('main_reducer')).subscribe(value => {
        let shuffelArray = [...value.display_catalogs]
        this.slide_imgs = shuffelArray.sort((a,b) => 0.5 - Math.random()).slice(0,3)
        this.items = value.display_catalogs
        this.start_index = 0 
        this.end_index = 9
        this.item_display_amount = 9 
        this.slice_items() 
        this.current_catalog = value.current_catalog
        this.item_length = new Array(Math.ceil(this.items.length / this.item_display_amount)).fill(0)
      })
    }

  price_range: string[] = ["$10.00 - $49.00" , "$50.00 - $99.00", "$100.00 - $199.00" , "$200.00 and Up"]
  slide_imgs: CatalogItem[]

  current_catalog: string = ""

  filter_details: any[] = []

  items:CatalogItem[] 

  item_length: number[]
  display_items: any[]
  start_index: number 
  end_index: number
  item_display_amount: number 

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

  slide_class (index) {
    return index === 0 ? "carousel-item active" : "carousel-item"
  }

  remove_filter(detail){
    this.filter_details = this.filter_details.filter(d => d.value !== detail.value)
    if(detail.title === 'price'){
      let input = document.getElementById(detail.value)
    }
  }

  select_price(price){
    if(this.filter_details.find(d => d.title === 'price')){
      this.filter_details = this.filter_details.filter(d => d.title !== 'price')
    }
    this.filter_details.push({value: price , title: "price"})
  }

  viewItem(item):void{
    this.catagory_item_store.dispatch(new CatagoryItemActions.AddDisplayItem(item))
  }

  slice_items(){
    this.display_items = this.pagination_s.slice_arrays(this.items , this.start_index , this.end_index)
  }

  change_page(value):void{

    let { start_index , end_index } = this.pagination_s.change_page(value , this.start_index , this.end_index , this.items , this.item_display_amount)

    this.start_index = start_index 
    this.end_index = end_index

    this.slice_items()
  }

  change_page_number(i):void {
    let {start_index , end_index} = this.pagination_s.change_page_number(i , this.start_index , this.end_index , this.item_display_amount)

    this.start_index = start_index 
    this.end_index = end_index
    this.slice_items()
  }

  pagination_class(current_index){
    return this.pagination_s.pagination_class(current_index , this.start_index , this.item_display_amount)
  }

}
