import { Component, OnInit } from '@angular/core'
import { CellClassRules, ColDef, Grid, GridApi, GridOptions, CellEditRequestEvent } from 'ag-grid-community'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { Populate, Randomize, UpdateRow } from 'src/app/actions/commodity.actions'
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

  editing: boolean = false

  rowData: any[] = []
  columnDefs: ColDef[] = [
    { headerName:'ID', field:'id' },
    { headerName:'Start Price', field:'start_price', editable: true, 
    valueParser: params => Number(params.newValue),
    valueSetter: params => {
      this.updateRow(params.data.id, params.newValue, params.data.end_price)
      this.editing = false
      this.changeRandom()
      return false
    }
  },
    { headerName:'End Price', field:'end_price', editable: true,
    valueParser: params => Number(params.newValue),
    valueSetter: params => {
      this.updateRow(params.data.id, params.data.start_price, params.newValue)
      this.editing = false
    this.changeRandom()
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

  onCellClicked() {
    this.editing = true
  }

  onCellValueChanged() {
    console.log('CHANGE')
    this.editing = false
    this.changeRandom()
  }

  setTrends() {
    this.rowData.forEach(row => {
      row["trend"] = row.start_price > row.end_price ? false : true
    })
  }

  updateRow(id: number, start_price: number, end_price: number) {
    this.store.dispatch(UpdateRow({id, start_price, end_price}))
  }

  async changeRandom () {
    setTimeout(() => {
      let newData = {
        id: Math.floor(Math.random() * 250),
        start_price: this.getRandom(),
        end_price: this.getRandom()
      }
      this.store.dispatch(UpdateRow(newData))
      if (!this.editing) this.changeRandom()
    }, 250);
  }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/commodities').subscribe((commodities: any) => {
      this.rowData = commodities
      this.setTrends()
      this.store.dispatch(Populate({commodities}))
      this.changeRandom()
    })
  }
}
