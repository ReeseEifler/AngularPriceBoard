
import { Action, createReducer, on } from '@ngrx/store'
import { Commodity } from 'src/app/models/commodity.model'
import * as CommodityActions from '../actions/commodity.actions'
import { Populate, EditStart, EditEnd, Randomize } from '../actions/commodity.actions'


const getVals = () => {
    const start = parseFloat((Math.random() * 100).toFixed(2))
    const end = parseFloat((Math.random() * 100).toFixed(2))
    //const trend = start > end ? true : false
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
    on(EditStart, 
        (state, { id, start_price }) => {
            // console.log('new',id,start_price)
            // console.log('row',{
            //     id,
            //     start_price,
            //     end_price: state[id].end_price,
            //     trend: start_price > state[id].end_price ? false : true
            // })
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
            //const end_price = state[id].end_price
            console.log(newState)
            //newState.rowData[id] = {}

            return newState
        }
    ),
    on(EditEnd, 
        (state, { id, end_price }) => {
            console.log('new end_price',end_price)
            console.log('row',{
                id,
                start_price: state[id].start_price,
                end_price,
                trend: state[id].end_price > end_price ? false : true
            })
            let newState = state
            const start_price = state[id].start_price
            return {
                ...state,
                [id]: {
                    id,
                    start_price,
                    end_price,
                    trend: start_price > end_price ? false : true
                }
            }
        }),
    on(Randomize, (state, {id, start_price, end_price}) => ({
        ...state
    }))
)