import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {

  sizes: any[] = [
    {value: "3XS", selected: false }, 
    {value: "2XS", selected: false },
    {value: "XS", selected: false },
    {value: "S", selected: false },
    {value: "M", selected: false },
    {value: "L", selected: false },
    {value: "XL", selected: false },
    {value: "2XL", selected: false },
    {value: "3XL", selected: false },
    {value: "XL", selected: false }
  ]
  price_range: string[] = ["$10.00 - $49.00" , "$50.00 - $99.00", "$100.00 - $199.00" , "$200.00 and Up"]
  slide_imgs: string[] = ["https://media.offbroadwayshoes.com/images/2020/Q3/homepage/20200715-cb-adidas.jpg" , "https://confidentialman.com/wp-content/uploads/2016/10/Shoes-too-Consider-if-You-Cant-Afford-the-Nike-Air-MAG-950x600.jpg" , "https://theplaybook.asia/wp-content/uploads/sites/27/2016/10/DSC_2539-950x634-950x600.jpg"]
  current_catalog: string = "Women's Clothing"

  filter_details: any = []

  constructor() { }

  ngOnInit(): void {
    window.scrollTo(0,0)
  }

  slide_class (index) {
    return index === 0 ? "carousel-item active" : "carousel-item"
  }

  remove_filter(detail){
    this.filter_details = this.filter_details.filter(d => d.value !== detail.value)
    if(detail.title === "size"){
      this.sizes[detail.index] = {value: detail.value, selected: false}
    }
    if(detail.title === 'price'){
      let input = document.getElementById(detail.value)
      console.log(input)
    }
  }

  size_class(selected){
    let default_class = "list-group-item m-2 p-4 text-center border cursor"
    return `${default_class} ${selected ? " border-success" : ""}`
  }

  select_size(size , index){
    let {value , selected} = size 
    if(!selected){
      this.filter_details.push({value , title: 'size' , index})
    }else{
      this.filter_details = this.filter_details.filter(d => d.value !== value)
    }
    this.sizes[index] = {value, selected: !selected}
  }

  select_price(price){
    if(this.filter_details.find(d => d.title === 'price')){
      this.filter_details = this.filter_details.filter(d => d.title !== 'price')
    }
    this.filter_details.push({value: price , title: "price"})
  }

}
