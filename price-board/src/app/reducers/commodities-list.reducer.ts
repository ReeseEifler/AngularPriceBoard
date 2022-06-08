
import { Action, createReducer, on } from '@ngrx/store'
import * as CommodityActions from '../actions/commodity.actions'
import { Populate, EditStart, EditEnd, Randomize, UpdateRow } from '../actions/commodity.actions'

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

export const commoditiesListReducer = createReducer(
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
    ),
    on(EditStart, 
        (state, { id, start_price }) => {
            let newRows = state.rowData.map((el:any) => {
                if(el.id === id) {
                    const end_price = state.rowData[id].end_price
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
    ),
    on(EditEnd, 
        (state, { id, end_price }) => {
            let newRows = state.rowData.map((el:any) => {
                if(el.id === id) {
                    const start_price = state.rowData[id].start_price
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
    ),
    on(Randomize, (state, {id, start_price, end_price}) => ({
        ...state
    }))
)