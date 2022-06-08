import { Component, OnInit } from '@angular/core'
import { CellClassRules, ColDef, Grid, GridApi, GridOptions, CellEditRequestEvent } from 'ag-grid-community'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Commodity } from 'src/app/models/commodity.model'
import { Populate, EditStart, EditEnd, Randomize } from 'src/app/actions/commodity.actions'
import { HttpClient } from '@angular/common/http'

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
  rowData$: Observable<any>
  constructor(private store: Store<any>, private http: HttpClient) {
    this.rowData$ = this.store.select(store => store.commodities.rowData)

   }


  rowData: any[] = []
  columnDefs: ColDef[] = [
    { headerName:'ID', field:'id' },
    { headerName:'Start Price', field:'start_price', editable: true, 
    valueParser: params => Number(params.newValue),
    valueGetter: params => {
      return params.data.start_price
    },
    valueSetter: params => {
      this.editStart(params.data.id, params.newValue)
      return false
    }
  },
    { headerName:'End Price', field:'end_price', editable: true,
    valueParser: params => Number(params.newValue),
    valueSetter: params => {
      this.editEnd(params.data.id, params.newValue)
      return false
    } 
  },
    { headerName: 'Trend',
      field: 'trend',
      cellStyle: (params) => {
        if (params.value) return {background:'green', color: 'green'}
        else return {background:'red', color: 'red'}
      }
    },
  ]

  setValue(id: string, value: number) {
    (document.querySelector(id) as any).value = value;
  }

  getRandom() {
    return parseFloat((Math.random() * 100).toFixed(2))
  }

  

   editStart(id: number, start_price: number) {
     console.log('edit start')
     this.store.dispatch(EditStart({id, start_price}))
    }

   editEnd(id: number, end_price: number) {
    console.log('edit end')
    this.store.dispatch(EditEnd({id, end_price}))
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
       }, 250);
     
   }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/commodities').subscribe((commodities: any) => {
      this.rowData = commodities
      this.setTrends()
      this.store.dispatch(Populate({commodities}))
    })
  }

}
