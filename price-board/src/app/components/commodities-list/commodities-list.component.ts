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
    if (!this.editing) this.editing = true
    else {
      this.editing = false
      this.changeRandom()
    }
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
        id: Math.floor(Math.random() * 20/*250*/),
        start_price: this.getRandom(),
        end_price: this.getRandom()
      }
      this.store.dispatch(UpdateRow(newData))
      if (!this.editing) this.changeRandom()
      else console.log('nothing happening')
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

// {
//         "id": 20,
//         "start_price": 85.29,
//         "end_price": 35.75
//       },
//       {
//         "id": 21,
//         "start_price": 59.47,
//         "end_price": 57.29
//       },
//       {
//         "id": 22,
//         "start_price": 62.13,
//         "end_price": 36.09
//       },
//       {
//         "id": 23,
//         "start_price": 39.39,
//         "end_price": 5.92
//       },
//       {
//         "id": 24,
//         "start_price": 86.97,
//         "end_price": 5.31
//       },
//       {
//         "id": 25,
//         "start_price": 39.54,
//         "end_price": 31.34
//       },
//       {
//         "id": 26,
//         "start_price": 83.43,
//         "end_price": 35.47
//       },
//       {
//         "id": 27,
//         "start_price": 31.79,
//         "end_price": 68.69
//       },
//       {
//         "id": 28,
//         "start_price": 84.7,
//         "end_price": 65.79
//       },
//       {
//         "id": 29,
//         "start_price": 96.98,
//         "end_price": 29.32
//       },
//       {
//         "id": 30,
//         "start_price": 57.88,
//         "end_price": 91.41
//       },
//       {
//         "id": 31,
//         "start_price": 12.65,
//         "end_price": 24.51
//       },
//       {
//         "id": 32,
//         "start_price": 98.42,
//         "end_price": 1.79
//       },
//       {
//         "id": 33,
//         "start_price": 70.01,
//         "end_price": 49.06
//       },
//       {
//         "id": 34,
//         "start_price": 12.05,
//         "end_price": 25.29
//       },
//       {
//         "id": 35,
//         "start_price": 79.15,
//         "end_price": 44.17
//       },
//       {
//         "id": 36,
//         "start_price": 91.41,
//         "end_price": 39.38
//       },
//       {
//         "id": 37,
//         "start_price": 41.1,
//         "end_price": 42.92
//       },
//       {
//         "id": 38,
//         "start_price": 81.25,
//         "end_price": 99.21
//       },
//       {
//         "id": 39,
//         "start_price": 40.13,
//         "end_price": 31.61
//       },
//       {
//         "id": 40,
//         "start_price": 10.65,
//         "end_price": 63.77
//       },
//       {
//         "id": 41,
//         "start_price": 57.73,
//         "end_price": 90.37
//       },
//       {
//         "id": 42,
//         "start_price": 49.14,
//         "end_price": 80.78
//       },
//       {
//         "id": 43,
//         "start_price": 79.03,
//         "end_price": 51.1
//       },
//       {
//         "id": 44,
//         "start_price": 98.35,
//         "end_price": 66.33
//       },
//       {
//         "id": 45,
//         "start_price": 48.26,
//         "end_price": 46.58
//       },
//       {
//         "id": 46,
//         "start_price": 23.93,
//         "end_price": 41.45
//       },
//       {
//         "id": 47,
//         "start_price": 57.22,
//         "end_price": 49.96
//       },
//       {
//         "id": 48,
//         "start_price": 6.89,
//         "end_price": 36.71
//       },
//       {
//         "id": 49,
//         "start_price": 17.17,
//         "end_price": 64.33
//       },
//       {
//         "id": 50,
//         "start_price": 30.4,
//         "end_price": 93.8
//       },
//       {
//         "id": 51,
//         "start_price": 59.53,
//         "end_price": 45.92
//       },
//       {
//         "id": 52,
//         "start_price": 23.99,
//         "end_price": 13.59
//       },
//       {
//         "id": 53,
//         "start_price": 81.05,
//         "end_price": 92.19
//       },
//       {
//         "id": 54,
//         "start_price": 9.49,
//         "end_price": 66.68
//       },
//       {
//         "id": 55,
//         "start_price": 73.15,
//         "end_price": 91.08
//       },
//       {
//         "id": 56,
//         "start_price": 49.57,
//         "end_price": 37.97
//       },
//       {
//         "id": 57,
//         "start_price": 5.86,
//         "end_price": 44.3
//       },
//       {
//         "id": 58,
//         "start_price": 30.7,
//         "end_price": 44.34
//       },
//       {
//         "id": 59,
//         "start_price": 5.9,
//         "end_price": 90.57
//       },
//       {
//         "id": 60,
//         "start_price": 44.16,
//         "end_price": 53.53
//       },
//       {
//         "id": 61,
//         "start_price": 26.3,
//         "end_price": 15.68
//       },
//       {
//         "id": 62,
//         "start_price": 50.39,
//         "end_price": 48.03
//       },
//       {
//         "id": 63,
//         "start_price": 9.78,
//         "end_price": 15.33
//       },
//       {
//         "id": 64,
//         "start_price": 35.84,
//         "end_price": 13.65
//       },
//       {
//         "id": 65,
//         "start_price": 86.02,
//         "end_price": 16.1
//       },
//       {
//         "id": 66,
//         "start_price": 3.64,
//         "end_price": 1.94
//       },
//       {
//         "id": 67,
//         "start_price": 3.8,
//         "end_price": 69.23
//       },
//       {
//         "id": 68,
//         "start_price": 77.34,
//         "end_price": 69.41
//       },
//       {
//         "id": 69,
//         "start_price": 13.47,
//         "end_price": 51.57
//       },
//       {
//         "id": 70,
//         "start_price": 40.77,
//         "end_price": 1.94
//       },
//       {
//         "id": 71,
//         "start_price": 99.58,
//         "end_price": 88.97
//       },
//       {
//         "id": 72,
//         "start_price": 18.02,
//         "end_price": 33.62
//       },
//       {
//         "id": 73,
//         "start_price": 65.5,
//         "end_price": 70.66
//       },
//       {
//         "id": 74,
//         "start_price": 47.64,
//         "end_price": 81.14
//       },
//       {
//         "id": 75,
//         "start_price": 11.02,
//         "end_price": 18.18
//       },
//       {
//         "id": 76,
//         "start_price": 29.68,
//         "end_price": 54.72
//       },
//       {
//         "id": 77,
//         "start_price": 59.83,
//         "end_price": 75.79
//       },
//       {
//         "id": 78,
//         "start_price": 66.16,
//         "end_price": 27.82
//       },
//       {
//         "id": 79,
//         "start_price": 19.51,
//         "end_price": 51.51
//       },
//       {
//         "id": 80,
//         "start_price": 55.58,
//         "end_price": 48.15
//       },
//       {
//         "id": 81,
//         "start_price": 39.42,
//         "end_price": 45.42
//       },
//       {
//         "id": 82,
//         "start_price": 64.89,
//         "end_price": 43.07
//       },
//       {
//         "id": 83,
//         "start_price": 5.79,
//         "end_price": 22.01
//       },
//       {
//         "id": 84,
//         "start_price": 21.52,
//         "end_price": 81.49
//       },
//       {
//         "id": 85,
//         "start_price": 82.78,
//         "end_price": 23.94
//       },
//       {
//         "id": 86,
//         "start_price": 33.24,
//         "end_price": 53.45
//       },
//       {
//         "id": 87,
//         "start_price": 41.15,
//         "end_price": 91.62
//       },
//       {
//         "id": 88,
//         "start_price": 63.87,
//         "end_price": 60.14
//       },
//       {
//         "id": 89,
//         "start_price": 60.02,
//         "end_price": 43.11
//       },
//       {
//         "id": 90,
//         "start_price": 98.45,
//         "end_price": 99.19
//       },
//       {
//         "id": 91,
//         "start_price": 96.81,
//         "end_price": 8.29
//       },
//       {
//         "id": 92,
//         "start_price": 38.39,
//         "end_price": 5.03
//       },
//       {
//         "id": 93,
//         "start_price": 30.81,
//         "end_price": 55.08
//       },
//       {
//         "id": 94,
//         "start_price": 26.04,
//         "end_price": 45
//       },
//       {
//         "id": 95,
//         "start_price": 41.77,
//         "end_price": 39.65
//       },
//       {
//         "id": 96,
//         "start_price": 84.13,
//         "end_price": 21.33
//       },
//       {
//         "id": 97,
//         "start_price": 33.57,
//         "end_price": 27.69
//       },
//       {
//         "id": 98,
//         "start_price": 28.62,
//         "end_price": 51.14
//       },
//       {
//         "id": 99,
//         "start_price": 6.29,
//         "end_price": 28.6
//       },
//       {
//         "id": 100,
//         "start_price": 7.18,
//         "end_price": 65
//       },
//       {
//         "id": 101,
//         "start_price": 64.28,
//         "end_price": 94.36
//       },
//       {
//         "id": 102,
//         "start_price": 36.29,
//         "end_price": 16.65
//       },
//       {
//         "id": 103,
//         "start_price": 74.5,
//         "end_price": 78.53
//       },
//       {
//         "id": 104,
//         "start_price": 52.28,
//         "end_price": 82.01
//       },
//       {
//         "id": 105,
//         "start_price": 24.74,
//         "end_price": 29.2
//       },
//       {
//         "id": 106,
//         "start_price": 12.75,
//         "end_price": 7.17
//       },
//       {
//         "id": 107,
//         "start_price": 41.88,
//         "end_price": 99.8
//       },
//       {
//         "id": 108,
//         "start_price": 17.52,
//         "end_price": 14.13
//       },
//       {
//         "id": 109,
//         "start_price": 7.46,
//         "end_price": 73.59
//       },
//       {
//         "id": 110,
//         "start_price": 32.46,
//         "end_price": 43.53
//       },
//       {
//         "id": 111,
//         "start_price": 11.05,
//         "end_price": 67.75
//       },
//       {
//         "id": 112,
//         "start_price": 91.58,
//         "end_price": 49.53
//       },
//       {
//         "id": 113,
//         "start_price": 46.85,
//         "end_price": 67.96
//       },
//       {
//         "id": 114,
//         "start_price": 67.35,
//         "end_price": 14
//       },
//       {
//         "id": 115,
//         "start_price": 89.49,
//         "end_price": 49.53
//       },
//       {
//         "id": 116,
//         "start_price": 29.63,
//         "end_price": 25.52
//       },
//       {
//         "id": 117,
//         "start_price": 54.07,
//         "end_price": 16.46
//       },
//       {
//         "id": 118,
//         "start_price": 44.78,
//         "end_price": 67.08
//       },
//       {
//         "id": 119,
//         "start_price": 34.9,
//         "end_price": 90.17
//       },
//       {
//         "id": 120,
//         "start_price": 1.18,
//         "end_price": 38.66
//       },
//       {
//         "id": 121,
//         "start_price": 36.79,
//         "end_price": 44.14
//       },
//       {
//         "id": 122,
//         "start_price": 54.7,
//         "end_price": 69.99
//       },
//       {
//         "id": 123,
//         "start_price": 19.31,
//         "end_price": 93.23
//       },
//       {
//         "id": 124,
//         "start_price": 76.66,
//         "end_price": 15.43
//       },
//       {
//         "id": 125,
//         "start_price": 97.54,
//         "end_price": 8.01
//       },
//       {
//         "id": 126,
//         "start_price": 61.47,
//         "end_price": 87.7
//       },
//       {
//         "id": 127,
//         "start_price": 21.5,
//         "end_price": 43.14
//       },
//       {
//         "id": 128,
//         "start_price": 49.77,
//         "end_price": 96.31
//       },
//       {
//         "id": 129,
//         "start_price": 69.66,
//         "end_price": 27.97
//       },
//       {
//         "id": 130,
//         "start_price": 69.85,
//         "end_price": 73.38
//       },
//       {
//         "id": 131,
//         "start_price": 6.03,
//         "end_price": 91.13
//       },
//       {
//         "id": 132,
//         "start_price": 67.95,
//         "end_price": 87.03
//       },
//       {
//         "id": 133,
//         "start_price": 19.31,
//         "end_price": 18.23
//       },
//       {
//         "id": 134,
//         "start_price": 91.69,
//         "end_price": 85.67
//       },
//       {
//         "id": 135,
//         "start_price": 35.57,
//         "end_price": 37.79
//       },
//       {
//         "id": 136,
//         "start_price": 48.32,
//         "end_price": 4.82
//       },
//       {
//         "id": 137,
//         "start_price": 59.79,
//         "end_price": 54.7
//       },
//       {
//         "id": 138,
//         "start_price": 48.41,
//         "end_price": 41.66
//       },
//       {
//         "id": 139,
//         "start_price": 73.87,
//         "end_price": 84.96
//       },
//       {
//         "id": 140,
//         "start_price": 47.73,
//         "end_price": 88.99
//       },
//       {
//         "id": 141,
//         "start_price": 5.28,
//         "end_price": 58.94
//       },
//       {
//         "id": 142,
//         "start_price": 27.64,
//         "end_price": 96.96
//       },
//       {
//         "id": 143,
//         "start_price": 79.95,
//         "end_price": 40.07
//       },
//       {
//         "id": 144,
//         "start_price": 28.3,
//         "end_price": 43.25
//       },
//       {
//         "id": 145,
//         "start_price": 54.46,
//         "end_price": 75.1
//       },
//       {
//         "id": 146,
//         "start_price": 97.8,
//         "end_price": 16.26
//       },
//       {
//         "id": 147,
//         "start_price": 3.78,
//         "end_price": 4.2
//       },
//       {
//         "id": 148,
//         "start_price": 1.67,
//         "end_price": 0.5
//       },
//       {
//         "id": 149,
//         "start_price": 31.38,
//         "end_price": 16.99
//       },
//       {
//         "id": 150,
//         "start_price": 92.81,
//         "end_price": 56.35
//       },
//       {
//         "id": 151,
//         "start_price": 62.86,
//         "end_price": 0.26
//       },
//       {
//         "id": 152,
//         "start_price": 80.78,
//         "end_price": 72.85
//       },
//       {
//         "id": 153,
//         "start_price": 69.49,
//         "end_price": 67.85
//       },
//       {
//         "id": 154,
//         "start_price": 64.88,
//         "end_price": 75.97
//       },
//       {
//         "id": 155,
//         "start_price": 35.68,
//         "end_price": 99.68
//       },
//       {
//         "id": 156,
//         "start_price": 89.7,
//         "end_price": 25.39
//       },
//       {
//         "id": 157,
//         "start_price": 36.57,
//         "end_price": 93.55
//       },
//       {
//         "id": 158,
//         "start_price": 58.64,
//         "end_price": 66.39
//       },
//       {
//         "id": 159,
//         "start_price": 1.16,
//         "end_price": 70.22
//       },
//       {
//         "id": 160,
//         "start_price": 28.2,
//         "end_price": 80.3
//       },
//       {
//         "id": 161,
//         "start_price": 70.94,
//         "end_price": 51.53
//       },
//       {
//         "id": 162,
//         "start_price": 20.86,
//         "end_price": 81.87
//       },
//       {
//         "id": 163,
//         "start_price": 70.8,
//         "end_price": 35
//       },
//       {
//         "id": 164,
//         "start_price": 81.86,
//         "end_price": 39.78
//       },
//       {
//         "id": 165,
//         "start_price": 3.38,
//         "end_price": 76.95
//       },
//       {
//         "id": 166,
//         "start_price": 26.05,
//         "end_price": 31.47
//       },
//       {
//         "id": 167,
//         "start_price": 75.57,
//         "end_price": 75.6
//       },
//       {
//         "id": 168,
//         "start_price": 55.35,
//         "end_price": 29.34
//       },
//       {
//         "id": 169,
//         "start_price": 6.22,
//         "end_price": 81.53
//       },
//       {
//         "id": 170,
//         "start_price": 38.43,
//         "end_price": 49.57
//       },
//       {
//         "id": 171,
//         "start_price": 97.74,
//         "end_price": 15.86
//       },
//       {
//         "id": 172,
//         "start_price": 10.17,
//         "end_price": 63.24
//       },
//       {
//         "id": 173,
//         "start_price": 35.37,
//         "end_price": 81.47
//       },
//       {
//         "id": 174,
//         "start_price": 67.16,
//         "end_price": 24.24
//       },
//       {
//         "id": 175,
//         "start_price": 34.8,
//         "end_price": 2.58
//       },
//       {
//         "id": 176,
//         "start_price": 4.36,
//         "end_price": 39.49
//       },
//       {
//         "id": 177,
//         "start_price": 64.45,
//         "end_price": 26.79
//       },
//       {
//         "id": 178,
//         "start_price": 55.32,
//         "end_price": 68.5
//       },
//       {
//         "id": 179,
//         "start_price": 34.91,
//         "end_price": 40.03
//       },
//       {
//         "id": 180,
//         "start_price": 29.1,
//         "end_price": 41.11
//       },
//       {
//         "id": 181,
//         "start_price": 48.79,
//         "end_price": 60.63
//       },
//       {
//         "id": 182,
//         "start_price": 23.69,
//         "end_price": 13.89
//       },
//       {
//         "id": 183,
//         "start_price": 10.94,
//         "end_price": 33.23
//       },
//       {
//         "id": 184,
//         "start_price": 58.8,
//         "end_price": 19.22
//       },
//       {
//         "id": 185,
//         "start_price": 32.02,
//         "end_price": 87.4
//       },
//       {
//         "id": 186,
//         "start_price": 77.54,
//         "end_price": 44.95
//       },
//       {
//         "id": 187,
//         "start_price": 34.54,
//         "end_price": 72.07
//       },
//       {
//         "id": 188,
//         "start_price": 83.31,
//         "end_price": 62.28
//       },
//       {
//         "id": 189,
//         "start_price": 32.88,
//         "end_price": 3.08
//       },
//       {
//         "id": 190,
//         "start_price": 40.06,
//         "end_price": 91.37
//       },
//       {
//         "id": 191,
//         "start_price": 88.51,
//         "end_price": 81.91
//       },
//       {
//         "id": 192,
//         "start_price": 36.18,
//         "end_price": 38.97
//       },
//       {
//         "id": 193,
//         "start_price": 67.09,
//         "end_price": 15.5
//       },
//       {
//         "id": 194,
//         "start_price": 4.09,
//         "end_price": 56.72
//       },
//       {
//         "id": 195,
//         "start_price": 64.01,
//         "end_price": 12.26
//       },
//       {
//         "id": 196,
//         "start_price": 75.14,
//         "end_price": 18.49
//       },
//       {
//         "id": 197,
//         "start_price": 66.55,
//         "end_price": 74.1
//       },
//       {
//         "id": 198,
//         "start_price": 92.85,
//         "end_price": 55.23
//       },
//       {
//         "id": 199,
//         "start_price": 0.47,
//         "end_price": 68.13
//       },
//       {
//         "id": 200,
//         "start_price": 77.43,
//         "end_price": 99.8
//       },
//       {
//         "id": 201,
//         "start_price": 86.26,
//         "end_price": 22.36
//       },
//       {
//         "id": 202,
//         "start_price": 12.26,
//         "end_price": 98.82
//       },
//       {
//         "id": 203,
//         "start_price": 90.15,
//         "end_price": 89.07
//       },
//       {
//         "id": 204,
//         "start_price": 53.43,
//         "end_price": 87.37
//       },
//       {
//         "id": 205,
//         "start_price": 95.88,
//         "end_price": 60.08
//       },
//       {
//         "id": 206,
//         "start_price": 17.13,
//         "end_price": 55.9
//       },
//       {
//         "id": 207,
//         "start_price": 16.5,
//         "end_price": 22.14
//       },
//       {
//         "id": 208,
//         "start_price": 77.79,
//         "end_price": 8.17
//       },
//       {
//         "id": 209,
//         "start_price": 64.97,
//         "end_price": 51.76
//       },
//       {
//         "id": 210,
//         "start_price": 59.87,
//         "end_price": 71.7
//       },
//       {
//         "id": 211,
//         "start_price": 49.18,
//         "end_price": 80.97
//       },
//       {
//         "id": 212,
//         "start_price": 54.92,
//         "end_price": 13.92
//       },
//       {
//         "id": 213,
//         "start_price": 59.73,
//         "end_price": 31.34
//       },
//       {
//         "id": 214,
//         "start_price": 73.76,
//         "end_price": 49.71
//       },
//       {
//         "id": 215,
//         "start_price": 26.22,
//         "end_price": 92.68
//       },
//       {
//         "id": 216,
//         "start_price": 51.01,
//         "end_price": 6.67
//       },
//       {
//         "id": 217,
//         "start_price": 21.16,
//         "end_price": 57.66
//       },
//       {
//         "id": 218,
//         "start_price": 42.19,
//         "end_price": 36.03
//       },
//       {
//         "id": 219,
//         "start_price": 6.91,
//         "end_price": 54.23
//       },
//       {
//         "id": 220,
//         "start_price": 64.57,
//         "end_price": 3.24
//       },
//       {
//         "id": 221,
//         "start_price": 56.26,
//         "end_price": 86.98
//       },
//       {
//         "id": 222,
//         "start_price": 61.6,
//         "end_price": 5.59
//       },
//       {
//         "id": 223,
//         "start_price": 19.7,
//         "end_price": 87.05
//       },
//       {
//         "id": 224,
//         "start_price": 72.38,
//         "end_price": 83.81
//       },
//       {
//         "id": 225,
//         "start_price": 51.49,
//         "end_price": 52.89
//       },
//       {
//         "id": 226,
//         "start_price": 86.41,
//         "end_price": 39.32
//       },
//       {
//         "id": 227,
//         "start_price": 3.02,
//         "end_price": 57.91
//       },
//       {
//         "id": 228,
//         "start_price": 9.57,
//         "end_price": 8.64
//       },
//       {
//         "id": 229,
//         "start_price": 51.9,
//         "end_price": 88.65
//       },
//       {
//         "id": 230,
//         "start_price": 99.64,
//         "end_price": 90.48
//       },
//       {
//         "id": 231,
//         "start_price": 29.46,
//         "end_price": 82.29
//       },
//       {
//         "id": 232,
//         "start_price": 41.95,
//         "end_price": 33.69
//       },
//       {
//         "id": 233,
//         "start_price": 31.47,
//         "end_price": 23.03
//       },
//       {
//         "id": 234,
//         "start_price": 8.52,
//         "end_price": 75.3
//       },
//       {
//         "id": 235,
//         "start_price": 71.97,
//         "end_price": 92.9
//       },
//       {
//         "id": 236,
//         "start_price": 30.68,
//         "end_price": 85.41
//       },
//       {
//         "id": 237,
//         "start_price": 88.34,
//         "end_price": 1.68
//       },
//       {
//         "id": 238,
//         "start_price": 61.35,
//         "end_price": 16.16
//       },
//       {
//         "id": 239,
//         "start_price": 55.4,
//         "end_price": 67.34
//       },
//       {
//         "id": 240,
//         "start_price": 0.14,
//         "end_price": 83.76
//       },
//       {
//         "id": 241,
//         "start_price": 56.14,
//         "end_price": 34.85
//       },
//       {
//         "id": 242,
//         "start_price": 38.82,
//         "end_price": 27.18
//       },
//       {
//         "id": 243,
//         "start_price": 79.5,
//         "end_price": 56.03
//       },
//       {
//         "id": 244,
//         "start_price": 88.58,
//         "end_price": 49.5
//       },
//       {
//         "id": 245,
//         "start_price": 11.2,
//         "end_price": 75.24
//       },
//       {
//         "id": 246,
//         "start_price": 9.24,
//         "end_price": 41.59
//       },
//       {
//         "id": 247,
//         "start_price": 32.47,
//         "end_price": 41.08
//       },
//       {
//         "id": 248,
//         "start_price": 49.49,
//         "end_price": 22.46
//       },
//       {
//         "id": 249,
//         "start_price": 46.14,
//         "end_price": 53.23
//       }