
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

const defaultState: Array<Commodity> = []


export const commoditiesListReducer = createReducer(
    defaultState,
    on(Populate,
        (state, {commodities}) => {
            console.log('populate with', {...commodities})
            return {...commodities}
        }
    ),
    on(EditStart, 
        (state, { id, start_price }) => {
            console.log('id is',id,start_price)
            console.log('state',{
                ...state,
                [id]: {
                    id,
                    start_price,
                    end_price: state[id].end_price,
                    trend: start_price > state[id].end_price ? false : true
                }
                })
            let newState = state
            const end_price = state[id].end_price
            // newState[id] = {
            //     id,
            //     start_price,
            //     end_price,
            // }
            return {
        ...state,
        [id]: {
            id,
            start_price,
            end_price,
            trend: start_price > end_price ? false : true
        }
        }
    }
    
    
    ),
    on(EditEnd, 
        (state, { id, end_price }) => ({
        ...state
    })),
    on(Randomize, (state, {id, start_price, end_price}) => ({
        ...state
    }))
)