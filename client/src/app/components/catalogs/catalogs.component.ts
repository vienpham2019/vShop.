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
        this.clone_items = [...this.items]
        this.start_index = 0 
        this.end_index = 9
        this.item_display_amount = 9 
        this.filter_price_index = -1
        this.filter_details = []
        this.slice_items() 
        this.current_catalog = value.current_catalog
      })
    }

  price_range: any[] = [[10, 25] , [25 , 50] , [50 , 100] ,[100 , 200] , [200 , 300]]
  slide_imgs: CatalogItem[]

  current_catalog: string = ""

  filter_details: any[] = []

  items:CatalogItem[] 
  clone_items:CatalogItem[] 

  item_length: number[]
  display_items: any[]
  start_index: number 
  end_index: number
  item_display_amount: number 

  filter_price_index: number = -1

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

  slide_class (index) {
    return index === 0 ? "carousel-item active" : "carousel-item"
  }

  remove_filter(index , title){
    this.filter_details = this.filter_details.filter((_,i)=> i !== index)
    this.filter([...this.items])
    if(title === 'price'){
      this.filter_price_index = -1
    }
  }

  filter(items){
    this.clone_items = items 
    this.slice_items()
  }

  filter_price(price , index){
    this.filter_details = this.filter_details.filter(d => d.title !== 'price')
    this.filter_details.push({value: `$${price[0]}.00 - ${price[1]}.00` , title: "price"})
    this.filter_price_index = index
    let filterPrice = [...this.items].filter(item => item.sale_price >= price[0] && item.sale_price <= price[1])
    this.filter(filterPrice)
  }

  viewItem(item):void{
    this.catagory_item_store.dispatch(new CatagoryItemActions.AddDisplayItem(item))
  }

  slice_items(){
    this.item_length = new Array(Math.ceil(this.clone_items.length / this.item_display_amount)).fill(0)
    this.display_items = this.pagination_s.slice_arrays(this.clone_items , this.start_index , this.end_index)
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
