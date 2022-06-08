
import { Action, createReducer, on } from '@ngrx/store'
import * as CommodityActions from '../actions/commodity.actions'
import { Populate, UpdateRow } from '../actions/commodity.actions'

const getVals = () => {
    const start = parseFloat((Math.random() * 100).toFixed(2))
    const end = parseFloat((Math.random() * 100).toFixed(2))
    return {
        start, end
    }
}

const initialState: any = {
    rowData: []
}

export const commoditiesReducer = createReducer(
    initialState,
    on(Populate,
        (state, {commodities}) => {
            console.log('state is now', {
                ...state,
                rowData: commodities
            })
            return {
                ...state,
                rowData: commodities
            }
        }
    ),
    on(UpdateRow, 
        (state, { id, start_price, end_price }) => {
            let newRows = state.rowData.map((el:any) => {
                if(el.id === id) {
                    return {
                        id,
                        start_price,
                        end_price,
                        trend: start_price > end_price ?
                         false : true
                    }
                }
                return el
            })
            let newState = {
                ...state,
                rowData: newRows
            }
            return newState
        }
    )
)