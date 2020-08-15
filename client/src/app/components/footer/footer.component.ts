import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  shop_title: string = "vShop."

  features: any = [
    {title: "free shipping" , content: "From all order over $100" , class_name: "fas fa-truck-moving"},
    {title: "free returns" , content: "Return money within 30 days" , class_name: "fas fa-redo-alt"},
    {title: "secure shopping" , content: "You're in safe hands" , class_name: "fas fa-lock"},
    {title: "over 10,000 styles" , content: "We have everything you need", class_name: "fas fa-tags"}
  ]

  footer_socials: string[] = ['fab fa-facebook-f' , 'fab fa-youtube' , 'fab fa-twitter' , 'fab fa-instagram']

  constructor() { }

  ngOnInit(): void {
  }

}
