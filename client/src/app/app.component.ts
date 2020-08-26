import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store'
import { AppInitState } from './models/app_initState.model'
import * as AppActions from './actions/app.action'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private store: Store<{main_reducer: AppInitState}>){}

  ngOnInit(){
    fetch('http://localhost:3000/Men')
    .then(res => res.json())
    .then(data => {
      if(data){
        this.store.dispatch(new AppActions.AddMenCatalogs(data))
      }
    })

    fetch('http://localhost:3000/Women')
    .then(res => res.json())
    .then(data => {
      if(data){
        this.store.dispatch(new AppActions.AddWomenCatalogs(data))
      }
    })
  }
}
