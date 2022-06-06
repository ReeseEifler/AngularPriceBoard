import { Component } from '@angular/core';
import { Store } from '@ngrx/store'

import { Observable } from 'rxjs';
import { Commodity } from './models/commodity.model'
import * as CommodityActions from '../app/actions/commodity.actions'

interface AppState {
  commodity: Commodity
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Angular Price Board'
}
