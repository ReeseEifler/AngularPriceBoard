import { Component, OnInit } from '@angular/core';
import { CellClassRules, ColDef, Grid, GridOptions } from 'ag-grid-community'
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Commodity } from 'src/app/models/commodity.model'
import { EditStart, EditEnd, Randomize } from 'src/app/actions/commodity.actions'
//import { HttpParams } from '@angular/common/http'
import { getInitialData } from '../../utils/backend'
import * as data from '../../utils/_DATA.json'

import { HttpClient } from '@angular/common/http'


interface BoardState {
  message: string
  commodities: Array<Commodity>
}

const trendCellClassRules: CellClassRules = {
  'positive': (params) => params.value === true,
  'negative': (params) => params.value === false
}

@Component({
  selector: 'app-price-list',
  templateUrl: './commodities-list.component.html',
  styleUrls: ['./commodities-list.component.css']
})
export class CommoditiesListComponent  {
  commodities: any = []


  rowData: any[] = []
  columnDefs: ColDef[] = [
    { headerName:'ID', field:'id' },
    { headerName:'Start Price', field:'start_price', editable: true },
    { headerName:'End Price', field:'end_price', editable: true },
    { headerName: 'Trend',
      field: 'trend',
      cellStyle: (params) => {
        if (params.value) return {background:'green', color: 'green'}
        else return {background:'red', color: 'red'}
      }
    },
  ]
//(cellValueChanged)='onCellValueChanged($event)'
  onCellValueChanged(event: any) {
    if ((typeof event.data.start_price) === 'string') {
      console.log(event.data.start_price, parseFloat(event.data.start_price).toFixed(2))


      this.editStart(event.data.start_price)
    }
  }

  getRandom() {
    return parseFloat((Math.random() * 100).toFixed(2))
  }

  commodities$: Observable<Array<Commodity>>
  
  constructor(private store: Store<BoardState>, private http: HttpClient) {
    this.commodities$ = this.store.select('commodities')
    
   }

   editStart(start_price: string) {
     console.log('edit start')
     this.store.dispatch(EditStart({id:3, start_price:3.45}))
   }

   editEnd() {
    this.store.dispatch(EditEnd({id:55, end_price: 3.21}))
  }

   randomMessage() {
    this.store.dispatch({type: 'RANDOM'})
   }

   setTrends() {
     this.rowData.forEach(row => {
       row["trend"] = row.start_price > row.end_price ? false : true
     })
   }

   async changeRandom () {
    const rand = Math.floor(Math.random() * 250)

      setTimeout(() => {
        console.log('change random', this.rowData, rand)
        let newData = this.rowData
        newData[rand] = {
          id: rand,
          startPrice: this.getRandom(),
          end_price: this.getRandom()
        }
         this.http.post('http://localhost:3000/commodities', newData)


         //this.changeRandom()
       }, 250);
     
   }



  ngOnInit(): void {
    this.http.get('http://localhost:3000/commodities').subscribe((commodities: any) => {
      this.rowData = commodities
      this.setTrends()
    })
    this.changeRandom()
  }

}
