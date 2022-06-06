import { getInitialData } from 'src/app/utils/backend'

import { Action, createReducer, on } from '@ngrx/store'
import { Commodity } from 'src/app/models/commodity.model'
import * as CommodityActions from '../actions/commodity.actions'
import { EditStart, EditEnd, Randomize } from '../actions/commodity.actions'

const testVal1 = 14, testVal2 = 28

const getVals = () => {
    const start = parseFloat((Math.random() * 100).toFixed(2))
    const end = parseFloat((Math.random() * 100).toFixed(2))
    //const trend = start > end ? true : false
    return {
        start, end
    }
}

const defaultState: Commodity = {
    id: 0,
    start_price: getVals().start,
    end_price: getVals().end
}

const newState = (state: Commodity, newData: object) => {
  return Object.assign({}, state, newData)
}

export const commodityReducer = createReducer(
    defaultState,
    on(EditStart, 
        (state, { id, start_price }) => ({
        ...state
    })),
    on(EditEnd, 
        (state, { id, end_price }) => ({
        ...state
    })),
    on(Randomize, (state, {id, start_price, end_price}) => ({
        ...state
    }))
)