import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }
  slice_arrays( arrays , start_index , end_index){
    return arrays.slice(start_index, end_index)
  }

  change_page(value , start_index , end_index , arrays , amount){
    if(value === 'next'){
      if(start_index + amount < arrays.length){
        start_index += amount 
        end_index += amount 
      }
    }else{
      if(start_index - amount >= 0){
        start_index -= amount
        end_index -= amount
      }
    }

    return {start_index , end_index}
  }

  change_page_number(i , start_index , end_index , amount) {
    start_index = (i * amount)
    end_index = ((i + 1) * amount)
    return {start_index , end_index}
  }

  pagination_class(current_index , start_index , amount){
    let c_i = Math.floor(current_index)
    let t_i = Math.floor(start_index / amount)
    return c_i === t_i ? "page-item active" : "page-item"
  }
}
