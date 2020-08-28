import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store'
import { AppInitState } from './models/app_initState.model'
import * as AppActions from './actions/app.action'

import axios from 'axios'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private store: Store<{main_reducer: AppInitState}>){}

  ngOnInit(){
    axios('/api/menCatalog')
    .then(menCatalogs => {
      if(menCatalogs.data){
        console.log(menCatalogs.data)
        this.store.dispatch(new AppActions.AddMenCatalogs(menCatalogs.data))
      }
    })

    axios('/api/womenCatalog')
    .then(womenCatalogs => {
      if(womenCatalogs.data){
        this.store.dispatch(new AppActions.AddWomenCatalogs(womenCatalogs.data))
      }
    })
  }
}
